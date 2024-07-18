import { NextRequest, NextResponse } from 'next/server'
import vine, { errors } from "@vinejs/vine"
import { CustomErrorReporter } from '@/validator/customErrorReporter';
import { postSchema } from "@/validator/postSchema"
import { imageValidator } from '@/validator/imageValidator';
import { join } from 'path';
import { getRandomNumber } from '@/lib/utils';
import { writeFile } from 'fs/promises';
import prisma from '@/database/prisma.config';

export async function GET(request: NextRequest) {
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
        }
    })

    return NextResponse.json({ status: 200, data: posts })
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;

        console.log('File is -----', file)

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            image: file?.name,
            user_id: formData.get('user_id')
        }

        // Vine validation logic
        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(postSchema);
        const validatedData = await validator.validate(data);

        const isImageNotValid: string | null = imageValidator(file?.name, file?.size);

        if (isImageNotValid) {
            return NextResponse.json({
                status: 400, errors: {
                    image: isImageNotValid
                }
            })
        }

        // Upload Image
        const buffer = Buffer.from(await file!.arrayBuffer());
        const relativeUploadDir = "/uploads";
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        const uniqueName = Date.now() + "_" + getRandomNumber(1, 99999);
        const imgExt = file?.name.split('.');
        const filename = uniqueName + "." + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);

        const newPost = await prisma.post.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                user_id: Number(data.user_id),
                image: filename
            }
        })

        return NextResponse.json({ status: 200, message: "Post created successfully" }, { status: 200 })

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return NextResponse.json({ status: 400, errors: error.messages })
        }
    }
}