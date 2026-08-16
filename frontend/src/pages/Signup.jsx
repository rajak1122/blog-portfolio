import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/config";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      await updateProfile(res.user, {
        displayName: formData.name,
      });

      console.log("User created:", res.user);

      alert("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-145px)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Get Started
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">
              Create an account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create your account to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/*Confirm password*/}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="font-medium text-gray-950 underline underline-offset-4 transition hover:text-gray-600"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
