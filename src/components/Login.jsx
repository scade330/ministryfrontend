import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Mail, Key, LogIn, TrendingUp, Users } from "lucide-react";

const AVAILABLE_ROLES = ["User", "Staff", "Management", "Admin"];

// ✅ API base URL from Vite env
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleInputChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password required");
      return;
    }

    if (!API_URL) {
      toast.error("API URL not configured");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/login-user`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { user: loggedInUser, token, expiresIn } = res.data;

      if (!loggedInUser || !token) {
        toast.error("Login failed");
        return;
      }

      if (loggedInUser.role !== formData.role) {
        toast.error(`You cannot login as ${formData.role}`);
        return;
      }

      login(loggedInUser, token, expiresIn);
      toast.success(`Logged in as ${loggedInUser.role}`);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error("Login error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-700/50 overflow-hidden">

        {/* Left Panel */}
        <div className="md:w-5/12 bg-gradient-to-br from-green-800 via-green-600 to-emerald-500 p-10 sm:p-16 flex flex-col justify-center text-white space-y-5">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to the Health Hub
          </h1>
          <p className="text-lg text-white/90 font-light leading-relaxed">
            Securely access your dashboard to manage critical health data, resources, and reports across the network.
          </p>
          <Link to="/intro">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 transition duration-300 py-3 px-8 text-lg rounded-full shadow-md flex items-center"
            >
              <TrendingUp size={20} className="mr-2" />
              View Public Information
            </Button>
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-7/12 p-10 sm:p-16 flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl p-6 sm:p-10 transform hover:scale-[1.01] transition-transform duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl font-extrabold text-red-700">
                Secure Access 🔑
              </CardTitle>
              <CardDescription className="text-md text-gray-600 mt-2">
                Enter your credentials and select your authorized role
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">

                {/* Role */}
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="role" className="text-md font-bold text-gray-800">
                    System Role
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="rounded-xl appearance-none w-full bg-white pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-red-500 transition duration-300 cursor-pointer text-gray-700"
                      required
                    >
                      {AVAILABLE_ROLES.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="text-md font-bold text-gray-800">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., manager@ministry.gov"
                      className="rounded-xl pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-red-500 transition duration-300 text-gray-800"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password" className="text-md font-bold text-gray-800">
                    Password
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your secret key"
                      className="rounded-xl pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-red-500 transition duration-300 text-gray-800"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white font-extrabold py-3 mt-4 rounded-xl shadow-lg shadow-red-500/50 hover:from-red-700 hover:to-red-900 transition-all duration-300 text-xl tracking-wider uppercase flex items-center justify-center"
                >
                  <LogIn size={20} className="mr-2" />
                  {loading ? "Verifying Credentials..." : "Sign In Securely"}
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
