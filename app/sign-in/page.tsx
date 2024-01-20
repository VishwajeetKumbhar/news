import SigninBtns from '@/Components/SigninBtns'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/option';

import { redirect } from 'next/navigation'

export default async function SignIn() {

    const session = await getServerSession(authOptions)
    if(session){
        redirect('/dashboard')
    }

    return (
        <SigninBtns />
    )
}
