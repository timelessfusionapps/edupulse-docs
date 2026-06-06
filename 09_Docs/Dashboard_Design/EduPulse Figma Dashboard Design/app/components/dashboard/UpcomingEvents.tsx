import { Calendar as CalendarIcon, Clock, Users, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Annual Sports Day",
    date: "Oct 24",
    time: "08:00 AM",
    participants: 450,
    type: "School Wide",
    color: "bg-indigo-500",
    bgLight: "bg-indigo-50",
  },
  {
    title: "Science Fair '26",
    date: "Oct 28",
    time: "10:00 AM",
    participants: 120,
    type: "Competition",
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50",
  },
  {
    title: "Inter-House Debate",
    date: "Nov 02",
    time: "02:00 PM",
    participants: 48,
    type: "House Event",
    color: "bg-amber-500",
    bgLight: "bg-amber-50",
  },
  {
    title: "Art Exhibition",
    date: "Nov 05",
    time: "09:00 AM",
    participants: 200,
    type: "Exhibition",
    color: "bg-rose-500",
    bgLight: "bg-rose-50",
  },
];

export function UpcomingEvents() {
  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm h-full ring-1 ring-black/[0.02] flex flex-col">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-600" />
          Upcoming Events
        </h2>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {events.map((event, i) => (
          <div key={i} className="group flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/60 cursor-pointer">
            <div className={`flex flex-col items-center justify-center min-w-[3.5rem] h-[3.5rem] rounded-xl ${event.bgLight} text-slate-700 group-hover:scale-105 transition-transform`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{event.date.split(" ")[0]}</span>
              <span className="text-lg font-black">{event.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{event.title}</h4>
              <div className="flex items-center gap-3 mt-1 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {event.participants}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center pr-2">
              <div className={`w-2.5 h-2.5 rounded-full ${event.color} shadow-sm`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
