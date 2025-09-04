import { useState, type FormEvent } from "react";
import { signup } from "./auth.api";
import { validateEmail, validatePassword } from "./auth.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Store field-specific errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = data;

  // Handle input changes + validate live
  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });

    // Reset error when field is corrected
    setErrors((prev) => ({ ...prev, [field]: "" }));

    // Live validation
    if (field === "username" && !value.trim()) {
      setErrors((prev) => ({ ...prev, username: "Please enter a username" }));
    }
    if (field === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
    }
    if (field === "password" && value && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Please enter a username";
      isValid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signup({ username, email, password });

      if (!res.success) {
        toast.error(res.message || "Signup failed. Please try again.");
      } else {
        toast.success("Account created successfully!");
        setData({ username: "", email: "", password: "" });
        setErrors({ username: "", email: "", password: "" });
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-fit m-auto">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      {/* Username */}
      <div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => handleChange("username", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.username
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-green-400"
          }`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-green-400"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          className={`w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-green-400"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full  bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Sign Up
      </button>
      <p className="text-center text-sm">
        You  have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
