# EduPulse Dashboard — Code Documentation Part 2
## Dashboard Widgets: KPI, Leaderboard & Events

> Code for **review only**. No project files created yet.

---

## 1. Dashboard Section Header (reusable)

### `lib/features/dashboard/widgets/dashboard_section_header.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';

class DashboardSectionHeader extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget? trailing;

  const DashboardSectionHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(title, style: AppTypography.sectionTitle),
              if (subtitle != null)
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Text(
                    subtitle!,
                    style: AppTypography.bodyMedium.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (trailing != null) trailing!,
      ],
    );
  }
}
```

---

## 2. Greeting Header

### `lib/features/dashboard/widgets/greeting_header.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';

class GreetingHeader extends StatelessWidget {
  final String userName;

  const GreetingHeader({super.key, this.userName = 'Admin'});

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  IconData get _greetingIcon {
    final hour = DateTime.now().hour;
    if (hour < 12) return Icons.wb_sunny_outlined;
    if (hour < 17) return Icons.wb_cloudy_outlined;
    return Icons.nights_stay_outlined;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(_greetingIcon, color: AppColors.warning, size: 24),
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    '$_greeting, $userName',
                    style: AppTypography.h2.copyWith(
                      color: AppColors.textPrimary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                'Your school engagement is looking great today.',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

---

## 3. KPI Card

### `lib/features/dashboard/widgets/kpi_card.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';
import '../models/kpi_data.dart';

class KpiCard extends StatefulWidget {
  final KpiData data;

  const KpiCard({super.key, required this.data});

  @override
  State<KpiCard> createState() => _KpiCardState();
}

class _KpiCardState extends State<KpiCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        transform: _isHovered
            ? (Matrix4.identity()..translate(0.0, -2.0))
            : Matrix4.identity(),
        padding: const EdgeInsets.all(AppSpacing.cardPadding),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: AppColors.borderSubtle.withValues(alpha: 0.2),
          ),
          boxShadow: _isHovered ? AppShadows.cardElevated : AppShadows.card,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: widget.data.iconBgColor,
                    borderRadius: AppRadius.borderMd,
                  ),
                  child: Icon(
                    widget.data.icon,
                    color: widget.data.iconColor,
                    size: 20,
                  ),
                ),
                const Spacer(),
                if (widget.data.trend != KpiTrend.neutral)
                  _buildTrendChip(),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              widget.data.title,
              style: AppTypography.kpiLabel.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              widget.data.value,
              style: AppTypography.kpiValue.copyWith(
                color: AppColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTrendChip() {
    final isUp = widget.data.trend == KpiTrend.up;
    final color = isUp ? AppColors.success : AppColors.danger;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderPill,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isUp ? Icons.trending_up : Icons.trending_down,
            size: 12,
            color: color,
          ),
          const SizedBox(width: 4),
          Text(
            widget.data.trendValue,
            style: AppTypography.chipLabel.copyWith(color: color),
          ),
        ],
      ),
    );
  }
}
```

---

## 4. KPI Grid

### `lib/features/dashboard/widgets/kpi_grid.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_breakpoints.dart';
import '../models/kpi_data.dart';
import 'kpi_card.dart';

class KpiGrid extends StatelessWidget {
  final List<KpiData> kpis;

  const KpiGrid({super.key, required this.kpis});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        int crossAxisCount;

        if (width >= AppBreakpoints.desktop) {
          crossAxisCount = 4;
        } else if (width >= AppBreakpoints.mobile) {
          crossAxisCount = 2;
        } else {
          crossAxisCount = 1;
        }

        // Use a custom grid to maintain consistent card heights
        return Wrap(
          spacing: AppSpacing.md,
          runSpacing: AppSpacing.md,
          children: kpis.map((kpi) {
            final cardWidth = (width -
                    (AppSpacing.md * (crossAxisCount - 1))) /
                crossAxisCount;
            return SizedBox(
              width: cardWidth,
              child: KpiCard(data: kpi),
            );
          }).toList(),
        );
      },
    );
  }
}
```

---

## 5. Leaderboard Row

### `lib/features/dashboard/widgets/leaderboard_row.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../models/house_standing.dart';

class LeaderboardRow extends StatefulWidget {
  final HouseStanding standing;

  const LeaderboardRow({super.key, required this.standing});

  @override
  State<LeaderboardRow> createState() => _LeaderboardRowState();
}

