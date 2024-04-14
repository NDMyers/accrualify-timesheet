'use client'
import axios from 'axios'
import { Loader2, XSquare } from 'lucide-react'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'

interface DeleteTimeSheetButtonProps {
    member: string
}

const DeleteTimeSheetButton: FC<DeleteTimeSheetButtonProps> = ({ member }) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    
    const deleteTimeSheet = async (id: string) => {
        // [UI for user] shows deleting is 'loading'
        setIsDeleting(true)
        try {
            // Make a delete request to the database
            await axios.post('/api/timesheet/delete', {
                string: member
            })
            
        } catch (error) {
            console.log("Error deleting timesheet from database")
        } finally {
            setIsDeleting(false)
            window.location.reload()
        }
    }


    return (
        <motion.button 
            onClick={()=> deleteTimeSheet(member)}
            className='flex items-center text-red-500 self-start pb-1 border-red-600'
            whileHover={{ scale: 1.05, color: 'rgb(189 18 18)' }}
            whileTap={{ scale: 0.9 }}>
                {isDeleting ? (
                    <Loader2 className='animate-spin'/>
                ) : <XSquare /> }
                <a className='pl-1'>Delete</a>         
        </motion.button>
    )
}

export default DeleteTimeSheetButton