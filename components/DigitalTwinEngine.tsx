import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Wind, 
  Zap, 
  ShieldAlert, 
  TrendingUp, 
  Map as MapIcon,
  RefreshCcw,
  ArrowRight,
  BrainCircuit,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const DigitalTwinEngine: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [impact, setImpact] = useState<any>(null);
  const [city, setCity] = useState('New Delhi');
  const [windSpeed, setWindSpeed] = useState(12);
  const [windDirection, setWindDirection] = useState(45);
  const [traffic, setTraffic] = useState(0.7);
  const [emissions, setEmissions] = useState(120);

  const CITIES = ['New Delhi', 'New York', 'London', 'Beijing', 'Mumbai'];

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Simulate Pollution
      const simRes = await fetch('/api/simulate-pollution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, windSpeed, windDirection, emissions, traffic })
      });
      const simData = await simRes.json();
      setHeatmap(simData.heatmap);

      // 2. Predict AQI
      const predRes = await fetch('/api/predict-aqi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, traffic, emissions })
      });
      const predData = await predRes.json();
      setPredictions(predData.predictions);

      // 3. Intervention Impact
      const impRes = await fetch('/api/intervention-impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interventionType: 'traffic-reduction', currentAqi: predictions[0]?.value || 180 })
      });
      const impData = await impRes.json();
      setImpact(impData);
    } catch (error) {
      console.error("Failed to fetch digital twin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city, windSpeed, windDirection, traffic, emissions]);

  return (
    <div className="flex-1 flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <BrainCircuit className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">Climate Digital Twin</h2>
            <p className="text-slate-500 text-lg font-medium">AeronicX virtual atmospheric simulation engine.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black mb-1">Target City</span>
            <select 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm font-bold text-white outline-none focus:border-cyan-400 transition-colors"
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 mt-auto"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-[32px] border border-slate-800 space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Simulation Parameters</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Wind Speed</span>
                  <span className="text-cyan-400">{windSpeed} km/h</span>
                </div>
                <input 
                  type="range" min="0" max="50" value={windSpeed} 
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Wind Direction</span>
                  <span className="text-cyan-400">{windDirection}°</span>
                </div>
                <input 
                  type="range" min="0" max="360" value={windDirection} 
                  onChange={(e) => setWindDirection(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Traffic Density</span>
                  <span className="text-magenta-400">{Math.round(traffic * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.1" value={traffic} 
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-magenta-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Industrial Emissions</span>
                  <span className="text-orange-400">{emissions} t/h</span>
                </div>
                <input 
                  type="range" min="0" max="500" value={emissions} 
                  onChange={(e) => setEmissions(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dispersion Heatmap */}
        <div className="lg:col-span-6">
          <div className="glass rounded-[40px] border border-slate-800 p-8 relative overflow-hidden h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <MapIcon className="text-cyan-400" />
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Pollution Dispersion Map</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase font-black">Wind Speed</span>
                  <span className="text-sm font-mono text-cyan-400">{windSpeed} km/h</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase font-black">Direction</span>
                  <span className="text-sm font-mono text-cyan-400">{windDirection}°</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-slate-950/50 rounded-3xl border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {heatmap.map((point, i) => (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={point.value / 5}
                    fill={point.value > 50 ? '#f43f5e' : point.value > 20 ? '#fb923c' : '#22d3ee'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="blur-md"
                  />
                ))}
                {/* City Landmarks Mockup */}
                <rect x="45" y="45" width="10" height="10" fill="white" fillOpacity="0.1" rx="2" />
                <text x="50" y="42" textAnchor="middle" fontSize="3" fill="white" fillOpacity="0.5" className="font-mono">CITY CENTER</text>
              </svg>
              
              <div className="absolute top-4 right-4 glass p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">High Concentration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Low Concentration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8 rounded-[32px] border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-magenta-400" />
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">24h AQI Forecast</h3>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictions}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="label" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#d946ef' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#d946ef" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-magenta-400/5 border border-magenta-400/20 rounded-2xl">
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                "Probabilistic model suggests a peak at 14:00 due to atmospheric inversion and traffic density."
              </p>
            </div>
          </div>

          {/* Intervention Impact */}
          <div className="glass p-8 rounded-[32px] border border-emerald-400/20 bg-emerald-400/5 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-emerald-400" />
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Intervention Impact</h3>
            </div>

            {impact && (
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-black">Current AQI</span>
                    <div className="text-3xl font-black text-white">{impact.originalAqi}</div>
                  </div>
                  <ArrowRight className="text-slate-700 mb-2" />
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-500 uppercase font-black">Projected AQI</span>
                    <div className="text-3xl font-black text-emerald-400">{impact.projectedAqi}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Reduction Efficiency</span>
                    <span className="text-emerald-400">{impact.reductionPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${impact.reductionPercentage}%` }}
                      className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-emerald-400/10 rounded-xl border border-emerald-400/20">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Time to Impact: {impact.timeToImpact}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Microservices Status Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Atmospheric Simulator', status: 'Active', load: '12%' },
          { label: 'LSTM Prediction Engine', status: 'Active', load: '45%' },
          { label: 'Probabilistic Solver', status: 'Active', load: '28%' }
        ].map((service, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-black mb-1">{service.label}</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-slate-300">{service.status}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Load</div>
              <div className="text-sm font-mono text-cyan-400">{service.load}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalTwinEngine;
