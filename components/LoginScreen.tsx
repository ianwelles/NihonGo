import React from 'react';

interface LoginScreenProps {
  password: string;
  setPassword: (p: string) => void;
  authError: boolean;
  setAuthError: (e: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  password, setPassword, authError, setAuthError, handleLogin 
}) => {
  return (
    <div className="h-screen-safe bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card-bg p-8 rounded-2xl border-2 border-primary shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🔒</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Beto Birthday Experience</h2>
          <p className="text-sub-text">Please enter the birthday password to view the itinerary.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError(false);
              }}
              placeholder="Enter Password"
              className={`w-full bg-black border-2 ${authError ? 'border-red-500 animate-shake' : 'border-border'} rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-all text-xl-base`}
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm mt-2 font-bold">❌ Incorrect password. Try again!</p>}
          </div>
          <button 
            type="submit"
            className="w-full bg-primary text-white font-black py-4 rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest text-lg"
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
};
