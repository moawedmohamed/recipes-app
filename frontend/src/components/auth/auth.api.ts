import axios from "axios";
import type { AuthFormData, AuthFormDataLogin, AuthResponse } from "./auth.types";

const API_URL = "http://localhost:5000/api/auth"; // adjust your backend URL
export const login = async (data: AuthFormDataLogin): Promise<AuthResponse>  => {
    const res = await axios(`${API_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data)
    })
    const result = await res.data;
    if (result.token) {
        localStorage.setItem("token", result.token);
    }
    return result;
}
export const signup = async (data: AuthFormData): Promise<AuthResponse> => {
    const res = await axios(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
    })
    return res.data;
}