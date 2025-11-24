import React from 'react'
import { LogOut, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const CURRENT_USER_ID = 'user_1';

const user = {
     id: CURRENT_USER_ID,
      name: "Jordan Doe",
      email: 'Jordandoe@gmail.com',
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=ffdfbf",
      budget: 1400,
      university: "NYU",
      bio: "Architecture student. I spend a lot of time in the studio.",
      location: "Manhattan",
      habits: { cleanliness: "Moderate", sleep: "Night Owl", guests: "Occasionally", smoking: "No" }

}
const Profile = () => {
//    const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="pb-24">
       {/* Profile Header */}
       <div className="bg-white pb-6 border-b border-slate-100">
         <div className="h-32 bg-indigo-600 relative">
             <button  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/30">
               <LogOut size={20} />
             </button>
         </div>
         <div className="px-6 relative">
           <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg absolute -top-12">
             <img src={user.photo} alt="" className="w-full h-full object-cover rounded-xl bg-indigo-50" />
           </div>
           <div className="pt-16">
             <h2 className="text-2xl font-bold text-slate-900">{user.name}, {22}</h2>
             <p className="text-slate-500 mb-4">{user.university} • {user.location}</p>
             
             <div className="grid grid-cols-3 gap-4 text-center mb-6">
               <div className="p-3 bg-slate-50 rounded-xl">
                 <p className="text-xs text-slate-500 uppercase font-bold">Budget</p>
                 <p className="font-semibold text-indigo-600">${user.budget}</p>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl">
                 <p className="text-xs text-slate-500 uppercase font-bold">Cleanliness</p>
                 <p className="font-semibold text-indigo-600">{user.habits.cleanliness}</p>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl">
                 <p className="text-xs text-slate-500 uppercase font-bold">Sleep</p>
                 <p className="font-semibold text-indigo-600">{user.habits.sleep}</p>
               </div>
             </div>

             <h3 className="font-bold text-slate-900 mb-2">About Me</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
               {user.bio}
             </p>
             
             <h3 className="font-bold text-slate-900 mb-3">Verification</h3>
             <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Check className="text-green-500" size={18} /> 
                   <span>University Email Confirmed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Check className="text-green-500" size={18} /> 
                   <span>Phone Number Verified</span>
                </div>
             </div>

           </div>
         </div>
       </div>
    </div>
  );
};

export default Profile