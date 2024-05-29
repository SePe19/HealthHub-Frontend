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
            }}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'yellow',
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TabNavigator;
