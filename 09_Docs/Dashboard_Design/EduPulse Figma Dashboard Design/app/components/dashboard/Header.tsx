import { Bell, Search, Flame, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export function Header() {
  const today = format(new Date(), "EEEE, MMMM d");

  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50 inline-flex">
            {today}
          </p>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-orange-600 text-sm font-bold shadow-sm">
            <Flame className="w-4 h-4 fill-orange-500" />
            14 Day Streak
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Good Morning, Principal Jenkins
        </h1>
        
        <div className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200/60 px-4 py-2.5 rounded-xl shadow-sm max-w-max">
          <div className="flex h-6 w-6 rounded-full bg-emerald-100 items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="text-sm">
            School engagement is up <span className="font-bold text-emerald-600">18%</span> this week. <span className="text-slate-500">Incredible work!</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 xl:w-72 group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search students, events, houses..." 
            className="pl-10 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-full shadow-sm placeholder:text-slate-400 font-medium text-slate-800"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
            <kbd className="font-sans px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-semibold text-slate-400">⌘</kbd>
            <kbd className="font-sans px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-semibold text-slate-400">K</kbd>
          </div>
        </div>
        <button className="relative p-3 bg-white border border-slate-200/80 rounded-2xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95 group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}
