
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreeDeciduous, 
  Wind, 
  Bike, 
  TrendingDown, 
  Users, 
  MapPin,
  Plus,
  Zap,
  ChevronDown
} from 'lucide-react';
import { CITIES, CityData } from '../constants';

interface Action {
  id: string;
  type: 'tree' | 'emission' | 'transport';
  user: string;
  city: string;
  value: string;
  timestamp: Date;
  x: number;
  y: number;
}

const ClimateActionNetwork: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityData | 'Global'>('Global');
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [stats, setStats] = useState({
    trees: 12450,
    emissions: 85.4,
    transport: 62
  });
  const [pulses, setPulses] = useState<{id: string, x: number, y: number}[]>([]);

  const addAction = (type: 'tree' | 'emission' | 'transport') => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    const id = Math.random().toString(36).substr(2, 9);
    
    const city = selectedCity === 'Global' 
      ? CITIES[Math.floor(Math.random() * CITIES.length)].name 
      : selectedCity.name;

    const newAction: Action = {
      id,
      type,
      user: `User_${Math.floor(Math.random() * 1000)}`,
      city,
      value: type === 'tree' ? '+1 Tree' : type === 'emission' ? '-5kg CO2' : '+10km Bike',
      timestamp: new Date(),
      x,
      y
    };

    setActions(prev => [newAction, ...prev].slice(0, 20));
    setPulses(prev => [...prev, { id, x, y }]);
    
    if (type === 'tree') setStats(s => ({ ...s, trees: s.trees + 1 }));
    if (type === 'emission') setStats(s => ({ ...s, emissions: s.emissions + 0.5 }));
    if (type === 'transport') setStats(s => ({ ...s, transport: s.transport + 1 }));

    setTimeout(() => {
      setPulses(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  const filteredActions = actions.filter(a => 
    selectedCity === 'Global' || a.city === selectedCity.name
  );

  return (
    <div className="flex flex-col h-full gap-6 p-6 overflow-hidden">
      <div className="flex justify-between items-end">
        <div className="flex items-end gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter neonic-text">CLIMATE ACTION NETWORK</h2>
            <p className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase">Collective Intelligence & Impact</p>
          </div>

          {/* City Selector */}
          <div className="relative mb-1">
            <button 
              onClick={() => setShowCitySelector(!showCitySelector)}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-400 transition-all group"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">
                {selectedCity === 'Global' ? 'Global Network' : selectedCity.name}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showCitySelector ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showCitySelector && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto p-2"
                >
                  <button
                    onClick={() => {
                      setSelectedCity('Global');
                      setShowCitySelector(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-colors ${
                      selectedCity === 'Global' 
                        ? 'bg-cyan-500/20 text-cyan-400 font-bold' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    Global Network
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  {CITIES.map(city => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCitySelector(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-colors ${
                        typeof selectedCity !== 'string' && selectedCity.id === city.id 
                          ? 'bg-cyan-500/20 text-cyan-400 font-bold' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => addAction('tree')}
            className="flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-xl text-lime-400 hover:bg-lime-500/20 transition-all font-black text-sm uppercase tracking-widest"
          >
            <TreeDeciduous className="w-4 h-4" /> Plant Tree
          </button>
          <button 
            onClick={() => addAction('emission')}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all font-black text-sm uppercase tracking-widest"
          >
            <TrendingDown className="w-4 h-4" /> Reduce CO2
          </button>
          <button 
            onClick={() => addAction('transport')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500/20 transition-all font-black text-sm uppercase tracking-widest"
          >
            <Bike className="w-4 h-4" /> Sustainable Trip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-lime-500/10 rounded-full blur-3xl group-hover:bg-lime-500/20 transition-all"></div>
          <div className="flex items-center gap-3 text-lime-400">
            <TreeDeciduous className="w-6 h-6" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Trees Planted</span>
          </div>
          <div className="text-5xl font-black tracking-tighter text-white">{stats.trees.toLocaleString()}</div>
          <div className="text-xs text-lime-400/60 font-mono">+12% from last month</div>
        </div>

        <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="flex items-center gap-3 text-cyan-400">
            <TrendingDown className="w-6 h-6" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">CO2 Reduced (Tons)</span>
          </div>
          <div className="text-5xl font-black tracking-tighter text-white">{stats.emissions.toFixed(1)}</div>
          <div className="text-xs text-cyan-400/60 font-mono">-5.2% target gap</div>
        </div>

        <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center gap-3 text-blue-400">
            <Bike className="w-6 h-6" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Sustainable Adoption</span>
          </div>
          <div className="text-5xl font-black tracking-tighter text-white">{stats.transport}%</div>
          <div className="text-xs text-blue-400/60 font-mono">+8% network growth</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-6 min-h-0">
        <div className="col-span-3 glass rounded-[40px] border border-white/5 relative overflow-hidden bg-slate-950/50">
          {/* Futuristic Map Grid */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* City Impact Board */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Pulses */}
              <AnimatePresence>
                {pulses.map(pulse => (
                  <motion.div
                    key={pulse.id}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-20 h-20 bg-lime-500/30 rounded-full blur-xl"
                    style={{ left: `${pulse.x}%`, top: `${pulse.y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
              </AnimatePresence>

              {/* Activity Nodes */}
              {filteredActions.map(action => (
                <motion.div
                  key={action.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${action.x}%`, top: `${action.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    action.type === 'tree' ? 'bg-lime-400 shadow-lime-400/50' : 
                    action.type === 'emission' ? 'bg-cyan-400 shadow-cyan-400/50' : 
                    'bg-blue-400 shadow-blue-400/50'
                  }`}></div>
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: -20, opacity: 1 }}
                    className="absolute whitespace-nowrap bg-slate-900/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg text-[10px] font-bold text-white"
                  >
                    {action.value}
                  </motion.div>
                </motion.div>
              ))}

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/5 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border border-white/5 rounded-full animate-reverse-orbit"></div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Live Network Activity</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-[40px] border border-white/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="font-black text-xs uppercase tracking-widest text-white">Recent Actions</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {filteredActions.map(action => (
                <motion.div
                  key={action.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white">{action.user}</span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">{action.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {action.type === 'tree' && <TreeDeciduous className="w-3 h-3 text-lime-400" />}
                    {action.type === 'emission' && <TrendingDown className="w-3 h-3 text-cyan-400" />}
                    {action.type === 'transport' && <Bike className="w-3 h-3 text-blue-400" />}
                    <span className={`text-xs font-black ${
                      action.type === 'tree' ? 'text-lime-400' : 
                      action.type === 'emission' ? 'text-cyan-400' : 
                      'text-blue-400'
                    }`}>{action.value}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredActions.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
                <Zap className="w-8 h-8 opacity-20" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Waiting for activity...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateActionNetwork;
