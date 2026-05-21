# Tuma Command Center — PSP Admin Control Hub

> Operator V2.4 | GDPR Compliant | PCI-DSS L1

A professional-grade Next.js admin platform for managing TUMA Payment Service Provider operations across East Africa.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Auth layout group
│   │   ├── login/            # /login
│   │   └── register/         # /register
│   ├── (dashboard)/          # Dashboard layout group (coming next)
│   └── layout.tsx
├── modules/                  # Feature modules (business logic lives here)
│   ├── dashboard/
│   ├── transactions/
│   ├── merchants/
│   ├── settlements/
│   ├── compliance/
│   ├── users/
│   └── reports/
├── components/
│   ├── ui/                   # Reusable UI primitives
│   └── auth/                 # Auth-specific components
├── lib/
│   └── constants.ts
└── types/
    └── index.ts
```

---

## Modules

| Module         | Path              | Description                            |
|----------------|-------------------|----------------------------------------|
| Dashboard      | `/dashboard`      | Overview, KPIs, activity feed          |
| Transactions   | `/transactions`   | Payment records, search, status        |
| Merchants      | `/merchants`      | Merchant management & onboarding       |
| Settlements    | `/settlements`    | Settlement batches & reconciliation    |
| Compliance     | `/compliance`     | KYC/AML, flagged accounts              |
| Users & Roles  | `/users`          | Operator accounts & RBAC               |
| Reports        | `/reports`        | Exports, analytics, audit logs         |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`.

---

## Pages Built

- ✅ `/login` — Secure login with MFA notice
- ✅ `/register` — 2-step operator registration with role selection, password strength meter

## Up Next

- `/dashboard` — Main command hub
- `/transactions` — Transaction ledger
- Navigation sidebar & topbar
