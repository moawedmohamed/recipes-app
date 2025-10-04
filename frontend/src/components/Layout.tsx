import React, { type ReactNode } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* المحتوى الأساسي */}
      <main className="flex-grow bg-gray-50 p-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
