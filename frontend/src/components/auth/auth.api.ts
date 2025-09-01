import type { AuthFormData, AuthFormDataLogin, AuthResponse } from "./auth.types";

const API_URL = "http://localhost:5000/api/auth"; // adjust your backend URL
export const login = async (data: AuthFormDataLogin): Promise<AuthResponse>  => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    return res.json();
}
export const signup = async (data: AuthFormData): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}