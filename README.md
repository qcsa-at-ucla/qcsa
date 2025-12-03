# QCSA Website - Official Repository

> **Quantum Computing Student Association at UCLA**  
> Building the quantum future through education, innovation, and community engagement.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Code Standards](#code-standards)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Team & Contact](#team--contact)

---

## 🎯 Overview

The **Quantum Computing Student Association (QCSA)** is UCLA's premier quantum science and technology organization, operating under the Center for Quantum Science and Engineering (CQSE).

This repository contains the **official QCSA website**, a modern, full-stack Next.js application that serves as the central hub for:

- 🌐 **Community Building** - Connecting students, researchers, and industry professionals
- 📖 **Education** - Workshops, seminars, and resources making quantum computing accessible
- 🎓 **Events & Collaborations** - UCLA x USC seminars, UCLA x Caltech EntangleTalks, hackathons
- 👥 **Membership Management** - Integrated Google Sheets & Mailchimp automation
- 🔬 **Research Showcase** - Highlighting cutting-edge quantum research and student projects

### Key Features

- **Server-Side Rendering (SSR)** with Next.js 15 App Router
- **Responsive Design** using Tailwind CSS 4 and custom Kantumruy Pro font
- **Framer Motion Animations** for smooth, engaging user interactions
- **Automated Member Sync** between Google Sheets and Mailchimp
- **Admin Dashboard** for managing integrations and monitoring sync status
- **Accessible & SEO-Optimized** with semantic HTML and proper metadata

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15.3.4 (App Router) |
| **UI Library** | React 19.0.0 |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4.x, Custom CSS |
| **Animations** | Framer Motion 12.x |
| **Fonts** | Kantumruy Pro (Google Fonts) |
| **APIs** | Google Sheets API, Mailchimp Marketing API |
| **Backend Services** | Node.js 20+, googleapis, @mailchimp/mailchimp_marketing |
| **Development** | Turbopack (Next.js bundler), ESLint, cross-env |
| **Deployment** | Vercel (production), Local dev server |

### Why These Technologies?

- **Next.js 15 App Router**: Latest routing architecture with React Server Components for improved performance
- **React 19**: Access to newest concurrent features and performance optimizations
- **TypeScript**: Type safety prevents runtime errors and improves developer experience
- **Tailwind CSS 4**: Utility-first CSS for rapid, consistent UI development
- **Framer Motion**: Declarative animations that enhance user engagement
- **Google Sheets API**: Simple, accessible data storage for membership information
- **Mailchimp**: Professional email marketing and audience management

---

## 📁 Project Structure

```
qcsa/
├── public/                          # Static assets
│   ├── images/                      # All image assets
│   │   ├── Final_QCSA_Logo-*.png   # QCSA branding & logos
│   │   ├── team photos/            # Board member profile photos
│   │   ├── event graphics/         # Event and workshop imagery
│   │   └── ...                     # Icons, backgrounds, partner logos
│   └── google*.html                # Google Search Console verification
│
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── layout.tsx              # Root layout (metadata, fonts, HTML structure)
│   │   ├── page.tsx                # Homepage with HeroSection, AboutUs, Testimonials
│   │   ├── globals.css             # Global styles, CSS variables, Tailwind imports
│   │   ├── head.tsx                # Custom head component (if needed)
│   │   │
│   │   ├── Components/             # Reusable React components
│   │   │   ├── mainWebsiteHeader.tsx    # Navigation header with logo & links
│   │   │   ├── mainWebsiteFooter.tsx    # Site footer with social links
│   │   │   ├── HeroSection.tsx          # Landing page hero
│   │   │   ├── AboutUs.tsx              # About QCSA section
│   │   │   ├── GetInvolved.tsx          # Call-to-action section
│   │   │   ├── Testimonials.tsx         # Member testimonials carousel
│   │   │   ├── MembershipForm.tsx       # Registration form with validation
│   │   │   ├── TeamCard.tsx             # Team member card component
│   │   │   ├── HackathonCard.tsx        # Event card component
│   │   │   ├── NewsletterCard.tsx       # Newsletter preview card
│   │   │   ├── Orb.tsx / Orb.css        # Quantum-themed visual effects
│   │   │   └── ...                      # Other UI components
│   │   │
│   │   ├── about/                  # About page - team directory, mission
│   │   ├── events/                 # Events page - upcoming/past events, calendar
│   │   ├── resources/              # Educational resources hub
│   │   ├── join-us/                # Membership registration page
│   │   ├── admin/                  # Admin dashboard for data management
│   │   ├── gallery/                # Photo gallery from events
│   │   ├── newsletters/            # Newsletter archives
│   │   ├── qhackathon/            # Quantum hackathon information
│   │   ├── quantum_classes/        # UCLA quantum courses directory
│   │   ├── qube/                   # QuBE event details
│   │   ├── ucla_acm/              # ACM collaboration info
│   │   ├── ucla_caltech/          # Caltech collaboration (EntangleTalks LA)
│   │   ├── ucla_usc/              # USC collaboration info
│   │   │
│   │   ├── api/                   # Next.js API routes
│   │   │   ├── submit-membership/      # POST: Handle form submissions to Google Sheets
│   │   │   │   └── route.ts
│   │   │   ├── sync-to-mailchimp/      # POST/GET: Sync Google Sheets → Mailchimp
│   │   │   │   └── route.ts
│   │   │   └── test-connection/        # GET: Verify API credentials
│   │   │       └── route.ts
│   │   │
│   │   └── utils/                 # Utility functions & services
│   │       ├── googleSheetsService.ts   # Google Sheets API wrapper
│   │       ├── mailchimpService.ts      # Mailchimp API wrapper
│   │       ├── syncTracker.ts           # Track processed emails (avoid duplicates)
│   │       └── googleFormSubmission.ts  # Google Forms submission helper
│   │
│   └── types/                     # TypeScript type definitions
│       └── mailchimp.d.ts         # Mailchimp type declarations
│
├── docs/                          # Documentation
│   ├── GOOGLE_SHEETS_SETUP.md    # Step-by-step Google Sheets API setup
│   └── Going-to-admin.md          # Admin dashboard guide
│
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment variables (gitignored)
├── package.json                   # Dependencies and scripts
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.mjs              # ESLint rules
└── sync-log.json                  # Mailchimp sync tracking log (auto-generated)
```

### Key Directories Explained

- **`src/app/`**: Next.js App Router structure. Each folder represents a route.
- **`src/app/Components/`**: Shared, reusable React components used across pages.
- **`src/app/api/`**: Server-side API endpoints for form submission, data sync, and health checks.
- **`src/app/utils/`**: Business logic and external service integrations.
- **`public/images/`**: All static images. Use Next.js `<Image>` component for optimization.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/qcsa-at-ucla/qcsa.git
   cd qcsa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs all required packages from `package.json`.

3. **Set up environment variables**

   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```

   Edit `.env.local` and fill in your credentials. See [Environment Variables](#environment-variables) section for details.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Verify everything works**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Navigate to different pages (About, Events, Resources, etc.)
   - Check the browser console for any errors

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

#### Google Sheets API

```env
# Get these from Google Cloud Console after creating a service account
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_SPREADSHEET_ID_1=your_spreadsheet_id  # Primary spreadsheet
GOOGLE_SHEETS_RANGE=Sheet1!A:G                      # Data range
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
```

**Setup Guide**: See [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) for detailed instructions.

#### Mailchimp API

```env
# Get these from Mailchimp account settings
MAILCHIMP_API_KEY=your_mailchimp_api_key_here
MAILCHIMP_LIST_ID=your_audience_list_id
MAILCHIMP_DATA_CENTER=us1  # e.g., us1, us2, us3 - check your API key
```

#### Google Forms (Optional - for dual submission)

```env
# Get entry IDs by inspecting your Google Form
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME=entry.123456789
NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME=entry.987654321
NEXT_PUBLIC_GOOGLE_FORM_EMAIL=entry.456789123
NEXT_PUBLIC_GOOGLE_FORM_EDUCATION=entry.789123456
NEXT_PUBLIC_GOOGLE_FORM_REASON=entry.321654987
```

**Finding Entry IDs**:
1. Open your Google Form
2. Right-click → "Inspect Element" (F12)
3. Search (Ctrl+F) for `entry.` in the HTML
4. Copy the `entry.XXXXXXXXX` values from input fields

---

## 💻 Development Guide

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack (fast) |
| `npm run dev:verbose` | Development server with verbose logging |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server (run `build` first) |
| `npm run lint` | Run ESLint to check code quality |

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing file structure
   - Test locally before committing

3. **Test your changes**

   ```bash
   npm run dev      # Manual testing
   npm run lint     # Check for code issues
   npm run build    # Ensure it builds successfully
   ```

4. **Commit with clear messages**

   ```bash
   git add .
   git commit -m "feat: add event filtering functionality"
   # or
   git commit -m "fix: resolve mobile nav menu issue"
   ```

   Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

5. **Push and create a pull request**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a PR on GitHub for review.

### Common Development Tasks

#### Adding a New Page

1. Create a new folder in `src/app/` with the route name:
   ```bash
   mkdir src/app/new-page
   ```

2. Create `page.tsx` inside:
   ```tsx
   import MainWebsiteHeader from '../Components/mainWebsiteHeader';
   import MainWebsiteFooter from '../Components/mainWebsiteFooter';

   export default function NewPage() {
     return (
       <div>
         <MainWebsiteHeader />
         <main>
           <h1>Your New Page</h1>
         </main>
         <MainWebsiteFooter />
       </div>
     );
   }
   ```

3. The page will be available at `/new-page`

#### Adding a New Component

1. Create a new file in `src/app/Components/`:
   ```tsx
   // src/app/Components/YourComponent.tsx
   export default function YourComponent() {
     return <div>Your component content</div>;
   }
   ```

2. Import and use it:
   ```tsx
   import YourComponent from '../Components/YourComponent';

   export default function SomePage() {
     return <YourComponent />;
   }
   ```

#### Updating Team Members

Edit the `boardMembers` array in `src/app/about/page.tsx`:

```typescript
const boardMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "President",
    major: "Physics",
    year: "3rd Year",
    bio: "Bio here...",
    image: "/images/john-doe.png",
    linkedIn: "https://www.linkedin.com/in/johndoe/"
  },
  // Add more members...
];
```

#### Adding Event Data

Edit the `eventsData` or `pastEvents` arrays in `src/app/events/page.tsx`:

```typescript
const eventsData = [
  {
    datePrimary: "15",
    dateSecondary: "March",
    title: "Quantum Workshop",
    location: "Engineering VI",
    time: "6:00 PM - 8:00 PM",
    description: "Hands-on Qiskit workshop...",
    link: "/quantum-workshop",
  },
];
```

#### Styling Guidelines

- **Use Tailwind utilities** for most styling
- **Custom CSS** only when necessary in `globals.css`
- **Color variables** defined in `tailwind.config.js`:
  - `text-main` → `#234285` (primary blue)
  - `text-shadow` → `#ADC8EF` (light blue)
  - `bg-background` → `#F3F8FF` (off-white)
  - `bg-lighter` → `#F8FAFF` (lightest)

