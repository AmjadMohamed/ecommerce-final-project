import axios from "axios";

export async function ResetPasswordAction(email: string, newPassword: string) {

    const value = {
        email: email,
        newPassword: newPassword
    }
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value);
    return response.data;
}
