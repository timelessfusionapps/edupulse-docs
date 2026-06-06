import { Medal, Flame, Star, Award, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const students = [
  {
    name: "Alex Morgan",
    grade: "Year 10",
    achievement: "Top Earner",
    detail: "450 pts this week",
    icon: Medal,
    color: "text-amber-500",
    bg: "bg-amber-100",
    avatar: "https://images.unsplash.com/photo-1591259000869-707002167640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwc3R1ZGVudCUyMGJveSUyMGZhY2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg1MDYyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Emma Watson",
    grade: "Year 11",
    achievement: "Longest Streak",
    detail: "14 Days Active",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-100",
    avatar: "https://images.unsplash.com/photo-1753161024003-4514ef3fb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwc3R1ZGVudCUyMGdpcmwlMjBmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTA2MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "David Chen",
    grade: "Year 9",
    achievement: "New Badge",
    detail: "Science Innovator",
    icon: Award,
    color: "text-violet-500",
    bg: "bg-violet-100",
    avatar: null
  }
];

export function StudentHighlights() {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm h-full ring-1 ring-black/[0.02] flex flex-col">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 rounded-lg">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          </div>
          Student Highlights
        </h2>
        <button className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
          All Students
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 flex-1">
        {students.map((student, i) => {
          const Icon = student.icon;
          return (
            <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200/60 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r hover:from-slate-50 hover:to-white">
              <div className="relative">
                {student.avatar ? (
                  <ImageWithFallback src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-xl text-slate-500 shadow-sm border-2 border-white">
                    {student.name.charAt(0)}
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white ${student.bg} shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-3.5 h-3.5 ${student.color}`} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 truncate group-hover:text-amber-600 transition-colors">{student.name}</h4>
                <p className="text-xs font-semibold text-slate-500">{student.grade}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${student.color}`}>{student.achievement}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{student.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
