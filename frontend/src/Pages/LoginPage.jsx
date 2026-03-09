// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { handleChange, handleSubmit } from "../Utils/function";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${api_url}/auth/login`;
    try {
      handleSubmit(formData, url, "/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.email}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.password}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 px-4 rounded transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-orange-500 hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
