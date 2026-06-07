# Social Engineering Attack Simulator

A web-based educational simulator for demonstrating common social engineering and browser-based attack patterns, together with their safer implementation alternatives. The application is designed as a practical component for a master degree project, combining interactive attack scenarios, secure counterexamples, and anonymous analytics for observing user behavior during simulations.

## Project Overview

This project implements a set of controlled security demonstrations inside a modern Next.js application. Each scenario contains two views:

- an attack simulation, showing how a user can be misled or exposed to risk;
- a secure version, showing safer interface and implementation choices.

The goal is not to build offensive tooling, but to make attack mechanisms understandable in a safe, observable, and educational environment. User interactions are recorded as anonymous events in Supabase and visualized in a live results dashboard.

## Implemented Scenarios

| Scenario | Attack Demonstrated | Secure Version Demonstrates |
| --- | --- | --- |
| Browser-in-the-Browser | A fake OAuth-style popup that can collect user input while looking like a trusted provider window. | A real OAuth redirect flow using NextAuth instead of collecting credentials inside the app. |
| MFA Fatigue | Repeated authentication prompts that pressure a user into approving access. | Number matching, contextual verification, request limits, and explicit denial controls. |
| DOM-based XSS | Unsafe rendering of user-controlled content that can expose a mock session token. | Sanitization with DOMPurify before rendering submitted content. |
| Clickjacking | A hidden iframe overlay that causes a user to trigger an unintended action. | Frame protection concepts and clear confirmation for sensitive actions. |

## Main Features

- Interactive attack and secure pages for each scenario.
- Reusable scenario navigation shared across attack modules.
- Navigation that reveals the secure version and dashboard only after an attack outcome occurs.
- Landing page with scenario cards and a centered live dashboard entry.
- Anonymous event tracking through Supabase.
- Live dashboard with summary cards, chart visualization, recent events table, loading state, error state, and empty state.
- TypeScript, React 19, Next.js 16 App Router, and Sass Modules.

## Technology Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Sass Modules
- Supabase JavaScript client
- NextAuth for the secure OAuth demonstration
- Recharts for dashboard visualization
- DOMPurify for XSS mitigation demonstration
- Lucide React icons

## Project Structure

```text
app/
|-- attacks/
|   |-- bitb/
|   |-- clickjacking/
|   |-- mfa-fatigue/
|   `-- xss/
|-- components/
|   |-- bitb/
|   |-- dashboard/
|   |-- mfa-fatigue/
|   |-- shared/
|   |-- ui/
|   `-- xss/
|-- dashboard/
|-- lib/
|-- styles/
`-- utils/
```

## System Architecture

```text
User
 |
 v
Browser
 |
 v
Next.js Application
 |-- Landing Page
 |-- Attack Modules
 |   |-- Browser-in-the-Browser
 |   |-- MFA Fatigue
 |   |-- DOM-based XSS
 |   `-- Clickjacking
 |-- Secure Modules
 |   |-- Real OAuth Flow
 |   |-- Secure MFA Flow
 |   |-- Sanitized Feedback Flow
 |   `-- Clickjacking Protection View
 |-- Shared UI Components
 |-- Analytics Module
 |   |-- Anonymous Session ID
 |   |-- Event Tracking
 |   `-- Dashboard Visualization
 `-- Authentication Module
     `-- NextAuth
          |
          v
      OAuth Provider
      `-- Google

Analytics Module
 |
 v
Supabase
 `-- attack_events table
```

The user interacts with the application through the browser. The Next.js application renders the landing page, attack simulations, secure alternatives, and dashboard. Attack and secure modules share common navigation and UI patterns, while the analytics module records anonymous scenario events and reads them back for visualization.

Supabase is used as the analytics data store. Google OAuth is used only by the secure Browser-in-the-Browser counterexample to demonstrate how real authentication should be delegated to a trusted identity provider instead of being recreated inside the application interface.

## Routes

