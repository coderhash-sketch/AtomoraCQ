
import React from 'react';
import { Shield, Wind, Zap, DollarSign, Download, CheckCircle2, Trophy, Star } from 'lucide-react';
import { MaterialCandidate } from '../types';

interface ResultsDashboardProps {
  selectedMaterial: MaterialCandidate;
  materials: MaterialCandidate[];
  onSelect: (material: MaterialCandidate) => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ selectedMaterial, materials, onSelect }) => {
  const metrics = [
    { label: 'CO₂ Adsorption', value: selectedMaterial.adsorption, icon: Wind, color: 'text-cyan-400' },
    { label: 'Surface Area', value: selectedMaterial.surfaceArea, icon: Shield, color: 'text-magenta-400' },
    { label: 'Synthesis Time', value: selectedMaterial.synthesisTime, icon: Zap, color: 'text-lime-400' },
    { label: 'Production Cost', value: selectedMaterial.cost, icon: DollarSign, color: 'text-blue-400' },
  ];

  const exportData = () => {
    const blob = new Blob([JSON.stringify(selectedMaterial, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AtomoraCQ_${selectedMaterial.name}.json`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Material Selector Ribbon - Enhanced Size */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Discovery Repository</span>
        <div className="grid grid-cols-5 gap-3">
          {materials.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect(m)}
              className={`p-4 rounded-2xl border transition-all relative group overflow-hidden flex flex-col items-center justify-center min-h-[100px] ${
                selectedMaterial.id === m.id 
                  ? 'bg-white/10 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)] scale-110' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {/* Increased metal symbol from text-2xl to text-4xl */}
                <span className="text-4xl font-mono font-black" style={{ color: m.metalColor }}>{m.metal}</span>
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${selectedMaterial.id === m.id ? 'text-white' : 'text-slate-500'}`}>
                  {m.id}
                </span>
              </div>
              {selectedMaterial.id === m.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 shadow-[0_-2px_15px_rgba(255,255,255,0.3)]" style={{ backgroundColor: m.metalColor }}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Discovery Card */}
      <div className="glass rounded-3xl p-6 border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <Trophy className="w-12 h-12 opacity-5 text-white group-hover:opacity-10 transition-opacity" />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${selectedMaterial.metalColor}20`, border: `1px solid ${selectedMaterial.metalColor}40` }}>
            <Star className="w-5 h-5" style={{ color: selectedMaterial.metalColor }} />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight text-white">{selectedMaterial.name}</h3>
            <span className="text-sm font-mono text-slate-100 font-bold bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700/50 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              {selectedMaterial.formula}
            </span>
          </div>
        </div>

        <div className="bg-lime-400/10 border border-lime-400/20 rounded-2xl p-4 mb-6 flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
          <div className="bg-lime-400 rounded-full p-1.5 shadow-[0_0_15px_rgba(132,204,22,0.4)]">
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-lime-400 tracking-widest">{selectedMaterial.highlightLabel}</span>
            <span className="text-sm font-bold text-white">{selectedMaterial.highlightMetric}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-colors shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <m.icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">{m.label}</span>
              </div>
              <div className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {m.value.split(' ')[0]}
                <span className="text-xs font-bold text-slate-500 ml-1 uppercase">{m.value.split(' ')[1] || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={exportData}
        className="mt-auto w-full flex items-center justify-center gap-3 py-5 bg-white text-slate-950 hover:bg-slate-100 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 active:scale-95"
      >
        <Download className="w-4 h-4" /> Download Atomic Spec
      </button>
    </div>
  );
};

export default ResultsDashboard;
