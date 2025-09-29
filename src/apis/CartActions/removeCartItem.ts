"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function removeCartItemAction(id: string) {

    const token = await getMyToken();

    if (!token) {
        throw Error("Please, Login First!");
    }

    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
            token: token as string
        }
    })

    console.log(data);
    return data;
}