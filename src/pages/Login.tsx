import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // login request...
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white  w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 ">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            U
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 ">Find your perfect roommate today.</p>
        </div>

        {/* Google Sign In */}
        <button className="w-full flex items-center justify-center gap-3 bg-white  border border-slate-200  p-3 rounded-xl shadow-sm hover:bg-slate-50  transition">
          <FcGoogle size={22} />
          <span className="font-medium text-slate-700 ">Sign in with Google</span>
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-300 "></div>
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300 "></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white text-gray-900  focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white  text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
           type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
             SignIn
          </button>
        </form>

        {/* Switch */}
        <div className="mt-6 text-center">
          <p className="text-slate-500  text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
