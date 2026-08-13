# BrandEx IP Practice

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack-Router-FF4154)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18)
![Automation](https://img.shields.io/badge/Automation-Custom-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

> **IP Law Practice Management System** for trademark / IP consultants and law firms — clients, matters, trademark lifecycle, ledger, and payments in one place.

**Designed for Pakistan-focused IP practice** (PKR, JazzCash, Easypaisa, CNIC, local cities) while remaining extensible for multi-tenant SaaS use.

## Topics / Keywords

`brandex` `ip` `trademark` `intellectual-property` `copyright` `law-practice` `practice-management` `ledger` `payments` `typescript` `react` `vite` `tanstack-router` `tanstack-query` `tailwindcss` `vitest` `pakistan` `automation` `custom-automation`

---

## What is this?

**BrandEx IP Practice** is a frontend MVP for managing an intellectual-property law practice. It covers the day-to-day workflow of an IP consultant or small firm:

| Module | Purpose |
|--------|---------|
| **Clients** | Client records with type codes (A–E), contact info, city/country |
| **Matters / Cases** | Linked to clients — Trademark, Copyright, Company, NTN, Opposition |
| **Trademarks** | Full filing lifecycle from Filed → Certificate Delivered |
| **Ledger** | Due / received / balance per matter (with optional discount) |
| **Payments** | Bank Transfer, JazzCash, Easypaisa, Online — Partial / Paid / Overpaid |
| **Documents** | Form templates (TM-01, TM-16, TM-48, etc.) |
| **Dashboard** | Totals, recent matters, pending balances |
| **Settings** | App configuration surface |

Current data layer is **mock data** (ready for API integration via `VITE_API_BASE_URL`).

---

## Features

### Clients
- Client types: **A / B / C / D / E**
- Client codes: e.g. `B-071`, `A-045`
- Phone, WhatsApp, email, city, country, contact person, notes
- List + detail views

### Matters (Cases)
- Types: **Trademark · Copyright · Company · NTN · Opposition**
- Full matter numbers: `{ClientCode}-{sequence}` e.g. `B-071-001`
- Status tracking (Pending / In Progress / Examination / Completed)
- List + detail views linked to parent client

### Trademark lifecycle
Validated status workflow:

```
Filed → Acknowledged → Examination → Assigned / Hearing
  → Approved → Published → Demand Note
  → Opposition (optional) → Certificate → Certificate Delivered
```

Fields include trademark number, name, class (Nice classification), applicant, CNIC, trading business, address, attorney, consultant, city, logo/image URLs.

### Ledger & Payments
- Ledger: due, received, balance, discount, notes
- Balance formula: `(due - discount) - received`
- Payment status auto-logic: Unpaid · Partial · Paid · Overpaid · Refund
- Methods: Bank Transfer · JazzCash · Easypaisa · Online

### Agents (mock)
Agents by city (Islamabad, Lahore, Rawalpindi) with assigned / approved / hearing-objection counts.

### Form templates
- **TM-01** Trademark Application  
- **TM-16** Trademark Assignment  
- **TM-48** Trademark Renewal  

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | TanStack Router (file-based) |
| Server state | TanStack Query |
| Styling | Tailwind CSS 4 |
| Utils | clsx, tailwind-merge |
| Lint | oxlint |
| Tests | Vitest + Testing Library + jsdom |

---

## Project structure

```
BrandEx-IP-Practice/
├── public/                 # favicon, icons
├── src/
│   ├── components/         # Layout (nav shell)
│   ├── config/             # app.config.ts
│   ├── data/               # mockData.ts (clients, matters, trademarks, ledger, payments, agents, forms)
│   ├── features/
│   │   ├── clients/        # ClientList, ClientDetail
│   │   ├── documents/      # Documents
│   │   ├── ledger/         # Ledger
│   │   ├── matters/        # MatterList, MatterDetail
│   │   ├── payments/       # Payments
│   │   └── trademarks/     # TrademarkList, TrademarkDetail
│   ├── lib/
│   │   ├── businessLogic.ts  # client codes, matter numbers, balance, payment status, trademark workflow
│   │   ├── query-client.ts
│   │   └── utils.ts
│   ├── pages/              # Landing, Login, Dashboard, Settings
│   ├── routes/             # TanStack Router file routes
│   ├── types/              # Domain types (Client, Matter, Trademark, LedgerEntry, Payment, …)
│   ├── __tests__/          # unit + page + route tests
│   ├── App.tsx
│   └── main.tsx
├── AGENTS.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── .env.example
```

---

## Getting started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm (lockfile included)

### Install & run

```bash
git clone https://github.com/0utLawzz/BrandEx-IP-Practice.git
cd BrandEx-IP-Practice
npm install
cp .env.example .env   # optional — set VITE_API_BASE_URL when backend is ready
npm run dev
```

App runs at **http://localhost:5173** (Vite default).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |
| `npm test` | Run Vitest |
| `npm run test:ui` | Vitest UI |
| `npm run test:coverage` | Coverage report |

---

## Environment

See `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MULTI_TENANT=true
VITE_ENVIRONMENT=development
```

- Leave `VITE_API_BASE_URL` empty to keep using mock data.
- Multi-tenant flag is prepared in `app.config.ts` for future SaaS work.

---

## Domain model (summary)

```typescript
ClientType     = 'A' | 'B' | 'C' | 'D' | 'E'
MatterType     = 'Trademark' | 'Copyright' | 'Company' | 'NTN' | 'Opposition'
PaymentStatus  = 'Unpaid' | 'Partial' | 'Paid' | 'Overpaid' | 'Refund'
PaymentMethod  = 'Bank Transfer' | 'JazzCash' | 'Easypaisa' | 'Online'
TrademarkStatus = Filed | Acknowledged | Examination | Assigned | Approved
                | Hearing | Published | Demand Note | Opposition
                | Certificate | Certificate Delivered
```

Business helpers live in `src/lib/businessLogic.ts`:
- `formatClientCode` / `generateMatterNumber`
- `calculateBalance` / `calculatePaymentStatus`
- `isValidTrademarkStatusTransition` + `trademarkWorkflow` map

---

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/login` | Login (UI only for now) |
| `/dashboard` | Dashboard KPIs |
| `/clients` | Client list |
| `/clients/$clientId` | Client detail |
| `/matters` | Matter list |
| `/matters/$matterId` | Matter detail |
| `/trademarks` | Trademark list |
| `/trademarks/$trademarkId` | Trademark detail |
| `/ledger` | Ledger |
| `/payments` | Payments |
| `/documents` | Documents / form templates |
| `/settings` | Settings |

---

## Testing

Tests cover config, business logic, utils, Landing/Login pages, and navigation.

```bash
npm test -- --run
npm run build
npm run lint
```

---

## Current status & roadmap

**Done (MVP UI + domain logic)**  
- Full UI shell and navigation  
- Clients, Matters, Trademarks, Ledger, Payments, Documents, Dashboard  
- Domain types + mock data (Pakistan-oriented sample data)  
- Business rules (codes, balances, trademark status transitions)  
- Unit/component tests  

**Next (typical path)**  
- Real auth (login currently UI-only)  
- Backend API + TanStack Query data fetching  
- Persist clients/matters/trademarks/ledger  
- Document generation from TM templates  
- Multi-tenant isolation (flag already present)  
- Agent assignment & hearing tracking UI  

---

## License

MIT — see [LICENSE](LICENSE).

Please also read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Author

**Nadeem (OutLawZ)**  
Custom Automation Specialist  

📧 Contact: [net2outlawzz@gmail.com](mailto:net2outlawzz@gmail.com)  
🔗 GitHub: [0utLawzz](https://github.com/0utLawzz)  
📦 Repo: [0utLawzz/BrandEx-IP-Practice](https://github.com/0utLawzz/BrandEx-IP-Practice)

---

*Need custom IP practice software, trademark workflow tools, or business automation for your firm? Contact me.*
