import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/services/firebase';

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer
          initialState={undefined}
          onStateChange={() => {}}
        >
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
}
