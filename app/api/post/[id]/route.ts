import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(res: Request, { params }: { params: { id: string } }) {

    try {
        const id = params.id
        const post = await prisma.post.findUnique({ where: { id } })
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Could not fetch post" })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not Autheticated" }, { status: 401 })
    }
    const { title, content, links, selectedcategory, imageUrl, publicId } = await req.json()
    const id = params.id;

    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                links,
                catName: selectedcategory,
                imageUrl,
                publicId
            }
        })
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error editing post" })

    }
}

export async function DELETE(res: Request, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not Autheticated" }, { status: 401 })
    }

    const id = params.id;
    try {
        const post = await prisma.post.delete({ where: { id } });
        return NextResponse.json(post);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error Deleting the Post" })
    }
}