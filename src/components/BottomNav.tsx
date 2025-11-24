import {  Search, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-3 px-2 z-30 safe-area-pb">
      <NavLink
        to="/discover"
        className={({ isActive }) =>
          `p-2 rounded-xl flex flex-col items-center gap-1 transition-colors${
            isActive
              ? "text-indigo-600 bg-indigo-50"
              : "text-slate-400 hover:bg-slate-50"
          }`
        }
      >
        <Search size={24} />
        <span className="text-[10px] font-bold">Match</span>
      </NavLink>

      <NavLink
        to="/discover"
        className={({ isActive }) =>
          `p-2 rounded-xl flex flex-col items-center gap-1 transition-colors${
            isActive
              ? "text-indigo-600 bg-indigo-50"
              : "text-slate-400 hover:bg-slate-50"
          }`
        }
      >
        <Search size={24} />
        <span className="text-[10px] font-bold">Discover</span>
      </NavLink>

      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `p-2 rounded-xl flex flex-col items-center gap-1 transition-colors${
            isActive
              ? "text-indigo-600 bg-indigo-50"
              : "text-slate-400 hover:bg-slate-50"
          }`
        }
      >
        <MessageCircle size={24} />
        <span className="text-[10px] font-bold">Chat</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `p-2 rounded-xl flex flex-col items-center gap-1 transition-colors${
            isActive
              ? "text-indigo-600 bg-indigo-50"
              : "text-slate-400 hover:bg-slate-50"
          }`
        }
      >
        <User size={24} />
        <span className="text-[10px] font-bold">Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
