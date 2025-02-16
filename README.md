# Astralis - Collaborative Document App

Astralis is a **Next.js collaborative document application**, similar to Notion, that enables real-time document editing and seamless teamwork. It leverages **Firestore, Liveblocks, Clerk authentication, and Cloudflare Workers** to provide a smooth and responsive editing experience.

## Features

- **Real-time Collaboration** – Multiple users can edit the same document simultaneously.
- **AI-Powered Document Interaction** – Users can communicate with documents via **ChatGPT**.
- **AI-Based Translation** – Supports text translation using advanced AI models.
- **User Authentication** – Secure login and user management powered by **Clerk**.
- **Cloud-based Storage** – Uses **Firestore** for real-time data syncing.
- **Seamless Performance** – Optimized with **Cloudflare Workers** for fast response times.

## Installation

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file and configure the necessary credentials:
```env
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
LIVEBLOCKS_SECRET=your-liveblocks-secret-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Run the Development Server
```bash
npm run dev
```
Your app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – Starts the development server.
- `npm run build` – Builds the project for production.
- `npm run start` – Starts the production server.
- `npm run lint` – Runs ESLint for code quality checks.

## Dependencies

- **Next.js** – React framework for server-side rendering and static site generation.
- **Firestore** – Real-time NoSQL database for storing documents and user data.
- **Liveblocks** – Enables collaborative editing with real-time syncing.
- **Clerk** – Authentication and user management.
- **Cloudflare Workers** – Serverless execution for fast and scalable APIs.
- **OpenAI API** – Powers document interaction via ChatGPT.
- **Yjs** – Conflict-free data synchronization for collaborative editing.

Astralis provides a powerful **Notion-like experience** with **AI integration** and **real-time collaboration**, making teamwork effortless and intuitive! 🚀
