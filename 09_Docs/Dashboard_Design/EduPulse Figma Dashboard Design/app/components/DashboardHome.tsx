import { Header } from "./dashboard/Header";
import { KPIGrid } from "./dashboard/KPIGrid";
import { LiveLeaderboard } from "./dashboard/LiveLeaderboard";
import { QuickActions } from "./dashboard/QuickActions";
import { PerformanceChart } from "./dashboard/PerformanceChart";
import { UpcomingEvents } from "./dashboard/UpcomingEvents";
import { ActivityFeed } from "./dashboard/ActivityFeed";
import { StudentHighlights } from "./dashboard/StudentHighlights";

export function DashboardHome() {
  return (
    <div className="max-w-[1600px] mx-auto pb-12">
      {/* 1. Header */}
      <Header />

      {/* 2. KPI Grid */}
      <KPIGrid />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6 pb-8">
        {/* Row 3: Leaderboard & Quick Actions */}
        <div className="col-span-12 xl:col-span-8">
          <LiveLeaderboard />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <QuickActions />
        </div>

        {/* Row 4: Performance Chart & Upcoming Events */}
        <div className="col-span-12 xl:col-span-8">
          <PerformanceChart />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <UpcomingEvents />
        </div>

        {/* Row 5: Activity Feed & Student Highlights */}
        <div className="col-span-12 xl:col-span-6">
          <ActivityFeed />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <StudentHighlights />
        </div>
      </div>
    </div>
  );
}
