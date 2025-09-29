import axios from "axios";

export async function VerifyResetPasswordAction(code: string) {

    const value = {
        resetCode: code
    }
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value);
    return response.data;
}
