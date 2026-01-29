
import React from 'react';
import { X, Cpu, Database, BrainCircuit, Info } from 'lucide-react';

interface TechnicalModalProps {
  onClose: () => void;
}

const TechnicalModal: React.FC<TechnicalModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10">
      {/* High-blur backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      
      {/* Modal Container - Widened to max-w-4xl and fixed max-h */}
      <div className="relative glass w-full max-w-4xl max-h-[85vh] rounded-[3.5rem] overflow-hidden border border-cyan-500/20 shadow-[0_0_100px_rgba(34,211,238,0.15)] animate-in zoom-in duration-500 flex flex-col">
        
        {/* Header - Fixed with distinct color */}
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-cyan-500/5 shrink-0 pl-[113px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Info className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Technical Architecture</h2>
              <p className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-[0.4em] font-black">Quantum Simulation & Neural Filtering Protocols</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-slate-800">
            <X className="w-7 h-7 text-slate-500 hover:text-white" />
          </button>
        </div>
        
        {/* Content Area - Shifted 3cm (approx 113px) to the right */}
        <div className="p-10 pl-[113px] space-y-12 overflow-y-auto flex-1 custom-scrollbar scroll-smooth">
          
          {/* Section 1 */}
          <section className="space-y-5 relative group">
            <div className="absolute -left-[60px] top-1 w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h3 className="text-2xl font-black text-fuchsia-300 tracking-tight uppercase flex items-center gap-3">
              01. Neural GNN Screening
            </h3>
            <p className="text-slate-100 leading-relaxed text-lg font-medium opacity-90">
              We employ a <strong className="text-fuchsia-400">Graph Neural Network (GNN)</strong> architecture to predict the properties of over 1.2 million candidates. The GNN treats atoms as nodes and bonds as edges, capturing complex topological features like pore size distribution and void fraction without the prohibitive cost of classical simulation.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-5 relative group border-t border-slate-800 pt-10">
            <div className="absolute -left-[60px] top-11 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-cyan-300 tracking-tight uppercase flex items-center gap-3">
              02. Variational Quantum Eigensolver (VQE)
            </h3>
            <p className="text-slate-100 leading-relaxed text-lg font-medium opacity-90">
              Once candidates are narrowed down, we run high-precision simulations on quantum processing units. By using <strong className="text-cyan-400">VQE</strong>, we solve the Schrödinger equation for the CO₂-Metal binding site with unprecedented accuracy.
            </p>
            <div className="bg-slate-900/80 rounded-3xl p-6 font-mono text-base border border-cyan-500/10 shadow-inner group-hover:border-cyan-500/30 transition-colors">
              <span className="text-cyan-400 font-black">H|ψ(θ)⟩ = E(θ)|ψ(θ)⟩</span>
              <div className="mt-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">Calculated Affinity for Zr₆O₄(OH)₄ Lattice</div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-5 relative group border-t border-slate-800 pt-10">
            <div className="absolute -left-[60px] top-11 w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center border border-lime-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 text-lime-400" />
            </div>
            <h3 className="text-2xl font-black text-lime-300 tracking-tight uppercase flex items-center gap-3">
              03. Atomic Material Discovery
            </h3>
            <p className="text-slate-100 leading-relaxed text-lg font-medium opacity-90">
              The resulting materials feature a hierarchical pore structure optimized by quantum-calculated electrostatic potentials. This identifies materials that "trap" carbon efficiently while allowing controlled release for sequestration, accelerating discovery from years to hours.
            </p>
          </section>
        </div>

        {/* Footer - Fixed with distinct color */}
        <div className="p-8 bg-slate-900/80 border-t border-slate-800 flex justify-center shrink-0">
          <button 
            onClick={onClose}
            className="group relative px-16 py-4 bg-gradient-to-br from-cyan-400 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] shadow-xl active:scale-95"
          >
            Acknowledge Protocols
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          margin: 20px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}} />
    </div>
  );
};

export default TechnicalModal;
