import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from '@vinejs/vine'
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { User } from "@prisma/client";
import prisma from "@/database/prisma.config";
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(loginSchema);
        const validatedData = await validator.validate(data);

        // Check email if it exists or not in db

        const user: User | null = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        })

        if (user === null) {
            return NextResponse.json({
                status: 400, errors: {
                    email: 'No account found with this email'
                }
            })
        }

        const isPasswordMatch = bcrypt.compareSync(validatedData.password, user.password!)

        if (isPasswordMatch) {
            return NextResponse.json({ status: 200, message: 'User logged in successfully' })
        }

        return NextResponse.json({
            status: 400, errors: {
                email: 'Invalid credentials'
            }
        })


    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return NextResponse.json({ status: 400, errors: error.messages })
        }
    }
}