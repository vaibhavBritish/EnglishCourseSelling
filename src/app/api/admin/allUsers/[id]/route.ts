import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function DELETE(Request:NextRequest,context:{params:Promise<{id:string}>}){
    try {
        const {id} = await context.params;
        const deleteUser = await prisma.user.delete({
            where:{id:id}
        })
        return NextResponse.json(deleteUser);
    } catch (error) {
        console.log(error);
    }
}