import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake } from 'lucide-react';

interface BirthdayCelebrationProps {
  birthDate: string; // 'YYYY-MM-DD'
}

const BirthdayCelebration: React.FC<BirthdayCelebrationProps> = ({ birthDate }) => {
  const [isBirthdayActive, setIsBirthdayActive] = useState(false);
  const [hasMovedToCorner, setHasMovedToCorner] = useState(false);

  useEffect(() => {
    const checkBirthday = () => {
      const today = new Date();
      const [year, month, day] = birthDate.split('-').map(Number);
      
      const isMatch = 
        today.getMonth() + 1 === month && 
        today.getDate() === day;

      if (isMatch) {
        setIsBirthdayActive(true);
        triggerConfetti();
      }
    };

    checkBirthday();
  }, [birthDate]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBirthdayActive) {
      timer = setTimeout(() => {
        setHasMovedToCorner(true);
      }, 2000); 
    }
    return () => clearTimeout(timer);
  }, [isBirthdayActive]);

  return (
    <AnimatePresence>
      {isBirthdayActive && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center ${hasMovedToCorner ? 'pointer-events-none' : 'bg-black/30 backdrop-blur-sm'}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
            animate={
                hasMovedToCorner
                ? {
                    opacity: 1,
                    scale: 1,
                    top: "auto",
                    left: "auto",
                    bottom: 24,
                    right: 24,
                    x: 0,
                    y: 0,
                  }
                : {
                    opacity: 1,
                    scale: 3,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: ["-50%", "-55%", "-50%"],
                  }
            }
            transition={
                hasMovedToCorner
                ? { type: 'spring', stiffness: 100, damping: 20 }
                : { y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }, default: {duration: 0.5} }
            }
            className="absolute pointer-events-auto cursor-pointer"
            onClick={() => {
              if (hasMovedToCorner) {
                triggerConfetti();
              }
            }}
          >
            <div className="bg-white rounded-full p-4 shadow-2xl border-4 border-pink-400">
              <Cake className="w-8 h-8 text-pink-500" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BirthdayCelebration;
