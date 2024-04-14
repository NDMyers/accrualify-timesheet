"use client"

import { ButtonHTMLAttributes, FC, useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({  }) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false) 

    async function signOutFunction() {
        setIsSigningOut(true)
        try {
            await signOut()
        } catch (error) {
            toast.error('There was a problem signing out')
        } finally {
            setIsSigningOut(false)
        }
    }

    return (
        <motion.button 
            className='flex items-center justify-center border-2 px-6 py-2 rounded-xl bg-slate-200' 
            onClick={signOutFunction}
            whileHover={{ scale: 1.05, backgroundColor: 'rgb(200,200,200)' }}
             
        >
            {isSigningOut ? ( 
                <Loader2 className='animate-spin h-4 w-4' /> 
            ) 
            : ( <div className='flex items-center justify-center'>           
                    <LogOut className='w-4 h-4' />
                    <a className='pl-2'>Sign Out</a>      
                </div>
            )}
        </motion.button>
    )
}

export default SignOutButton