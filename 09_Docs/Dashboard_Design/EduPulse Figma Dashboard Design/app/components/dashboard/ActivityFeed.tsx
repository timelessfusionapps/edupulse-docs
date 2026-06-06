import { Activity, Trophy, Star, Target, Flag } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const activities = [
  {
    id: 1,
    user: "Sarah Jenkins",
    action: "awarded 50 points to",
    target: "Alex Morgan",
    reason: "Exceptional Science Project",
    time: "10 mins ago",
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    avatar: "https://images.unsplash.com/photo-1591259000869-707002167640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwc3R1ZGVudCUyMGJveSUyMGZhY2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg1MDYyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    points: "+50",
    pointsColor: "text-emerald-700 bg-emerald-100 border-emerald-200"
  },
  {
    id: 2,
    user: "Ignis House",
    action: "completed the",
    target: "Weekly Fitness Challenge",
    reason: "1st Place",
    time: "1 hour ago",
    icon: Trophy,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    avatar: null,
    points: "+500",
    pointsColor: "text-rose-700 bg-rose-100 border-rose-200"
  },
  {
    id: 3,
    user: "Mr. Davis",
    action: "created a new event:",
    target: "Inter-House Debate",
    reason: "Open for registration",
    time: "3 hours ago",
    icon: Flag,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-500",
    avatar: null,
    points: null,
    pointsColor: ""
  },
  {
    id: 4,
    user: "Emma Watson",
    action: "achieved a",
    target: "7-Day Streak",
    reason: "Perfect Attendance",
    time: "5 hours ago",
    icon: Target,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
    avatar: "https://images.unsplash.com/photo-1753161024003-4514ef3fb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwc3R1ZGVudCUyMGdpcmwlMjBmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTA2MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: "+20",
    pointsColor: "text-emerald-700 bg-emerald-100 border-emerald-200"
  }
];

export function ActivityFeed() {
  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm h-full ring-1 ring-black/[0.02]">
      <div className="flex items-center justify-between mb-8 px-1">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-lg">
            <Activity className="w-5 h-5 text-slate-600" />
          </div>
          Recent Activity
        </h2>
        <button className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">View All</button>
      </div>

      <div className="relative pl-2">
        <div className="absolute top-4 bottom-4 left-[26px] w-0.5 bg-slate-100 rounded-full"></div>
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative flex items-start gap-5 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${activity.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                  {activity.avatar ? (
                    <ImageWithFallback src={activity.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-1.5">
                  <p className="text-sm text-slate-600 leading-snug">
                    <span className="font-extrabold text-slate-900">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-bold text-slate-800">{activity.target}</span>
                  </p>
                  <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-2">
                    <span>{activity.reason}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{activity.time}</span>
                  </p>
                </div>
                {activity.points && (
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${activity.pointsColor} shrink-0 mt-1`}>
                    {activity.points}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
