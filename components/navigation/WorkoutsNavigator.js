import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutsScreen from '../../screens/WorkoutsScreen';
import CreateWorkoutScreen from '../../screens/CreateWorkoutScreen';
import ScheduleWorkoutScreen from "../../screens/ScheduleWorkoutScreen";

const Stack = createStackNavigator();

const WorkoutsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Workouts" component={WorkoutsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateWorkoutScreen" component={CreateWorkoutScreen} options={{ title: 'Create Workout' }} />
            <Stack.Screen name="ScheduleWorkoutScreen" component={ScheduleWorkoutScreen} options={{ title: 'Schedule Workout' }} />
        </Stack.Navigator>
    );
};

export default WorkoutsNavigator;