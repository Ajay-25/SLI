# SLI

## Description

Service Leadership Institute Website

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Supported Locales](#supported-locales)
5. [Adding New Pages](#adding-new-pages)
6. [Adding API Routes](#adding-api-routes)
7. [Working with Translations](#working-with-translations)
8. [Styling Guidelines](#styling-guidelines)
9. [Type Checking](#type-checking)
10. [Best Practices](#best-practices)

## Installation

```bash
# Clone the repository
git clone git@github.com:Ajay-25/SLI.git

# Navigate to the project directory
cd SLI

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm run dev
```

---

## Project Structure

```bash
SLI/
├── app/
│   ├── [locale]/        # Dynamic locale-specific pages
│   └── api/             # API routes (e.g., contact, rsvp)
├── components/          # Shared UI components
├── lib/                 # Constants, i18n config, fonts
├── types/               # Shared TypeScript types
├── styles/              # Global CSS and tokens (if used)
```

## Supported Locales

Define all supported locales in `lib/constants/locales.ts`:

```ts
export const SUPPORTED_LOCALES = ['en', 'es'] as const;
```

Use `generateStaticParams()` in each `[locale]` page to statically generate routes:

```ts
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
```

## Adding New Pages

To add a new page (e.g., `/events`):

1. Create a new folder inside `app/[locale]/events/`
2. Add `page.tsx` with the component:

```tsx
export default function Page() {
  return <h1>Events Page</h1>;
}
```

3. (Optional) Add `generateStaticParams()` if it’s locale-based and does not use any server data.

## Adding API Routes

To add a new API route:

1. Create a new folder inside `app/api/<route>/`
2. Add a `route.ts` file with the required method:

```ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return Response.json({ success: true, data: body });
}
```

To call this API from the client:

```ts
await axios.post('/api/<route>', payload);
```

## Working with Translations

Using `next-intl`:

- Define messages in `lib/messages/<locale>.json`
- Use in components:

```ts
import { useTranslations } from 'next-intl';
const t = useTranslations('namespace');
t('key');
```

Get current locale:

```ts
import { useLocale } from 'next-intl';
const { locale } = useLocale();
```

## Styling Guidelines

- Global styles in `app/styles/globals.css` (imported in root layout)
- Component styles as CSS Modules:

```bash
components/
├── Button.tsx
├── Button.module.css
```

- Prefer Tailwind CSS for utility-first styling

## Type Checking

Run type checking using:

```bash
npm run tsc
```

Script in `package.json`:

```json
"tsc": "tsc --noEmit"
```

## Best Practices

### How to use Server and Client Components with Server APIs

#### ✅ Server Components

- Use server components to fetch data directly using `fetch()` or backend helpers.
- Good for SEO-critical, non-interactive data (e.g. static pages, pre-rendered listings).
- These can directly call other internal API functions or external services.
- Use `async` functions and return JSX directly:

```tsx
// app/[locale]/courses/page.tsx
export default async function CoursesPage() {
  const res = await fetch('https://api.example.com/courses');
  const data = await res.json();
  return <CourseList courses={data} />;
}
```

#### ✅ Client Components

- Use client components (`'use client'`) when interactivity (e.g. click, form, input) is needed.
- Fetch data **via `/api/...` routes** using `axios`, `fetch`, or `react-query`.
- Keep sensitive logic in server API and only expose what's needed to the UI.

```tsx
// components/rsvp/RSVPSelector.tsx
'use client';
import axios from 'axios';

const submitRSVP = async (payload) => {
  const res = await axios.post('/api/rsvp', payload);
  return res.data;
};
```

### NextJs Recommended - Form Submission

When submitting a form using the new Next.js App Router APIs like `useFormStatus` and `useActionState`, prefer the following modern approach when working with server actions:

#### ✅ Best Practices

- Use server actions for progressive enhancement, especially when forms are meant to be submitted to a server.
- Use `useActionState` to manage form state and success.
- Use `useFormStatus` inside the submit button for immediate UX feedback.
- Keep your action function on the server component.

#### 💡 Example (Server Action Based Form Submission):

```tsx
// app/[locale]/contact-us/page.tsx
'use client';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';

async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return { success: false };
  return { success: true };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? 'Submitting...' : 'Submit'}</button>;
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <textarea name="message" placeholder="Message" />
      <SubmitButton />
      {state.success && <p>Submitted successfully!</p>}
    </form>
  );
}
```

### Form Submission with API Integration - Alternative

When submitting a form and calling an API with the form data:

#### ✅ Best Practices

- Use a **client component** to handle form state and submission.
- Use the native `onSubmit` handler and prevent default behavior.
- Use `axios.post('/api/route', formData)` or `fetch('/api/route', { method: 'POST', body: JSON.stringify(formData) })`.
- Show loading state and success/error messages based on response.
- Validate on both client (basic) and server (strict) sides.
- Keep sensitive logic (e.g., database operations) in the server route only.

#### 💡 Example:

```tsx
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <textarea name="message" value={form.message} onChange={handleChange} />
      <button type="submit">Submit</button>
      {loading && <p>Submitting...</p>}
      {success && <p>Submitted successfully!</p>}
    </form>
  );
}
```

#### ⚠️ Good Practices

- Avoid calling server APIs from server components — use internal logic directly.
- Keep API routes for client access only.
- Server components can pass fetched data down to client components as props.
- Avoid using `useEffect` for fetching static data that can be fetched on the server.

### When is adding an API recommended?

- When you need to perform server-side operations like database access, sending emails, or calling external APIs.
- When you want to securely handle sensitive data or secrets that should not be exposed to the client.
- When the response depends on user-specific context like session, authentication, or request headers.
- When building endpoints consumed by client components for real-time interaction or POST requests.
- When the logic doesn't belong directly in a page or layout (e.g., isolated microservices logic).

### When is adding an API path not allowed?

- When the data can be fetched using static generation at build time.
- When a reusable hook or helper function is more appropriate than an endpoint.
- When the logic is purely frontend-side and doesn't require a server call.
- When duplicating an existing API route's purpose.

### When to use Server Components for data fetching?

- When the data fetching is required only for initial render (no client interactivity).
- For SEO-critical or static-like content that can benefit from SSR/SSG.
- When using `async` components with `fetch()` or `getData()` in server-only logic.
- Avoid using client components for fetching static or backend-safe data.

### Where to define shared, non-page components?

- Use `components/` directory for all shared React components.
- Organize into feature/pages-based folders if helpful:
  ```bash
  components/
  ├── authenticate/          # For Authentication
  ├── home/      # Header, footer, navbar,
  ├── forms/       # Shared form components
  ├── rsvp/        # Page specific
  ```
- Prefer colocating `.module.css` files next to the component for scoped styles.
