'use client'
import Link from 'next/link'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ViewTimeSheetsButtonProps {
  
}

const ViewTimeSheetsButton: FC<ViewTimeSheetsButtonProps> = ({}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleLoading () {
        setIsLoading(true)
    }

    return (
        <Link href='/dashboard/view' >
            <motion.button 
                className='border-4 p-6 rounded-lg bg-slate-100'
                onClick={handleLoading}
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(220,220,220)' }}
                whileTap={{ scale: 0.9, backgroundColor: 'rgb(220,220,220)' }}>
                {isLoading ? (
                    <Loader2 className='animate-spin'/>
                ) : (
                    <a>View Timesheets</a>
                )}
            </motion.button>
        </Link>
    ) 
}

export default ViewTimeSheetsButton