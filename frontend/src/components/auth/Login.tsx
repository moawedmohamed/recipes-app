import { useState, type FormEvent } from "react";
import { login } from "./auth.api";
import { validateEmail } from "./auth.utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    const res = await login({  email, password });
    if (!res.success) {
      setError("You don't have an account. Please sign up first.");
    } else {
      setError("");
      alert("Logged in successfully!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
    </form>
  );
}
