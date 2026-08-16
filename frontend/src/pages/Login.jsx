import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/config";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      console.log("Login successful:", res.user);

      navigate("/");
    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Incorrect email or password");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-145px)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Welcome Back
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">
              Login to your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Enter your details to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-gray-500 transition hover:text-gray-900"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-medium text-gray-950 underline underline-offset-4 transition hover:text-gray-600"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
