'use client'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface AddTimeSheetButtonProps {
  
}

const AddTimeSheetButton: FC<AddTimeSheetButtonProps> = ({}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleLoading () {
        setIsLoading(true)
    }

    return (
        <Link href='/dashboard/add' >
            <motion.button 
                className='border-4 p-6 rounded-lg bg-slate-100'
                onClick={handleLoading}
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(220,220,220)' }}
                whileTap={{ scale: 0.9, backgroundColor: 'rgb(220,220,220)' }}>
                {isLoading ? (
                    <Loader2 className='animate-spin'/>
                ) : (
                    <a>Add Timesheet</a>
                )}
            </motion.button>
        </Link>
    )

}

export default AddTimeSheetButton