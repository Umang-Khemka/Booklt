"use client";
import { useState } from "react";
import type { ChangeEvent,FormEvent } from "react";
import { useAuthStore } from "../store/user.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { login, register, loading, error } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let success = false;
    if (isLogin) {
      if (!formData.email || !formData.password) return;
      success = await login(formData.email, formData.password);
    } else {
      if (!formData.username || !formData.email || !formData.password) return;
      success = await register(formData.username, formData.email, formData.password);
    }
    if (success){
      toast.success("Login Successful");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="/highway_delite.jpg" alt="Highway Delite" className="h-10 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {isLogin ? "Login to Continue" : "Create an Account"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username for Signup */}
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-600" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:border-yellow-500"
                placeholder="Enter your name"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition
                        ${loading
                          ? "bg-yellow-300 cursor-not-allowed"
                          : "bg-yellow-400 hover:bg-yellow-500"}`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>

          {/* Toggle between login/signup */}
          <p className="text-sm text-gray-600 text-center mt-3">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-500 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
