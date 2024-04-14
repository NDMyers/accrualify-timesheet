import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { X } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const page = async () => {

    const session = await getServerSession(authOptions)

    if (!session) notFound()

    async function fetchTimeSheets() {
        try {
            const results = await fetchRedis(
                'smembers',
                `user:${session?.user.id}:timesheets`
            ) as string
            // setTimeSheets(response.data)
            // setShowSuccessState(true)     
            console.log("results: ", results) 
        } catch (error) {

        } finally {
            // console.log(timeSheets)
        }
    }

    const retrievedTimesheets = await fetchTimeSheets()
    // console.log(retrievedTimesheets)

    return (
        <main className='flex flex-col items-center justify-between w-full min-h-screen p-6'>
            
            {/* {retrievedTimesheets.map((timeSheet: TimeSheet, index: number) => (
                <li key={index}>
                    {timeSheet.description}
                    {timeSheet.lineItems?.map((lineItem: LineItem, index: number) => (
                        <li key={index}>
                            {lineItem.date}
                            {lineItem.minutes}
                        </li>
                    ))}
                    {timeSheet.rate}
                    {timeSheet.totalCost}
                    {timeSheet.totalTime}
                </li>
            ))} */}

        </main>
    )
}

export default page