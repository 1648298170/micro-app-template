# Architecture

## Principles

- The React host owns platform concerns: auth, layout, first-level routes, menu, permissions, app loading, and version resolution.
- Micro apps own business routes and business state.
- Shared packages own contracts, request behavior, permissions, events, and tokens.
- Deployable apps are versioned independently and loaded through env variables or a remote manifest.

## Risk Controls

| Risk                 | Control                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| Style pollution      | App root namespaces, scoped styles, CSS Modules, qiankun style isolation |
| Route conflict       | Host owns first-level paths, children use basename                       |
| Communication sprawl | Typed event bus and declared event names only                            |
| Asset path errors    | Entry from env or manifest, stable build base policy                     |
| Performance          | Lazy route loading, controlled prefetch, shared packages                 |
| Memory leaks         | Disposer registry and lifecycle cleanup                                  |
| Version drift        | Manifest with version, entry, status                                     |
| UI inconsistency     | Shared tokens and common states                                          |

## Vue Component Map

- `App.vue`: thin composition shell for qiankun standalone/mounted mode.
- `pages/OperationsView.vue`: route-level view for dashboard content.
- `components/MetricPanel.vue`: presentational metric list with typed props.
