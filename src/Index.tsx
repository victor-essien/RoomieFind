import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  Search, 
  Coffee, 
  Music, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  Menu, 
  X,
  ArrowRight,
  Star,
  Users
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">UniNest</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#stories" className="hover:text-indigo-600 transition-colors">Stories</a>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-medium text-slate-600">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              <a href="#stories" onClick={() => setMobileMenuOpen(false)}>Stories</a>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                #1 Student Housing App
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                Don't just find a room. <br />
                Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">tribe.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Stop relying on random Facebook groups. UniNest matches you with roommates based on lifestyle, major, and vibe. 100% verified students.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Find a Roommate <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                  List a Room
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden bg-cover`} style={{backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123})`}}></div>
                  ))}
                </div>
                <p>Trusted by 10,000+ students</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual / Interactive Mockup */}
          <motion.div 
            className="flex-1 relative w-full max-w-md lg:max-w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Mock Profile Card */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Alex Rivera</h3>
                  <p className="text-sm text-slate-500">Computer Science • Junior</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-md font-medium">Early Bird</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">Non-Smoker</span>
                  </div>
                </div>
              </div>

              {/* Compatibility Meter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-600">Compatibility Match</span>
                  <span className="text-indigo-600">94%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center">
                  <X size={20} />
                </button>
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center">
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Coffee size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Habit</p>
                  <p className="text-sm font-bold text-slate-800">Coffee Lover</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Status</p>
                  <p className="text-sm font-bold text-slate-800">Verified Student</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all"
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Matching Algo",
      description: "Our algorithm analyzes 20+ lifestyle points—from sleep schedules to cleanliness—to find your ideal match.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Verified Students Only",
      description: "No bots, no scams. We require .edu email verification so you know exactly who you're talking to.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "In-App Chat",
      description: "Get to know potential roommates safely within the app before you decide to exchange numbers.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Search,
      title: "Lifestyle Filters",
      description: "Filter by budget, location, pet preferences, and hobbies to narrow down your search instantly.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why students love UniNest</h2>
          <p className="text-lg text-slate-600">We've stripped away the awkwardness of finding a roommate and replaced it with data-driven compatibility.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Create Profile",
      desc: "Tell us about your habits, major, and what you're looking for."
    },
    {
      num: "02",
      title: "Browse & Swipe",
      desc: "See compatible matches near your university. Swipe right to connect."
    },
    {
      num: "03",
      title: "Chat & Move In",
      desc: "Break the ice, view listings together, and sign the lease!"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Simple steps to your new home base.</h2>
            <p className="text-lg text-slate-600 mb-10">Forget spreadsheets and endless text chains. We've streamlined the entire process into three easy steps.</p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl text-white max-w-md mx-auto transform rotate-1">
              <div className="flex justify-between items-center mb-8 opacity-50">
                <Menu size={20} />
                <span className="text-xs tracking-widest uppercase">UniNest App</span>
                <Users size={20} />
              </div>
              
              {/* Abstract UI representation of "Success" */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4 border border-white/10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                        <CheckCircle size={24} className="text-white" />
                    </div>
                    <div>
                        <h5 className="font-bold text-lg">It's a Match!</h5>
                        <p className="text-sm text-slate-300">You and Sarah matched.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 space-y-3 border border-white/5">
                <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
                <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
              </div>

            </div>
            
            {/* Decorative Elements behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, school, quote, i }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-slate-700 mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
       <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
       </div>
       <div>
         <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
         <p className="text-xs text-slate-500">{school}</p>
       </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="stories" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-slate-600">Join thousands of happy roommates living their best semester.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard 
            name="Jordan Lee" 
            school="NYU '25" 
            quote="I was terrified of random assignment. UniNest matched me with someone who also studies late and loves jazz. Best year ever." 
            i={1}
          />
          <TestimonialCard 
            name="Sarah Chen" 
            school="UCLA '24" 
            quote="The verified student badge gave me so much peace of mind. The UI is super clean and easy to use." 
            i={2}
          />
          <TestimonialCard 
            name="Mike Ross" 
            school="Harvard Law" 
            quote="Found an apartment and a roommate in under 3 days. Highly recommend for anyone moving to a new city." 
            i={3}
          />
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 opacity-40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to find your vibe?</h2>
            <p className="text-indigo-100 text-lg mb-10">Sign up today and start browsing profiles near your campus for free. No credit card required.</p>
            <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Download App
            </button>
            <p className="mt-6 text-sm text-indigo-200 opacity-80">Available on iOS & Android</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                <span className="text-xl font-bold text-slate-900">UniNest</span>
             </div>
             <p className="text-slate-500 max-w-xs leading-relaxed">
               Making student living simpler, safer, and more social. Built by students, for students.
             </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Guidelines</a></li>
              <li><a href="#" className="hover:text-indigo-600">Safety</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 text-sm text-slate-400">
          <p>&copy; 2024 UniNest Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Twitter</a>
            <a href="#" className="hover:text-indigo-600">Instagram</a>
            <a href="#" className="hover:text-indigo-600">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}