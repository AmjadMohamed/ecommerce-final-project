"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    const tokenVal = (await cookies()).get("next-auth.session-token")?.value;

    const realToken = await decode({
        token: tokenVal,
        secret: process.env.NEXTAUTH_SECRET!
    });

    return realToken?.token;
}