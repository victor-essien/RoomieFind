import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunk";
import type { RootState } from "../app/store";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // signup request...
  };

  const onSubmit = (data: SignupFormValues) => {
    dispatch(
      signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  };

  useAuthRedirect('/onboarding')

  return (
    <div className="min-h-screen bg-slate-50  flex items-center justify-center p-6">
      <div className="bg-white  w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 ">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            RF
          </div>
          <h1 className="text-2xl font-bold text-slate-900 ">
            Create an Account
          </h1>
          <p className="text-slate-500 ">
            Join RoomieFind and start matching today.
          </p>
        </div>

        {/* Google Sign Up */}
        <button className="w-full flex items-center justify-center gap-3 bg-white  border-slate-200  p-3 rounded-xl shadow-sm hover:bg-slate-50 0 transition">
          <FcGoogle size={22} />
          <span className="font-medium text-slate-700 ">
            Sign Up with Google
          </span>
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-300 "></div>
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300 "></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="John Doe"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border border-slate-200  bg-white  text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="student@university.edu"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white  text-gray-900  focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Redux Global Error */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Switch */}
        <div className="mt-6 text-center">
          <p className="text-slate-500  text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
