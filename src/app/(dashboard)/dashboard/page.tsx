import SignOutButton from '@/components/SignOutButton'
import { motion } from 'framer-motion'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const page = async ({}) => {

  const session = await getServerSession(authOptions)

  // For UI purposes, extracts users first name from Google Account name
  const firstName = session?.user.name?.split(' ')[0]

  return (

    <main className='flex flex-col items-center justify-between w-full min-h-screen p-6'>

      <div className='flex justify-center w-full max-w-[120rem]'>
        <h1 className='w-full p-4 text-4xl font-semibold text-center tracking-tight border-b-2 border-gray-800 text-slate-800'>
          Welcome back {firstName} !
        </h1>
      </div>

      <div className='flex w-full max-w-[120rem] justify-evenly items-center text-md lg:text-2xl'>
        <Link href='/dashboard/add' className='border-4 p-6 rounded-lg bg-slate-100 hover:scale-105 hover:bg-[rgb(220,220,220)] transition-colors hover:ease-in-out'>
            Add Timesheet 
        </Link>
        
        <Link href='/dashboard/view' className='border-4 p-6 rounded-lg bg-slate-100 hover:scale-105 hover:bg-[rgb(220,220,220)] transition-colors hover:ease-in-out'>
            View Timesheets 
        </Link>
      </div>

      <div className='flex flex-col'>
        <a className='pb-2'>{session?.user.email}</a>
        <SignOutButton />
      </div>
    </main>

  )
}

export default page