import { Menu, Users, CheckCircle } from "lucide-react";

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
      desc: "Break the ice, conclude, and move in!"
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


export default HowItWorks