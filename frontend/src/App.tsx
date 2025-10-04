import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./components/auth/Profile";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import ProductDetails from "./components/ProductDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import AllRecipes from "./components/AllRecipes";
import Test from "./components/Test";
import AboutUs from "./components/about";
import Cart from "./components/Cart";
import Layout from "./components/Layout";
const App = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token")); // example
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ErrorBoundary>
            <ToastContainer position="top-center" autoClose={3000} />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favourite"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <FavouriteRecipes />
                    </ProtectedRoute>
                  }
                />
                <Route path="/allRecipes" element={<AllRecipes />} />
                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ProductDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </Layout>
          </ErrorBoundary>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
