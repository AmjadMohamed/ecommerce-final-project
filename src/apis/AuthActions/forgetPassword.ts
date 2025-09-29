import axios from "axios";

export async function ForgetPasswordAction(email: string) {

    const value = {
        email: email
    }
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value);
    return response.data;
}
