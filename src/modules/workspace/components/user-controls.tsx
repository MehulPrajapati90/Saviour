import UserControl from '@/modules/layout/components/user-controls'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'

const Control = () => {
    return (
        <div className='flex justify-center items-center'>
            <SignedIn >
                <UserControl />
            </SignedIn>
        </div>
    )
}

export default Control