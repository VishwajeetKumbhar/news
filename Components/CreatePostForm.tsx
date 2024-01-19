'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { TCategory } from '@/types';
import { useRouter } from 'next/navigation';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';
import toast from 'react-hot-toast';


export default function CreatePostForm() {

    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [selectedcategory, setSelectedCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [publicId, setPublicId] = useState('');


    const router = useRouter();
    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await fetch('api/categories')
            const catNames = await res.json();
            setCategories(catNames)
        }
        fetchAllCategories();
    }, []);


    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (linkInput.trim() !== '') {
            setLinks((prev) => [...prev, linkInput]);
            setLinkInput("");
        }
    }

    const deleteLink = (index: number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index))
    }

    const handleImageUpload = (result: CldUploadWidgetResults) => {
        console.log('result', result)
        const info = result.info as object;

        if ('secure_url' in info && 'public_id' in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            setImageUrl(url);
            setPublicId(public_id);
        }
    }

    const removeImage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('api/removeimage', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ publicId })
            });

            if (res.ok) {
                setImageUrl("")
                setPublicId("")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            const errorMessage = "Title & Content are required";
            toast.error(errorMessage)
            return
        }

        try {
            const res = await fetch('api/post/', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title, content, selectedcategory, links, imageUrl, publicId
                })
            });
            if (res.ok) {
                toast.success("Post created successfully")
                router.push('/dashboard')
                router.refresh();

            }

        } catch (error) {
            toast.error("Something went wrong.")
        }

    }
    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2' >
                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' />
                <textarea onChange={(e) => setContent(e.target.value)} placeholder='Content'></textarea>

                {links && links.map((link, i) => <div key={i} className='flex items-center gap-4'>
                    <span ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                    </svg>
                    </span>
                    <Link className='link' href={link}>{link} </Link>
                    <span className='cursor-pointer text-red-500' onClick={() => deleteLink(i)} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    </span>
                </div>)}

                <div className='flex gap-2'>
                    <input onChange={(e) => setLinkInput(e.target.value)} value={linkInput} className='flex-1' type="text" placeholder='Past the link' />
                    <button onClick={addLink} className='btn flex items-center gap-2'>
                        <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg> </span> Add</button>
                </div>

                <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${imageUrl && 'pointer-events-none'}`} onUpload={handleImageUpload} >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                    </div>
                    {imageUrl && <Image src={imageUrl} fill className='absolute object-cover inset-0' alt={title} />}
                </CldUploadButton>

                {
                    publicId && <button onClick={removeImage} className='py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4' >Remove Image</button>
                }

                <select onChange={(e) => setSelectedCategory(e.target.value)} className='p-3 rounded-md border appearance-none'>
                    <option value="" key="">Select A Category</option>
                    {
                        categories && categories.map(category => <option key={category.id} value={category.catName}> {category.catName} </option>)
                    }
                </select>

                <button className='primary-btn' type='submit'> Create Post</button>
            </form>
        </div>
    )
}
