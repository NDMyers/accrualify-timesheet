'use client'
import Link from 'next/link'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ToDashButtonProps {
  
}

const ToDashButton: FC<ToDashButtonProps> = ({}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleLoading () {
        setIsLoading(true)
    }

    return (
        <Link href='/dashboard'>
            <motion.button 
                className='flex items-center justify-center border-2 px-6 py-2 rounded-xl bg-slate-200 mb-12 lg:mb-16'
                onClick={handleLoading}
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(200,200,200)' }}>
                {isLoading ? (
                    <Loader2 className='animate-spin'/>
                ) : (
                    <a>Return to dashboard</a>   
                )}
            </motion.button>
        </Link>
    )
}

export default ToDashButton