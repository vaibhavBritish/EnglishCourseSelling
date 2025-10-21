import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(Request:NextRequest){
    const {email,password} = await Request.json();
    if(!email || !password){
        return NextResponse.json({message:"All fields are required"},{status:400});
    }

    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if(!user){
        return NextResponse.json({message:"Invalid Credentials"},{status:400})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    
    if(!isPasswordValid){
        return NextResponse.json({message:"Invalid Credentials"},{status:400})
    }
    const token = jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username,
        isAdmin:user.isAdmin
    },process.env.JWT_SECRET!,{expiresIn:"1h"})

    const response = NextResponse.json({message:"Login Successful",
        user:{
            id:user.id,
            email:user.email,
            username:user.username,
            isAdmin:user.isAdmin
        }
    },{status:200})
    response.cookies.set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 60 * 60,
    })

    return response
}