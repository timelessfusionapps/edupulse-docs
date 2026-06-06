# EduPulse Dashboard — Code Documentation Part 1
## Tokens, Models & BLoC

> This document contains all code for **review only**. No files have been created yet.
> Upon approval, these will be implemented into the project.

---

## 1. Design Tokens

### 1.1 `lib/theme/tokens/app_colors.dart` [MODIFY]

```dart
import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // ── Brand Colors (merged: existing indigo + Figma warmth) ──
  static const Color primary = Color(0xFF4648D4);
  static const Color primaryLight = Color(0xFF6063EE);
  static const Color primaryDark = Color(0xFF3730A3);
  static const Color primaryAccent = Color(0xFF8B5CF6);

  // ── Backgrounds & Surfaces ──
  static const Color background = Color(0xFFFCF8FF);
  static const Color surface = Colors.white;
  static const Color surfaceTinted = Color(0xFFF5F2FE);
  static const Color searchField = Color(0xFFE9E6F3);
  static const Color darkBackground = Color(0xFF111827);
  static const Color darkSurface = Color(0xFF1F2937);

  // ── Semantic Colors ──
  static const Color success = Color(0xFF22C55E);
  static const Color danger = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);

  // ── Text Colors ──
  static const Color textPrimary = Color(0xFF1B1B23);
  static const Color textSecondary = Color(0xFF464554);
  static const Color textTertiary = Color(0xFF6B7280);
  static const Color textInverse = Colors.white;

  // ── Borders ──
  static const Color border = Color(0xFFE5E7EB);
  static const Color borderSubtle = Color(0xFFC7C4D7);

  // ── House Colors ──
  static const Color houseIgnis = Color(0xFFEF4444);
  static const Color houseAqua = Color(0xFF3B82F6);
  static const Color houseTerra = Color(0xFF22C55E);
  static const Color houseAether = Color(0xFF8B5CF6);

  // ── House Background Tints (10% opacity equivalents) ──
  static const Color houseIgnisBg = Color(0xFFFEF2F2);
  static const Color houseAquaBg = Color(0xFFEFF6FF);
  static const Color houseTerraBg = Color(0xFFF0FDF4);
  static const Color houseAetherBg = Color(0xFFF5F3FF);
}
```

