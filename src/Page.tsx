import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, MapPin, Home, MessageCircle, Search, 
  LogOut, Plus, Filter, Heart, X, Check, 
  Shield, AlertTriangle, Send, MoreVertical,
  DollarSign, Clock, Music, Coffee, Sun, Moon,
  ChevronRight, Star, Menu, Bell
} from 'lucide-react';

// --- MOCK DATA & UTILS ---

const CURRENT_USER_ID = 'user_1';

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

const MOCK_LISTINGS = [
  {
    id: 1,
    hostId: 'user_2',
    title: "Sunny Room in Bushwick Loft",
    price: 1150,
    location: "Bushwick, Brooklyn",
    amenities: ["Washer/Dryer", "Roof Access", "Furnished"],
    description: "Huge window, exposed brick. 5 min walk to the L train. We are 2 girls looking for a 3rd.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    hostId: 'user_3',
    title: "Master Bedroom w/ Private Bath",
    price: 1600,
    location: "Harlem, Manhattan",
    amenities: ["Private Bath", "Doorman", "Gym"],
    description: "Luxury building near campus. Looking for someone responsible.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

// Simple compatibility algorithm
const calculateMatch = (user1: any, user2:any) => {
  let score = 60; // Base score
  if (user1.habits.cleanliness === user2.habits.cleanliness) score += 15;
  if (user1.habits.sleep === user2.habits.sleep) score += 15;
  if (user1.habits.smoking === user2.habits.smoking) score += 10;
  
  const budgetDiff = Math.abs(user1.budget - user2.budget);
  if (budgetDiff <= 200) score += 10; // Close budget
  
  return Math.min(score, 98); // Cap at 98%
};

// --- COMPONENTS ---

// 1. Shared UI Components
const Badge = ({ children, color = "bg-slate-100 text-slate-600" }: any) => (
  <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, variant = "primary", className = "", type="button" } : any) => {
  const baseStyle = "px-4 py-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants: any = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// 2. Auth Screen
const AuthScreen = ({ onLogin }:any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate Auth
    onLogin({
      id: CURRENT_USER_ID,
      name: "Jordan Doe",
      email: email,
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=ffdfbf",
      budget: 1400,
      university: "NYU",
      bio: "Architecture student. I spend a lot of time in the studio.",
      location: "Manhattan",
      habits: { cleanliness: "Moderate", sleep: "Night Owl", guests: "Occasionally", smoking: "No" }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">U</div>
          <h1 className="text-2xl font-bold text-slate-900">{isLogin ? "Welcome Back" : "Join UniNest"}</h1>
          <p className="text-slate-500">Find your perfect roommate today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="student@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full mt-2">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-semibold hover:underline">
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// 3. Discovery View (Roommate Finder)
const DiscoverView = ({ currentUser, onStartChat }: any ) => {
  const [filterOpen, setFilterOpen] = useState(false);
  
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

// 4. Listings View (Apartment Finder)
const ListingsView = ({ listings, onAddListing, onStartChat }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({ title: '', price: '', location: '', description: '' });

  const handlePost = (e: any) => {
    e.preventDefault();
    onAddListing(newListing);
    setShowModal(false);
    setNewListing({ title: '', price: '', location: '', description: '' });
  };

  return (
    <div className="pb-24">
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Available Rooms</h2>
        <button onClick={() => setShowModal(true)} className="p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700">
          <Plus size={24} />
        </button>
      </div>

      <div className="p-4 grid gap-6 md:grid-cols-2">
        {listings.map((item:any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-slate-200 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-lg text-white text-sm font-semibold">
                ${item.price} <span className="text-xs font-normal opacity-80">/mo</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 mb-1 truncate">{item.title}</h3>
              <div className="flex items-center text-slate-500 text-sm mb-3">
                <MapPin size={14} className="mr-1" /> {item.location}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.amenities?.slice(0,3).map((am: any) => (
                  <span key={am} className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md">{am}</span>
                ))}
              </div>
              <Button variant="secondary" className="w-full py-2 text-sm" onClick={() => onStartChat({ id: item.hostId, name: "Host" })}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Post a Room</h3>
              <button onClick={() => setShowModal(false)}><X className="text-slate-400 hover:text-slate-800" /></button>
            </div>
            <form onSubmit={handlePost} className="space-y-4">
              <input required placeholder="Title (e.g., Sunny Room in Queens)" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newListing.title} onChange={e => setNewListing({...newListing, title: e.target.value})} />
              <div className="flex gap-4">
                 <input required type="number" placeholder="Price" className="w-1/2 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newListing.price} onChange={e => setNewListing({...newListing, price: e.target.value})} />
                 <input required placeholder="Location" className="w-1/2 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newListing.location} onChange={e => setNewListing({...newListing, location: e.target.value})} />
              </div>
              <textarea required placeholder="Description..." className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 h-32" value={newListing.description} onChange={e => setNewListing({...newListing, description: e.target.value})}></textarea>
              <Button type="submit" className="w-full">Post Listing</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. Chat View
const ChatView = ({ chats, currentChatId, onSelectChat, onSendMessage, onBack }: any) => {
  const [msgText, setMsgText] = useState("");

  // Detail View
  if (currentChatId) {
    const chat = chats.find((c:any) => c.id === currentChatId);
    if (!chat) return null;

    return (
      <div className="flex flex-col h-screen bg-white z-20 relative">
         {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white shadow-sm">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight className="rotate-180" /></button>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src={chat.partner.photo} alt="" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">{chat.partner.name}</h3>
            <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
          </div>
          <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {chat.messages.map((m: any, idx: any) => {
            const isMe = m.senderId === CURRENT_USER_ID;
            return (
              <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); if(msgText.trim()) { onSendMessage(currentChatId, msgText); setMsgText(""); }}}
          className="p-3 border-t border-slate-100 bg-white flex gap-2"
        >
          <input 
            value={msgText}
            onChange={e => setMsgText(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-slate-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full shadow-md hover:scale-105 transition-transform">
            <Send size={20} />
          </button>
        </form>
      </div>
    );
  }

  // List View
  return (
    <div className="pb-24">
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Messages</h2>
      </div>
     <div className="p-2">
  {chats.length === 0 ? (
    <div className="text-center text-slate-400 mt-20">
      <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
      <p>No conversations yet.</p>
      <p className="text-sm">Start matching to chat!</p>
    </div>
  ) : (
    chats.map((chat: any) => (
      <div
        key={chat.id}
        onClick={() => onSelectChat(chat.id)}
        className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl cursor-pointer border-b border-slate-50"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden">
            <img
              src={chat.partner.photo}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-1">
            <h3 className="font-bold text-slate-900 truncate">
              {chat.partner.name}
            </h3>
            <span className="text-xs text-slate-400">2m ago</span>
          </div>

          <p className="text-sm text-slate-500 truncate">
            {chat.messages[chat.messages.length - 1]?.text || "New Match!"}
          </p>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

// 6. Profile View
const ProfileView = ({ user, onLogout }: any) => {
  return (
    <div className="pb-24">
       {/* Profile Header */}
       <div className="bg-white pb-6 border-b border-slate-100">
         <div className="h-32 bg-indigo-600 relative">
             <button onClick={onLogout} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/30">
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

// --- MAIN APP CONTAINER ---

export default function Appe() {
  const [user, setUser] = useState<userType | null>(null); // Auth State
  const [view, setView] = useState('discover'); // 'discover', 'listings', 'messages', 'profile'
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  
  // Simulated Database States
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [chats, setChats] = useState([
    {
      id: 'chat_1',
      partner: MOCK_USERS[0], // Sarah
      messages: [
        { senderId: 'user_2', text: "Hey! I saw your profile. I'm also at NYU!" },
        { senderId: CURRENT_USER_ID, text: "Oh nice! What year are you?" }
      ]
    }
  ]);

  const handleAddListing = (data: any) => {

  if(!user) return;
    const newId = listings.length + 1;
    const newItem = {
      id: newId,
      hostId: user.id,
      ...data,
      amenities: ["Unfurnished"], // simplified
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    };
    setListings([newItem, ...listings]);
  };

  const handleStartChat = (partner: any) => {
    if(!user) return;
    const existing = chats.find(c => c.partner.id === partner.id);
    if (existing) {
      setCurrentChatId(existing.id);
    } else {
      const newChat = {
        id: `chat_${Date.now()}`,
        partner: partner,
        messages: [{ senderId: user.id, text: "Hi! I'd like to connect." }]
      };
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat.id);
    }
    setView('messages');
  };

  const handleSendMessage = (chatId:any, text:any) => {
    if(!user) return;
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { senderId: user.id, text }]
        };
      }
      return chat;
    }));
  };

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans mx-auto max-w-lg shadow-2xl shadow-slate-200 overflow-hidden relative">
      {/* View Router */}
      <div className="h-screen overflow-y-auto scrollbar-hide">
        {view === 'discover' && <DiscoverView currentUser={user} onStartChat={handleStartChat} />}
        {view === 'listings' && <ListingsView listings={listings} onAddListing={handleAddListing} onStartChat={handleStartChat} />}
        {view === 'messages' && (
          <ChatView 
            chats={chats} 
            currentChatId={currentChatId} 
            onSelectChat={setCurrentChatId} 
            onSendMessage={handleSendMessage}
            onBack={() => setCurrentChatId(null)}
          />
        )}
        {view === 'profile' && <ProfileView user={user} onLogout={() => setUser(null)} />}
      </div>

      {/* Bottom Navigation (Hidden if inside a specific chat) */}
      {!currentChatId && (
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-3 px-2 z-30 safe-area-pb">
          <button onClick={() => setView('discover')} className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors ${view === 'discover' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Search size={24} />
            <span className="text-[10px] font-bold">Match</span>
          </button>
          <button onClick={() => setView('listings')} className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors ${view === 'listings' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Home size={24} />
            <span className="text-[10px] font-bold">Rooms</span>
          </button>
          <button onClick={() => setView('messages')} className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors ${view === 'messages' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}>
            <div className="relative">
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </div>
            <span className="text-[10px] font-bold">Chat</span>
          </button>
          <button onClick={() => setView('profile')} className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors ${view === 'profile' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}>
            <User size={24} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}