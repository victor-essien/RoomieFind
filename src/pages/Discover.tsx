import { useState } from "react";
import {
  Filter,
  Heart,
  Shield,
  MessageCircle,
  AlertTriangle,
  Key,
  Send,
} from "lucide-react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import BottomNav from "../components/BottomNav";
import { div } from "framer-motion/client";
import type { User } from "../types/data";

const CURRENT_USER_ID = "user_1";

type roomStatusType = "looking_for_roommate" | "has_room";

// --- MOCK DATA ---

const MOCK_USERS = [
  {
    id: "user_2",
    name: "Sarah Chen",
    email: "sarahchen@gmail.com",
    password: "111111",
    age: 20,
    gender: "Female",
    university: "Uniosun",
    campus: "Osogbo",
    academic_level: "200lvl",
    course_study: "Microbiology",
    bio: "Bio-chem major looking for a quiet place. I love baking and keep shared spaces very clean.",
    budget: 150000,
    roomStatus: "looking_for_roommate",
    photo:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=c0aede",
    habits: {
      sleep: ["Early Bird"],
      study: ["Frequent Studier", "Quiet & Reserved"],
      household: ["Neat & Tidy"],
      social: ["Quiet & Reserved"],
    },
  },
  {
    id: "user_3",
    name: "Marcus Johnson",
    email: "marcusjohson@gmail.com",
    password: "222222",
    age: 21,
    gender: "Male",
    university: "Uniosun",
    campus: "Osogbo",
    academic_level: "300lvl",
    course_study: "Civil Engineering",
    bio: "Engineering student. I'm out a lot for classes. Chill vibe, love movie nights.",
    budget: 120000,
    roomStatus: "has_room",
    roomDetails: {
      price: 120000,
      location: "Oke-Baale",
      description: "Self-contained apartment",
    },
    photo:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4",
    habits: {
      sleep: ["Night Owl"],
      study: ["Late-Night Learner", "Group Study"],
      social: ["Social Butterfly", "Loud Music Lover"],
      household: ["Chill & Relaxed"],
    },
  },
  {
    id: "user_4",
    name: "Tola Adebayo",
    email: "tolade@gmail.com",
    password: "333333",
    age: 19,
    gender: "Female",
    university: "Uniosun",
    course_study: "English",
    campus: "Ikire",
    academic_level: "100lvl",
    bio: "Fresher looking for a roommate. I have a cat! Looking for creative roommates.",
    budget: 100000,
    roomStatus: "looking_for_roommate",
    photo:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Tola&backgroundColor=ffdfbf",
    habits: {
      sleep: ["Flexible"],
      study: ["Exam Crammer"],
      social: ["Party Friendly"],
      household: ["Decor Enthusiast"],
    },
  },
];
export interface userType {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  email: string;
  photo: string;
  budget: number;
  university: string;
  bio: string;
  location?: string;
  campus: string;
  roomStatus: string;
  habits?: {
    sleep: string[];
    study: string[];
    household: string[];
    social: string[];
  };
  roomDetails?: {
    price: number;
    location: string;
    description: string;
  };
}

const Discover = ({ onStartChat }: any) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("CURRENT USER", user);
  const currentUser = user;
  // --- MATCHING LOGIC ---

  const calculateMatch = (currentUser: User, potentialMatch: User) => {
    // 1. Flatten all habit arrays into single lists
    const getHabitsList = (u: any) => Object.values(u.habits || {}).flat();

    const myHabits = getHabitsList(currentUser);
    const theirHabits = getHabitsList(potentialMatch);

    // Avoid division by zero
    if (myHabits.length === 0) return 50;

    // 2. Find Intersection (How many of MY habits do THEY share?)
    const commonHabits = myHabits.filter((habit) =>
      theirHabits.includes(habit)
    );

    // 3. Calculate Habit Score
    // We weight this based on how well they fit the current user's selected preferences.
    let score = (commonHabits.length / myHabits.length) * 100;

    // 4. Boost score for Location/Campus match (Critical for students)
    if (currentUser.campus === potentialMatch.campus) {
      score += 15;
    }

    // 5. Boost for Room Status compatibility
    // If I have a room and they need one (or vice versa), that's a huge plus.
    const complementaryStatus =
      (currentUser.roomStatus === "has_room" &&
        potentialMatch.roomStatus === "looking_for_roommate") ||
      (currentUser.roomStatus === "looking_for_roommate" &&
        potentialMatch.roomStatus === "has_room") ||
      (currentUser.roomStatus === "looking_for_roommate" &&
        potentialMatch.roomStatus === "looking_for_roommate"); // Can find together

    if (complementaryStatus) {
      score += 10;
    }

    // Cap at 98% (Nobody is perfect except maybe Beyoncé)
    return Math.min(Math.round(score), 98);
  };
  // };
  return (
    <div>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center  ">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Find Roommates
              </h2>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200"
              >
                <Filter size={20} />
              </button>
            </div>

            {/* Filters (Collapsible) */}
            {filterOpen && (
              <div className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 animate-in slide-in-from-top-5">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">
                    Budget Range
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$500</span>
                    <span>$3000+</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">
                    Lifestyle
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["Clean", "Night Owl", "Early Bird", "Pet Friendly"].map(
                      (t) => (
                        <button
                          key={t}
                          className="px-3 py-1 rounded-full border border-slate-200 bg-white text-xs text-slate-600 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card Stack */}
          <div className="p-2 space-y-6">
            {currentUser &&
              MOCK_USERS.map((user) => {
                const matchScore = calculateMatch(currentUser, user);
                return (
                  <div
                    key={user.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
                  >
                    <div className="h-48 bg-indigo-100 relative">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-indigo-600 flex items-center gap-1 shadow-sm">
                        <Heart size={14} className="fill-indigo-600" />{" "}
                        {matchScore}% Match
                      </div>
                      {user.roomStatus === "has_room" && (
                        <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                          <Key size={12} /> Has Room: ₦
                          {user.roomDetails?.price?.toLocaleString()} •{" "}
                          {user.roomDetails?.location}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            {user.name}, {user.age}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            {user.academic_level} • {user.course_study}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-600">
                            ₦{user.budget.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-400">budget</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {user.bio}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {/* Display Flattened Habits */}
                        {Object.values(user.habits)
                          .flat()
                          .slice(0, 4)
                          .map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
                            >
                              {h}
                            </span>
                          ))}
                        {Object.values(user.habits).flat().length > 4 && (
                          <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-400 rounded-md">
                            +{Object.values(user.habits).flat().length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 text-sm py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
                          View Profile
                        </button>
                        <button className="flex-[2] text-sm py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 flex items-center justify-center gap-2">
                          Message <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Discover;
