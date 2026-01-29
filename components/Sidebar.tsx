
import React from 'react';
import { 
  BarChart3, 
  FlaskConical, 
  History, 
  Settings, 
  Library, 
  Activity, 
  Leaf,
  Layers,
} from 'lucide-react';
import { WorkflowState } from '../types';

interface SidebarProps {
  workflow: WorkflowState;
  setWorkflow: (state: WorkflowState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ workflow, setWorkflow }) => {
  const menuItems = [
    { 
      id: 'discover', 
      label: 'Synthesis Hub', 
      desc: 'Discovery Core',
      icon: FlaskConical, 
      state: WorkflowState.IDLE,
      active: workflow === WorkflowState.IDLE,
      colorClass: 'text-cyan-400',
      activeBg: 'bg-cyan-400/10',
      activeBorder: 'border-cyan-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]'
    },
    { 
      id: 'filtering', 
      label: 'Neural Sieve', 
      desc: 'GNN Screening',
      icon: Layers, 
      state: WorkflowState.AI_FILTERING,
      active: workflow === WorkflowState.AI_FILTERING,
      colorClass: 'text-fuchsia-400',
      activeBg: 'bg-fuchsia-400/10',
      activeBorder: 'border-fuchsia-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(192,38,211,0.1)]'
    },
    { 
      id: 'quantum', 
      label: 'Quantum Forge', 
      desc: 'VQE Simulation',
      icon: Activity, 
      state: WorkflowState.QUANTUM_SIMULATION,
      active: workflow === WorkflowState.QUANTUM_SIMULATION,
      colorClass: 'text-lime-400',
      activeBg: 'bg-lime-400/10',
      activeBorder: 'border-lime-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(163,230,71,0.1)]'
    },
    { 
      id: 'materials', 
      label: 'Atomic Vault', 
      desc: 'Molecular Bank',
      icon: Library, 
      state: WorkflowState.RESULTS,
      active: workflow === WorkflowState.RESULTS,
      colorClass: 'text-orange-400',
      activeBg: 'bg-orange-400/10',
      activeBorder: 'border-orange-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(251,146,60,0.1)]'
    },
    { 
      id: 'impact', 
      label: 'Carbon Metrics', 
      desc: 'Eco-Impact Data',
      icon: Leaf, 
      state: WorkflowState.IMPACT,
      active: workflow === WorkflowState.IMPACT,
      colorClass: 'text-emerald-400',
      activeBg: 'bg-emerald-400/10',
      activeBorder: 'border-emerald-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]'
    },
    { 
      id: 'analytics', 
      label: 'Economic Lens', 
      desc: 'Feasibility Engine',
      icon: BarChart3, 
      state: WorkflowState.ANALYTICS,
      active: workflow === WorkflowState.ANALYTICS,
      colorClass: 'text-amber-400',
      activeBg: 'bg-amber-400/10',
      activeBorder: 'border-amber-400/20',
      glowShadow: 'shadow-[inset_0_0_20px_rgba(251,191,36,0.1)]'
    },
  ];

  const handleMenuClick = (state: WorkflowState) => {
    setWorkflow(state);
  };

  return (
    <aside className="w-72 glass border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all z-30 bg-slate-950/40 shrink-0">
      <div className="flex-1 py-8 flex flex-col gap-2 overflow-y-auto px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.state)}
            className={`flex items-center gap-4 px-4 py-5 transition-all relative group cursor-pointer w-full text-left outline-none rounded-2xl ${
              item.active 
                ? `${item.colorClass} ${item.activeBg} ${item.activeBorder} ${item.glowShadow}` 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            {item.active && (
              <div className={`absolute left-1 top-3 bottom-3 w-1.5 rounded-full shadow-lg ${item.colorClass.replace('text', 'bg')}`}></div>
            )}
            
            <item.icon className={`w-7 h-7 flex-shrink-0 transition-all duration-300 ${
              item.active 
                ? `scale-110 ${item.colorClass}` 
                : 'group-hover:scale-110 group-hover:text-slate-300'
            }`} />
            
            <div className="flex flex-col">
              <span className={`font-black text-lg tracking-tighter leading-tight transition-colors ${
                item.active 
                  ? `${item.colorClass}` 
                  : 'group-hover:text-slate-200'
              }`}>
                {item.label}
              </span>
              <span className={`text-[10px] font-mono tracking-[0.2em] uppercase transition-opacity ${
                item.active ? 'opacity-90 font-black' : 'text-slate-600 opacity-60 group-hover:opacity-100'
              }`}>
                {item.desc}
              </span>
            </div>
            
            {!item.active && (
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className={`w-2 h-2 rounded-full ${item.colorClass.replace('text', 'bg')} opacity-40 shadow-[0_0_8px_currentColor]`}></div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-2 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6 mx-2">
        <button 
          onClick={() => setWorkflow(WorkflowState.LOGS)}
          className={`flex items-center gap-4 px-4 py-4 transition-all cursor-pointer w-full text-left group outline-none rounded-xl relative ${
            workflow === WorkflowState.LOGS
              ? 'text-rose-400 bg-rose-400/10 border border-rose-400/20 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)]'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
        >
          {workflow === WorkflowState.LOGS && (
            <div className="absolute left-1 top-2 bottom-2 w-1.5 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
          )}
          <History className={`w-6 h-6 transition-transform duration-700 ${workflow === WorkflowState.LOGS ? 'rotate-180 text-rose-400' : 'group-hover:rotate-180'}`} />
          <div className="flex flex-col">
            <span className={`text-base font-black tracking-tight ${workflow === WorkflowState.LOGS ? 'text-rose-400' : ''}`}>Log History</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${workflow === WorkflowState.LOGS ? 'text-rose-400 opacity-90 font-black' : 'text-slate-600'}`}>Past Experiments</span>
          </div>
        </button>
        <button 
          onClick={() => setWorkflow(WorkflowState.CONFIG)}
          className={`flex items-center gap-4 px-4 py-4 transition-all cursor-pointer w-full text-left group outline-none rounded-xl relative ${
            workflow === WorkflowState.CONFIG
              ? 'text-sky-400 bg-sky-400/10 border border-sky-400/20 shadow-[inset_0_0_20px_rgba(56,189,248,0.1)]'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
        >
          {workflow === WorkflowState.CONFIG && (
            <div className="absolute left-1 top-2 bottom-2 w-1.5 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
          )}
          <Settings className={`w-6 h-6 transition-transform duration-500 ${workflow === WorkflowState.CONFIG ? 'rotate-90 text-sky-400' : 'group-hover:rotate-90'}`} />
          <div className="flex flex-col">
            <span className={`text-base font-black tracking-tight ${workflow === WorkflowState.CONFIG ? 'text-sky-400' : ''}`}>Lab Config</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${workflow === WorkflowState.CONFIG ? 'text-sky-400 opacity-90 font-black' : 'text-slate-600'}`}>System Params</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
