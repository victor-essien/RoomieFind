import { motion } from "framer-motion";
import { Clock, BookOpen, Music, Sparkles, Home, Check, ArrowRight } from "lucide-react";


interface Step2HabitsProps {
  data: {
    [key: string]: any;
  };
  updateData: (values: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
}


 export const Step2Habits: React.FC<Step2HabitsProps> = ({ data, updateData, onNext, onBack }) => {
  const categories = [
    {
      id: 'sleep',
      title: 'Sleep Schedule',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50',
      options: ['Early Bird', 'Night Owl', 'Flexible', 'Power Napper']
    },
    {
      id: 'study',
      title: 'Study Habits',
      icon: BookOpen,
      color: 'text-purple-500 bg-purple-50',
      options: ['Frequent Studier', 'Late-Night Learner', 'Class Regular', 'Focused/Quiet Worker', 'Group Study']
    },
    {
      id: 'social',
      title: 'Social Vibes',
      icon: Music,
      color: 'text-pink-500 bg-pink-50',
      options: ['Party Friendly', 'Quiet & Reserved', 'Loud & Energetic', 'Loud Music Lover', 'Social Butterfly']
    },
    {
      id: 'faith',
      title: 'Personal Practices',
      icon: Sparkles,
      color: 'text-amber-500 bg-amber-50',
      options: ['Faith-Focused', 'Prayer Routine', 'Meditation', 'Spiritual']
    },
    {
      id: 'household',
      title: 'Household Style',
      icon: Home,
      color: 'text-emerald-500 bg-emerald-50',
      options: ['Neat & Tidy', 'Minimalist', 'Chill & Relaxed', 'Decor Enthusiast']
    }
  ];

  const handleToggle = (catId: string, option: string) => {
    const currentOptions = data.habits[catId] || [];
    let newOptions;
    
    // Check if option is already selected
    if (currentOptions.includes(option)) {
      // Remove it
      newOptions = currentOptions.filter((item: string) => item !== option);
    } else {
      // Add it
      newOptions = [...currentOptions, option];
    }
    
    updateData({ 
      habits: { 
        ...data.habits, 
        [catId]: newOptions 
      } 
    });
  };

  // Check if at least one option is selected in every category
  const isComplete = categories.every(c => data.habits[c.id] && data.habits[c.id].length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Lifestyle & Habits</h2>
        <p className="text-slate-500">Select all that apply to you.</p>
      </div>

      <div className="space-y-6 h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-800">{cat.title}</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {(data.habits[cat.id] || []).length} selected
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.options.map((opt) => {
                const isSelected = (data.habits[cat.id] || []).includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => handleToggle(cat.id, opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {opt} {isSelected && <Check size={12} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBack}
          className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!isComplete}
          className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          Continue <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};