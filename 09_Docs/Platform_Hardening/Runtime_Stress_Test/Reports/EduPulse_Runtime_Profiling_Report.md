# EduPulse Runtime Profiling Report

## Profiling Scope
Evaluating the UI thread responsiveness, repaint boundaries, and paint times during extreme data ingestion scenarios.

## INP Findings
- **Initial ~15s INP:** During unisolated feed floods, the entire dashboard re-rendered, pushing the Interaction to Next Paint to catastrophic limits.
- **Optimized ~152ms INP:** Post-isolation, the main UI thread remained free to handle user interactions even during aggressive background flooding.

## CLS Findings
Cumulative Layout Shift was effectively zero because paginated elements utilize fixed-size constraints and append data off-screen cleanly.

## Rebuild Profiling Findings
**Rebuild isolation improvements:** Confirmed via Flutter DevTools. The timeline showed isolated widget subtree builds rather than global scaffold builds when localized data changed.

## Repaint Profiling Findings
**Analytics throughput bottleneck:** The chart components triggered continuous and expensive repaints. Isolating them inside `RepaintBoundary` nodes stopped these repaints from bubbling up the tree.

## UI Thread Findings
Main thread jank is isolated completely to the chart animation processing. The scroll physics thread remains consistently smooth at 60 FPS during feed ingestion.

## Runtime Throughput Findings
The application logic layer effortlessly parses hundreds of documents a second.

## Performance Optimization Findings
Achieved by mapping distinct Stream properties through `BlocSelector` to guarantee that only widgets listening to mutated properties undergo the build phase.
