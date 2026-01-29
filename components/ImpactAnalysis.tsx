
import React from 'react';
import { Leaf, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const ImpactAnalysis: React.FC = () => {
  const data = [
    { name: 'MOF-5', removal: 0.45, color: 'from-slate-500 to-slate-700', delay: '0s' },
    { name: 'ZIF-8', removal: 0.82, color: 'from-blue-500 to-indigo-600', delay: '0.1s' },
    { name: 'UiO-66', removal: 1.25, color: 'from-cyan-400 to-blue-500', delay: '0.2s' },
    { name: 'QuantumMOF-X1', removal: 2.40, color: 'from-lime-400 to-emerald-600', highlight: true, delay: '0.3s' },
  ];

  const maxVal = 2.5;

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-lime-400/10 rounded-2xl mb-2">
          <Leaf className="w-10 h-10 text-lime-400 animate-pulse" />
        </div>
        <h2 className="text-5xl font-extrabold tracking-tighter neonic-text">Environmental Impact Analytics</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Projected cumulative atmospheric CO₂ removal by 2035. Our quantum-optimized architectures 
          outperform standard MOFs by over <span className="text-lime-400 font-bold">92%</span>.
        </p>
      </div>

      <div className="w-full max-w-4xl glass rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Decorative background pulse */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-lime-400" />
              <span className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-slate-500">Removal Projection (Gigatons CO₂)</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Legacy MOFs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,71,0.6)]"></div>
                <span className="text-[10px] font-bold text-lime-400 uppercase">Quantum Protocols</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 h-80 px-4 border-b border-slate-800/50 relative">
            {/* Grid Lines */}
            {[0, 0.5, 1, 1.5, 2, 2.5].map((val) => (
              <div 
                key={val} 
                className="absolute left-0 right-0 border-t border-slate-800/30 text-[9px] font-mono text-slate-600 flex items-start pl-2"
                style={{ bottom: `${(val / maxVal) * 100}%` }}
              >
                {val} Gt
              </div>
            ))}

            {data.map((item) => (
              <div key={item.name} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Value Label - High Visibility */}
                <div 
                  className={`mb-3 text-xl font-mono font-black transition-all duration-700 animate-in fade-in slide-in-from-bottom-2 ${
                    item.highlight 
                      ? 'text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,71,0.8)]' 
                      : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                  }`}
                  style={{ animationDelay: `${parseFloat(item.delay) + 0.5}s`, animationFillMode: 'both' }}
                >
                  {item.removal} <span className="text-xs opacity-70">Gt</span>
                </div>
                
                {/* Bar */}
                <div 
                  className={`w-full max-w-[100px] bg-gradient-to-t ${item.color} rounded-t-xl transition-all duration-1000 ease-out relative group-hover:brightness-110 shadow-lg`}
                  style={{ 
                    height: `${(item.removal / maxVal) * 80}%`,
                    animation: `slideUp 1s ease-out forwards ${item.delay}`,
                    boxShadow: item.highlight ? '0 0 35px rgba(163, 230, 71, 0.3)' : '0 0 15px rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Subtle glass reflection on bars */}
                  <div className="absolute inset-x-2 top-2 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                  
                  {item.highlight && (
                    <div className="absolute inset-0 bg-white/10 opacity-40 rounded-t-xl animate-pulse"></div>
                  )}
                  {item.highlight && (
                    <div className="absolute -top-1 left-0 right-0 h-1.5 bg-lime-300 rounded-full blur-[3px] animate-pulse"></div>
                  )}
                </div>

                {/* Name Label */}
                <div className={`mt-5 mb-2 text-xs font-bold uppercase tracking-widest ${item.highlight ? 'text-lime-400' : 'text-slate-300'}`}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="glass p-6 rounded-3xl border-slate-800 flex items-start gap-4 hover:border-blue-500/30 transition-colors group">
          <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Stability Rating</div>
            <div className="text-xl font-bold text-white">Ultra-High</div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Maintains capacity for 5,000+ cycles</p>
          </div>
        </div>
        <div className="glass p-6 rounded-3xl border-slate-800 flex items-start gap-4 hover:border-lime-400/30 transition-colors group">
          <div className="p-2 bg-lime-400/10 rounded-xl group-hover:bg-lime-400/20 transition-colors">
            <Zap className="w-5 h-5 text-lime-400" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Capture Efficiency</div>
            <div className="text-xl font-bold text-white">+184%</div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Versus industrial benchmarks</p>
          </div>
        </div>
        <div className="glass p-6 rounded-3xl border-slate-800 flex items-start gap-4 hover:border-magenta-400/30 transition-colors group">
          <div className="p-2 bg-magenta-400/10 rounded-xl group-hover:bg-magenta-400/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-magenta-400" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Global Scale</div>
            <div className="text-xl font-bold text-white">2.4 Gt/yr</div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Projected Net-Zero Contribution</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { height: 0; opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default ImpactAnalysis;
