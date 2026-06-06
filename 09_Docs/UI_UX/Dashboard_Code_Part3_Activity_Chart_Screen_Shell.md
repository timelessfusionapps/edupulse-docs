# EduPulse Dashboard — Code Documentation Part 3
## Activity Timeline, Points Chart, Quick Actions, Dashboard Screen & Shell Updates

> Code for **review only**. No project files created yet.

---

## 1. Activity Timeline Item

### `lib/features/dashboard/widgets/activity_timeline_item.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../models/activity_item.dart';

class ActivityTimelineItem extends StatelessWidget {
  final ActivityItem item;
  final bool isLast;

  const ActivityTimelineItem({
    super.key,
    required this.item,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline column: dot + line
          SizedBox(
            width: 24,
            child: Column(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: item.indicatorColor,
                      width: 2,
                    ),
                  ),
                  child: Icon(
                    _iconForType(item.type),
                    size: 12,
                    color: item.indicatorColor,
                  ),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      color: AppColors.borderSubtle.withValues(alpha: 0.2),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          // Content column
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(
                bottom: isLast ? 0 : AppSpacing.lg,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Rich text description
                  Text.rich(
                    TextSpan(
                      children: item.spans.map((span) {
                        return TextSpan(
                          text: span.text,
                          style: AppTypography.bodyMedium.copyWith(
                            fontWeight:
                                span.isBold ? FontWeight.w600 : FontWeight.w400,
                            color: span.color ?? AppColors.textPrimary,
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  // Timestamp
                  Text(
                    [item.timestamp, if (item.context != null) item.context]
                        .join(' • '),
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  IconData _iconForType(ActivityType type) {
    switch (type) {
      case ActivityType.pointsAwarded:
        return Icons.star_rounded;
      case ActivityType.milestone:
        return Icons.emoji_events_rounded;
      case ActivityType.competition:
        return Icons.military_tech_rounded;
      case ActivityType.event:
        return Icons.event_rounded;
    }
  }
}
```

---

## 2. Recent Activity Card

### `lib/features/dashboard/widgets/recent_activity_card.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';
import '../models/activity_item.dart';
import 'dashboard_section_header.dart';
import 'activity_timeline_item.dart';

class RecentActivityCard extends StatelessWidget {
  final List<ActivityItem> activities;
  final VoidCallback? onRefresh;

  const RecentActivityCard({
    super.key,
    required this.activities,
    this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: AppColors.borderSubtle.withValues(alpha: 0.2),
        ),
        boxShadow: AppShadows.card,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          DashboardSectionHeader(
            title: 'Recent Activity',
            trailing: IconButton(
              icon: const Icon(Icons.refresh, size: 20),
              color: AppColors.textSecondary,
              onPressed: onRefresh,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          ...List.generate(activities.length, (index) {
            return ActivityTimelineItem(
              item: activities[index],
              isLast: index == activities.length - 1,
            );
          }),
        ],
      ),
    );
  }
}
```

---

## 3. Points Chart Card

### `lib/features/dashboard/widgets/points_chart_card.dart` [NEW]

```dart
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';
import 'dashboard_section_header.dart';

class PointsChartCard extends StatelessWidget {
  final List<double> data; // 7 values (Mon–Sun)

  const PointsChartCard({super.key, required this.data});

  static const _dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @override
  Widget build(BuildContext context) {
    final maxValue = data.reduce((a, b) => a > b ? a : b);
    final highlightIndex = data.indexOf(maxValue);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: AppColors.borderSubtle.withValues(alpha: 0.2),
        ),
        boxShadow: AppShadows.card,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          DashboardSectionHeader(
            title: 'Points Distributed',
            subtitle: 'Past 7 Days',
            trailing: _buildDropdown(),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: 200,
            child: BarChart(
              BarChartData(
                alignment: BarChartAlignment.spaceAround,
                maxY: maxValue * 1.2,
                barTouchData: BarTouchData(
                  enabled: true,
                  touchTooltipData: BarTouchTooltipData(
                    getTooltipColor: (_) => AppColors.textPrimary,
                    tooltipRoundedRadius: 8,
                    getTooltipItem: (group, groupIndex, rod, rodIndex) {
                      return BarTooltipItem(
                        '${rod.toY.toInt()} pts',
                        AppTypography.chipLabel.copyWith(
                          color: AppColors.textInverse,
                        ),
                      );
                    },
                  ),
                ),
                titlesData: FlTitlesData(
                  show: true,
                  topTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  rightTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  leftTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        final index = value.toInt();
                        if (index < 0 || index >= _dayLabels.length) {
                          return const SizedBox.shrink();
                        }
                        return Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Text(
                            _dayLabels[index],
                            style: AppTypography.bodySmall.copyWith(
                              color: AppColors.textSecondary,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                gridData: FlGridData(
                  show: true,
                  drawVerticalLine: false,
                  horizontalInterval: maxValue / 4,
                  getDrawingHorizontalLine: (value) {
                    return FlLine(
                      color: AppColors.borderSubtle.withValues(alpha: 0.2),
                      strokeWidth: 1,
                      dashArray: [5, 5],
                    );
                  },
                ),
                barGroups: List.generate(data.length, (index) {
                  final isHighlight = index == highlightIndex;
                  return BarChartGroupData(
                    x: index,
                    barRods: [
                      BarChartRodData(
                        toY: data[index],
                        width: 32,
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(4),
                          topRight: Radius.circular(4),
                        ),
                        gradient: LinearGradient(
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                          colors: isHighlight
                              ? [AppColors.primary, AppColors.primaryAccent]
                              : [
                                  AppColors.primary.withValues(alpha: 0.3),
                                  AppColors.primary.withValues(alpha: 0.5),
                                ],
                        ),
                      ),
                    ],
                    showingTooltipIndicators:
                        isHighlight ? [0] : [],
                  );
                }),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderSm,
        border: Border.all(
          color: AppColors.borderSubtle.withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'All Houses',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(width: 4),
          const Icon(
            Icons.keyboard_arrow_down,
            size: 18,
            color: AppColors.textSecondary,
          ),
        ],
      ),
    );
  }
}
```

---

## 4. Quick Actions Row

### `lib/features/dashboard/widgets/quick_actions_row.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';

class QuickActionsRow extends StatelessWidget {
  const QuickActionsRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: AppColors.borderSubtle.withValues(alpha: 0.2),
        ),
        boxShadow: AppShadows.card,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Quick Actions', style: AppTypography.sectionTitle),
          const SizedBox(height: AppSpacing.md),
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: [
              _QuickActionButton(
                icon: Icons.star_rounded,
                label: 'Award Points',
                color: AppColors.primary,
                onTap: () {},
              ),
              _QuickActionButton(
                icon: Icons.event_rounded,
                label: 'Log Event',
                color: AppColors.success,
                onTap: () {},
              ),
              _QuickActionButton(
                icon: Icons.assessment_outlined,
                label: 'Generate Report',
                color: AppColors.info,
                onTap: () {},
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _QuickActionButton extends StatefulWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _QuickActionButton({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  State<_QuickActionButton> createState() => _QuickActionButtonState();
}

class _QuickActionButtonState extends State<_QuickActionButton> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          transform: _isPressed
              ? (Matrix4.identity()..scale(0.97))
              : Matrix4.identity(),
          transformAlignment: Alignment.center,
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.sm + 2,
          ),
          decoration: BoxDecoration(
            color: _isHovered
                ? widget.color.withValues(alpha: 0.08)
                : Colors.transparent,
            borderRadius: AppRadius.borderMd,
            border: Border.all(
              color: _isHovered
                  ? widget.color.withValues(alpha: 0.3)
                  : AppColors.borderSubtle.withValues(alpha: 0.3),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(widget.icon, size: 18, color: widget.color),
              const SizedBox(width: AppSpacing.sm),
              Text(
                widget.label,
                style: AppTypography.labelSmall.copyWith(
                  color: _isHovered
                      ? widget.color
                      : AppColors.textPrimary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

---

## 5. Dashboard Screen

### `lib/features/dashboard/presentation/dashboard_screen.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_breakpoints.dart';
import '../bloc/dashboard_bloc.dart';
import '../bloc/dashboard_event.dart';
import '../bloc/dashboard_state.dart';
import '../widgets/greeting_header.dart';
import '../widgets/kpi_grid.dart';
import '../widgets/house_leaderboard_card.dart';
import '../widgets/upcoming_events_card.dart';
import '../widgets/quick_actions_row.dart';
import '../widgets/recent_activity_card.dart';
import '../widgets/points_chart_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => DashboardBloc()..add(LoadDashboard()),
      child: const _DashboardView(),
    );
  }
}

class _DashboardView extends StatelessWidget {
  const _DashboardView();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DashboardBloc, DashboardState>(
      builder: (context, state) {
        if (state.status == DashboardStatus.loading ||
            state.status == DashboardStatus.initial) {
          return const Center(child: CircularProgressIndicator());
        }

        return SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.contentPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Greeting
              const GreetingHeader(userName: 'Principal'),
              const SizedBox(height: AppSpacing.lg),
              // KPI Grid
              KpiGrid(kpis: state.kpis),
              const SizedBox(height: AppSpacing.lg),
              // Main content: responsive 2-column / single-column
              LayoutBuilder(
                builder: (context, constraints) {
                  if (constraints.maxWidth >= AppBreakpoints.tablet) {
                    return _buildTwoColumnLayout(context, state);
                  }
                  return _buildSingleColumnLayout(context, state);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTwoColumnLayout(
      BuildContext context, DashboardState state) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Left column (60%)
        Expanded(
          flex: 6,
          child: Column(
            children: [
              HouseLeaderboardCard(
                standings: state.standings,
                selectedTabIndex: state.leaderboardTabIndex,
                onTabChanged: (index) {
                  context
                      .read<DashboardBloc>()
                      .add(ChangeLeaderboardTab(index));
                },
              ),
              const SizedBox(height: AppSpacing.lg),
              UpcomingEventsCard(events: state.events),
            ],
          ),
        ),
        const SizedBox(width: AppSpacing.lg),
        // Right column (40%)
        Expanded(
          flex: 4,
          child: Column(
            children: [
              const QuickActionsRow(),
              const SizedBox(height: AppSpacing.lg),
              RecentActivityCard(
                activities: state.activities,
                onRefresh: () {
                  context.read<DashboardBloc>().add(RefreshDashboard());
                },
              ),
              const SizedBox(height: AppSpacing.lg),
              PointsChartCard(data: state.chartData),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSingleColumnLayout(
      BuildContext context, DashboardState state) {
    return Column(
      children: [
        HouseLeaderboardCard(
          standings: state.standings,
          selectedTabIndex: state.leaderboardTabIndex,
          onTabChanged: (index) {
            context.read<DashboardBloc>().add(ChangeLeaderboardTab(index));
          },
        ),
        const SizedBox(height: AppSpacing.lg),
        const QuickActionsRow(),
        const SizedBox(height: AppSpacing.lg),
        UpcomingEventsCard(events: state.events),
        const SizedBox(height: AppSpacing.lg),
        RecentActivityCard(
          activities: state.activities,
          onRefresh: () {
            context.read<DashboardBloc>().add(RefreshDashboard());
          },
        ),
        const SizedBox(height: AppSpacing.lg),
        PointsChartCard(data: state.chartData),
      ],
    );
  }
}
```

---

## 6. Shell Updates

### 6.1 `app_shell_screen.dart` — Updated Navigation Items [MODIFY]

Replace the `_navItems` list with Figma sidebar items:

```dart
// Replace the existing _navItems in AppShellScreen
static const List<NavigationItem> _navItems = [
  NavigationItem(
    label: 'Dashboard',
    route: AppRoutes.dashboard,
    icon: Icons.dashboard_outlined,
    activeIcon: Icons.dashboard,
  ),
  NavigationItem(
    label: 'House Pulse',
    route: '/house-pulse',
    icon: Icons.home_outlined,
    activeIcon: Icons.home,
  ),
  NavigationItem(
    label: 'Leaderboards',
    route: '/leaderboards',
    icon: Icons.leaderboard_outlined,
    activeIcon: Icons.leaderboard,
  ),
  NavigationItem(
    label: 'Student Directory',
    route: '/students',
    icon: Icons.people_outline,
    activeIcon: Icons.people,
  ),
  NavigationItem(
    label: 'Impact Analytics',
    route: '/analytics',
    icon: Icons.analytics_outlined,
    activeIcon: Icons.analytics,
  ),
  NavigationItem(
    label: 'School Settings',
    route: '/settings',
    icon: Icons.settings_outlined,
    activeIcon: Icons.settings,
  ),
];
```

Also remove `BreadcrumbHeader` from `_buildBody()` for the dashboard route — the greeting header replaces it.

### 6.2 `app_router.dart` — Swap Demo Screen [MODIFY]

```dart
// Replace this import:
// import '../../features/app_shell/presentation/demo_dashboard_screen.dart';
// With:
import '../../features/dashboard/presentation/dashboard_screen.dart';

// In the routes list, change:
// builder: (context, state) => const DemoDashboardScreen(),
// To:
// builder: (context, state) => const DashboardScreen(),
```

### 6.3 `pubspec.yaml` — Add fl_chart [MODIFY]

```yaml
# Add under dependencies:
  fl_chart: ^0.71.0
```

---

## File Checklist Summary

| # | File | Action | Part |
|---|------|--------|------|
| 1 | `theme/tokens/app_colors.dart` | MODIFY | 1 |
| 2 | `theme/tokens/app_typography.dart` | MODIFY | 1 |
| 3 | `theme/tokens/app_shadows.dart` | NEW | 1 |
| 4 | `theme/tokens/app_spacing.dart` | MODIFY | 1 |
| 5 | `dashboard/models/kpi_data.dart` | NEW | 1 |
| 6 | `dashboard/models/house_standing.dart` | NEW | 1 |
| 7 | `dashboard/models/activity_item.dart` | NEW | 1 |
| 8 | `dashboard/models/event_data.dart` | NEW | 1 |
| 9 | `dashboard/bloc/dashboard_event.dart` | NEW | 1 |
| 10 | `dashboard/bloc/dashboard_state.dart` | NEW | 1 |
| 11 | `dashboard/bloc/dashboard_bloc.dart` | NEW | 1 |
| 12 | `dashboard/widgets/dashboard_section_header.dart` | NEW | 2 |
| 13 | `dashboard/widgets/greeting_header.dart` | NEW | 2 |
| 14 | `dashboard/widgets/kpi_card.dart` | NEW | 2 |
| 15 | `dashboard/widgets/kpi_grid.dart` | NEW | 2 |
| 16 | `dashboard/widgets/leaderboard_row.dart` | NEW | 2 |
| 17 | `dashboard/widgets/house_leaderboard_card.dart` | NEW | 2 |
| 18 | `dashboard/widgets/event_item.dart` | NEW | 2 |
| 19 | `dashboard/widgets/upcoming_events_card.dart` | NEW | 2 |
| 20 | `dashboard/widgets/activity_timeline_item.dart` | NEW | 3 |
| 21 | `dashboard/widgets/recent_activity_card.dart` | NEW | 3 |
| 22 | `dashboard/widgets/points_chart_card.dart` | NEW | 3 |
| 23 | `dashboard/widgets/quick_actions_row.dart` | NEW | 3 |
| 24 | `dashboard/presentation/dashboard_screen.dart` | NEW | 3 |
| 25 | `app_shell_screen.dart` | MODIFY | 3 |
| 26 | `app_router.dart` | MODIFY | 3 |
| 27 | `demo_dashboard_screen.dart` | DELETE | 3 |
| 28 | `pubspec.yaml` | MODIFY | 3 |

**Total: 24 new files, 4 modified, 1 deleted**
