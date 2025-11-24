import {useState} from 'react'
import { Filter, Heart, Shield, MessageCircle, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const MOCK_USERS = [
  {
    id: 'user_2',
    name: "Sarah Chen",
    age: 20,
    gender: "Female",
    university: "NYU",
    bio: "Bio-chem major looking for a quiet place. I love baking and keep shared spaces very clean.",
    budget: 1200,
    location: "Brooklyn",
    habits: { cleanliness: "High", sleep: "Early Bird", guests: "Rarely", smoking: "No" },
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=c0aede",
    verified: true
  },
  {
    id: 'user_3',
    name: "Marcus Johnson",
    age: 21,
    gender: "Male",
    university: "Columbia",
    bio: "Film student. I'm out a lot for shoots. Chill vibe, love movie nights.",
    budget: 1500,
    location: "Manhattan",
    habits: { cleanliness: "Moderate", sleep: "Night Owl", guests: "Weekends", smoking: "No" },
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4",
    verified: true
  },
  {
    id: 'user_4',
    name: "Alex Rivera",
    age: 19,
    gender: "Non-binary",
    university: "Parsons",
    bio: "Fashion design student. I have a cat named Luna! Looking for creative roommates.",
    budget: 1300,
    location: "Brooklyn",
    habits: { cleanliness: "Moderate", sleep: "Night Owl", guests: "Occasionally", smoking: "Outside" },
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffdfbf",
    verified: false
  }
];

interface userType {
  id: string;
  name:string;
  email: string;
  photo: string;
  budget: number;
  university: string;
  bio:string;
  location:string;
  habits:{}
}


const Discover = ({ currentUser, onStartChat }: any ) => {
  const [filterOpen, setFilterOpen] = useState(false);
  

  const calculateMatch = (user1: any, user2:any) => {
  let score = 60; // Base score
  if (user1.habits.cleanliness === user2.habits.cleanliness) score += 15;
  if (user1.habits.sleep === user2.habits.sleep) score += 15;
  if (user1.habits.smoking === user2.habits.smoking) score += 10;
  
  const budgetDiff = Math.abs(user1.budget - user2.budget);
  if (budgetDiff <= 200) score += 10; // Close budget
  
  return Math.min(score, 98); // Cap at 98%
};
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Find Roommates</h2>
          <button onClick={() => setFilterOpen(!filterOpen)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
            <Filter size={20} />
          </button>
        </div>

        {/* Filters (Collapsible) */}
        {filterOpen && (
          <div className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 animate-in slide-in-from-top-5">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Budget Range</label>
              <input type="range" min="500" max="3000" className="w-full accent-indigo-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$500</span>
                <span>$3000+</span>
              </div>
            </div>
            <div>
               <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Lifestyle</label>
               <div className="flex gap-2 flex-wrap">
                 {['Clean', 'Night Owl', 'Early Bird', 'Pet Friendly'].map(t => (
                   <button key={t} className="px-3 py-1 rounded-full border border-slate-200 bg-white text-xs text-slate-600 hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                     {t}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Stack */}
      <div className="p-4 space-y-6">
        {MOCK_USERS.map(user => {
          const matchScore = calculateMatch(currentUser, user);
          return (
            <div key={user.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
              <div className="h-48 bg-indigo-100 relative">
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover opacity-90" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-indigo-600 flex items-center gap-1 shadow-sm">
                  <Heart size={14} className="fill-indigo-600" /> {matchScore}% Match
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      {user.name}, {user.age} 
                      {user.verified && <Shield size={16} className="text-blue-500 fill-blue-500/20" />}
                    </h3>
                    <p className="text-slate-500 text-sm">{user.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">${user.budget}</p>
                    <p className="text-xs text-slate-400">/month</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{user.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge color="bg-indigo-50 text-indigo-600">{user.habits.cleanliness} Cleanliness</Badge>
                  <Badge color="bg-purple-50 text-purple-600">{user.habits.sleep}</Badge>
                  {user.habits.smoking === "No" && <Badge color="bg-green-50 text-green-600">Non-Smoker</Badge>}
                </div>

                <div className="flex gap-3">
                   <Button variant="secondary" className="flex-1 text-sm py-2" onClick={() => alert(`Reported ${user.name} for review.`)}>
                      <AlertTriangle size={18} />
                   </Button>
                   <Button onClick={() => onStartChat(user)} className="flex-[3] text-sm py-2">
                      Message <MessageCircle size={18} />
                   </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover