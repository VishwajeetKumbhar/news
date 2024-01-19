'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch('/api/removeimage', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),

    })
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const res = await fetch(`/api/post/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          },
        })
        if (res.ok) {
          console.log("Post Deleted")
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId)
          toast.success("Post deleted")
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log("Error")
      }
    }
  }

  return (
    <button onClick={handleDelete} className='text-red-600'>Delete</button>
  )
}
