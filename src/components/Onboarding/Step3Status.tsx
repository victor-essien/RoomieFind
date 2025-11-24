import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Check, Users, Key } from "lucide-react";



interface Step3StatusProps {
  data: {
    [key: string]: any;
  };
  updateData: (values: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Status: React.FC<Step3StatusProps> = ({ data, updateData, onNext, onBack }) => {
  // roomStatus can be: 'has_room', 'looking_for_roommate', 'not_looking'
  const handleStatusSelect = (status: string) => {
    updateData({ roomStatus: status });
    // Reset room details if not 'has_room'
    if (status !== 'has_room') {
      updateData({ roomDetails: null });
    }
  };

  const handleDetailChange = (key:string, value: string) => {
    updateData({ 
      roomDetails: { 
        ...data.roomDetails, 
        [key]: value 
      } 
    });
  };

  const isFormValid = () => {
    if (!data.roomStatus) return false;
    if (data.roomStatus === 'has_room') {
      const details = data.roomDetails || {};
      return details.area && details.price && details.type;
    }
    return true;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 py-2"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Room Status</h2>
        <p className="text-slate-500">What's your current situation?</p>
      </div>

      <div className="grid gap-3">
        {/* Option 1: I have a room */}
        <button
          onClick={() => handleStatusSelect('has_room')}
          className={`p-4 rounded-2xl border-2 text-left transition-all group ${data.roomStatus === 'has_room' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 bg-white hover:border-slate-300'}`}
        >
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${data.roomStatus === 'has_room' ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Key size={20} />
                </div>
                <h3 className="font-bold text-slate-900">I already have a room</h3>
             </div>
             {data.roomStatus === 'has_room' && <Check size={18} className="text-indigo-600" />}
          </div>
          <p className="text-slate-500 text-xs pl-12">I need a roommate to join me.</p>
        </button>

        {/* DETAILS FORM - Only shown if 'has_room' is selected */}
        <AnimatePresence>
          {data.roomStatus === 'has_room' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white rounded-xl border border-indigo-100 p-4 space-y-3"
            >
               <h4 className="text-xs font-bold uppercase text-indigo-600 mb-2">Room Details</h4>
               
               <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-semibold">Price Estimate</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₦</span>
                        <input 
                            type="number" 
                            placeholder="e.g 150,000" 
                            className="w-full pl-6 p-2 text-sm bg-slate-50 rounded-lg border-none focus:ring-1 focus:ring-indigo-500"
                            value={data.roomDetails?.price || ''}
                            onChange={(e) => handleDetailChange('price', e.target.value)}
                        />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold">Room Type</label>
                    <select 
                        className="w-full p-2 text-sm bg-slate-50 rounded-lg border-none focus:ring-1 focus:ring-indigo-500"
                        value={data.roomDetails?.type || ''}
                        onChange={(e) => handleDetailChange('type', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Self Con">Self Con</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Flat">Flat</option>
                        <option value="Duplex">Duplex</option>
                    </select>
                  </div>
               </div>

               <div>
                 <label className="text-xs text-slate-500 font-semibold">Area / Location</label>
                 <input 
                    type="text" 
                    placeholder="e.g. Oke-Baale, Osogbo" 
                    className="w-full p-2 text-sm bg-slate-50 rounded-lg border-none focus:ring-1 focus:ring-indigo-500"
                    value={data.roomDetails?.area || ''}
                    onChange={(e) => handleDetailChange('area', e.target.value)}
                 />
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Option 2: Looking for roommate */}
        <button
          onClick={() => handleStatusSelect('looking_for_roommate')}
          className={`p-4 rounded-2xl border-2 text-left transition-all group ${data.roomStatus === 'looking_for_roommate' ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-slate-100 bg-white hover:border-slate-300'}`}
        >
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${data.roomStatus === 'looking_for_roommate' ? 'bg-purple-200 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-900">I need someone to get a room with</h3>
             </div>
             {data.roomStatus === 'looking_for_roommate' && <Check size={18} className="text-purple-500" />}
          </div>
          <p className="text-slate-500 text-xs pl-12">We can search for apartments together.</p>
        </button>

        {/* Option 3: Not looking */}
        <button
          onClick={() => handleStatusSelect('not_looking')}
          className={`p-4 rounded-2xl border-2 text-left transition-all group ${data.roomStatus === 'not_looking' ? 'border-slate-800 bg-slate-50 ring-1 ring-slate-800' : 'border-slate-100 bg-white hover:border-slate-300'}`}
        >
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${data.roomStatus === 'not_looking' ? 'bg-slate-300 text-slate-800' : 'bg-slate-100 text-slate-500'}`}>
                    <Home size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Not right now</h3>
             </div>
             {data.roomStatus === 'not_looking' && <Check size={18} className="text-slate-800" />}
          </div>
          <p className="text-slate-500 text-xs pl-12">Just browsing, not actively searching.</p>
        </button>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="text-slate-400 font-medium hover:text-slate-600 px-4">Back</button>
        <button 
            onClick={onNext} 
            disabled={!isFormValid()}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
            Finish <Check size={20} />
        </button>
      </div>
    </motion.div>
  );
};




// export const Step3Status: React.FC<Step3StatusProps> = ({ data, updateData, onNext, onBack }) => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-8 py-4"
//     >
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-slate-900">Current Status</h2>
//         <p className="text-slate-500">Are you currently looking for a roommate?</p>
//       </div>

//       <div className="grid gap-4">
//         <button
//           onClick={() => { updateData({ isLooking: true }); setTimeout(onNext, 300); }}
//           className={`p-6 rounded-2xl border-2 text-left transition-all group hover:border-indigo-500 hover:shadow-md ${data.isLooking === true ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}
//         >
//           <div className="flex justify-between items-start mb-2">
//             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
//               <Search size={24} />
//             </div>
//             {data.isLooking === true && <div className="bg-indigo-600 text-white p-1 rounded-full"><Check size={16} /></div>}
//           </div>
//           <h3 className="font-bold text-lg text-slate-900">Yes, I'm looking</h3>
//           <p className="text-slate-500 text-sm mt-1">Your profile will be visible to others searching in your area.</p>
//         </button>

//         <button
//           onClick={() => { updateData({ isLooking: false }); setTimeout(onNext, 300); }}
//           className={`p-6 rounded-2xl border-2 text-left transition-all group hover:border-slate-400 ${data.isLooking === false ? 'border-slate-800 bg-slate-50' : 'border-slate-100 bg-white'}`}
//         >
//           <div className="flex justify-between items-start mb-2">
//              <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-slate-800 group-hover:text-white transition-colors">
//               <Home size={24} />
//             </div>
//             {data.isLooking === false && <div className="bg-slate-800 text-white p-1 rounded-full"><Check size={16} /></div>}
//           </div>
//           <h3 className="font-bold text-lg text-slate-900">Not right now</h3>
//           <p className="text-slate-500 text-sm mt-1">You can browse listings, but you won't appear in search results.</p>
//         </button>
//       </div>

//       <button 
//         onClick={onBack}
//         className="w-full text-slate-400 font-medium hover:text-slate-600 py-2"
//       >
//         Back to Habits
//       </button>
//     </motion.div>
//   );
// };