import Link from 'next/link'
import { FC } from 'react'

interface ViewTimeSheetsButtonProps {
  
}

const ViewTimeSheetsButton: FC<ViewTimeSheetsButtonProps> = ({}) => {
    return (
        <Link href='/dashboard/view' >
            <button>
                View Timesheets
            </button>
        </Link>
    ) 
}

export default ViewTimeSheetsButton