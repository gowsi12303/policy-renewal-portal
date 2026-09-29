# Policy Renewal Intelligence & Broker Self-Serve Portal

A frontend-only insurance broker portal prototype focused on **policy renewal intelligence** and **broker self-service workflows**. Built with React and Vite, using realistic mock data.

> **Prototype notice:** this app does not connect to a backend, database or any real insurance system. All data is mock data, and nothing you enter is saved.

## Overview

Insurance brokers manage large books of policies that renew throughout the year. Missing a renewal, or spotting a risky one too late, means lost clients and revenue. This prototype explores a single workspace where a broker can:

- **See what's coming up:** upcoming renewals with days left, status and premium.
- **Prioritise with risk signals:** high/medium/low risk levels and the reasons behind them (no client response, premium increase, competitor quote, expiring documents).
- **Act from one place:** view policies and customers, update policy details, upload documents and request documents from clients.
- **Plan ahead:** a renewal calendar and analytics on renewal performance, retention and portfolio risk.

## Key features

| Area | What's included |
|---|---|
| **Dashboard** | KPI cards, renewals-due vs renewed chart, upcoming renewals table, "Attention Required" list, quick actions, recent activity |
| **Renewal Intelligence** | Risk distribution donut chart, risk signals, renewal pipeline table with search and risk/status/period filters, priority renewals |
| **Policies** | Searchable, filterable policy list (type and status) |
| **Policy details** | Policy, customer and renewal status, risk signals, demo broker actions (contact client, review pricing, request documents, schedule call), "policy not found" handling |
| **Customers** | Searchable customer directory with a customer detail panel and links to their policies |
| **Broker Self-Service** | Add/update policy form with validation, renewal documents list, drag-and-drop document upload (file type checked, kept in the browser only), client document request form |
| **Renewal Calendar** | Month view with previous/next/today navigation, renewals shown by date and colour-coded by risk, renewal details panel, upcoming renewals list |
| **Analytics** | Renewal performance, retention trend, portfolio risk distribution and renewal value by policy type charts, plus key insights |
| **Notifications** | Renewal, document, policy and customer alerts with read/unread state, an unread filter and "mark all as read" |
| **Broker profile** | Editable profile details and notification preference switches (demo save and discard) |

**Across the app:**
- Responsive layout: a sidebar on desktop and a slide-out navigation drawer on tablet and mobile.
- Accessibility: labelled form fields with inline errors, visible keyboard focus, 44px touch targets on touch screens, and risk/status never shown by colour alone.
- Chart accessibility: every chart has a screen-reader data table.
- Motion: respects the operating system's "reduce motion" setting.
- Feedback: demo actions confirm with a toast notification that clearly says nothing was sent or stored.

## Routes

| Route | Page |
|---|---|
| `/login` | Login (demo) |
| `/dashboard` | Broker dashboard |
| `/renewals` | Renewal Intelligence |
| `/policies` | Policy list |
| `/policies/:policyId` | Policy details (e.g. `/policies/POL-10482`) |
| `/customers` | Customer directory |
| `/self-service` | Broker Self-Service |
| `/calendar` | Renewal Calendar |
| `/analytics` | Analytics |
| `/notifications` | Notifications |
| `/profile` | Broker profile |

`/` redirects to `/login`. Unknown URLs show a "Page not found" screen.

## Tech stack

- **React 19** with JavaScript (no TypeScript)
- **Vite 8** for the dev server and build
- **React Router 7** for routing
- **Recharts 3** for charts
- **Plain CSS**, with shared design tokens in `src/styles/variables.css`
- **ESLint** for linting, **npm** for package management

## Project structure

```
src/
├── components/
│   ├── common/        Shared UI: Button, Card, KpiCard, StatusBadge, RiskBadge, FormField, Toast, EmptyState, table and filter styles
│   ├── charts/        Shared charts and the chart colour theme
│   ├── layout/        Sidebar and top bar
│   └── dashboard/, renewals/, calendar/, analytics/, selfService/
│                      Components used by a single page area
├── pages/             One folder per page (component + page CSS)
├── layouts/           App shell (sidebar + top bar) and the login layout
├── routes/            Route definitions (AppRoutes.jsx)
├── constants/         Route paths, navigation items, risk labels and colours
├── data/              Mock data for every page
├── hooks/             Shared React hooks (toast state)
├── styles/            Design tokens, global styles, shared page container
└── utils/             Date, currency and motion helpers
```

## Demo data

All policies, customers, renewals, documents, notifications and analytics figures are **realistic mock data** stored in `src/data/`. The data uses Indian business names and ₹ amounts. Customer and broker emails use the reserved `.example` domain, so they're clearly fictional.

The app uses a **fixed demo date of Monday, September 28, 2026**, so "days left", the calendar and the upcoming-renewals views look the same whenever you run the demo.

Some headline figures, such as "86 upcoming renewals", describe the whole portfolio, while the tables show a smaller sample of 14 policies.

## Getting started

**Prerequisites:** Node.js 20.19+ or 22.12+ (required by Vite) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite prints the local URL, usually http://localhost:5173)
```

Other scripts:

```bash
npm run lint     # run ESLint
npm run build    # create a production build in dist/
npm run preview  # preview the production build locally
```

## Demo login

The login screen is a **demo navigation flow, not real authentication**. There are no accounts or credentials. Enter any valid-format email address and any password, then select **Sign In** to go to the dashboard. The other portal pages can also be opened directly by URL.

## Suggested demo flow

1. **Login:** sign in with any email and password.
2. **Dashboard:** review KPIs, upcoming renewals and the "Attention Required" list.
3. **Renewal Intelligence:** check the risk distribution and signals, filter the pipeline and open a priority renewal.
4. **Policy details:** look at a policy's risk signals and try a broker action.
5. **Self-Service:** update a policy, upload a document and send a client document request.
6. **Calendar:** browse renewals by date and select one to see its details.
7. **Analytics:** review renewal performance, retention and portfolio risk.

## Responsive and accessibility notes

- **Layout:** built for desktop, tablet and mobile. Tables and the calendar scroll inside their own container on small screens, so the page never scrolls sideways.
- **Touch and keyboard:** interactive controls are at least 44px on touch screens, and every control is keyboard-accessible with a visible focus outline.
- **Screen readers:** forms use visible labels with errors linked to their fields, and charts include hidden data tables.
- **Colour and motion:** risk and status use text and shapes as well as colour, and animations and smooth scrolling are turned off when the OS "reduce motion" setting is on.

## Project status

This is a **frontend prototype built for portfolio and hackathon demonstration**. It is feature-complete for the demo flow above but isn't intended for production use.

## Future enhancements

The following are **not implemented**. They're natural next steps:

- Backend/API integration for policies, customers and renewals
- Real authentication and role-based access
- A persistent database
- Real document storage and client uploads
- Real notifications and email delivery
- Production deployment and hosting

## License

This project is created for portfolio and hackathon demonstration purposes.