- **Font**: Use `font-kantumruy` class for Kantumruy Pro font

Example:
```tsx
<h1 className="text-4xl font-bold text-main font-kantumruy">
  Title Here
</h1>
```

---

## 📡 API Documentation

### Overview

The QCSA website uses Next.js API routes for server-side functionality. All API routes are located in `src/app/api/`.

### API Endpoints

#### 1. **POST `/api/submit-membership`**

Handles membership form submissions and stores data in Google Sheets.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "educationalBackground": "Bachelor's Degree",
  "reasonToJoin": "Interested in quantum computing"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Membership form submitted successfully",
  "rowsAdded": 1
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields"
}
```

**Implementation**: `src/app/api/submit-membership/route.ts`

---

#### 2. **POST `/api/sync-to-mailchimp`**

Syncs member data from Google Sheets to Mailchimp audience. Prevents duplicates using sync tracking.

**Request:** No body required

**Response:**
```json
{
  "success": true,
  "message": "Sync completed: 5 new contacts processed, 10 already existed",
  "processed": 5,
  "failed": 0,
  "skipped": 10,
  "errors": []
}
```

**Implementation**: `src/app/api/sync-to-mailchimp/route.ts`

---

#### 3. **GET `/api/sync-to-mailchimp`**

Checks spreadsheet status and sync statistics without syncing.

**Response:**
```json
{
  "success": true,
  "message": "Found 15 entries in spreadsheet",
  "entries": 15,
  "syncStats": {
    "total": 15,
    "successful": 13,
    "failed": 2,
    "lastSync": "2025-03-15T10:30:00.000Z"
  },
  "preview": [
    { "firstName": "John", "lastName": "Doe", "email": "john@example.com" }
  ]
}
```

---

#### 4. **GET `/api/test-connection`**

Tests Google Sheets and Mailchimp API connections.

**Response:**
```json
{
  "success": true,
  "message": "All connections successful",
  "results": {
    "googleSheets": {
      "connected": true,
      "error": "",
      "entries": 15
    },
    "mailchimp": {
      "connected": true,
      "error": "",
      "listName": "QCSA Members"
    }
  }
}
```

---

### Service Classes

#### GoogleSheetsService

Located in `src/app/utils/googleSheetsService.ts`

**Methods:**
- `getSpreadsheetData()`: Fetches all rows from the configured spreadsheet
- `getNewEntries(lastTimestamp)`: Filters for entries newer than a timestamp

**Usage:**
```typescript
import { GoogleSheetsService } from '@/app/utils/googleSheetsService';

