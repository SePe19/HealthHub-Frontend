import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import WorkoutsScreen from '../../screens/WorkoutsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: styles.label,
                tabBarStyle: styles.tabBar,
                headerStyle: {
                    backgroundColor: 'lightblue',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Tab.Screen
                name="Workouts"
                component={WorkoutsScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'lightgray',
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TabNavigator;
