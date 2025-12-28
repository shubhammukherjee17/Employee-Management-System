# Nexus - Employee Management System

![Nexus Banner](public/login-illustration.png)

**Nexus** is a modern, all-in-one Employee Management System (EMS) designed to streamline workforce operations. It serves as an "Operating System for Teams," helping organizations manage attendance, leaves, projects, and performance in real-time.

> **Sync your workforce with Nexus.**

## 🚀 Features

Nexus comes packed with powerful modules to manage every aspect of your team:

- **📊 Dashboard:** Real-time overview of workforce stats and activities.
- **⚡ Real-time Attendance:** Monitor check-ins, check-outs, and work hours with location data.
- **📅 Leave Management:** Streamlined workflow for leave requests and approvals.
- **👥 Employee Directory:** Comprehensive profiles and management for all staff members.
- **📈 Performance Insights:** Data-driven analytics to track and improve team performance.
- **📆 Schedule:** Shift planning and roster management (Coming soon).
- **📁 Projects:** Track project progress and team assignments.
- **⚙️ Settings:** Configurable preferences for the organization.

## 🛠️ Tech Stack

Built with the latest cutting-edge web technologies:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/Auth:** [Firebase](https://firebase.google.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** Heroicons / Custom SVG

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhammukherjee17/Employee-Management-System.git
   cd Employee-Management-System
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase configuration keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket_name.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages and layouts
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers (Auth, Employee state)
│   ├── dashboard/        # Dashboard sub-pages (Leaves, Attendance, etc.)
│   ├── login/            # Authentication pages
│   └── ...
├── public/               # Static assets
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
