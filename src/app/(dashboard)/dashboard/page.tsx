import AddTimeSheetButton from '@/components/AddTimeSheetButton'
import SignOutButton from '@/components/SignOutButton'
import ViewTimeSheetsButton from '@/components/ViewTimeSheetsButton'
import { authOptions } from '@/lib/auth'
import { Sign } from 'crypto'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

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

      <div className='flex w-full max-w-[120rem] justify-evenly text-md lg:text-2xl'>
        <AddTimeSheetButton />
        <ViewTimeSheetsButton />
      </div>

      <div className='flex flex-col'>
        <a className='pb-2'>{session?.user.email}</a>
        <SignOutButton />
      </div>
    </main>

  )
}

export default page