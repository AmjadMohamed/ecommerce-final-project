"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function getUserOrderAction() {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Login First!");
    }

    const decoded = jwtDecode(token as string) as { id: string };
    const { id } = decoded;

    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

    return data;
}