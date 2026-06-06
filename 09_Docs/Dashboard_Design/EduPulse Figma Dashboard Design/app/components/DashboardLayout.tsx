import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Trophy, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Sparkles,
  Zap
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Students", href: "/students", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans selection:bg-indigo-500/30">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white border-r border-slate-200/60 
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        flex flex-col
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100/50">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl shadow-inner shadow-white/20">
              <Zap className="w-5 h-5 text-white fill-white/20" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              EduPulse
            </span>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          <div className="px-4 mb-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">Menu</div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-500/10" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:scale-110 group-hover:text-slate-600"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 m-4 bg-slate-50 border border-slate-200/50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer ring-1 ring-black/[0.02] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcHJpbmNpcGFsJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTA2MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-white"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Sarah Jenkins</p>
              <p className="text-xs text-slate-500 truncate">Principal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">EduPulse</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200/50"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 md:px-10 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