class _LeaderboardRowState extends State<LeaderboardRow> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final s = widget.standing;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm + 4,
        ),
        decoration: BoxDecoration(
          color: _isHovered
              ? s.bgColor
              : (s.rank == 1 ? s.bgColor.withValues(alpha: 0.5) : Colors.transparent),
          borderRadius: AppRadius.borderMd,
        ),
        child: Row(
          children: [
            // Rank
            SizedBox(
              width: 28,
              child: Text(
                '${s.rank}',
                style: AppTypography.labelLarge.copyWith(
                  color: s.rank == 1
                      ? s.color
                      : AppColors.textSecondary,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            // House color dot
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                color: s.color,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            // House name
            SizedBox(
              width: 80,
              child: Text(
                s.name,
                style: AppTypography.bodyMedium.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            // Progress bar
            Expanded(
              child: ClipRRect(
                borderRadius: AppRadius.borderPill,
                child: LinearProgressIndicator(
                  value: s.progress,
                  minHeight: 8,
                  backgroundColor: s.color.withValues(alpha: 0.1),
                  valueColor: AlwaysStoppedAnimation<Color>(s.color),
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            // Points
            SizedBox(
              width: 56,
              child: Text(
                '${s.points}',
                textAlign: TextAlign.right,
                style: AppTypography.labelLarge.copyWith(
                  color: AppColors.textPrimary,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            // Trend arrow
            if (s.trend != KpiTrend.neutral)
              Icon(
                s.trend == KpiTrend.up
                    ? Icons.arrow_upward
                    : Icons.arrow_downward,
                size: 14,
                color: s.trend == KpiTrend.up
                    ? AppColors.success
                    : AppColors.danger,
              )
            else
              const SizedBox(width: 14),
          ],
        ),
      ),
    );
  }
}
```

---

## 6. House Leaderboard Card

### `lib/features/dashboard/widgets/house_leaderboard_card.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';
import '../models/house_standing.dart';
import 'dashboard_section_header.dart';
import 'leaderboard_row.dart';

class HouseLeaderboardCard extends StatefulWidget {
  final List<HouseStanding> standings;
  final int selectedTabIndex;
  final ValueChanged<int> onTabChanged;

  const HouseLeaderboardCard({
    super.key,
    required this.standings,
    this.selectedTabIndex = 0,
    required this.onTabChanged,
  });

  @override
  State<HouseLeaderboardCard> createState() => _HouseLeaderboardCardState();
}

class _HouseLeaderboardCardState extends State<HouseLeaderboardCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  static const _tabs = ['This Week', 'This Term', 'All Time'];

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
          // Header with LIVE badge
          DashboardSectionHeader(
            title: 'House Leaderboard',
            trailing: _buildLiveBadge(),
          ),
          const SizedBox(height: AppSpacing.md),
          // Tab row
          _buildTabRow(),
          const SizedBox(height: AppSpacing.lg),
          // Leaderboard rows
          ...widget.standings.map(
            (s) => Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.xs),
              child: LeaderboardRow(standing: s),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLiveBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.success.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderPill,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, child) {
              return Opacity(
                opacity: 0.4 + (_pulseController.value * 0.6),
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: AppColors.success,
                    shape: BoxShape.circle,
                  ),
                ),
              );
            },
          ),
          const SizedBox(width: 6),
          Text(
            'LIVE',
            style: AppTypography.chipLabel.copyWith(
              color: AppColors.success,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabRow() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.searchField,
        borderRadius: AppRadius.borderSm,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: List.generate(_tabs.length, (index) {
          final isSelected = index == widget.selectedTabIndex;
          return GestureDetector(
            onTap: () => widget.onTabChanged(index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.md,
                vertical: AppSpacing.sm,
              ),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.surface : Colors.transparent,
                borderRadius: AppRadius.borderSm,
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 4,
                          offset: const Offset(0, 1),
                        ),
                      ]
                    : null,
              ),
              child: Text(
                _tabs[index],
                style: AppTypography.labelSmall.copyWith(
                  color: isSelected
                      ? AppColors.textPrimary
                      : AppColors.textSecondary,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}
```

---

## 7. Event Item

### `lib/features/dashboard/widgets/event_item.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../models/event_data.dart';

class EventItem extends StatefulWidget {
  final EventData data;

  const EventItem({super.key, required this.data});

  @override
  State<EventItem> createState() => _EventItemState();
}

class _EventItemState extends State<EventItem> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: _isHovered
              ? AppColors.surfaceTinted
              : Colors.transparent,
          borderRadius: AppRadius.borderMd,
        ),
        child: Row(
          children: [
            // Date badge
            Container(
              width: 48,
              height: 52,
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.08),
                borderRadius: AppRadius.borderMd,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    widget.data.dateLabel,
                    style: AppTypography.labelLarge.copyWith(
                      color: AppColors.primary,
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    widget.data.monthLabel,
                    style: AppTypography.chipLabel.copyWith(
                      color: AppColors.primary,
                      fontSize: 9,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            // Event info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.data.title,
                    style: AppTypography.bodyMedium.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${widget.data.category} • ${widget.data.timeRange}',
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            // Status chip + RSVP
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                _buildStatusChip(widget.data.status),
                const SizedBox(height: 4),
                Text(
                  '${widget.data.rsvpCount} RSVP',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusChip(EventStatus status) {
    Color color;
    String label;

    switch (status) {
      case EventStatus.live:
        color = AppColors.success;
        label = 'Live';
      case EventStatus.upcoming:
        color = AppColors.info;
        label = 'Upcoming';
      case EventStatus.draft:
        color = AppColors.textTertiary;
        label = 'Draft';
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderPill,
      ),
      child: Text(
        label,
        style: AppTypography.chipLabel.copyWith(color: color),
      ),
    );
  }
}
```

---

## 8. Upcoming Events Card

### `lib/features/dashboard/widgets/upcoming_events_card.dart` [NEW]

```dart
import 'package:flutter/material.dart';
import '../../../theme/tokens/app_colors.dart';
import '../../../theme/tokens/app_typography.dart';
import '../../../theme/tokens/app_spacing.dart';
import '../../../theme/tokens/app_radius.dart';
import '../../../theme/tokens/app_shadows.dart';
import '../models/event_data.dart';
import 'dashboard_section_header.dart';
import 'event_item.dart';

class UpcomingEventsCard extends StatelessWidget {
  final List<EventData> events;
  final VoidCallback? onViewAll;

  const UpcomingEventsCard({
    super.key,
    required this.events,
    this.onViewAll,
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
            title: 'Upcoming Events',
            trailing: TextButton(
              onPressed: onViewAll,
              child: Text(
                'View All',
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.primary,
                ),
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          ...events.map(
            (event) => EventItem(data: event),
          ),
        ],
      ),
    );
  }
}
```

---

## Next: Part 3

Part 3 covers: **Activity Timeline, Points Chart, Quick Actions, Dashboard Screen, and App Shell Updates (Sidebar + Top Bar)**.
