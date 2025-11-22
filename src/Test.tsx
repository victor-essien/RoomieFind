import React, { useState, useEffect } from 'react';
import { Home, Search, MessageCircle, User, Plus, Filter, Heart, MapPin, DollarSign, X, Send, Flag, Ban, ChevronLeft, Settings, LogOut, Eye, Mail, Lock, Upload, Camera, Check, AlertCircle, Menu, Bell, BookOpen, GraduationCap } from 'lucide-react';

interface FormData  {
  id: string;
  name: string;
  email: string;
  photo: string;

}
interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  verified: boolean;
}

interface UserMock {
  id: string;
  age:number;
  name: string;
  photo: string;
  verified: boolean;
  gender:string;
  department:string;
  academicLevel:string;
  bio:string;
  location:string;
  religion:string;
  budget:number;
  cleanliness:string;
  noiseLevel:string;
  habits:string[];
  matchScore:number;
}

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  postedBy: string;
  postedDate: string;
}
const RoomLinkApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserMock | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    email:'',
    photo: ''
  });
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    gender: '',
    location: '',
    academicLevel: '',
    department: '',
    religion: ''
  });

  // Mock data
  const [users] = useState([
    {
      id: '1',
      name: "Sarah Johnson",
      age: 21,
      gender: "Female",
      department: "Computer Science",
      academicLevel: "300",
      bio: "Third-year CS student looking for a clean, quiet roommate. I study a lot but love weekend hangouts!",
      budget: 600,
      location: "Campus Area",
      religion: "Christian",
      cleanliness: "Very Clean",
      noiseLevel: "Quiet",
      habits: ["Non-smoker", "Early bird", "Organized"],
      photo: "SJ",
      matchScore: 95,
      verified: true
    },
    {
      id: '2',
      name: "Michael Chen",
      age: 22,
      gender: "Male",
      department: "Engineering",
      academicLevel: "400",
      bio: "Final year engineering student. Respectful, clean, and friendly. Looking for someone chill to share rent with.",
      budget: 550,
      location: "Downtown",
      religion: "Buddhist",
      cleanliness: "Clean",
      noiseLevel: "Moderate",
      habits: ["Non-smoker", "Night owl", "Gym enthusiast"],
      photo: "MC",
      matchScore: 88,
      verified: true
    },
    {
      id: '3',
      name: "Aisha Mohammed",
      age: 20,
      gender: "Female",
      department: "Medicine",
      academicLevel: "200",
      bio: "Med student seeking a focused roommate. I'm quiet, study-oriented, and respectful of shared spaces.",
      budget: 700,
      location: "Medical Campus",
      religion: "Muslim",
      cleanliness: "Very Clean",
      noiseLevel: "Very Quiet",
      habits: ["Non-smoker", "Prayer times respected", "Organized"],
      photo: "AM",
      matchScore: 92,
      verified: true
    },
    {
      id: '4',
      name: "David Park",
      age: 23,
      gender: "Male",
      department: "Business",
      academicLevel: "400",
      bio: "Business major, social but respectful. Love cooking and hosting small gatherings on weekends.",
      budget: 650,
      location: "Campus Area",
      religion: "None",
      cleanliness: "Moderate",
      noiseLevel: "Moderate",
      habits: ["Social", "Enjoys cooking", "Flexible schedule"],
      photo: "DP",
      matchScore: 85,
      verified: false
    }
  ]);

  const [listings] = useState([
    {
      id: 1,
      title: "Spacious 2BR Apartment - Campus Area",
      price: 600,
      location: "Campus Area, 5 min walk to university",
      description: "Beautiful 2-bedroom apartment with modern kitchen, high-speed WiFi, and laundry in unit. Perfect for students!",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Laundry", "Parking", "Kitchen"],
      photos: ["🏠"],
      postedBy: "Sarah Johnson",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Cozy Room in Shared House",
      price: 450,
      location: "Downtown, Near bus stop",
      description: "Private room in a 3-bedroom house. Shared kitchen and living room. Great neighborhood, close to amenities.",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Kitchen", "Living Room"],
      photos: ["🏡"],
      postedBy: "Michael Chen",
      postedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Modern Studio Near Medical Campus",
      price: 700,
      location: "Medical Campus District",
      description: "Newly renovated studio with private bathroom and kitchenette. Quiet building, perfect for focused studying.",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "AC", "Security", "Study desk"],
      photos: ["🏢"],
      postedBy: "Aisha Mohammed",
      postedDate: "3 days ago"
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, senderId: 1, text: "Hey! I saw your profile and we seem like a great match!", timestamp: "10:30 AM" },
      { id: 2, senderId: 'me', text: "Hi Sarah! Yes, I think so too. Are you still looking for a roommate?", timestamp: "10:45 AM" },
      { id: 3, senderId: 1, text: "Yes! Would you like to meet up sometime this week?", timestamp: "11:00 AM" }
    ],
    2: [
      { id: 1, senderId: 2, text: "Hi! Interested in the room listing you posted?", timestamp: "Yesterday" }
    ]
  });

  const [currentMessage, setCurrentMessage] = useState('');

  // Animation state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setUser({
      id: 'me',
      name: formData.name || "Alex Thompson",
      email: formData.email || "alex@student.edu",
      photo: "AT",
      verified: true
    });
    setCurrentView('discover');
  };

  const handleRegister = (e:any) => {
    e.preventDefault();
    setUser({
      id: 'me',
      name: formData.name,
      email: formData.email,
      photo: formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || "U",
      verified: false
    });
    setCurrentView('profile-setup');
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    // setMessages(prev => ({
    //   ...prev,
    //   [activeChat]: [...(prev[activeChat] || []), newMessage]
    // }));
    
    setCurrentMessage('');
  };

  const getFilteredUsers = () => {
    return users.filter(u => {
      if (filters.minBudget && u.budget < parseInt(filters.minBudget)) return false;
      if (filters.maxBudget && u.budget > parseInt(filters.maxBudget)) return false;
      if (filters.gender && u.gender !== filters.gender) return false;
      if (filters.location && u.location !== filters.location) return false;
      if (filters.academicLevel && u.academicLevel !== filters.academicLevel) return false;
      if (filters.department && u.department !== filters.department) return false;
      if (filters.religion && u.religion !== filters.religion) return false;
      return true;
    });
  };

  const getFilteredListings = () => {
    return listings.filter(l => {
      if (filters.minBudget && l.price < parseInt(filters.minBudget)) return false;
      if (filters.maxBudget && l.price > parseInt(filters.maxBudget)) return false;
      if (filters.location && l.location.toLowerCase().includes(filters.location.toLowerCase())) return true;
      if (!filters.location) return true;
      return false;
    });
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className={`max-w-md w-full space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">RoomLink</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">Find your perfect student roommate</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
            <div className="space-y-4">
              <button
                onClick={() => setCurrentView('login')}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Log In
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className="w-full py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
              >
                Create Account
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 px-4 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Google
              </button>
              <button className="py-3 px-4 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2">
                🍎 Apple
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  // Login Page
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className={`max-w-md w-full space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <button onClick={() => setCurrentView('landing')} className="mb-4 text-gray-600 hover:text-blue-500 transition-colors">
              <ChevronLeft className="w-6 h-6 inline" /> Back
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Log in to find your roommate</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@student.edu"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('register')}
                className="text-blue-500 font-semibold hover:text-blue-600"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Register Page
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className={`max-w-md w-full space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <button onClick={() => setCurrentView('landing')} className="mb-4 text-gray-600 hover:text-blue-500 transition-colors">
              <ChevronLeft className="w-6 h-6 inline" /> Back
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Join thousands of students finding roommates</p>
          </div>

          <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@student.edu"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('login')}
                className="text-blue-500 font-semibold hover:text-blue-600"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Profile Setup
  if (currentView === 'profile-setup') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete your profile</h2>
              <p className="text-gray-600">Help us find your perfect roommate match</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
              {/* Profile Photo */}
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {user?.photo}
                </div>
                <button className="text-blue-500 font-semibold hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                  <Camera className="w-5 h-5" />
                  Upload Photo
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="21"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    placeholder="Computer Science"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option value="">Select level</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Monthly)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="500"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                  <input
                    type="text"
                    placeholder="Campus Area"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option value="">Select</option>
                    <option value="Very Clean">Very Clean</option>
                    <option value="Clean">Clean</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Noise Level</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option value="">Select</option>
                    <option value="Very Quiet">Very Quiet</option>
                    <option value="Quiet">Quiet</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  placeholder="Tell potential roommates about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle Tags</label>
                <div className="flex flex-wrap gap-2">
                  {["Non-smoker", "Early bird", "Night owl", "Pet-friendly", "Organized", "Social", "Quiet"].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className="px-4 py-2 border-2 border-gray-300 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-500 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentView('discover')}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main App Navigation
  const NavBar = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden md:block">RoomLink</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('discover')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentView === 'discover' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <Search className="w-5 h-5" />
              Discover
            </button>
            <button
              onClick={() => setCurrentView('listings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentView === 'listings' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <Home className="w-5 h-5" />
              Listings
            </button>
            <button
              onClick={() => setCurrentView('messages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentView === 'messages' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <MessageCircle className="w-5 h-5" />
              Messages
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentView === 'profile' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t pt-4">
            <button onClick={() => { setCurrentView('discover'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" /> Discover
            </button>
            <button onClick={() => { setCurrentView('listings'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors flex items-center gap-2">
              <Home className="w-5 h-5" /> Listings
            </button>
            <button onClick={() => { setCurrentView('messages'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Messages
            </button>
            <button onClick={() => { setCurrentView('profile'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  // Discover Page
  if (currentView === 'discover') {
    const filteredUsers = getFilteredUsers();

    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Roommates</h1>
            <p className="text-gray-600">Find compatible students to share your space with</p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget</label>
                  <input
                    type="number"
                    placeholder="$400"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget</label>
                  <input
                    type="number"
                    placeholder="$800"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({...filters, gender: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Any location"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                  <select
                    value={filters.academicLevel}
                    onChange={(e) => setFilters({...filters, academicLevel: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Any</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    placeholder="Any department"
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                  <input
                    type="text"
                    placeholder="Any religion"
                    value={filters.religion}
                    onChange={(e) => setFilters({...filters, religion: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setFilters({ minBudget: '', maxBudget: '', gender: '', location: '', academicLevel: '', department: '', religion: '' })}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* User Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((roommate, index) => (
              <div
                key={roommate.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
                // onClick={() => setSelectedProfile(roommate)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {roommate.photo}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {roommate.name}
                          {roommate.verified && <Check className="w-4 h-4 text-blue-500" />}
                        </h3>
                        <p className="text-sm text-gray-600">{roommate.age} • {roommate.gender}</p>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {roommate.matchScore}% Match
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      {roommate.department} • Level {roommate.academicLevel}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {roommate.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      ${roommate.budget}/month
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{roommate.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {roommate.habits.slice(0, 2).map(habit => (
                      <span key={habit} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        {habit}
                      </span>
                    ))}
                    {roommate.habits.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        +{roommate.habits.length - 2} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveChat(roommate.id);
                      setCurrentView('messages');
                    }}
                    className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProfile(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                <button onClick={() => setSelectedProfile(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4">
                    {selectedProfile.photo}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    {selectedProfile.name}
                    {selectedProfile.verified && <Check className="w-6 h-6 text-blue-500" />}
                  </h3>
                  <p className="text-gray-600">{selectedProfile.age} years old • {selectedProfile.gender}</p>
                  <div className="mt-3 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                    {selectedProfile.matchScore}% Compatible
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">About</h4>
                    <p className="text-gray-700">{selectedProfile.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Academic Info</h4>
                    <div className="flex items-center gap-2 text-gray-700">
                      <GraduationCap className="w-5 h-5" />
                      {selectedProfile.department} • Level {selectedProfile.academicLevel}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Location Preference</h4>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5" />
                      {selectedProfile.location}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Budget</h4>
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-5 h-5" />
                      ${selectedProfile.budget}/month
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Religion</h4>
                    <p className="text-gray-700">{selectedProfile.religion}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Lifestyle Preferences</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Cleanliness</p>
                        <p className="font-semibold text-gray-900">{selectedProfile.cleanliness}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Noise Level</p>
                        <p className="font-semibold text-gray-900">{selectedProfile.noiseLevel}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Habits & Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.habits.map(habit => (
                        <span key={habit} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          {habit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setActiveChat(selectedProfile.id);
                      setSelectedProfile(null);
                      setCurrentView('messages');
                    }}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300"
                  >
                    Send Message
                  </button>
                  <button className="p-3 border-2 border-red-300 text-red-500 rounded-xl hover:bg-red-50 transition-all duration-300">
                    <Flag className="w-6 h-6" />
                  </button>
                  <button className="p-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <Ban className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style> */}
      </div>
    );
  }

  // Listings Page
  if (currentView === 'listings') {
    const filteredListings = getFilteredListings();

    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Listings</h1>
              <p className="text-gray-600">Browse available rooms and apartments</p>
            </div>
            <button
              onClick={() => setCurrentView('create-listing')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Post a Room
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="$400"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="$800"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Any location"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
                // onClick={() => setSelectedListing(listing)}
              >
                <div className="h-48 bg-blue-100 flex items-center justify-center text-6xl">
                  {listing.photos[0]}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{listing.title}</h3>
                    <div className="text-blue-500 font-bold text-xl">${listing.price}</div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <span>{listing.bedrooms} BR</span>
                    <span>•</span>
                    <span>{listing.bathrooms} BA</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.slice(0, 3).map(amenity => (
                      <span key={amenity} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    Posted by {listing.postedBy} • {listing.postedDate}
                  </div>

                  <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Listing Modal */}
        {selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedListing(null)}>
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Listing Details</h2>
                <button onClick={() => setSelectedListing(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="h-64 bg-blue-100 flex items-center justify-center text-8xl">
                {selectedListing.photos[0]}
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedListing.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      {selectedListing.location}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-500">${selectedListing.price}<span className="text-lg text-gray-600">/mo</span></div>
                </div>

                <div className="flex gap-6 text-gray-700">
                  <div>
                    <span className="font-bold">{selectedListing.bedrooms}</span> Bedrooms
                  </div>
                  <div>
                    <span className="font-bold">{selectedListing.bathrooms}</span> Bathrooms
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedListing.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.amenities.map(amenity => (
                      <span key={amenity} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Posted by <span className="font-semibold text-gray-900">{selectedListing.postedBy}</span></p>
                  <p className="text-sm text-gray-500">{selectedListing.postedDate}</p>
                </div>

                <button className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        )}

       
      </div>
    );
  }

  // Create Listing Page
  if (currentView === 'create-listing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentView('listings')}
            className="mb-6 text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Listings
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a Room</h2>
            <p className="text-gray-600 mb-8">Share your available room with potential roommates</p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Listing Title</label>
                <input
                  type="text"
                  placeholder="e.g., Cozy 2BR Apartment Near Campus"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="600"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Campus Area, near Main Street"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    placeholder="2"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={5}
                  placeholder="Describe your room/apartment, neighborhood, and what makes it special..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                />
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos (optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full text-sm text-gray-600"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentView('listings')}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600"
                >
                  Post Listing
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    );
  }

  // Fallback: simple discover view if nothing matches
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Select a section from the navigation to get started.</p>
      </div>
    </div>
  );
};

export default RoomLinkApp;