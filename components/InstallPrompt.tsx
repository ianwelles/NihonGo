import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, we can show the prompt after a short delay if not already in standalone mode
    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem('pwa_prompt_dismissed', 'true');
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[3000] animate-in slide-in-from-bottom-8 duration-500 pointer-events-auto">
      <div className="bg-primary/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl flex flex-col gap-3 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Download size={24} />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Install NihonGo</h3>
              <p className="text-xs opacity-90 font-bold">Add to your home screen!</p>
            </div>
          </div>
          <button 
            onClick={dismissPrompt}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {isIOS ? (
          <div className="bg-white/10 rounded-xl p-3 text-[11px] font-medium leading-tight">
            <p className="mb-2">To install on iPhone:</p>
            <ol className="list-decimal list-inside space-y-1 opacity-90">
              <li className="flex items-center gap-1 inline-flex">Tap the share button <Share size={14} className="inline" /> in Safari</li>
              <li>Scroll down and tap <span className="font-bold">"Add to Home Screen"</span></li>
            </ol>
          </div>
        ) : (
          <div className="flex justify-end">
            <button 
              onClick={handleInstallClick}
              className="bg-white text-primary px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg"
            >
              Install Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
