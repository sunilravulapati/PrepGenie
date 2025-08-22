# PrepGenie 🧞‍♂️

**Live Demo:** [https://prep-genie-one.vercel.app](https://prep-genie-one.vercel.app)

PrepGenie is a comprehensive, AI-powered web application designed to be the ultimate companion for software engineers preparing for technical interviews. It provides a suite of tools to track progress, practice questions, and get instant, AI-driven assistance, ensuring users are confident and well-prepared.

---

## ✨ Key Features

- **Secure User Authentication:** Seamless sign-up and login functionality powered by [Clerk](https://clerk.com/).

- **Dynamic Dashboard:** Personalized dashboard that tracks key metrics like questions completed, mastery score, and items for review.

- **Live Contribution Heatmap:** GitHub-style heatmap that dynamically updates to visualize daily practice consistency.

- **Real-time Solved History:** Table that instantly updates with questions the user marks as "done" or "review."

- **AI-Powered Question Generation:** Generate an endless supply of new interview questions on various topics using the Gemini API.

- **AI Hints & Solutions:** Get AI-generated hints or full solutions for any question, complete with code examples, explanations, and test cases in a clean pop-up modal.

- **Interactive Theory & Notes:** Dedicated section for curated theory notes, with the ability to upload and save personal PDF notes for revision.

- **Interview & Motivation Trackers:** Tools to track upcoming interviews and stay motivated with curated quotes and a roadmap of future updates.

- **Polished UI/UX:** Clean, modern interface with a collapsible sidebar and fully responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** React (with Vite)  
- **Authentication:** Clerk  
- **AI Integration:** Google Gemini API  
- **Styling:** Plain CSS with modern, responsive design  
- **Deployment:** Vercel  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)  
- npm or yarn  

### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/prepgenie.git
cd prepgenie
```
2. Install dependencies:

```bash
npm install
```
Set up environment variables:

3. Create a .env file in the root of the project and add your API keys:
```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

---

## 🔮 Future Roadmap

- **Database Integration**: Implement Firebase Firestore to persist all user data (solved questions, notes, etc.).

- **Mock Interview Simulator**: Practice with an AI interviewer that provides real-time feedback.

- **Company-Specific Question Banks**: Access lists of frequently asked questions for top tech companies.

- **Community Hub**: A place for users to connect, discuss problems, and share experiences.
