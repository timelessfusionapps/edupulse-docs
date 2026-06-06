import { Trophy, Zap } from "lucide-react";

const houses = [
  {
    name: "Ignis",
    mascot: "Dragon",
    points: 12450,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textLight: "text-rose-600",
    border: "border-rose-100",
    trend: "+450",
    rank: 1,
  },
  {
    name: "Aqua",
    mascot: "Kraken",
    points: 11820,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textLight: "text-blue-600",
    border: "border-blue-100",
    trend: "+320",
    rank: 2,
  },
  {
    name: "Terra",
    mascot: "Bear",
    points: 10900,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textLight: "text-emerald-600",
    border: "border-emerald-100",
    trend: "+280",
    rank: 3,
  },
  {
    name: "Ventus",
    mascot: "Eagle",
    points: 9840,
    color: "from-amber-400 to-amber-500",
    bgLight: "bg-amber-50",
    textLight: "text-amber-600",
    border: "border-amber-100",
    trend: "+150",
    rank: 4,
  },
];

export function LiveLeaderboard() {
  const maxPoints = Math.max(...houses.map((h) => h.points));

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm h-full flex flex-col relative overflow-hidden ring-1 ring-black/[0.02]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-500/20" />
            House Leaderboard
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Live standings for current term</p>
        </div>
        <div className="px-3.5 py-1.5 bg-slate-900 rounded-full shadow-md flex items-center gap-2 border border-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-white uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="flex-1 space-y-6 relative z-10 flex flex-col justify-center">
        {houses.map((house) => {
          const width = (house.points / maxPoints) * 100;
          const isLeader = house.rank === 1;

          return (
            <div key={house.name} className="relative group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg border shadow-sm ${house.bgLight} ${house.textLight} ${house.border}`}>
                    {house.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-lg">{house.name}</span>
                      {isLeader && <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{house.mascot}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xl text-slate-900 tracking-tight">
                    {house.points.toLocaleString()}
                  </div>
                  <span className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1">
                    <Zap className="w-3 h-3 fill-emerald-500" />
                    {house.trend} today
                  </span>
                </div>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-0.5">
                <div 
                  className={`h-full bg-gradient-to-r ${house.color} rounded-full relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isLeader ? 'shadow-[0_0_15px_rgba(244,63,94,0.4)]' : ''}`}
                  style={{ width: `${width}%` }}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
