import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { Step1Profile } from "./Step1Profile";
import { Step2Habits } from "./Step2Habits";
import { Step3Status } from "./Step3Status";
import { Step4Success } from "./Step4Success";
import { ArrowLeft } from "lucide-react";
import { updateProfile } from "../../features/auth/authThunk";
import type { AppDispatch } from "../../app/store";

interface OnboardingFlowProps {
  onFinish: (data: any) => void;
}

// export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onFinish }) => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     photo: null,
//     gender: "",
//     course: "",
//     level: "",
//     bio: "",
//     habits: {}, // { sleep: ['Early Bird'], study: [], etc }
//     isLooking: null,
//   });

//   const updateData = (newData: any) => {
//     setFormData((prev) => ({ ...prev, ...newData }));
//   };

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
//       <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-white p-6 md:p-10 relative overflow-hidden">
//         {/* Decorative background blobs */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 opacity-50"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10 opacity-50"></div>

//         {/* Header (hidden on success screen) */}
//         {step < 4 && (
//           <div className="mb-8 flex items-center justify-between">
//             <button
//               disabled={step === 1}
//               onClick={prevStep}
//               className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
//                 step === 1 ? "opacity-0 cursor-default" : "text-slate-600"
//               }`}
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <span className="font-bold text-indigo-600 text-sm tracking-wider uppercase">
//               Step {step} of 3
//             </span>
//             <div className="w-9"></div> {/* Spacer for alignment */}
//           </div>
//         )}

//         {step < 4 && <ProgressBar currentStep={step} totalSteps={3} />}

//         <AnimatePresence mode="wait">
//           {step === 1 && (
//             <Step1Profile
//               key="step1"
//               data={formData}
//               updateData={updateData}
//               onNext={nextStep}
//             />
//           )}
//           {step === 2 && (
//             <Step2Habits
//               key="step2"
//               data={formData}
//               updateData={updateData}
//               onNext={nextStep}
//               onBack={prevStep}
//             />
//           )}
//           {step === 3 && (
//             <Step3Status
//               key="step3"
//               data={formData}
//               updateData={updateData}
//               onNext={nextStep}
//               onBack={prevStep}
//             />
//           )}
//           {step === 4 && (
//             <Step4Success key="step4" onComplete={() => onFinish(formData)} />
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onFinish }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    photo: null,
    gender: "",
    course: "",
    level: "",
    university: "Uniosun",
    campus: "",
    bio: "",
    habits: {},
    roomStatus: null, // 'has_room', 'looking_for_roommate', 'not_looking'
    roomDetails: null, // { area: '', price: '', type: '' }
  });

  const updateData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleComplete = async (data: any) => {
    // Dispatch updateProfile to Redux with the form data
    await dispatch(
      updateProfile({
        bio: data.bio || "",
        profilePhoto: data.photo || "",
        course_study: data.course || "",
        academic_level: data.level || "",
        habits: data.habits || [],
        actively_searching: data.roomStatus === "looking_for_roommate",
      })
    );

    // Call the onFinish callback
    onFinish(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-white p-6 md:p-10 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10 opacity-50"></div>

        {/* Header */}
        {step < 4 && (
          <div className="mb-8 flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={prevStep}
              className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
                step === 1 ? "opacity-0 cursor-default" : "text-slate-600"
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <span className="font-bold text-indigo-600 text-sm tracking-wider uppercase">
              Step {step} of 3
            </span>
            <div className="w-9"></div>
          </div>
        )}

        {step < 4 && <ProgressBar currentStep={step} totalSteps={3} />}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1Profile
              key="step1"
              data={formData}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <Step2Habits
              key="step2"
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <Step3Status
              key="step3"
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <Step4Success
              key="step4"
              onComplete={() => handleComplete(formData)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
