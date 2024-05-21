import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';
import DashboardScreen from '../../screens/DashboardScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home-outline';
                        } else if (route.name === 'Workout') {
                            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                        } else if (route.name === 'Dashboard') {
                            iconName = focused ? 'ios-person' : 'ios-person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Workout" component={WorkoutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabNavigator;
