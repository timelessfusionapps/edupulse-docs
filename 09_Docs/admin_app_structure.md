# Admin App Folder Structure

```text
admin_app/
│   ├── test/
│   │   ├── core/
│   │   │   ├── tenant/
│   │   │   ├── router/
│   │   ├── features/
│   │   │   ├── rbac/
│   │   │   ├── configuration/
│   │   │   ├── school_administration/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   ├── security/
│   │   │   ├── auth/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── mappers/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── bloc/
│   │   │   ├── student_leadership/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── blocs/
│   │   │   ├── dashboard/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── bloc/
│   │   │   │   │   │   ├── utils/
│   │   │   ├── students/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── bloc/
│   │   │   ├── runtime_access/
│   │   │   ├── points/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   ├── user_management/
│   │   │   ├── events/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   ├── schools/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories/
│   │   │   ├── analytics_dashboard/
│   │   │   ├── student_management/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   ├── notifications/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── bloc/
│   │   │   ├── teacher_governance/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   ├── platform_shell/
│   │   ├── shared/
│   │   │   ├── widgets/
│   ├── 09_Docs/
│   │   ├── Dashboard/
│   │   │   ├── Bloc_Reports/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── tenant/
│   │   │   ├── di/
│   │   │   ├── router/
│   │   ├── bootstrap/
│   │   ├── features/
│   │   │   ├── rbac/
│   │   │   ├── configuration/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── bloc/
│   │   │   ├── school_administration/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── value_objects/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── params/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   │   ├── assignments/
│   │   │   │   │   ├── widgets/
│   │   │   │   │   ├── bloc/
│   │   │   │   │   │   ├── assignments/
│   │   │   │   │   │   ├── academic_year/
│   │   │   │   │   │   ├── academic_structure/
│   │   │   ├── auth/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── widgets/
│   │   │   │   │   ├── bloc/
│   │   │   │   ├── bloc/
│   │   │   ├── integration/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── services/
│   │   │   ├── student_leadership/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── blocs/
│   │   │   │   │   │   ├── club/
│   │   │   │   │   │   ├── council/
│   │   │   │   │   │   ├── prefect/
│   │   │   │   │   │   ├── leadership/
│   │   │   │   │   ├── screens/
│   │   │   │   │   │   ├── club/
│   │   │   │   │   │   ├── council/
│   │   │   │   │   │   ├── prefect/
│   │   │   │   │   │   ├── leadership/
│   │   │   ├── dashboard/
│   │   │   │   ├── constants/
│   │   │   │   ├── theme/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── stress/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── query/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── exceptions/
│   │   │   │   │   ├── params/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── constants/
│   │   │   │   │   ├── shared/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── layouts/
│   │   │   │   │   ├── widgets/
│   │   │   │   │   │   ├── leaderboard/
│   │   │   │   │   │   ├── shared/
│   │   │   │   │   │   ├── states/
│   │   │   │   │   │   ├── kpi/
│   │   │   │   │   ├── bloc/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   ├── selectors/
│   │   │   ├── students/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   ├── utils/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   ├── models/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── params/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── constants/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── layouts/
│   │   │   │   │   ├── widgets/
│   │   │   │   │   │   ├── tablet/
│   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   ├── shared/
│   │   │   │   │   │   ├── mobile/
│   │   │   │   │   │   ├── states/
│   │   │   │   │   │   ├── adaptive/
│   │   │   │   │   ├── bloc/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── student_bloc_models/
│   │   │   ├── house_impact/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   ├── runtime_access/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── guards/
│   │   │   ├── points/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── bloc/
│   │   │   ├── contribution/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   ├── user_management/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── entities/
│   │   │   ├── events/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── utils/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── bloc/
│   │   │   ├── schools/
│   │   │   ├── analytics_dashboard/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── bloc/
│   │   │   ├── student_management/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   ├── firebase/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── repositories_impl/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── bloc/
│   │   │   ├── notifications/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── widgets/
│   │   │   │   │   ├── bloc/
│   │   │   ├── teacher_governance/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── validators/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── entities/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── blocs/
│   │   │   │   │   │   ├── event_templates/
│   │   │   │   │   │   ├── governance_audits/
│   │   │   │   │   │   ├── event_governance/
│   │   │   │   │   │   ├── teacher_groups/
│   │   │   │   │   ├── screens/
│   │   │   ├── platform_shell/
│   │   │   │   ├── data/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── domain/
│   │   │   │   │   ├── registries/
│   │   │   │   │   ├── repositories/
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── layouts/
│   │   │   │   │   ├── widgets/
│   │   ├── shared/
│   │   ├── theme/
```
