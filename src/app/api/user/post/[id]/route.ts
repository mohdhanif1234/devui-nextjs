import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/database/prisma.config";
import { join } from 'path';
import { rmSync } from "fs";

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session: CustomSession | null = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: 400, message: "Unauthorized network call" })
        }

        const post = await prisma.post.findUnique({
            where: {
                id: Number(params.id)
            },
            select: {
                image: true,
                id: true
            }
        })

        // Delete the old image
        const relativeUploadFolder = '/uploads';
        const dir = join(process.cwd(), "public", relativeUploadFolder);
        const path: string = dir + "/" + post?.image;
        rmSync(path, { force: true });

        await prisma.post.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json({ status: 200, message: "Post deleted successfully" })

    } catch (error) {
        return NextResponse.json({ status: 500, message: "Something went wrong" })
    }
}