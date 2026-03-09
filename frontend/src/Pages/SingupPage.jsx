// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { handleChange, handleSubmit } from "../Utils/function";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    userType: "user",
  });
  const api_ur = import.meta.env.VITE_API_URL;
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(
      formData,
      `${api_ur}/auth/register`,
      "/login" // redirect to login after signup
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.name}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.phone}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Account Type:</label>
            <label>
              <input
                type="radio"
                name="userType"
                value="user"
                checked={formData.userType === "user"}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />{" "}
              Personal User
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="business"
                checked={formData.userType === "business"}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />{" "}
              Business Owner
            </label>
          </div>

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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:underline font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
