import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/option';


export async function POST(req: Request) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not Autheticated" }, { status: 401 })
    }

    const { title, content, links, selectedcategory, imageUrl, publicId } = await req.json()

    const authorEmail = session?.user?.email as string;

    if (!title || !content) {
        return NextResponse.json({ erro: "Title & Content are  required" }, { status: 500 })
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title, content, links, imageUrl, publicId, catName:selectedcategory, authorEmail
            }
        })
        console.log("Post Created")
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ message: "Could not create post" })
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: { author: { select: { name: true } } }, orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.log(error)
        NextResponse.json({ message: "Some Error Occured" }, { status: 500 })
    }
}