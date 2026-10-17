
import { auth } from '@clerk/nextjs'
import React from 'react'

import CardCapture from '@/components/shared/CardCapture';

const createBuilder = () => {
    const { sessionClaims } = auth()

    // what does the ? do after sessionClaims below...
    const userId = sessionClaims?.userId as string;

    return (
        <div className="wrapper my-8">
            <CardCapture verified={false} />
        </div>
    )
}

export default createBuilder