| Route | Description |
| --- | --- |
| `/` | Main landing page with all scenarios and dashboard entry. |
| `/dashboard` | Live analytics dashboard. |
| `/attacks/bitb` | Browser-in-the-Browser attack simulation. |
| `/attacks/bitb/secure` | Secure OAuth-based alternative. |
| `/attacks/mfa-fatigue` | MFA fatigue attack simulation. |
| `/attacks/mfa-fatigue/secure` | Secure MFA flow. |
| `/attacks/xss` | DOM XSS attack simulation. |
| `/attacks/xss/secure` | Sanitized secure feedback flow. |
| `/attacks/clickjacking` | Clickjacking attack simulation. |
| `/attacks/clickjacking/secure` | Clickjacking-resistant interface. |

## Analytics Model

The dashboard reads anonymous events from the Supabase table `attack_events`.

Expected columns:

```sql
create table public.attack_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  attack text not null,
  event text not null,
  created_at timestamptz not null default now()
);
```

Typical event values include:

- `started`
- `victim`
- `approved`
- `denied`
- `token_captured`
- `hidden_action_triggered`
- `safe`
- `blocked`

The app stores a generated anonymous session identifier in the browser and sends only scenario interaction events. It does not store real passwords, real MFA codes, or real personal credentials.

## Supabase RLS Policies

If Row Level Security is enabled, the app needs permission to insert analytics events and to read them for the dashboard.

Example insert policy:

```sql
alter table public.attack_events enable row level security;

create policy "Allow anonymous analytics inserts"
on public.attack_events
for insert
to anon, authenticated
with check (true);
```

Example dashboard read policy:

```sql
create policy "Allow dashboard reads for analytics"
on public.attack_events
for select
to anon, authenticated
using (true);
```

For a production deployment, consider restricting dashboard reads to authenticated administrators or moving dashboard aggregation to a server-side route.

## Environment Variables

Create `.env.local` in the project root and provide the required public Supabase values and authentication settings used by the secure OAuth demonstration.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Do not commit real credentials or secrets to version control.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Educational Use

This application is intended for supervised demonstrations, coursework, research prototypes, and security awareness training. The scenarios are simplified to keep the behavior understandable and safe, while still showing the core interaction patterns that make these attacks effective.

Recommended evaluation activities:

- compare user decisions between attack and secure versions;
- review which events appear most frequently in the dashboard;
- discuss how interface design affects trust and decision-making;
- analyze how defensive controls reduce or block risky outcomes;
- extend the analytics model with additional non-sensitive measurements.

## Security and Ethics

The application is built for defensive education. It should be used only in controlled environments with informed participants. The simulations use mock data and should not be modified to collect real credentials, real session tokens, private personal data, or unauthorized user activity.

Important safeguards:

- no real passwords are requested by the attack simulations;
- the XSS scenario uses a mock token, not a real authentication token;
- analytics are anonymous and scenario-focused;
- secure pages explain safer implementation patterns;
- no credentials or Supabase secrets are hardcoded in the repository.

## Limitations

- The simulations are intentionally simplified and do not represent full real-world attacker infrastructure.
- The dashboard currently reads directly from Supabase using the configured client role.
- Analytics are anonymous but still depend on correct Supabase RLS configuration.
- The secure scenarios demonstrate concepts and should be adapted before being used as production security implementations.

## Future Improvements

- Add role-based access control for the dashboard.
- Add server-side aggregation for analytics.
- Add exportable reports for academic evaluation.
- Add scenario completion rates and time-to-action metrics.
- Add tests for analytics event tracking and dashboard rendering.
- Add multilingual content for broader classroom use.

## Academic Context

This project can support a master degree topic related to cybersecurity awareness, human factors in security, social engineering, secure interface design, or browser-based attack education. It provides both implementation artifacts and observable interaction data, making it suitable for practical demonstration, qualitative discussion, and lightweight quantitative analysis.
