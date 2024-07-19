import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/database/prisma.config';
import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ status: 400, message: "Unauthorized network call" })
    }

    const posts = await prisma.post.findMany({
        orderBy: {
            id: 'desc'
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        },
    })

    return NextResponse.json({ status: 200, data: posts })
}
