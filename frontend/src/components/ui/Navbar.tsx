// src/components/ui/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import logo from "../../images/logo.png";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Login & Signup Buttons for Desktop */}
        <div className="hidden md:flex space-x-4">
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
            <li className="border-t mt-2 flex space-x-4 px-4 py-3">
              <Link
                to="/login"
                onClick={closeMobile}
                className="flex-1 text-center px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMobile}
                className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
