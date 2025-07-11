FIll STRUCTURE

my-app/
├── app/                         # Screens managed by expo-router
│   ├── index.tsx                # Home screen
│   ├── login.tsx                # Login screen
│   ├── register.tsx             # Register screen
│   ├── profile/                 # Nested route: /profile
│   │   └── index.tsx
│   └── (auth)/                  # Grouped routes (optional)
│       ├── forgot-password.tsx
│       └── verify-email.tsx
│
├── components/                  # Reusable UI components
│   ├── Button.tsx
│   ├── Header.tsx
│   └── Avatar.tsx
│
├── constants/                   # Static constants
│   ├── colors.ts
│   ├── fonts.ts
│   └── config.ts
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts
│   └── useLocation.ts
│
├── i18n/                        # Internationalization files
│   ├── index.ts
│   ├── en.json
│   └── es.json
│
├── lib/                         # External libraries or API wrappers
│   ├── firebase.ts              # Firebase config & init
│   ├── api.ts                   # API base config (Axios, fetch, etc)
│   └── notifications.ts         # Push notification helpers
│
├── store/                       # Global state management (Zustand, Redux, etc)
│   ├── useUserStore.ts
│   └── useSettingsStore.ts
│
├── assets/                      # Fonts, images, etc.
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── utils/                       # Utility functions/helpers
│   ├── validators.ts
│   ├── formatters.ts
│   └── geo.ts
│
├── middleware/                  # (Optional) Auth guard or custom routers
│   └── auth.ts
│
├── .env                         # Environment variables
├── app.json                     # Expo config
├── tsconfig.json                # TypeScript config
├── babel.config.js              # Babel config
├── package.json
└── README.md

Primary  — #00BFA6
Button Text — #FFFFFF
Secondary Text — #F5F5F5
Icon Background — #263238
Call-to-Action Accent — #F50057
Primary-text — #000000