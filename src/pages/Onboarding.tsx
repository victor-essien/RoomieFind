import React, { useState } from "react";
import { OnboardingFlow } from "../components/Onboarding/OnboardingFlow";

//Mock Data

type User = {
  id: string;
  name: string;
  isLooking?: boolean;
  photo?: string;
  level?: string;
  course?: string;
  gender?: string;
  bio?: string;
  habits?: Record<string, string[]>;
};

export default function Onboarding() {
  const [user, setUser] = useState<User>({
    id: "new_user",
    name: "New Student",
    isLooking: false,
    photo: undefined,
    level: "Unknown",
    course: "Undeclared",
    gender: "",
    bio: "",
    habits: {},
  });
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const handleOnboardingComplete = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
    setHasOnboarded(true);
  };

  if (!hasOnboarded) {
    return <OnboardingFlow onFinish={handleOnboardingComplete} />;
  }

  // Simplified Dashboard Preview
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="text-center space-y-6 max-w-lg w-full">
        <div className="w-20 h-20 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-300">
          RF
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to RoomieFind!
        </h1>
        <p className="text-slate-600">
          You have successfully completed onboarding.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm text-left border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase">
              Your Profile Preview
            </h3>
            {user.isLooking && (
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold">
                Actively Looking
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={
                user.photo ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
              }
              className="w-16 h-16 rounded-full bg-slate-100"
              alt="Avatar"
            />
            <div>
              <p className="font-bold text-slate-900">
                {user.level} • {user.course}
              </p>
              <p className="text-sm text-slate-500">{user.gender}</p>
            </div>
          </div>

          <p className="text-slate-600 text-sm italic mb-4">"{user.bio}"</p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase">
              Selected Habits
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(user.habits || {})
                .flat()
                .map((h, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-indigo-700 font-medium"
                  >
                    {h}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setHasOnboarded(false)}
          className="text-indigo-600 font-medium hover:underline"
        >
          Restart Onboarding Demo
        </button>
      </div>
    </div>
  );
}
