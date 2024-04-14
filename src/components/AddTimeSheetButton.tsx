'use client'
import { FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AddTimeSheetButtonProps {
  
}

const AddTimeSheetButton: FC<AddTimeSheetButtonProps> = ({}) => {

    return (
        <Link href='/dashboard/add' >
            <button>
                Add Timesheet
            </button>
        </Link>
    )

}

export default AddTimeSheetButton