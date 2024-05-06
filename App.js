import React from 'react';
import { Text, View } from 'react-native';
import { Workouts } from "./pages/Workouts";
import WorkoutPage from "./pages/WorkoutPage";
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <View>
            <Text>Open up App.js to start working on your app!</Text>
            <Workouts />
            <StatusBar style="auto" />
            <WorkoutPage />
        </View>
    );
}
