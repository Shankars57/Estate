import { Home, List, Menu, UserCircle, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const links = [
  { title: "Home", icon: <Home size={18} />, path: "/" },
  { title: "Properties", icon: <List size={18} />, path: "/properties" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="bg-gray-500/80 backdrop-blur-sm text-white px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="p-2 rounded-md bg-gray-600/40">
            <Home />
          </span>
          EstateHub
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex gap-6">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 hover:text-gray-200"
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {!user ? (
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <UserCircle />
                Profile
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white text-blue-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 bg-blue-600 rounded-lg p-4">
          <nav>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            {!user ? (
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded-md"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default NavBar;