const service = new GoogleSheetsService();
const data = await service.getSpreadsheetData();
```

---

#### MailchimpService

Located in `src/app/utils/mailchimpService.ts`

**Methods:**
- `addContact(contact)`: Adds a single contact to Mailchimp
- `addMultipleContacts(contacts)`: Batch add with rate limiting
- `updateContact(contact)`: Updates existing contact information

**Usage:**
```typescript
import { MailchimpService } from '@/app/utils/mailchimpService';

const service = new MailchimpService();
const result = await service.addContact({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com"
});
```

---

#### SyncTracker

Located in `src/app/utils/syncTracker.ts`

Tracks processed emails to prevent duplicate syncs. Stores data in `sync-log.json`.

**Methods:**
- `getProcessedEmails()`: Returns Set of processed email addresses
- `recordSync(records)`: Records sync results
- `getStats()`: Returns sync statistics
- `clearAllRecords()`: Resets sync log for full re-sync

**Usage:**
```typescript
import { SyncTracker } from '@/app/utils/syncTracker';

const tracker = new SyncTracker();
const processed = tracker.getProcessedEmails(); // Set<string>
```

---

### Admin Dashboard

Access at `/admin` to manage integrations.

**Features:**
- **Test Connections**: Verify Google Sheets and Mailchimp APIs
- **Check Spreadsheet Status**: Preview spreadsheet data
- **Sync to Mailchimp**: Manually trigger sync
- **View Statistics**: See sync history and success/failure counts

---

## 🚢 Deployment

### Production Deployment (Vercel)

The QCSA website is deployed on **Vercel**, which provides:
- Automatic deployments from Git
- Edge network for fast global access
- Serverless functions for API routes
- Environment variable management

#### Deployment Steps

1. **Build locally to test**

   ```bash
   npm run build
   npm run start
   ```

   Verify everything works at `http://localhost:3000`

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "your changes"
   git push origin main
   ```

3. **Automatic Deployment**
   - Vercel automatically detects the push to `main` branch
   - Builds the project using `next build`
   - Deploys to production

4. **Set Environment Variables in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - **Important**: Use the same variable names

#### Environment Variables in Vercel

Make sure to add these in Vercel Dashboard:

```
GOOGLE_SHEETS_SPREADSHEET_ID
GOOGLE_SHEETS_SPREADSHEET_ID_1
GOOGLE_SHEETS_RANGE
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
MAILCHIMP_API_KEY
MAILCHIMP_LIST_ID
MAILCHIMP_DATA_CENTER
```

**Note**: For `GOOGLE_PRIVATE_KEY`, paste the entire key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` markers, with `\n` preserved for line breaks.

