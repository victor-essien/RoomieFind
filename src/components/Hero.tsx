import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Coffee, X, Heart } from "lucide-react";


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
                #1 Roommate Connect App
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                Don't just find a roommate. <br />
                Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">vibe.</span>
              </h1>
              {/* Connect with compatible roommates who match your lifestyle, budget, and preferences. Say goodbye to awkward living situations. */}
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Connect with compatible roommates who match your lifestyle, budget, and preferences. Say goodbye to awkward living situations.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Find a Roommate <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                  Get Started
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden bg-cover`} style={{backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123})`}}></div>
                  ))}
                </div>
                <p>Trusted by students</p>
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
                  <h3 className="text-lg font-bold text-slate-900">Alex Ade</h3>
                  <p className="text-sm text-slate-500">Computer Science • 100lv</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-md font-medium">Early Bird</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">Study freak</span>
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


export default Hero