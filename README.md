# Welcome to the official documentation repository for the Quantum Computing Student Association (QCSA).

## Overview

The **Quantum Computing Student Association (QCSA)** is the premier quantum science and technology organization at UCLA, operating under the Center for Quantum Science and Engineering (CQSE). Our mission is to build the quantum future through education, innovation, and community engagement.

This repository contains the source code for the official QCSA website, built with **Next.js 15**, **React 19**, and **TypeScript**. The website serves as a central hub for:

- **Community Building**: Connecting students, researchers, and industry professionals in the quantum computing space
- **Education**: Providing resources, workshops, and seminars to make quantum computing accessible to all students
- **Events & Collaborations**: Hosting talks, hackathons, and inter-university collaborations (UCLA x USC, UCLA x Caltech)
- **Membership Management**: Streamlined registration and member engagement through integrated forms and newsletters
- **Research Showcase**: Highlighting cutting-edge quantum research and student projects

The website features modern design with custom fonts (Kantumruy Pro), responsive layouts, and seamless integrations with Google Sheets and Mailchimp for membership management.

## Features

### 🌟 Core Website Features

- **Modern UI/UX**: Responsive design with custom Kantumruy Pro typography and quantum-themed visual elements
- **Membership Registration**: Integrated Google Forms with automatic data collection to Google Sheets
- **Newsletter Integration**: Seamless Mailchimp integration for member communications and updates
- **Event Management**: Comprehensive events calendar with detailed information about workshops, talks, and collaborations

### � Educational Resources

- **Quantum Classes at UCLA**: Curated list of quantum-related courses with prerequisites and descriptions
- **Resource Library**: Educational materials, research papers, and learning paths for quantum computing
- **Workshop Series**: Interactive coding workshops using Qiskit and other quantum frameworks

### 🌟 Collaborative Programs

- **UCLA x USC**: Monthly seminar series featuring research presentations from both universities
- **EntangleTalks LA**: UCLA x Caltech collaboration for networking and research discussions
- **QCSA x ACM**: Introductory quantum computing workshops in partnership with ACM
- **Industry Partnerships**: Connections with IBM, Google, and other quantum technology companies

### 🌟 Community Features

- **Team Directory**: Comprehensive profiles of board members, researchers, and contributors
- **About CQSE**: Information about UCLA's Center for Quantum Science and Engineering
- **Testimonials**: Member experiences and success stories
- **Gallery**: Photos from events, hackathons, and research activities

### 🌟 Technical Features

- **Server-Side Rendering**: Built with Next.js 15 for optimal performance and SEO
- **TypeScript**: Full type safety and enhanced developer experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **API Integration**: RESTful APIs for form submissions and data synchronization
- **Admin Dashboard**: Backend management for member data and newsletter synchronization

## Environment Setup

To connect the registration form to your Google Form, you need to set up environment variables:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Create a Google Form with the following fields:
   - First Name
   - Last Name
   - Email
   - Educational Background
   - Experience Rating
   - Institution Name

3. Get your Google Form URL and entry IDs:
   - Open your Google Form
   - Copy the pre-fill link
   - However, you use the https://docs.google.com/forms/d/e/[YOUR_ACTUAL_FORM_ID]/formResponse
   - Right-click on the form and "Inspect Element" (or press F12)
   - Press Ctrl+F to search in the HTML
   - Search for "entry." to find all entry IDs
   - Look for input elements with names like `entry.123456789`
      - This is straightforward for name + description fields
      - Slightly complicated for drop-downs/multiple choices
   
   **How to find all entry IDs systematically:**
   1. In the developer tools, press Ctrl+F to open search
   2. Search for entry
   3. This will highlight all entry fields

4. Update `.env.local` with your actual values:

   ```env
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse
   NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME=entry.123456789
   # ... etc
   ```

5. Restart your development server after updating environment variables.

## API Integrations

### Google Sheets Integration

The website uses Google Sheets API to store membership form submissions. This provides a simple and accessible way to manage member data.

**Setup Requirements:**

- Google Cloud Project with Sheets API enabled
- Service Account with JSON credentials
- Shared spreadsheet with appropriate permissions

