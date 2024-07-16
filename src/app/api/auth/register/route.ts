import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/validator/authSchema'
import vine, { errors } from '@vinejs/vine'
import { CustomErrorReporter } from '@/validator/customErrorReporter';
import bcrypt from "bcryptjs"
import prisma from '@/database/prisma.config';
import { User } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(registerSchema);
        const validatedData = await validator.validate(data);

        // Check if email already exists
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        })

        if (user) {
            return NextResponse.json({
                status: 400, errors: {
                    email: 'Email is already taken.Please use another email.'
                }
            })
        }

        
        // Generate salt
        const salt = bcrypt.genSaltSync(10);
        
        validatedData.password = bcrypt.hashSync(validatedData.password, salt)
        
        // to create a user entry in db
        await prisma.user.create({
            data: validatedData
        })

        return NextResponse.json({
            status: 200,
            message:'Account created successfully'
        })
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return NextResponse.json({ status: 400, errors: error.messages })
        }
    }
}


