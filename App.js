import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import Workouts from './pages/Workouts';
//import CreateWorkout from './pages/CreateWorkout';
import TabNavigator from './components/navigation/TabNavigator';

const App = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default App;