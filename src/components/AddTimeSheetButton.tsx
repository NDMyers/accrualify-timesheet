'use client'
import { FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AddTimeSheetButtonProps {
  
}

const AddTimeSheetButton: FC<AddTimeSheetButtonProps> = ({}) => {

    return (
        <Link href='/dashboard/add' >
            <motion.button 
                className='border-4 p-6 rounded-lg bg-slate-100'
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(220,220,220)' }}
                whileTap={{ scale: 0.9, backgroundColor: 'rgb(220,220,220)' }}>
                Add Timesheet
            </motion.button>
        </Link>
    )

}

export default AddTimeSheetButton