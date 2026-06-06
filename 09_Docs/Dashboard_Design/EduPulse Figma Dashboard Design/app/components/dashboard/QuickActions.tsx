import { Star, CalendarPlus, UserPlus, Flag, PlusCircle, FileText } from "lucide-react";

const actions = [
  { name: "Assign Points", icon: Star, color: "text-indigo-600", bg: "bg-white", border: "border-indigo-100", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md" },
  { name: "Create Event", icon: CalendarPlus, color: "text-emerald-600", bg: "bg-white", border: "border-emerald-100", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md" },
  { name: "Add Student", icon: UserPlus, color: "text-slate-700", bg: "bg-white", border: "border-slate-200/80", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-slate-300 hover:shadow-md" },
  { name: "Competition", icon: Flag, color: "text-slate-700", bg: "bg-white", border: "border-slate-200/80", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-slate-300 hover:shadow-md" },
  { name: "Leaderboard", icon: PlusCircle, color: "text-slate-700", bg: "bg-white", border: "border-slate-200/80", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-slate-300 hover:shadow-md" },
  { name: "Reports", icon: FileText, color: "text-slate-700", bg: "bg-white", border: "border-slate-200/80", shadow: "shadow-sm", text: "text-slate-800", hover: "hover:-translate-y-1 hover:border-slate-300 hover:shadow-md" },
];

export function QuickActions() {
  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm h-full ring-1 ring-black/[0.02]">
      <h2 className="text-lg font-extrabold text-slate-900 mb-6 px-1">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button 
              key={i}
              className={`group flex flex-col items-center justify-center p-5 rounded-2xl border ${action.border} ${action.bg} transition-all duration-300 ${action.hover} ${action.shadow} cursor-pointer active:scale-95`}
            >
              <Icon className={`w-7 h-7 mb-3 ${action.color} transition-transform duration-300 group-hover:scale-110`} />
              <span className={`text-xs font-bold ${action.text}`}>
                {action.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
