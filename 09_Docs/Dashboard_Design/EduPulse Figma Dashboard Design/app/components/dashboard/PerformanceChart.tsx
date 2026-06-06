import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';

const data = [
  { name: 'Mon', ignis: 120, aqua: 90, terra: 80, ventus: 60 },
  { name: 'Tue', ignis: 150, aqua: 110, terra: 105, ventus: 80 },
  { name: 'Wed', ignis: 180, aqua: 140, terra: 125, ventus: 110 },
  { name: 'Thu', ignis: 220, aqua: 190, terra: 155, ventus: 130 },
  { name: 'Fri', ignis: 280, aqua: 210, terra: 185, ventus: 160 },
  { name: 'Sat', ignis: 310, aqua: 260, terra: 210, ventus: 190 },
  { name: 'Sun', ignis: 340, aqua: 290, terra: 250, ventus: 210 },
];

export function PerformanceChart() {
  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm h-full flex flex-col ring-1 ring-black/[0.02]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            Performance Trends
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Points accumulated over the last 7 days</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Term</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIgnis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAqua" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
              itemStyle={{ fontWeight: 700 }}
            />
            <Area type="monotone" dataKey="ignis" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorIgnis)" />
            <Area type="monotone" dataKey="aqua" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAqua)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
