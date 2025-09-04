import { useState, type FormEvent } from "react";
import { login } from "./auth.api";
import { validateEmail } from "./auth.utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const res = await login({ email, password });
      console.log("Login Response:", res);

      if (!res.success) {
        const msg = res.message || "Login failed";
        setError(msg);
        toast.error(msg);
      } else {
        setError("");
        toast.success("Logged in successfully!");
        navigate("/", { replace: true });
      }
    } catch (err: string | any  ) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-fit m-auto">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>
      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
