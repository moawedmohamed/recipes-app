// src/components/ui/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/logo.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout,isLoading } = useAuth();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    {
      label: "Demos",
      children: [
        { label: "Demo 1", path: "/demo1" },
        { label: "Demo 2", path: "/demo2" },
      ],
    },
    {
      label: "Recipes",
      children: [
        { label: "All Recipes", path: "/all-recipes" },
        { label: "Categories", path: "/categories" },
      ],
    },
    {
      label: "Pages",
      children: [
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      label: "Shop",
      children: [
        { label: "Products", path: "/products" },
        { label: "Cart", path: "/cart" },
      ],
    },
    { label: "Submit Recipe", path: "/submit-recipe" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-5">
        {/* Logo */}
        <div className="flex items-center space-x-48">
          <img
            src={logo}
            alt="logo"
            className="h-full w-full transform translate-x-36"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 transform translate-x-44">
          {navLinks.map((link, idx) => (
            <li key={idx} className="relative">
              {link.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(link.label)}
                    className="flex items-center hover:text-green-500 font-semibold"
                  >
                    {link.label}
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                  {openMenu === link.label && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-40">
                      {link.children.map((child, i) => (
                        <li key={i}>
                          <Link
                            to={child.path}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className="hover:text-green-500 font-semibold"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex space-x-4">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-400">Loading...</div>
          ) : !user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => toggleMenu("user")}
                className="flex items-center space-x-2"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.email}`}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openMenu === "user" && (
                <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col">
            {navLinks.map((link, idx) => (
              <li key={idx} className="border-b">
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-gray-100"
                    >
                      {link.label}
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    {openMenu === link.label && (
                      <ul className="bg-gray-50">
                        {link.children.map((child, i) => (
                          <li key={i}>
                            <Link
                              to={child.path}
                              onClick={closeMobile}
                              className="block px-6 py-2 hover:bg-gray-200"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={closeMobile}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile Auth Section */}
            <li className="border-t mt-2 flex flex-col px-4 py-3 space-y-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="w-full text-center px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobile}
                    className="w-full text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="w-full text-center px-4 py-2 hover:bg-gray-100 rounded transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobile();
                    }}
                    className="w-full text-center px-4 py-2 hover:bg-gray-100 rounded transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
