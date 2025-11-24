import React from 'react';
import { motion } from 'framer-motion';


interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar:React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="h-full bg-indigo-600 rounded-full"
      />
    </div>
  );
};
