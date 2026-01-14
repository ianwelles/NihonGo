import React from 'react';

interface HeaderProps {
  isMobile: boolean;
  startDate?: Date;
  endDate?: Date;
  tripTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  isMobile,
  startDate,
  endDate,
  tripTitle = "Beto Birthday Experience"
}) => {
  const formatDateRange = () => {
    if (!startDate || !endDate) return "18 Feb – 28 Feb 2025";
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const startStr = startDate.toLocaleDateString('en-GB', options);
    const endStr = endDate.toLocaleDateString('en-GB', options);
    const year = endDate.getFullYear();
    
    return `${startStr} – ${endStr} ${year}`;
  };

  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-3xl">🇯🇵</span>
        <h1 className="text-2xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
          Send Noods & Dim Sum More
        </h1>
        <span className="text-3xl">🇨🇳</span>
      </div>
      
      <p className="text-gray-400 text-xs md:text-xs font-medium tracking-wide uppercase mb-4">
        {formatDateRange()} <span className="mx-2 text-white/20">|</span> {tripTitle}
      </p>
    </div>
  );
};