import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step4SuccessProps {
  onComplete: () => void;
}


export const Step4Success:React.FC<Step4SuccessProps> = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8 py-8"
    >
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <Check size={48} strokeWidth={3} />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">You're all set!</h2>
        <p className="text-slate-500 max-w-xs mx-auto">Your profile is live. Start exploring and connect with your ideal roommate today.</p>
      </div>

      <div className="space-y-3">
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all"
        >
          View Matches
        </button>
        <button className="w-full py-4 bg-white text-slate-600 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all">
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

