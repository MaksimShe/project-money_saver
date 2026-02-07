# Money Saver - Savings Challenge Tracker

A full-stack web application that gamifies saving money through daily deposit challenges. Users track their progress by "closing tiles" representing different monetary amounts, with intelligent tracking of pace, skipped days, and projected completion dates.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Key Concepts](#key-concepts)
- [Development](#development)
- [Remaining Tasks](#remaining-tasks)

---

## 🎯 Overview

Money Saver is a savings tracker that helps users complete a 30-day savings challenge. Each day represents a "tile" with a specific monetary value (1-30), and users can track their progress, see how far ahead or behind they are, and get a projected completion date based on their actual saving pace.

### How It Works

1. **Create Account**: User sets up a profile with username and savings parameters (number of days, multiplier)
2. **Daily Challenge**: Each tile represents a day/amount to save (e.g., Day 1 = $1, Day 2 = $2, etc.)
3. **Track Progress**: Click tiles to mark them as "closed" (saved)
4. **Smart Analytics**: System tracks:
   - Days ahead/behind schedule
   - Skipped days (automatically detected)
   - Projected completion date (adjusts based on pace)
   - Saved amount vs. total goal

---

## ✨ Features

### Core Functionality

- **30-Day Savings Challenge**: Complete tiles numbered 1-30 (total: $465)
- **Flexible Multiplier System**: Scale challenge difficulty (e.g., 1x = $1-$30, 20x = $20-$600)
- **Real-time Progress Tracking**: Visual tile grid with closed/open states
- **Date Tracking**: Each closed tile stores the exact date it was completed
- **Multi-currency Support**: Choose from 10+ currencies (USD, EUR, GBP, UAH, etc.)

### Intelligent Analytics

- **Days Ahead/Behind Calculator**: Automatically tracks if user is ahead or behind schedule
  - Formula: `actualDeposits - expectedDeposits`
  - Updates in real-time as tiles are closed/reopened

- **Automatic Skipped Day Detection**: Identifies days with 0 deposits between start date and today
  - No manual marking needed
  - Excludes current day from calculation

- **Dynamic Prognose End Date**: Projected completion date adjusts based on pace
  - Ahead of schedule → earlier completion
  - Behind schedule → later completion
  - Formula: `originalEndDate - daysAhead`

- **Progress Insights**:
  - Completion rate percentage
  - Average tile value
  - Days elapsed/remaining
  - Saved vs. total amount

### User Experience

- **Confirmation Modals**: Prevent accidental tile closures/reopenings
- **Dark Mode Support**: Full dark theme with Tailwind CSS
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Visual Feedback**:
  - Green icons when ahead of schedule
  - Red icons when behind schedule
  - "Saved Today" badge
  - Animated progress bars

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (React 19.2.3)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5.0.11
- **HTTP Client**: Native Fetch API
- **Build Tool**: Turbopack (Next.js default)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB (Mongoose 9.1.6)
- **Additional**: CORS, dotenv

### Development Tools
- **Frontend Dev Server**: Next.js Dev
- **Backend Dev Server**: Nodemon
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm

---

## 📁 Project Structure

```
money-saver/
├── frontend/                    # Next.js frontend application
│   ├── app/                     # Next.js app router
│   │   ├── page.tsx            # Home page (Login/Create Account)
│   │   ├── login/              # Login page
│   │   └── profile/            # User profile page
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Profile/        # Profile page components
│   │   │   │   ├── ProfilePageClient.tsx    # Main profile container
│   │   │   │   ├── ProfileHeader.tsx        # Header with logout
│   │   │   │   ├── ProfileSummary.tsx       # Stats & timeline
│   │   │   │   ├── StatsCards.tsx           # Saved/Total/Remaining
│   │   │   │   ├── SavingSummary.tsx        # Date & progress info
│   │   │   │   ├── SavingProgress.tsx       # Progress bar
│   │   │   │   ├── TileGrid.tsx             # Clickable tiles
│   │   │   │   ├── QuickActions.tsx         # Skip/Reset buttons
│   │   │   │   └── CurrencySelector.tsx     # Currency dropdown
│   │   │   ├── Login/          # Login components
│   │   │   ├── CreateUser/     # User creation components
│   │   │   └── Modal/          # Confirmation modals
│   │   ├── store/              # Zustand state management
│   │   │   └── ProfileStore.ts # Main application state
│   │   ├── sevices/            # API service layer
│   │   │   ├── UserService.ts  # User CRUD operations
│   │   │   └── CreateUser.ts   # User creation
│   │   ├── constants/          # App constants
│   │   │   └── currencies.ts   # Currency definitions
│   │   └── types/              # TypeScript types
│   └── public/                 # Static assets
│
├── backend/                     # Express.js backend
│   ├── src/
│   │   ├── index.js            # Main MongoDB server
│   │   ├── index-temp.js       # JSON file server (dev)
│   │   ├── db.js               # MongoDB connection
│   │   └── models/
│   │       └── User.js         # User schema (Mongoose)
│   ├── .env                    # Environment variables
│   └── package.json
│
├── package.json                 # Root package (shared deps)
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance (local or cloud like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd money-saver
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install

   # Create .env file
   echo "DATABASE_URL=mongodb://localhost:27017/money-saver" > .env
   echo "PORT=3005" >> .env
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install

   # Create .env file
   echo "NEXT_PUBLIC_API_URL=http://localhost:3005" > .env
   ```

### Running the Application

#### Option 1: Full Stack (MongoDB)

1. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:3005
   ```

3. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:3000
   ```

#### Option 2: JSON Backend (No Database)

For quick testing without MongoDB:

```bash
cd backend
npm run temp:dev
# Uses users.json file instead of MongoDB
```

Then start frontend as normal.

### Access the Application

1. Open http://localhost:3000
2. Create a new account or login
3. Start saving money!

---

## 📡 API Documentation

### Base URL
```
http://localhost:3005
```

### Endpoints

#### POST `/create`
Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "totalSum": 465,
  "tempDays": 30,
  "multiplier": 1
}
```

**Response (201):**
```json
{
  "_id": "...",
  "username": "john_doe",
  "totalAmount": 465,
  "savedAmount": 0,
  "startDate": "2026-02-08T00:00:00.000Z",
  "endDate": "2026-03-10T00:00:00.000Z",
  "prognosedEnd": "2026-03-10T00:00:00.000Z",
  "allTiles": [1, 2, 3, ..., 30],
  "closedTiles": [],
  "skippedDays": [],
  "daysAhead": 0
}
```

**Parameters:**
- `username` (string, required): Unique username
- `totalSum` (number, required): Total savings goal
- `tempDays` (number, required): Number of days (generates that many tiles)
- `multiplier` (number, optional): Scale factor for tile values (default: 1)

---

#### POST `/login`
Login existing user.

**Request Body:**
```json
{
  "username": "john_doe"
}
```

**Response (200):** Full user object with recalculated `daysAhead` and `prognosedEnd`

**Errors:**
- `404`: User not found

---

#### GET `/user/:username`
Get user by username.

**Response (200):** Full user object

**Errors:**
- `404`: User not found

---

#### POST `/close-tile`
Mark a tile as closed (saved).

**Request Body:**
```json
{
  "username": "john_doe",
  "tileNumber": 5
}
```

**Response (200):** Updated user object with:
- `closedTiles` array updated with `{ tileNumber: 5, closedDate: "2026-02-08..." }`
- `savedAmount` increased by tile value
- `daysAhead` recalculated
- `prognosedEnd` recalculated

**Errors:**
- `400`: Tile already closed or invalid tile number
- `404`: User not found

---

#### POST `/reopen-tile`
Reopen a closed tile.

**Request Body:**
```json
{
  "username": "john_doe",
  "tileNumber": 5
}
```

**Response (200):** Updated user object with tile removed from `closedTiles`

**Errors:**
- `400`: Tile is not closed
- `404`: User not found

---

## 🧠 Key Concepts

### Tile System

Each tile represents a savings amount:
- **Standard (1x multiplier)**: Tiles 1-30 = $1, $2, $3, ..., $30 (Total: $465)
- **20x multiplier**: Tiles 1-30 = $20, $40, $60, ..., $600 (Total: $9,300)
- **Custom days**: Can create challenges with any number of days

### Date Tracking & Calculations

#### 1. Days Ahead/Behind
```javascript
const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
const expectedDeposits = daysElapsed; // 1 per day pace
const actualDeposits = closedTiles.length;
const daysAhead = actualDeposits - expectedDeposits;
```

**Examples:**
- Day 5, closed 8 tiles → `daysAhead = +3` (3 days ahead)
- Day 10, closed 7 tiles → `daysAhead = -3` (3 days behind)
- Day 15, closed 15 tiles → `daysAhead = 0` (on schedule)

#### 2. Prognose End Date
```javascript
const prognosedEnd = new Date(originalEndDate);
prognosedEnd.setDate(prognosedEnd.getDate() - daysAhead);
```

**Examples:**
- 3 days ahead → completion 3 days earlier
- 2 days behind → completion 2 days later

#### 3. Skipped Days (Frontend Auto-Detection)
```javascript
// Get all dates with deposits
const datesWithDeposits = new Set(
  closedTiles.map(t => new Date(t.closedDate).toDateString())
);

// Find dates from start to today with no deposits
const skippedDays = [];
for (let d = startDate; d <= today; d++) {
  if (!datesWithDeposits.has(d.toDateString()) && d < today) {
    skippedDays.push(d);
  }
}
```

### State Management (Zustand)

The frontend uses Zustand for lightweight state management:

```typescript
type Profile = {
  totalAmount: number;
  savedAmount: number;
  startDate: Date;
  endDate: Date;
  prognoseEndDate: Date;
  closedTilesData: Array<{
    tileNumber: number;
    closedDate: Date;
  }>;
  daysAhead: number;
  skippedDays: Date[];
  // ...
}
```

**Key Actions:**
- `closeTile(number)`: Close a tile, triggers all recalculations
- `openTile(number)`: Reopen a tile
- `calculateDaysAhead()`: Recalculate progress
- `calculatePrognoseEndDate()`: Update projected completion
- `checkIsSavedToday()`: Check if any deposit made today

---

## 🔧 Development

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

**Key Files:**
- `/app/page.tsx` - Home page with login/signup
- `/src/store/ProfileStore.ts` - Global state
- `/src/components/Profile/` - All profile components
- `/src/sevices/UserService.ts` - API calls

### Backend Development

```bash
cd backend

# Development with auto-reload
npm run dev

# Production
npm start

# JSON backend (no MongoDB)
npm run temp:dev
```

**Key Files:**
- `/src/index.js` - Main Express server
- `/src/models/User.js` - Mongoose schema
- `/src/db.js` - MongoDB connection

### Environment Variables

**Backend (.env):**
```bash
DATABASE_URL=mongodb://localhost:27017/money-saver
PORT=3005
```

**Frontend (.env):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3005
```

---

## 📝 Remaining Tasks to Close Project

### High Priority (Core Functionality)

- [ ] **1. Skipped Days Auto-Calculation on Backend**
  - Currently only calculated on frontend
  - Should be calculated and stored in DB on each tile action
  - Add `calculateSkippedDays()` function to backend `index.js`

- [ ] **2. Data Persistence Testing**
  - Test that all date calculations persist correctly across sessions
  - Verify `prognosedEnd` and `daysAhead` recalculate on login

- [ ] **3. Error Handling Improvements**
  - Add better error messages for network failures
  - Implement retry logic for failed API calls
  - Add loading states to all async operations

- [ ] **4. User Authentication**
  - Add password/PIN protection
  - Implement JWT tokens for session management
  - Add "Remember me" functionality

### Medium Priority (UX Enhancements)

- [ ] **5. Statistics Dashboard**
  - Add charts/graphs for savings over time
  - Show weekly/monthly breakdown
  - Visualize ahead/behind trends

- [ ] **6. Achievements/Badges System**
  - Award badges for milestones (10 days, 20 days, etc.)
  - "Perfect week" badge (7 consecutive days)
  - "Speed saver" badge (3+ days ahead)

- [ ] **7. Notifications**
  - Daily reminder to save
  - Celebration on completion
  - Warning when falling behind

- [ ] **8. Export/Import Data**
  - Export progress as CSV/PDF
  - Import existing progress
  - Backup/restore functionality

### Low Priority (Nice-to-Have)

- [ ] **9. Multiple Challenge Support**
  - Allow users to run multiple challenges simultaneously
  - Different challenge types (weekly, monthly, custom)

- [ ] **10. Social Features**
  - Share progress on social media
  - Leaderboards (fastest completion, highest amount)
  - Friends/groups challenges

- [ ] **11. Mobile App**
  - React Native version
  - Push notifications
  - Offline mode

- [ ] **12. Advanced Analytics**
  - Predict completion date based on historical pace
  - Suggest optimal saving strategy
  - Compare with average users

### Bug Fixes & Optimizations

- [ ] **13. Fix API URL Configuration**
  - Currently hardcoded in `UserService.ts` (port 3005)
  - Should use environment variable
  - Add fallback for development vs production

- [ ] **14. Optimize Re-renders**
  - Memoize expensive calculations in ProfileStore
  - Use React.memo for heavy components
  - Lazy load non-critical components

- [ ] **15. Accessibility**
  - Add ARIA labels to all interactive elements
  - Keyboard navigation support
  - Screen reader testing

- [ ] **16. Testing**
  - Unit tests for calculation functions
  - Integration tests for API endpoints
  - E2E tests for critical user flows

### Deployment

- [ ] **17. Production Deployment**
  - Deploy backend to Heroku/Railway/Render
  - Deploy frontend to Vercel/Netlify
  - Set up MongoDB Atlas for production DB
  - Configure CORS for production domains
  - Add environment-specific configs

- [ ] **18. CI/CD Pipeline**
  - GitHub Actions for automated testing
  - Automatic deployment on merge to main
  - Staging environment setup

- [ ] **19. Monitoring & Analytics**
  - Add error tracking (Sentry)
  - User analytics (GA4)
  - Performance monitoring
  - Database backups

### Documentation

- [ ] **20. Complete API Documentation**
  - OpenAPI/Swagger spec
  - Postman collection
  - Example requests/responses

- [ ] **21. User Guide**
  - Getting started tutorial
  - FAQ section
  - Video walkthrough

---

## 📊 Current Status

### ✅ Completed
- 30-tile deposit system with date tracking
- Automatic days ahead/behind calculation
- Dynamic prognose end date
- Multi-currency support
- Responsive UI with dark mode
- MongoDB backend with Mongoose
- User creation and login
- Tile close/reopen functionality
- Confirmation modals
- Progress visualization

### 🚧 In Progress
- Skipped days auto-calculation (frontend only)
- Error handling improvements

### ⏳ Not Started
- Authentication/authorization
- Notifications
- Social features
- Mobile app
- Testing suite

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

Built with ❤️ by the Money Saver Team

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Zustand for simple state management
- MongoDB for the flexible database
