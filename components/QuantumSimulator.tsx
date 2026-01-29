
import React, { useState, useEffect } from 'react';
import { Cpu, Zap } from 'lucide-react';

const QuantumSimulator: React.FC = () => {
  const [energyData, setEnergyData] = useState<number[]>([]);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration(i => i + 1);
      setEnergyData(prev => {
        const last = prev.length > 0 ? prev[prev.length - 1] : 0;
        // Simulating VQE convergence towards -12.45 Hartree
        const target = -12.45;
        const noise = (Math.random() - 0.5) * 0.1 * Math.exp(-prev.length / 10);
        const next = last + (target - last) * 0.2 + noise;
        return [...prev, next].slice(-50);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const qubitConfigs = [
    { label: 'q0', color: 'text-cyan-400', borderColor: 'border-cyan-400/50', bgColor: 'bg-cyan-500/10' },
    { label: 'q1', color: 'text-magenta-400', borderColor: 'border-magenta-400/50', bgColor: 'bg-magenta-500/10' },
    { label: 'q2', color: 'text-lime-400', borderColor: 'border-lime-400/50', bgColor: 'bg-lime-500/10' },
    { label: 'q3', color: 'text-blue-400', borderColor: 'border-blue-400/50', bgColor: 'bg-blue-500/10' },
  ];

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Quantum Circuit Visualization */}
      <div className="glass rounded-2xl p-6 flex flex-col neonic-border border-blue-500/30 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span className="neonic-text">Quantum Circuit Architecture</span>
          </h3>
          <span className="text-sm font-mono px-3 py-1 bg-white/5 text-slate-300 rounded-full border border-white/10 uppercase tracking-widest">VQE Ansätz</span>
        </div>

        <div className="flex-1 flex flex-col justify-around min-h-[350px] relative">
          {qubitConfigs.map((q, i) => (
            <div key={q.label} className="relative flex items-center group">
              <span className={`w-12 font-mono text-lg font-bold ${q.color}`}>{q.label}</span>
              <div className="flex-1 h-0.5 bg-slate-800 relative">
                {/* Horizontal line glow */}
                <div className={`absolute inset-0 opacity-20 blur-sm ${q.color.replace('text', 'bg')}`}></div>
                
                {/* Gates */}
                <div 
                  className={`absolute left-[20%] -top-5 w-12 h-10 glass border-2 ${q.borderColor} ${q.bgColor} flex items-center justify-center rounded-lg text-xs font-black transition-all group-hover:scale-110 animate-pulse shadow-lg`}
                  style={{ animationDelay: `${i * 0.2}s`, textShadow: '0 0 5px currentColor' }}
                >
                  <span className={q.color}>R<sub>y</sub>(θ)</span>
                </div>

                {/* CX (CNOT) Gates - Vertically linked */}
                {i < 3 && (
                  <div className="absolute left-[55%] -top-2 bottom-[-48px] w-0.5 bg-white/10 flex items-center justify-center">
                     {/* Control node */}
                     <div className={`w-5 h-5 rounded-full border-2 bg-slate-900 z-10 transition-transform group-hover:scale-125 ${q.borderColor}`}>
                       <div className={`w-1.5 h-1.5 rounded-full m-auto mt-1 ${q.color.replace('text', 'bg')}`}></div>
                     </div>
                     {/* Target node */}
                     <div className={`absolute bottom-0 w-8 h-8 border-2 rounded-full flex items-center justify-center text-xs font-black bg-slate-950 z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${qubitConfigs[i+1].borderColor}`}>
                        <span className={qubitConfigs[i+1].color}>X</span>
                     </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Timeline marking */}
          <div className="absolute bottom-0 left-12 right-0 h-4 border-t border-slate-800 flex justify-between px-4">
             <span className="text-[10px] font-mono text-slate-600 mt-1 italic">Init</span>
             <span className="text-[10px] font-mono text-slate-600 mt-1 italic">Rotations</span>
             <span className="text-[10px] font-mono text-slate-600 mt-1 italic">Entanglement</span>
             <span className="text-[10px] font-mono text-slate-600 mt-1 italic">Measurement</span>
          </div>
        </div>
        
        <div className="mt-10 p-4 bg-black/30 rounded-xl border border-white/5">
          <div className="text-lg font-mono text-center mb-2 tracking-tighter">
            <span className="text-cyan-400">|ψ⟩</span> = <span className="text-magenta-400">α</span>|0011⟩ + <span className="text-lime-400">β</span>|1100⟩ + <span className="text-blue-400">γ</span>|0101⟩
          </div>
          <div className="text-xs uppercase text-slate-500 font-bold tracking-[0.2em] text-center">
            Amplitudes: <span className="text-magenta-400">0.82</span>, <span className="text-lime-400">0.14</span>, <span className="text-blue-400">0.04</span>
          </div>
        </div>
      </div>

      {/* VQE Energy Convergence Graph */}
      <div className="glass rounded-2xl p-6 flex flex-col neonic-border border-lime-500/30 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Zap className="w-6 h-6 text-lime-400" />
            <span className="neonic-text">Energy Convergence</span>
          </h3>
          <span className="text-sm font-mono text-lime-400 font-bold px-3 py-1 bg-lime-400/10 rounded-full border border-lime-400/20">
            Iter: {iteration}
          </span>
        </div>

        <div className="flex-1 relative">
          <svg width="100%" height="240" viewBox="0 0 400 240" className="overflow-visible">
            {/* Grid */}
            <line x1="0" y1="220" x2="400" y2="220" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="20" x2="0" y2="220" stroke="#334155" strokeWidth="1" />
            
            {/* Target line */}
            <line x1="0" y1="180" x2="400" y2="180" stroke="#84cc16" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
            
            {/* Plot Line */}
            <path 
              d={`M ${energyData.map((d, i) => `${(i / 50) * 400},${100 - (d + 5) * 10}`).join(' L ')}`}
              fill="none"
              stroke="#84cc16"
              strokeWidth="2.5"
              className="transition-all duration-100"
            />
            {/* Glow effect */}
            <path 
              d={`M ${energyData.map((d, i) => `${(i / 50) * 400},${100 - (d + 5) * 10}`).join(' L ')}`}
              fill="none"
              stroke="#84cc16"
              strokeWidth="8"
              strokeOpacity="0.15"
              className="transition-all duration-100 blur-md"
            />
          </svg>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 font-bold">Energy (Hartree)</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Optimization Steps</div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 shadow-inner group">
            <div className="text-[10px] uppercase text-slate-500 font-black mb-1 tracking-widest group-hover:text-lime-400 transition-colors">Current Energy</div>
            <div className="text-2xl font-mono text-lime-400 font-black">
              {energyData.length > 0 ? energyData[energyData.length - 1].toFixed(4) : '--'}
            </div>
          </div>
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 shadow-inner group">
            <div className="text-[10px] uppercase text-slate-500 font-black mb-1 tracking-widest group-hover:text-blue-400 transition-colors">Convergence Δ</div>
            <div className="text-2xl font-mono text-blue-400 font-black">
              {Math.abs((energyData[energyData.length-1] || 0) - (energyData[energyData.length-2] || 0)).toFixed(6)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumSimulator;