**Environment Variables:**

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_RANGE=Sheet1!A:E
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"
```

**API Endpoint:** `/api/submit-membership`

- Validates form data
- Appends new member information to Google Sheets
- Returns success/error responses

### Mailchimp Integration

Automated newsletter signup and member communication through Mailchimp API.

**Environment Variables:**

```env
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_audience_list_id
MAILCHIMP_SERVER_PREFIX=us1
```

**API Endpoint:** `/api/sync-to-mailchimp`

- Syncs Google Sheets data to Mailchimp audience
- Handles duplicate detection and updates
- Provides admin dashboard functionality

### Google Forms Integration

Direct form submissions to Google Forms for backup data collection.

**Environment Variables:**

```env
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME=entry.123456789
NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME=entry.987654321
NEXT_PUBLIC_GOOGLE_FORM_EMAIL=entry.456789123
NEXT_PUBLIC_GOOGLE_FORM_EDUCATION=entry.789123456
NEXT_PUBLIC_GOOGLE_FORM_REASON=entry.321654987
```

For detailed setup instructions, see `GOOGLE_SHEETS_SETUP.md`.

## Admin Dashboard

Access the admin panel at `/admin` to:

- Test API connections
- View spreadsheet status
- Manually sync data to Mailchimp
- Monitor form submissions

## Link

## Project Structure

```text
qcsa/
├── public/                          # Static assets
│   ├── images/                      # Image assets (logos, team photos, graphics)
│   │   ├── Final_QCSA_Logo-*.png   # QCSA branding
│   │   ├── team photos/            # Board member photos
│   │   └── event graphics/         # Event and workshop images
│   └── fonts/                      # Custom font files (Kantumruy)
├── src/
│   ├── app/                        # Next.js 13+ App Router
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Global styles
│   │   ├── Components/             # Reusable UI components
│   │   │   ├── HeroSection.tsx     # Landing page hero
│   │   │   ├── AboutUs.tsx         # About section
│   │   │   ├── GetInvolved.tsx     # Call-to-action section
│   │   │   ├── Testimonials.tsx    # Member testimonials
│   │   │   ├── MembershipForm.tsx  # Registration form
│   │   │   ├── mainWebsiteHeader.tsx # Navigation header
│   │   │   └── mainWebsiteFooter.tsx # Site footer
│   │   ├── about/                  # About page with team directory
│   │   ├── events/                 # Events and workshops listing
│   │   ├── resources/              # Educational resources
│   │   ├── join-us/                # Membership registration
│   │   ├── admin/                  # Admin dashboard
│   │   ├── gallery/                # Photo gallery
│   │   ├── newsletters/            # Newsletter archives
│   │   ├── qhackathon/            # Quantum hackathon info
│   │   ├── quantum_classes/        # UCLA quantum courses
│   │   ├── ucla_acm/              # ACM collaboration
│   │   ├── ucla_caltech/          # Caltech collaboration
│   │   ├── ucla_usc/              # USC collaboration
│   │   └── api/                   # API routes
│   │       ├── submit-membership/ # Form submission handler
│   │       ├── sync-to-mailchimp/ # Mailchimp integration
│   │       └── test-connection/   # API health checks
│   └── types/                     # TypeScript type definitions
├── docs/                          # Additional documentation
│   ├── GOOGLE_SHEETS_SETUP.md    # Google Sheets API setup
│   └── Going-to-admin.md          # Admin guide
├── package.json                   # Dependencies and scripts
├── next.config.ts                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── eslint.config.mjs              # ESLint configuration
```

### Key Architecture Decisions

- **Next.js 15 App Router**: Utilizing the latest App Router for improved performance and developer experience
- **React 19**: Taking advantage of the newest React features and optimizations
- **TypeScript**: Full type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Component-Based Architecture**: Modular, reusable components for maintainability
- **API Routes**: Server-side functionality for form handling and integrations

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Git**: For version control

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

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local with your actual values
   # See Environment Setup section above for detailed instructions
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run dev:verbose` - Starts development server with verbose logging
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

### Development Workflow

1. **Create a new branch** for your feature/fix

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally
3. **Run linting** to ensure code quality

   ```bash
   npm run lint
   ```

4. **Commit your changes** with descriptive messages
5. **Push and create a pull request**

### Deployment

The website is deployed using Vercel. For production deployment:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Test the production build locally**

   ```bash
   npm run start
   ```

3. **Deploy to Vercel** (automatically triggered on main branch push)

## Links

### Official QCSA Links

- **Website**: [https://qcsa-at-ucla.github.io](https://qcsa-at-ucla.github.io)
- **Email**: [quantum.ucla@gmail.com](mailto:quantum.ucla@gmail.com)
- **LinkedIn**: [QCSA LinkedIn](https://www.linkedin.com/company/quantum-computing-student-association-ucla)
- **Instagram**: [QCSA Instagram](https://www.instagram.com/qcsa_ucla/)

### UCLA Affiliations

- **UCLA CQSE**: [Center for Quantum Science and Engineering](https://cqse.ucla.edu)
- **UCLA Samueli**: [Henry Samueli School of Engineering](https://samueli.ucla.edu)

### Collaborations

- **UCLA x USC**: Monthly seminar series
- **UCLA x Caltech**: EntangleTalks LA networking events
- **UCLA ACM**: [Association for Computer Machinery](https://www.uclaacm.com)

### Resources

- **Qiskit**: [IBM Quantum Development](https://qiskit.org)
- **Google Quantum AI**: [Quantum Computing Research](https://quantumai.google)
- **Microsoft Quantum**: [Azure Quantum Platform](https://azure.microsoft.com/en-us/services/quantum)

## Recent Updates

- **v0.1.0** (Current): Initial website launch for the 25-26 UCLA School Year
- **Next.js 15**: Upgraded to latest Next.js with App Router
- **React 19**: Updated to React 19 for improved performance
- **Mailchimp Integration**: Automated newsletter and communication system
- **Google Sheets API**: Real-time membership data management
- **Responsive Design**: Mobile-first approach with improved accessibility

## Contributors

###


### Special Thanks

- **UCLA CQSE** - For institutional support and guidance
- **Contributors** - All students and faculty who have contributed to QCSA's mission
- **Industry Partners** - IBM, Google, Microsoft, and other quantum technology companies

### Contributing

We welcome contributions from the community! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

### License

---

**Built with ❤️ by the QCSA team at UCLA**

*Join us in building the quantum future, one qubit at a time.*
