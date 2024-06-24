// WorkoutsNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutsScreen from '../../screens/WorkoutsScreen';
import CreateWorkoutScreen from '../../screens/CreateWorkoutScreen';

const Stack = createStackNavigator();

const WorkoutsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Workouts" component={WorkoutsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateWorkoutScreen" component={CreateWorkoutScreen} options={{ title: 'Create Workout' }} />
        </Stack.Navigator>
    );
};

export default WorkoutsNavigator;
