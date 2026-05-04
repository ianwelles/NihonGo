import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HandCoins } from 'lucide-react';

const TipJarModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasClickedTipLink = localStorage.getItem('hasClickedTipLink');
    if (hasClickedTipLink) {
      return;
    }

    const lastShown = localStorage.getItem('tipJarLastShown');
    const now = new Date().getTime();

    if (lastShown) {
      const hoursSinceLastShown = (now - parseInt(lastShown, 10)) / (1000 * 60 * 60);
      if (hoursSinceLastShown < 24) {
        return;
      }
    }

    const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('tipJarLastShown', now.toString());
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    localStorage.setItem('hasClickedTipLink', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full relative text-center border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="mx-auto bg-blue-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-6 border-2 border-blue-500">
                <HandCoins className="text-blue-400" size={40} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Enjoying the App?</h2>
            
            <p className="text-gray-300 mb-6">
              If you find this application useful, please consider leaving a small tip. It helps support development and keeps the app running.
            </p>

            <a
              href="https://monzo.me/ianmccollum?h=E5kAQD"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 inline-block"
            >
                Leave a Tip
            </a>
            
            <p className="text-xs text-gray-500 mt-6">
              You'll see this message once a day until you click the link.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TipJarModal;
