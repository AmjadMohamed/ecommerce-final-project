"use server"

import { getMyToken } from "@/utilities/token";
import axios from 'axios';
import { headers } from 'next/headers';

export async function onlinePaymentAction(id: string, values: object) {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Login First!");
    }

    // Get the dynamic URL from request headers
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${baseUrl}`, values, {
        headers: {
            token: token as string
        }
    });


    return data;
}