### 1.2 `lib/theme/tokens/app_typography.dart` [MODIFY]

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTypography {
  AppTypography._();

  // ── Headings ──
  static final TextStyle h1 = GoogleFonts.inter(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  );

  static final TextStyle h2 = GoogleFonts.inter(
    fontSize: 24,
    fontWeight: FontWeight.w700,
  );

  static final TextStyle h3 = GoogleFonts.inter(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  // ── Body ──
  static final TextStyle bodyLarge = GoogleFonts.inter(
    fontSize: 16,
    fontWeight: FontWeight.normal,
  );

  static final TextStyle bodyMedium = GoogleFonts.inter(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    height: 1.5,
  );

  static final TextStyle bodySmall = GoogleFonts.inter(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    height: 1.5,
  );

  // ── Labels ──
  static final TextStyle labelLarge = GoogleFonts.inter(
    fontSize: 14,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle labelSmall = GoogleFonts.inter(
    fontSize: 12,
    fontWeight: FontWeight.w600,
  );

  // ── Dashboard-Specific ──
  static final TextStyle kpiValue = GoogleFonts.inter(
    fontSize: 36,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
    height: 1.2,
  );

  static final TextStyle kpiLabel = GoogleFonts.inter(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.5,
    letterSpacing: 0.3,
  );

  static final TextStyle chipLabel = GoogleFonts.inter(
    fontSize: 10,
    fontWeight: FontWeight.w700,
    height: 1.5,
    letterSpacing: 0.5,
  );

  static final TextStyle navLabel = GoogleFonts.inter(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static final TextStyle sectionTitle = GoogleFonts.inter(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );
}
```

### 1.3 `lib/theme/tokens/app_shadows.dart` [NEW]

```dart
import 'package:flutter/material.dart';

class AppShadows {
  AppShadows._();

  /// Standard card elevation shadow
  static const List<BoxShadow> card = [
    BoxShadow(
      color: Color(0x0C4648D4),
      blurRadius: 12,
      offset: Offset(0, 4),
    ),
  ];

  /// Elevated card shadow (hover state)
  static const List<BoxShadow> cardElevated = [
    BoxShadow(
      color: Color(0x194648D4),
      blurRadius: 20,
      offset: Offset(0, 8),
    ),
  ];

  /// Sidebar shadow
  static const List<BoxShadow> sidebar = [
    BoxShadow(
      color: Color(0x0C000000),
      blurRadius: 2,
      offset: Offset(0, 1),
    ),
  ];

  /// Chart bar glow (active bar)
  static const List<BoxShadow> chartGlow = [
    BoxShadow(
      color: Color(0x4C4648D4),
      blurRadius: 10,
      offset: Offset(0, 0),
    ),
  ];
}
```

### 1.4 `lib/theme/tokens/app_spacing.dart` [MODIFY]

```dart
class AppSpacing {
  AppSpacing._();

  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;

  // ── Dashboard Layout Constants ──
  static const double sectionGap = 24.0;
  static const double cardPadding = 24.0;
  static const double sidebarWidth = 280.0;
  static const double sidebarCollapsedWidth = 80.0;
  static const double topBarHeight = 64.0;
  static const double contentPadding = 32.0;
}
```

---

## 2. Data Models

### 2.1 `lib/features/dashboard/models/kpi_data.dart` [NEW]

```dart
import 'package:flutter/material.dart';

enum KpiTrend { up, down, neutral }

class KpiData {
  final String title;
  final String value;
  final IconData icon;
  final Color iconColor;
  final Color iconBgColor;
  final KpiTrend trend;
  final String trendValue;

  const KpiData({
    required this.title,
    required this.value,
    required this.icon,
    required this.iconColor,
    required this.iconBgColor,
    this.trend = KpiTrend.neutral,
    this.trendValue = '',
  });
}
```

### 2.2 `lib/features/dashboard/models/house_standing.dart` [NEW]

```dart
import 'package:flutter/material.dart';

class HouseStanding {
  final int rank;
  final String name;
  final int points;
  final Color color;
  final Color bgColor;
  final double progress; // 0.0 to 1.0 relative to max
  final KpiTrend trend;

  const HouseStanding({
    required this.rank,
    required this.name,
    required this.points,
    required this.color,
    required this.bgColor,
    required this.progress,
    this.trend = KpiTrend.neutral,
  });
}

enum KpiTrend { up, down, neutral }
```

> **Note**: `KpiTrend` is defined in both models for now. During implementation we'll extract it to a shared enum file to avoid duplication.

### 2.3 `lib/features/dashboard/models/activity_item.dart` [NEW]

```dart
import 'package:flutter/material.dart';

enum ActivityType { pointsAwarded, milestone, competition, event }

class ActivityItem {
  final ActivityType type;
  final List<ActivitySpan> spans;
  final String timestamp;
  final String? context; // e.g. "Ignis House"
  final Color indicatorColor;

  const ActivityItem({
    required this.type,
    required this.spans,
    required this.timestamp,
    this.context,
    required this.indicatorColor,
  });
}

/// Represents a styled segment in an activity description.
/// e.g. "Mr. Davis" (bold), " awarded " (normal), "50 pts" (colored)
class ActivitySpan {
  final String text;
  final bool isBold;
  final Color? color; // null = default text color

  const ActivitySpan(
    this.text, {
    this.isBold = false,
    this.color,
  });
}
```

### 2.4 `lib/features/dashboard/models/event_data.dart` [NEW]

```dart
enum EventStatus { live, upcoming, draft }

class EventData {
  final String title;
  final String category;
  final String dateLabel; // e.g. "15"
  final String monthLabel; // e.g. "MAY"
  final String timeRange; // e.g. "9:00 AM – 2:00 PM"
  final EventStatus status;
  final int rsvpCount;

  const EventData({
    required this.title,
    required this.category,
    required this.dateLabel,
    required this.monthLabel,
    this.timeRange = '',
    this.status = EventStatus.upcoming,
    this.rsvpCount = 0,
  });
}
```

---

## 3. Dashboard BLoC

### 3.1 `lib/features/dashboard/bloc/dashboard_event.dart` [NEW]

```dart
import 'package:equatable/equatable.dart';

abstract class DashboardEvent extends Equatable {
  const DashboardEvent();

  @override
  List<Object?> get props => [];
}

class LoadDashboard extends DashboardEvent {}

class RefreshDashboard extends DashboardEvent {}

class ChangeLeaderboardTab extends DashboardEvent {
  final int tabIndex;
  const ChangeLeaderboardTab(this.tabIndex);

  @override
  List<Object?> get props => [tabIndex];
}
```

### 3.2 `lib/features/dashboard/bloc/dashboard_state.dart` [NEW]

```dart
import 'package:equatable/equatable.dart';
import '../models/kpi_data.dart';
import '../models/house_standing.dart';
import '../models/activity_item.dart';
import '../models/event_data.dart';

enum DashboardStatus { initial, loading, loaded, error }

class DashboardState extends Equatable {
  final DashboardStatus status;
  final List<KpiData> kpis;
  final List<HouseStanding> standings;
  final List<ActivityItem> activities;
  final List<EventData> events;
  final List<double> chartData; // 7 values for M-S
  final int leaderboardTabIndex;
  final String? errorMessage;

  const DashboardState({
    this.status = DashboardStatus.initial,
    this.kpis = const [],
    this.standings = const [],
    this.activities = const [],
    this.events = const [],
    this.chartData = const [],
    this.leaderboardTabIndex = 0,
    this.errorMessage,
  });

  DashboardState copyWith({
    DashboardStatus? status,
    List<KpiData>? kpis,
    List<HouseStanding>? standings,
    List<ActivityItem>? activities,
    List<EventData>? events,
    List<double>? chartData,
    int? leaderboardTabIndex,
    String? errorMessage,
  }) {
    return DashboardState(
      status: status ?? this.status,
      kpis: kpis ?? this.kpis,
      standings: standings ?? this.standings,
      activities: activities ?? this.activities,
      events: events ?? this.events,
      chartData: chartData ?? this.chartData,
      leaderboardTabIndex: leaderboardTabIndex ?? this.leaderboardTabIndex,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
        status,
        kpis,
        standings,
        activities,
        events,
        chartData,
        leaderboardTabIndex,
        errorMessage,
      ];
}
```

### 3.3 `lib/features/dashboard/bloc/dashboard_bloc.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../theme/tokens/app_colors.dart';
import '../models/kpi_data.dart';
import '../models/house_standing.dart';
import '../models/activity_item.dart';
import '../models/event_data.dart';
import 'dashboard_event.dart';
import 'dashboard_state.dart';

class DashboardBloc extends Bloc<DashboardEvent, DashboardState> {
  DashboardBloc() : super(const DashboardState()) {
    on<LoadDashboard>(_onLoadDashboard);
    on<RefreshDashboard>(_onRefreshDashboard);
    on<ChangeLeaderboardTab>(_onChangeLeaderboardTab);
  }

  Future<void> _onLoadDashboard(
    LoadDashboard event,
    Emitter<DashboardState> emit,
  ) async {
    emit(state.copyWith(status: DashboardStatus.loading));

    // Simulate network delay — replace with Firestore later
    await Future.delayed(const Duration(milliseconds: 600));

    emit(state.copyWith(
      status: DashboardStatus.loaded,
      kpis: _demoKpis,
      standings: _demoStandings,
      activities: _demoActivities,
      events: _demoEvents,
      chartData: _demoChartData,
    ));
  }

  Future<void> _onRefreshDashboard(
    RefreshDashboard event,
    Emitter<DashboardState> emit,
  ) async {
    emit(state.copyWith(status: DashboardStatus.loading));
    await Future.delayed(const Duration(milliseconds: 400));
    emit(state.copyWith(status: DashboardStatus.loaded));
  }

  void _onChangeLeaderboardTab(
    ChangeLeaderboardTab event,
    Emitter<DashboardState> emit,
  ) {
    emit(state.copyWith(leaderboardTabIndex: event.tabIndex));
  }

  // ── Demo Data ──

  static final List<KpiData> _demoKpis = [
    const KpiData(
      title: 'Total Students',
      value: '1,245',
      icon: Icons.people_outline,
      iconColor: AppColors.primary,
      iconBgColor: Color(0xFFEEF2FF),
      trend: KpiTrend.up,
      trendValue: '+12%',
    ),
    const KpiData(
      title: 'Points Awarded',
      value: '8,420',
      icon: Icons.star_outline,
      iconColor: AppColors.warning,
      iconBgColor: Color(0xFFFFFBEB),
      trend: KpiTrend.up,
      trendValue: '+18%',
    ),
    const KpiData(
      title: 'Active Events',
      value: '12',
      icon: Icons.event_outlined,
      iconColor: AppColors.success,
      iconBgColor: Color(0xFFF0FDF4),
      trend: KpiTrend.neutral,
      trendValue: '',
    ),
    const KpiData(
      title: 'Participation',
      value: '87%',
      icon: Icons.trending_up,
      iconColor: AppColors.info,
      iconBgColor: Color(0xFFEFF6FF),
      trend: KpiTrend.up,
      trendValue: '+5%',
    ),
  ];

  static const List<HouseStanding> _demoStandings = [
    HouseStanding(
      rank: 1,
      name: 'Ignis',
      points: 3250,
      color: AppColors.houseIgnis,
      bgColor: AppColors.houseIgnisBg,
      progress: 1.0,
      trend: KpiTrend.up,
    ),
    HouseStanding(
      rank: 2,
      name: 'Terra',
      points: 2980,
      color: AppColors.houseTerra,
      bgColor: AppColors.houseTerraBg,
      progress: 0.917,
      trend: KpiTrend.up,
    ),
    HouseStanding(
      rank: 3,
      name: 'Aqua',
      points: 2710,
      color: AppColors.houseAqua,
      bgColor: AppColors.houseAquaBg,
      progress: 0.834,
      trend: KpiTrend.down,
    ),
    HouseStanding(
      rank: 4,
      name: 'Aether',
      points: 2450,
      color: AppColors.houseAether,
      bgColor: AppColors.houseAetherBg,
      progress: 0.754,
      trend: KpiTrend.neutral,
    ),
  ];

  static final List<ActivityItem> _demoActivities = [
    ActivityItem(
      type: ActivityType.pointsAwarded,
      spans: [
        const ActivitySpan('Mr. Davis', isBold: true),
        const ActivitySpan(' awarded '),
        ActivitySpan('50 pts', isBold: true, color: AppColors.primary),
        const ActivitySpan(' to '),
        const ActivitySpan('Sarah Jenkins', isBold: true),
        const ActivitySpan(' for Excellence in Lab Work.'),
      ],
      timestamp: '10 mins ago',
      context: 'Ignis House',
      indicatorColor: AppColors.primary,
    ),
    ActivityItem(
      type: ActivityType.milestone,
      spans: [
        ActivitySpan('Terra House', isBold: true, color: AppColors.houseTerra),
        const ActivitySpan(' reached a new milestone: '),
        const ActivitySpan('3,000 Total Points', isBold: true),
        const ActivitySpan('!'),
      ],
      timestamp: '1 hour ago',
      indicatorColor: AppColors.houseTerra,
    ),
    ActivityItem(
      type: ActivityType.competition,
      spans: [
        const ActivitySpan('New Competition', isBold: true),
        const ActivitySpan(
            ' created: "Mathletes Fall Challenge" starts tomorrow.'),
      ],
      timestamp: '3 hours ago',
      context: 'Academic',
      indicatorColor: AppColors.primaryAccent,
    ),
  ];

  static const List<EventData> _demoEvents = [
    EventData(
      title: 'Science Fair 2025',
      category: 'Academic',
      dateLabel: '15',
      monthLabel: 'MAY',
      timeRange: '9:00 AM – 2:00 PM',
      status: EventStatus.live,
      rsvpCount: 120,
    ),
    EventData(
      title: 'Inter-House Debate',
      category: 'Competition',
      dateLabel: '18',
      monthLabel: 'MAY',
      timeRange: '10:00 AM – 12:00 PM',
      status: EventStatus.upcoming,
      rsvpCount: 85,
    ),
    EventData(
      title: 'Sports Day',
      category: 'Sports',
      dateLabel: '22',
      monthLabel: 'MAY',
      timeRange: '8:00 AM – 4:00 PM',
      status: EventStatus.upcoming,
      rsvpCount: 340,
    ),
  ];

  static const List<double> _demoChartData = [120, 180, 255, 135, 210, 190, 165];
}
```

---

## Next: Part 2

Part 2 will cover the **Dashboard Widgets** (KPI Card, KPI Grid, Leaderboard, Events).

Part 3 will cover **Activity Timeline, Points Chart, Quick Actions, Dashboard Screen, and Shell Updates**.
