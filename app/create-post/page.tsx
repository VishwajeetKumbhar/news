import CreatePostForm from '@/Components/CreatePostForm'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function CreatePost() {
    const session = await getServerSession(authOptions);
    
    if(!session){
        redirect('/sign-in')
    }

    return (
        <CreatePostForm />
    )
}
