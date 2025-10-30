"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/user.store";
import toast from "react-hot-toast";

interface NavbarProps {
  onSearch?: (query: string) => void; // optional
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { logout } = useAuthStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch?.(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      onSearch?.("");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfull");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex flex-wrap items-center justify-between sticky top-0 z-50 gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/highway_delite.jpg"
          alt="Highway Delite"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Search */}
      {onSearch && (
        <div className="flex items-center space-x-2 w-full sm:w-auto max-w-md flex-1 justify-center">
          <input
            type="text"
            placeholder="Search experiences..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md font-medium whitespace-nowrap"
          >
            Search
          </button>
        </div>
      )}

      {/* Auth buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/auth")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md font-medium"
        >
          Login / Signup
        </button>

        <button
          onClick={handleLogout}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md font-medium border"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
