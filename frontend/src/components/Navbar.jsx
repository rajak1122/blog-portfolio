import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [log, setLog] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("User Loggedin");
        setLog(true);
      } else {
        console.log("User Logged out");
        setLog(false);
      }
    });
  },[]);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Active nav link style
  const navStyle = (path) => {
    return location.pathname === path
      ? "text-gray-950 font-medium"
      : "text-gray-500 hover:text-gray-950";
  };

  const handleLogout = async () => {
  try {
    await signOut(auth);

    console.log("User logged out successfully");

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Brand */}
        <button
          onClick={() => handleNavigate("/")}
          className="group flex items-center gap-3"
        >
          {/* Minimal Logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-sm font-semibold text-white transition-transform duration-200 group-hover:scale-105">
            R
          </div>

          <span className="text-lg font-semibold tracking-tight text-gray-950">
            Raja<span className="text-gray-400">.</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <button
            onClick={() => handleNavigate("/")}
            className={`cursor-pointer relative text-sm transition-colors duration-200 ${navStyle(
              "/",
            )}`}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-950"></span>
            )}
          </button>

          <button
            onClick={() => handleNavigate("/blogs")}
            className={`cursor-pointer relative text-sm transition-colors duration-200 ${navStyle(
              "/blogs",
            )}`}
          >
            Blogs
            {location.pathname === "/blogs" && (
              <span className="cursor-pointer absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-950"></span>
            )}
          </button>

          <button
            onClick={() => handleNavigate("/contact")}
            className={`cursor-pointer relative text-sm transition-colors duration-200 ${navStyle(
              "/contact",
            )}`}
          >
            Contact
            {location.pathname === "/contact" && (
              <span className="cursor-pointer absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-950"></span>
            )}
          </button>

          {/* Login */}
          {log && (
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl text-xl text-gray-800 transition-colors hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col">
            <button
              onClick={() => handleNavigate("/")}
              className={`cursor-pointer border-b border-gray-100 py-4 text-left text-sm transition-colors ${navStyle(
                "/",
              )}`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavigate("/blogs")}
              className={`cursor-pointer border-b border-gray-100 py-4 text-left text-sm transition-colors ${navStyle(
                "/blogs",
              )}`}
            >
              Blogs
            </button>

            <button
              onClick={() => handleNavigate("/contact")}
              className={`cursor-pointer py-4 text-left text-sm transition-colors ${navStyle(
                "/contact",
              )}`}
            >
              Contact
            </button>

            {log && (
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
