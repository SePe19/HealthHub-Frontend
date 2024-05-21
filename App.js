import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Workouts from './pages/Workouts';
import CreateWorkout from './pages/CreateWorkout';
//import BottomTabNavigator from './components/navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Workouts" component={Workouts} />
                <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}