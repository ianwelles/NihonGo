import React from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { shoppingList } from '../data';

interface ShoppingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingModal: React.FC<ShoppingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-card-bg w-full max-w-2xl rounded-2xl border-2 border-primary shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex justify-between items-center bg-black/30">
          <h2 className="text-2xl font-black flex items-center gap-3 text-primary uppercase italic tracking-tighter">
            <ShoppingBag className="w-7 h-7" /> MUST BUY
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-8">
          {shoppingList.map((cat, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold text-accent mb-4 border-l-4 border-accent pl-3 uppercase tracking-widest">{cat.title}</h3>
              <div className="grid gap-3">
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-white text-lg">{item.name}</p>
                      {item.notes && <p className="text-sm text-sub-text italic mt-1">{item.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-primary/10 border border-primary/20 p-5 rounded-xl">
            <h4 className="font-black text-primary uppercase text-sm mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-sub-text leading-relaxed">Most drugstores like <strong>Matsumoto Kiyoshi</strong> offer tax-free shopping for tourists on purchases over ¥5,000. Keep your passport handy!</p>
          </div>
        </div>
      </div>
    </div>
  );
};