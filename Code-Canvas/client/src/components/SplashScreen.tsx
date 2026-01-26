import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Loading resources...');

  useEffect(() => {
    const stages = [
      { progress: 15, status: 'Loading extensions...' },
      { progress: 35, status: 'Initializing workspace...' },
      { progress: 55, status: 'Building file tree...' },
      { progress: 75, status: 'Starting language server...' },
      { progress: 90, status: 'Preparing editor...' },
      { progress: 100, status: 'Ready!' },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStatus(stages[currentStage].status);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#1e1e1e] z-[100] flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-8">
            <svg width="80" height="80" viewBox="0 0 100 100" className="text-[#007acc]">
              <polygon
                points="50,5 95,30 95,70 50,95 5,70 5,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <polygon
                points="50,20 80,35 80,65 50,80 20,65 20,35"
                fill="currentColor"
                opacity="0.3"
              />
              <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold">
                SR
              </text>
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-[#cccccc] mb-2">
            Sourav Rajvi
          </h1>
          <p className="text-sm text-[#858585] mb-8">
            Developer Portfolio
          </p>

          <div className="w-64 h-1 bg-[#3e4451] rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-[#007acc]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-xs text-[#858585]">{status}</p>
        </motion.div>

        <div className="absolute bottom-8 text-xs text-[#5c6370]">
          Version 1.0.0
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
