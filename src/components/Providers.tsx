'use client'

// Component meant to render hot text from react-hot-toast for user messages/error
// Must be a client component wrap since react-hot-toast renders client side, not server-side

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
        </>
    )
}

export default Providers