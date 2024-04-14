'use client'
import Link from 'next/link'
import { FC } from 'react'
import { motion } from 'framer-motion'

interface ViewTimeSheetsButtonProps {
  
}

const ViewTimeSheetsButton: FC<ViewTimeSheetsButtonProps> = ({}) => {
    return (
        <Link href='/dashboard/view' >
            <motion.button 
                className='border-4 p-6 rounded-lg bg-slate-100'
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(220,220,220)' }}
                whileTap={{ scale: 0.9, backgroundColor: 'rgb(220,220,220)' }}>
                View Timesheets
            </motion.button>
        </Link>
    ) 
}

export default ViewTimeSheetsButton