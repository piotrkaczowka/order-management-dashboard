# Order Management Dashboard

A frontend demo app built to demonstrate my approach to state management, architecture, and code organization in a React + TypeScript project.

**[Live demo](https://piotrkaczowka.github.io/order-management-dashboard/)**

## Stack

|                                |                            |
| ------------------------------ | -------------------------- |
| React + TypeScript             | core                       |
| Redux Toolkit                  | global state management    |
| MUI                            | UI components              |
| React Hook Form + Zod          | forms and validation       |
| Vitest + React Testing Library | unit and integration tests |
| Vite                           | build tool                 |

## Getting started

```bash
npm install
npm run dev
```

Useful commands

```bash
npm run test
npm run lint
npm run format
npm run build
```

## Architecture decisions

**RTK over Context** — requirements explicitly mention state sync across views and data integrity after mutations.

**Zod as single source of truth for types** — schemas defined once in `lib/types/`.

**Feature-based structure** — code organized by domain (`orders`, `dashboard`) not by layer. Each feature owns its components, hooks, and store slice.

**ErrorBoundary at feature boundaries** — crashes in Dashboard don't affect Orders and vice versa. Global boundary in `App.tsx` as last resort.

## Tests

```
OrderForm.test.tsx       # form validation, submit, cancel
ordersSlice.test.ts      # CRUD mutations, dashboard selector sync
```

## Future improvements

- Auth0 authentication + protected routes
- Sentry error monitoring (`componentDidCatch` already prepared)
- Pagination / sorting on the orders table

> Deployed on GitHub Pages using HashRouter. For production deployment on a real server replace with BrowserRouter for clean URLs.
