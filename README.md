📱 React Native To-Do App with Firebase Authentication

A modern, Duolingo-style To-Do mobile application built using React Native CLI, TypeScript and Firebase.
The app allows users to securely manage their daily tasks with deadlines, priorities and real-time synchronization.

🚀 Features
🔐 Authentication

Email & Password Registration

Secure Login & Logout

Firebase Authentication integration

📝 Task Management

Add tasks with:

Title

Description

Deadline (Date-Time reference)

Priority (1–5)

Mark tasks as completed

Delete tasks

Each user has isolated task data

📊 Smart Sorting Logic

Tasks are automatically sorted using a mixed algorithm:

1. Incomplete tasks first
2. Higher priority first
3. Earlier deadlines first

🎨 User Interface

Duolingo-style soft green theme

Clean card-based layout

Minimal and friendly UX

🛠 Tech Stack
Technology	Usage
React Native CLI	Mobile Framework
TypeScript	Type Safety
Firebase Authentication	User Login / Registration
Firebase Realtime Database	Task Storage
Context API	State Management
src/
 ├── context/
 │   ├── AuthContext.tsx
 │   └── TaskContext.tsx
 ├── screens/
 │   ├── LoginScreen.tsx
 │   ├── RegisterScreen.tsx
 │   ├── TodoListScreen.tsx
 │   └── AddTaskScreen.tsx
 ├── models/
 │   └── Task.ts
 └── services/
     └── firebase.example.ts


⚙ Setup Instructions

Clone the repository and install dependencies:

git clone https://github.com/AnushaSrivastava273/react-native-todo-auth-app.git
cd react-native-todo-auth-app
npm install
npx react-native run-android


Create your own Firebase config file using:

src/services/firebase.example.ts


Rename it to:

firebase.ts


and add your Firebase project credentials.

📽 Demo

The demo video and APK file are shared via Google Drive as part of the assignment submission.

🌟 Bonus Implemented

Priority & deadline based sorting algorithm

Duolingo-style UI design

Firebase realtime synchronization

User-specific task isolation

🙌 Author

Anusha Srivastava
B.Tech CSE – BIT Mesra
📧 btech15042.22@bitmesra.ac.in

🔗 GitHub: https://github.com/AnushaSrivastava273
