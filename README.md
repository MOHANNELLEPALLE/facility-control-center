# Healthcare Management System

A modern React + TypeScript application for healthcare management with Redux Toolkit and RTK Query.

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **RTK Query** for API calls
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Vite** for build tooling

## Project Structure

```
src/
├── components/
│   ├── analytics/          # Analytics-specific components
│   ├── dashboard/          # Dashboard layout components
│   ├── forms/              # Reusable form components
│   ├── modals/             # Modal components
│   ├── providers/          # App providers (Redux, Query, etc.)
│   ├── routing/            # Route configuration
│   └── ui/                 # Shadcn UI components
├── data/                   # Mock data and static data
├── hooks/                  # Custom React hooks
├── pages/                  # Page components
├── store/                  # Redux store configuration
│   ├── features/           # Redux slices and API endpoints
│   ├── api.ts              # RTK Query base API
│   ├── hooks.ts            # Typed Redux hooks
│   └── store.ts            # Store configuration
├── types/                  # TypeScript type definitions
└── lib/                    # Utility functions
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
