import { onAuthStateChanged } from 'firebase/auth';
import { off, onValue, ref, remove, set, update } from 'firebase/database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../models/Task';
import { auth, db } from '../services/firebase';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext<any>(null);

/*
  TaskContext responsibilities:
  - Maintain the current user's task list in React state (`tasks`).
  - Keep the local task list synchronized with Firebase Realtime Database
    for the authenticated user (listen / write updates).
  - Provide `addTask`, `deleteTask`, and `toggleComplete` helpers so
    other parts of the app can modify tasks without dealing with Firebase directly.
*/

/*
  Sorting algorithm:
  - Operates on a shallow copy of the tasks array so the original order is not mutated.
  - Primary sort: descending `priority` (higher numbers appear first).
  - Secondary sort: ascending `deadline` (earlier deadlines first).
*/
const sortTasks = (tasks: Task[]) =>
  [...tasks].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [uid, setUid] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const authCtx = useContext(AuthContext);
  const signingOut = authCtx?.signingOut;

  useEffect(() => {
    // Listen for authentication state changes so we can load the
    // correct user's tasks from Firebase when sign-in/out occurs.
    const unsubAuth = onAuthStateChanged(auth, user => {
      setUid(user ? user.uid : null);
      setAuthInitialized(true);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    // If there's no signed-in user, clear local tasks (unless sign-out is in progress).
    if (!uid) {
      // if a sign-out is in progress, don't clear tasks immediately
      if (signingOut) return;
      setTasks([]);
      return;
    }

    // Create a reference to the user's tasks in Firebase Realtime Database.
    // Path: /users/{uid}/tasks
    const tasksRef = ref(db, `users/${uid}/tasks`);

    // Attach a real-time listener. `onValue` fires whenever the tasks node
    // changes; we read the snapshot, convert it to an array, sort it, and
    // update local state so the UI reflects the database.
    const listener = onValue(tasksRef, snapshot => {
      const data = snapshot.val();
      const loaded = data ? sortTasks(Object.values(data)) : [];
      setTasks(loaded as Task[]);
    });

    // Clean up the Firebase listener when the component unmounts or uid changes.
    return () => {
      off(tasksRef);
    };
  }, [uid, authInitialized, signingOut]);

  /*
    Persist a new task to Firebase for the current user.
    Writes the full `task` object to: users/{uid}/tasks/{task.id}
  */
  const addTask = async (task: Task) => {
    if (!uid) return;
    await set(ref(db, `users/${uid}/tasks/${task.id}`), task);
  };

  /*
    Delete a task from Firebase for the current user.
    Removes the node at: users/{uid}/tasks/{id}
  */
  const deleteTask = async (id: string) => {
    if (!uid) return;
    await remove(ref(db, `users/${uid}/tasks/${id}`));
  };

  /*
    Toggle the `completed` boolean for a task.
    - Reads the current value from local `tasks` state and writes the
      flipped value back to Firebase using `update` which applies a
      shallow patch to the task node.
  */
  const toggleComplete = async (id: string) => {
    if (!uid) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    await update(ref(db, `users/${uid}/tasks/${id}`), {
      completed: !task.completed,
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};