#### Vercel Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Build passes locally (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Test API endpoints in production
- [ ] Verify Google Sheets integration
- [ ] Verify Mailchimp integration
- [ ] Check all pages load correctly
- [ ] Test mobile responsiveness

---

## 📋 Code Standards

### TypeScript Guidelines

- **Use TypeScript** for all new files (`.ts`, `.tsx`)
- **Define interfaces** for props and data structures
- **Avoid `any` type** - use proper typing
- **Export types** for reusability

**Example:**
```typescript
interface TeamMember {
  id: number;
  name: string;
  role: string;
  major: string;
  year: string;
  bio: string;
  image: string;
  linkedIn: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return <div>{member.name}</div>;
}
```

### React Best Practices

- **Use functional components** with hooks
- **Extract reusable logic** into custom hooks
- **Use `'use client'`** directive for client-side interactivity
- **Optimize images** with Next.js `<Image>` component
- **Lazy load** when appropriate

**Example:**
```tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```

### CSS/Styling Standards

- **Prefer Tailwind utilities** over custom CSS
- **Use CSS variables** from `globals.css` for theming
- **Maintain responsive design** (mobile-first)
- **Use consistent spacing** (Tailwind's spacing scale)

**Color Palette:**
```css
/* From tailwind.config.js */
--color-main: #234285       /* Primary blue */
--color-shadow: #ADC8EF     /* Light blue */
--color-lighter: #F8FAFF    /* Very light blue */
--color-background: #F3F8FF /* Off-white background */
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `TeamCard.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Utilities**: `camelCase.ts` (e.g., `googleSheetsService.ts`)
- **Types**: `camelCase.d.ts` (e.g., `mailchimp.d.ts`)
- **Images**: `kebab-case.png` (e.g., `team-photo.png`)

### Code Organization

- **Group related logic** together
- **Keep components small** (< 300 lines)
- **Extract complex logic** into utility functions
- **Use meaningful variable names**

### Git Commit Messages

Follow **Conventional Commits**:

```
<type>: <description>

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring
- `test`: Adding/updating tests
- `chore`: Build, dependencies, config

**Examples:**
```bash
git commit -m "feat: add event filtering by category"
git commit -m "fix: resolve mobile menu not closing"
git commit -m "docs: update API documentation"
```

---

## 🛠 Troubleshooting

### Common Issues

#### 1. **Build Errors**

**Problem**: `npm run build` fails

**Solutions:**
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all imports are correct
- Ensure environment variables are set
- Clear Next.js cache: `rm -rf .next`

#### 2. **Google Sheets API Not Working**

**Problem**: Form submissions don't appear in Google Sheets

**Solutions:**
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` has access to the spreadsheet
- Check `GOOGLE_PRIVATE_KEY` includes `\n` for newlines
- Test connection at `/admin` → "Test Connections"
- Check Google Cloud Console for API quotas

#### 3. **Mailchimp Sync Fails**

**Problem**: `/api/sync-to-mailchimp` returns errors

**Solutions:**
- Verify `MAILCHIMP_API_KEY` is valid
- Check `MAILCHIMP_DATA_CENTER` matches your API key (e.g., `us1`, `us2`)
- Ensure `MAILCHIMP_LIST_ID` is correct
- Check rate limits (API has 10 calls/second limit)

#### 4. **Images Not Loading**

**Problem**: Images show broken icon

**Solutions:**
- Verify image exists in `public/images/`
- Use correct path: `/images/filename.png` (leading slash)
- Check image file extension matches import
- Use Next.js `<Image>` component for optimization

#### 5. **Tailwind Styles Not Applying**

**Problem**: Tailwind classes don't work

**Solutions:**
- Restart dev server: `npm run dev`
- Check `tailwind.config.js` includes file path
- Verify no syntax errors in `globals.css`
- Clear browser cache

#### 6. **Framer Motion Animation Issues**

**Problem**: Animations not smooth or not working

**Solutions:**
- Ensure component has `'use client'` directive
- Check browser supports animations
- Reduce `initial` animation complexity on large pages
- Use `whileInView={{ once: true }}` for performance

### Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Use React DevTools** to inspect component state
3. **Check Network tab** for failed API requests
4. **Review Next.js logs** in terminal
5. **Test in incognito mode** to rule out caching issues

### Getting Help

- Check existing issues on GitHub
- Contact the tech lead (see [Team & Contact](#team--contact))
- Reach out in team Slack/Discord channel

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

### For QCSA Members

1. **Join the team** - Reach out to leadership to join the tech team
2. **Pick an issue** - Check GitHub Issues for tasks labeled `good-first-issue`
3. **Ask questions** - Don't hesitate to ask for help in team channels

### Contribution Workflow

1. **Fork the repository** (external contributors)
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/qcsa.git
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make your changes**
   - Write clear, commented code
   - Follow code standards (see [Code Standards](#code-standards))
   - Test thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly

### Pull Request Guidelines

- **Clear title** - Use conventional commit format
- **Description** - Explain what and why
- **Screenshots** - Include for UI changes
- **Testing** - Describe how you tested
- **Link issues** - Reference related issues (e.g., "Closes #123")

### Code Review Process

1. **Automated checks** run (build, lint)
2. **Team review** - At least one approval required
3. **Address feedback** - Make requested changes
4. **Merge** - Once approved, changes are merged

### What to Contribute

**High Priority:**
- Bug fixes
- Performance improvements
- Accessibility enhancements
- Documentation updates

**Feature Ideas:**
- Event search/filter functionality
- Member directory with search
- Newsletter archive with categories
- Dark mode toggle
- Quantum visualizations

### Reporting Bugs

1. **Check existing issues** first
2. **Create a new issue** with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features

1. **Open an issue** labeled `enhancement`
2. **Describe the feature** and use case
3. **Explain benefits** to users/organization
4. **Wait for feedback** from maintainers

---

## 👥 Team & Contact

### Current Tech Team (2024-2025)

**Leadership:**
- Victor Yu - President
- Alexander Jürgens - President

**Tech Team:**
- Harshita Kukreja - Head of Digital Infrastructure/Tech Lead
- Clyde Villacrusis - Web Developer
- Emma Zhang - Web Developer

**Design Team:**
- Kimberley Wu - Designer
- Gina Namkung - Designer

### Contact Information

- **Email**: [quantum.ucla@gmail.com](mailto:quantum.ucla@gmail.com)
- **Website**: [qcsa.vercel.app](https://qcsa.vercel.app)
- **LinkedIn**: [QCSA at UCLA](https://www.linkedin.com/company/quantum-computing-student-association-ucla)
- **Instagram**: [@uclaqcsa](https://www.instagram.com/uclaqcsa/)

### UCLA Affiliations

- **UCLA CQSE**: [Center for Quantum Science and Engineering](https://cqse.ucla.edu)
- **UCLA Samueli**: [Henry Samueli School of Engineering](https://samueli.ucla.edu)

### Collaborations

- **UCLA x USC**: Monthly quantum seminar series
- **UCLA x Caltech**: EntangleTalks LA networking events
- **UCLA ACM**: [Association for Computer Machinery](https://www.uclaacm.com)

### Resources & Partners

- **Qiskit**: [IBM Quantum Development](https://qiskit.org)
- **Google Quantum AI**: [Quantum Computing Research](https://quantumai.google)
- **Microsoft Quantum**: [Azure Quantum Platform](https://azure.microsoft.com/services/quantum)

---

## 📝 License

This project is private and maintained by the Quantum Computing Student Association at UCLA. All rights reserved.

For permission to use or modify this code, please contact [quantum.ucla@gmail.com](mailto:quantum.ucla@gmail.com).

---

## 🎓 Acknowledgments

### Special Thanks

- **UCLA CQSE** - For institutional support and guidance
- **Faculty Advisors** - Professor Mark Gyure and the CQSE leadership team
- **Contributors** - All students and faculty who have contributed to QCSA's mission
- **Industry Partners** - IBM, Google, Microsoft, HRL Laboratories, and other quantum technology companies
- **Community** - Our members and the broader quantum computing community

### Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Google Sheets API](https://developers.google.com/sheets/api) - Data storage
- [Mailchimp](https://mailchimp.com/) - Email marketing
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📚 Additional Documentation

- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Detailed Google Sheets API setup
- **[Going-to-admin.md](./Going-to-admin.md)** - Admin dashboard usage guide
- **[Contributing Guidelines]** - (To be added) Extended contribution guidelines

---

## 🗺️ Roadmap

### Current Focus (2024-2025)

- [x] Launch new website with Next.js 15
- [x] Implement Google Sheets integration
- [x] Add Mailchimp automation
- [x] Create admin dashboard
- [ ] Add event search/filtering
- [ ] Implement member portal
- [ ] Add dark mode
- [ ] Optimize performance (Lighthouse 95+)

### Future Plans

- **Member Portal**: Login system for members with personalized content
- **Event RSVP System**: Integrated event registration
- **Blog/News Section**: Regular updates on quantum computing developments
- **Resource Library**: Searchable database of quantum learning materials
- **Interactive Demos**: Quantum circuit visualizations and simulations
- **Mobile App**: Native mobile experience

---

**Built with ❤️ by the QCSA team at UCLA**

*Join us in building the quantum future, one qubit at a time.*

---

**Last Updated**: December 2025  
**Version**: 0.1.0  
**Maintainer**: QCSA Tech Team
