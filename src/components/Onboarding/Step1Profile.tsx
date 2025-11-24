import { motion } from "framer-motion";
import { ArrowRight, Camera, GraduationCap } from "lucide-react";


interface Step1ProfileProps {
  data: {
    photo?: string | null;
    [key: string]: any;
  };
  updateData: (values: Record<string, any>) => void;
  onNext: () => void;
}
// --- Onboarding Components ---


 export const Step1Profile: React.FC<Step1ProfileProps> = ({ data, updateData, onNext }) => {
  const handleImageUpload = () => {
    // Simulate upload
    updateData({ photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" });
  };

  const academicLevels = ["100lvl", "200lvl", "300lvl", "400lvl", "500lvl", "Postgrad"];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Let's get you set up</h2>
        <p className="text-slate-500">First things first, who are you?</p>
      </div>

      {/* Photo Upload */}
      <div className="flex justify-center">
        <button 
          onClick={handleImageUpload}
          className="relative w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden group hover:bg-slate-200 transition-colors"
        >
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera size={32} className="text-slate-400 group-hover:text-slate-600" />
          )}
          <div className="absolute bottom-0 w-full bg-black/50 text-white text-[10px] py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Upload
          </div>
        </button>
      </div>
        <p className="text-slate-400">Your profile photo stays private. Only users you match or chat with can see it.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-400">Gender</label>
          <div className="flex gap-2">
            {['Male', 'Female'].map((g) => (
              <button
                key={g}
                onClick={() => updateData({ gender: g })}
                className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  data.gender === g 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Level */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-400">Level</label>
          <select 
            value={data.level}
            onChange={(e) => updateData({ level: e.target.value })}
            className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
          >
            <option value="">Select Level</option>
            {academicLevels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-400">Course of Study</label>
        <div className="relative">
          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            value={data.course}
            onChange={(e) => updateData({ course: e.target.value })}
            placeholder="e.g. Computer Science"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-400">Short Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Tell potential roommates a little about yourself..."
          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px] resize-none"
        />
      </div>

      <button 
        onClick={onNext}
        disabled={!data.gender || !data.bio || !data.course || !data.level}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
      >
        Next Step <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};