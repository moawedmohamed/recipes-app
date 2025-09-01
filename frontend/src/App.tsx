import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token")); // example
  return (
    <Routes>
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Route path="/" element={<Home />} />
      </ProtectedRoute>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
