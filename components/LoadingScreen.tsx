import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black text-white animate-in fade-in duration-500">
      <style>
        {`
          @keyframes sequentialPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }
          .dot-pulse {
            animation: sequentialPulse 1.5s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative mb-12">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <svg className="w-40 h-40 relative z-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="black" stroke="#ef4444" strokeWidth="4" />
          <g transform="translate(50 50) rotate(45) scale(4.8) translate(-11.5 -12)">
            <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
          </g>
        </svg>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex items-stretch gap-4 h-[80px] relative mb-4">
          <div className="h-full w-3 shrink-0">
            <svg viewBox="0 0 10 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible">
              <circle cx="5" cy="4.5" r="4.5" fill="#C2185B" className="dot-pulse" style={{ animationDelay: '0s' }} />
              <line x1="5" y1="11" x2="5" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="5" cy="30" r="3.5" fill="#558B2F" className="dot-pulse" style={{ animationDelay: '0.2s' }} />
              <line x1="5" y1="36" x2="5" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="5" cy="50" r="3.5" fill="#E65100" className="dot-pulse" style={{ animationDelay: '0.4s' }} />
              <line x1="5" y1="57" x2="5" y2="69" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="5" cy="75.5" r="4.5" fill="#0097A7" className="dot-pulse" style={{ animationDelay: '0.6s' }} />
            </svg>
          </div>

          <div className="flex flex-col h-full justify-between">
            <h1 className="flex flex-col h-full justify-between items-start">
              <span 
                className="font-black tracking-tighter leading-none text-[2.2rem] md:text-[2.6rem]"
                style={{ color: '#C2185B', textShadow: '0 0 12px rgba(194, 24, 91, 0.5)' }}
              >
                SEND NOODS
              </span>
              <span 
                className="font-black tracking-tighter leading-none text-[2.2rem] md:text-[2.6rem]"
                style={{ color: '#0097A7', textShadow: '0 0 12px rgba(0, 151, 167, 0.5)' }}
              >
                DIM SUM MORE
              </span>
            </h1>
          </div>
        </div>

        <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase pt-10 text-center">
          Generating your custom itinerary
        </p>
      </div>
    </div>
  );
};
