# Overflow Safety Report

## Current Risks
The `SingleChildScrollView` wrapping a `Row` with `Expanded` children assumes infinite vertical space, which can break inner chart constraints that require fixed heights.

## Mitigation
Implement rigid `BoxConstraints` on the `PointsChartCard` and ensure `QuickActionsRow` uses a `Wrap` instead of a `Row` to inherently prevent horizontal overflow.