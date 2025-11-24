import { motion } from "framer-motion";
import { Search, Home, Check } from "lucide-react";



interface Step3StatusProps {
  data: {
    [key: string]: any;
  };
  updateData: (values: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
}



export const Step3Status: React.FC<Step3StatusProps> = ({ data, updateData, onNext, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 py-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Current Status</h2>
        <p className="text-slate-500">Are you currently looking for a roommate?</p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => { updateData({ isLooking: true }); setTimeout(onNext, 300); }}
          className={`p-6 rounded-2xl border-2 text-left transition-all group hover:border-indigo-500 hover:shadow-md ${data.isLooking === true ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Search size={24} />
            </div>
            {data.isLooking === true && <div className="bg-indigo-600 text-white p-1 rounded-full"><Check size={16} /></div>}
          </div>
          <h3 className="font-bold text-lg text-slate-900">Yes, I'm looking</h3>
          <p className="text-slate-500 text-sm mt-1">Your profile will be visible to others searching in your area.</p>
        </button>

        <button
          onClick={() => { updateData({ isLooking: false }); setTimeout(onNext, 300); }}
          className={`p-6 rounded-2xl border-2 text-left transition-all group hover:border-slate-400 ${data.isLooking === false ? 'border-slate-800 bg-slate-50' : 'border-slate-100 bg-white'}`}
        >
          <div className="flex justify-between items-start mb-2">
             <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-slate-800 group-hover:text-white transition-colors">
              <Home size={24} />
            </div>
            {data.isLooking === false && <div className="bg-slate-800 text-white p-1 rounded-full"><Check size={16} /></div>}
          </div>
          <h3 className="font-bold text-lg text-slate-900">Not right now</h3>
          <p className="text-slate-500 text-sm mt-1">You can browse listings, but you won't appear in search results.</p>
        </button>
      </div>

      <button 
        onClick={onBack}
        className="w-full text-slate-400 font-medium hover:text-slate-600 py-2"
      >
        Back to Habits
      </button>
    </motion.div>
  );
};