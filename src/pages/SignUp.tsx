import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // signup request...
  };

  return (
    <div className="min-h-screen bg-slate-50  flex items-center justify-center p-6">
      <div className="bg-white  w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 ">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            RF
          </div>
          <h1 className="text-2xl font-bold text-slate-900 ">Create an Account</h1>
          <p className="text-slate-500 ">Join RoomieFind and start matching today.</p>
        </div>

        {/* Google Sign Up */}
        <button className="w-full flex items-center justify-center gap-3 bg-white  border-slate-200  p-3 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-gray-600 transition">
          <FcGoogle size={22} />
          <span className="font-medium text-slate-700 ">Sign Up with Google</span>
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-300 "></div>
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300 "></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white  text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white  text-gray-900  focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
          type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>

        {/* Switch */}
        <div className="mt-6 text-center">
          <p className="text-slate-500  text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Log In
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
