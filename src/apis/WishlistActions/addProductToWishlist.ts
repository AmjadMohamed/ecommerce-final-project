"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addProductToWishlistAction(id: string) {
    const token = await getMyToken();

    if (!token) {
        throw Error("Please, Login First!");
    }

    const values = {
        productId: id
    };

    const reponse = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        values
        , {
            headers: {
                token: token as string
            }
        });

    return reponse.data;
}