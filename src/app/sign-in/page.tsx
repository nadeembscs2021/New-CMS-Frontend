"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role: userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the API returns a token or user data
        // You can store the token in localStorage or cookies if needed
        // Redirect based on role
        router.push(`/${userRole}`);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Main container with two columns - adjusted for better viewport fit */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
        {/* Left column - Gradient blue section with branding and animations */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-900 text-white p-8 md:p-10 flex flex-col justify-between md:w-2/5 animate-slideInLeft">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              College Management System
            </h1>
            <p className="text-blue-100 text-lg">
              Welcome to our integrated platform for educational management
            </p>
          </div>

          <div className="flex flex-col items-center py-10">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-blue-400 bg-opacity-30 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-0 border-2 border-white border-opacity-50 rounded-full"></div>
                <Image
                  src="/graduation-cap.svg"
                  alt="Education Cap"
                  width={100}
                  height={100}
                  className="absolute inset-0 m-auto opacity-90"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 10v6M2 10l10-5 10 5-10 5z'/%3E%3Cpath d='M6 12v5c0 2 2 3 6 3s6-1 6-3v-5'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
            <p className="text-center text-blue-100 text-sm md:text-base">
              Streamlining education management for admins, teachers, students,
              and parents
            </p>
          </div>
        </div>

        {/* Right column - Sign in form */}
        <div className="bg-white p-8 md:p-10 flex flex-col justify-center md:w-3/5 animate-fadeIn">
          <div className="max-w-md w-full mx-auto">
            {/* Logo in circular frame with animation */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center shadow-md overflow-hidden animate-pulse-slow">
                <Image
                  src="/CMS_logo.png"
                  alt="College Management System Logo"
                  width={100}
                  height={100}
                  className="w-14 h-14 object-contain animate-zoomIn"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 24 24' fill='none' stroke='%233B82F6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 10v6M2 10l10-5 10 5-10 5z'/%3E%3Cpath d='M6 12v5c0 2 2 3 6 3s6-1 6-3v-5'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
              <p className="text-gray-600 mt-2">Access your account</p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Role selection */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role-select"
                  className="text-sm font-medium text-gray-700"
                >
                  Who are you?
                </label>
                <div className="relative">
                  <select
                    id="role-select"
                    value={userRole}
                    onChange={handleRoleChange}
                    className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-gray-800 appearance-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg animate-fadeIn">
                  {error}
                </div>
              )}

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 group-hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-gray-800"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 group-hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-gray-800"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              {/* Sign in button */}
              <button
                onClick={handleSignIn}
                disabled={loading}
                className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 mt-2 text-center relative overflow-hidden ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <span className="relative z-10">
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </span>
                <div className="absolute inset-0 h-full w-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              {/* Sign up link */}
              <div className="text-center mt-6 text-gray-600">
                {"Don't have an account? "}
                <a
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-800 ml-1 font-medium transition-colors duration-300"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add required animations to global CSS
const cssToAdd = `
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes ping-slow {
  0% { transform: scale(0.95); opacity: 1; }
  70%, 100% { transform: scale(1.05); opacity: 0; }
}

@keyframes zoomIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-in-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-zoomIn {
  animation: zoomIn 0.6s ease-out;
}
`;

export default LoginPage;
