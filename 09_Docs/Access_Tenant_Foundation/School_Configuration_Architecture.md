# EduPulse School Configuration Architecture

## Purpose

This document defines the school-level configuration architecture that allows schools to personalize EduPulse while preserving platform consistency.

---

# Design Philosophy

Schools should feel that EduPulse belongs to them.

However:

- Core workflows remain standardized.
- Branding and terminology remain configurable.

---

# School Profile

Each school maintains:

```text
School Name
School Code
Logo
Motto
Address
Phone Number
Email Address
Website
Timezone
```

---

# Branding Configuration

Schools may customize:

```text
Primary Color
Secondary Color
Logo
School Name
School Motto
```

Branding changes should propagate throughout the platform automatically.

---

# House System

The House System is fully dynamic.

Schools may create:

```text
1 - N Houses
```

Examples:

```text
Red
Blue
Green
Yellow
```

or

```text
Falcon
Tiger
Leopard
Panther
```

Each house contains:

```text
House Name
House Color
House Icon
Display Order
```

No house names are hardcoded.

No house colors are hardcoded.

---

# Academic Structure

EduPulse uses:

```text
Academic Year
```

containing:

```text
2 - 4 Academic Periods
```

---

# Terminology Configuration

Schools may rename periods.

Examples:

School A:

```text
Term 1
Term 2
Term 3
```

School B:

```text
Semester 1
Semester 2
```

School C:

```text
Quarter 1
Quarter 2
Quarter 3
Quarter 4
```

The internal data model remains consistent.

Only labels change.

---

# Academic Year Settings

Schools may configure:

```text
Academic Year Name
Start Date
End Date
Number of Periods
Period Names
```

---

# School Preferences

Future configuration categories:

```text
Attendance Settings
Points Settings
Event Settings
Notification Settings
Report Settings
```

These should be configurable without code changes.

---

# Configuration Principles

1. Simple for non-technical schools
2. Dynamic branding
3. Dynamic houses
4. Dynamic terminology
5. Minimal setup effort
6. No platform reconfiguration required

---

# Success Criteria

A school should be able to:

- Set up branding
- Configure houses
- Configure academic periods
- Configure terminology

within minutes and without technical assistance.