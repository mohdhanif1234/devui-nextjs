import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma.config";

export async function GET(request: NextRequest) {
    const posts = await prisma.post.findMany({
        orderBy: {
            id: "desc"
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })

    return NextResponse.json({status:200, data:posts})
}