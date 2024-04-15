import DeleteTimeSheetButton from '@/components/DeleteTimeSheetButton'
import ToDashButton from '@/components/ToDashButton'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const page = async () => {

    const session = await getServerSession(authOptions)
    if (!session) notFound()

    // List of timesheets belonging to user
    const results = await fetchRedis(
        'smembers',
        `user:${session?.user.id}:timesheets`     
    )

    const retrievedTimesheets = await Promise.all(
        results.map( async (timeSheet: string, index: number) => {
            
            // { id: ###, timeSheet: [...] }
            const parsedMember = JSON.parse(timeSheet)
            // { timeSheet: [...] }
            const parsedTimeSheet = parsedMember.timeSheet

            return (
                <li key={index} className='flex flex-col list-none w-full py-4'>
                    <DeleteTimeSheetButton member={parsedMember} />
                    <a>Description: {parsedTimeSheet.description}</a>
                    {parsedTimeSheet.lineItems.map((lineItem: LineItem, index: number) => (
                        <li key={index} className='flex justify-between border-x-2 rounded-lg p-2'>
                            <a>Date: {lineItem.date}</a>
                            <a className='pl-4'>{lineItem.minutes} minute(s)</a>
                        </li>
                    ))}
                    <a className='font-semibold'>Rate: ${parsedTimeSheet.rate} / hour</a>
                    <a className='font-semibold'>Total Time: {parsedTimeSheet.totalTime} minutes</a>
                    <a className='font-semibold'>Total Cost: ${parsedTimeSheet.totalCost}</a>
                </li>
            )
        })
    )

    return (
        <main className='flex flex-col items-center justify-between w-full p-6 text-sm lg:text-xl'>
            <div>
                {results.length > 0 ? (
                    <div>{retrievedTimesheets}</div>
                ) : (
                    <div className='py-40 text-2xl text-center'>
                        No timesheets to view
                        <br></br>
                        Return to dashboard to add one
                    </div>
                )}
            </div>
            <ToDashButton />
        </main>
    )
}

export default page