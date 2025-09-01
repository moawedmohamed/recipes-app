import { useState, type FormEvent } from "react";
import { signup } from "./auth.api";
import { validateEmail, validatePassword } from "./auth.utils";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    const res = await signup({ username, email, password });
    if (!res.success) {
      setError(res.message || "Signup failed. Please try again.");
    } else {
      setError("");
      alert("Account created successfully!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-fit m-auto">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        className="w-32 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
