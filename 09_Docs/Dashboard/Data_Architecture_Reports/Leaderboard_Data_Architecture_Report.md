# Leaderboard Data Architecture Report
Leaderboards read from pre-aggregated ranking collections (`schools/{schoolId}/leaderboards/{type}`). `DashboardLeaderboardEntity` includes `previousRank`, `currentRank`, and `rankingDelta` properties to support optimistic rendering and animated transitions.
