import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import WorkoutsScreen from '../../screens/WorkoutsScreen';
import colors from '../../styles/colors';

// Import your custom icon files
import HomeIcon from '../../assets/navIcons/home-icon.png';
import DashboardIcon from '../../assets/navIcons/dashboard-icon.png';
import WorkoutsIcon from '../../assets/navIcons/workouts-icon.png';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;
                    let iconSize = 40; // Default size for icons

                    // Set iconSource based on the route name
                    if (route.name === 'Home') {
                        iconSource = HomeIcon;
                    } else if (route.name === 'Dashboard') {
                        iconSource = DashboardIcon;
                    } else if (route.name === 'Workouts') {
                        iconSource = WorkoutsIcon;
                    }

                    // Set a larger size for the 'Dashboard' icon
                    if (route.name === 'Workouts') {
                        iconSize = size + 30; // Increase size by 8 units
                    }

                    // Return the custom icon component
                    return <Image source={iconSource} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
                },
                tabBarActiveTintColor: colors.mainColor,
                tabBarInactiveTintColor: colors.secondaryColor,
                tabBarLabelStyle: styles.label,
                tabBarStyle: styles.tabBar,
                headerStyle: {
                    backgroundColor: 'lightblue',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}
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
        backgroundColor: colors.grey,
        borderTopWidth: 0,
        height: 100,
        paddingTop: 10,
        paddingBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 400,
    },
});

export default TabNavigator;
