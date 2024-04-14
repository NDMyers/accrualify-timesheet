'use client'
import Link from 'next/link'
import { FC } from 'react'
import { motion } from 'framer-motion'

interface ToDashButtonProps {
  
}

const ToDashButton: FC<ToDashButtonProps> = ({}) => {
    return (
        <Link href='/dashboard'>
            <motion.button 
                className='flex items-center justify-center border-2 px-6 py-2 rounded-xl bg-slate-200'
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(200,200,200)' }}>
                Return to dashboard
            </motion.button>
        </Link>
    )
}

export default ToDashButton