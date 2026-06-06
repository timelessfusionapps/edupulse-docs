import { Trophy, Users, Star, Flame, Calendar, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";

const kpis = [
  {
    title: "Points Awarded Today",
    value: "1,284",
    trend: "+12%",
    isPositive: true,
    icon: Star,
    color: "text-amber-500",
    bg: "bg-gradient-to-br from-amber-100 to-amber-200/50",
    ring: "ring-amber-500/20",
  },
  {
    title: "Most Active House",
    value: "Ignis",
    trend: "Leading by 630",
    isPositive: true,
    icon: Trophy,
    color: "text-rose-500",
    bg: "bg-gradient-to-br from-rose-100 to-rose-200/50",
    ring: "ring-rose-500/20",
  },
  {
    title: "Participation Rate",
    value: "92%",
    trend: "+3.2%",
    isPositive: true,
    icon: Users,
    color: "text-indigo-500",
    bg: "bg-gradient-to-br from-indigo-100 to-indigo-200/50",
    ring: "ring-indigo-500/20",
  },
  {
    title: "Active Events",
    value: "14",
    trend: "2 closing soon",
    isPositive: false,
    icon: Calendar,
    color: "text-violet-500",
    bg: "bg-gradient-to-br from-violet-100 to-violet-200/50",
    ring: "ring-violet-500/20",
  },
  {
    title: "Top Class",
    value: "Year 10-A",
    trend: "480 pts this week",
    isPositive: true,
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-gradient-to-br from-emerald-100 to-emerald-200/50",
    ring: "ring-emerald-500/20",
  },
  {
    title: "School Streak",
    value: "5 Days",
    trend: "Goal: 10 Days",
    isPositive: true,
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-gradient-to-br from-orange-100 to-orange-200/50",
    ring: "ring-orange-500/20",
  },
];

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-10">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div key={i} className="group bg-card rounded-2xl p-5 border border-border/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden ring-1 ring-black/[0.02]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${kpi.bg} shadow-inner ring-1 ${kpi.ring} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-[28px] leading-tight font-extrabold text-slate-900 mb-1 tracking-tight">{kpi.value}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{kpi.title}</p>
                
                <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 w-max px-2 py-1 rounded-lg border border-slate-100">
                  {kpi.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  )}
                  <span className={kpi.isPositive ? "text-emerald-700" : "text-amber-700"}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
