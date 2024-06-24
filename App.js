import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import TabNavigator from './components/navigation/TabNavigator';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Header from './components/common/Header';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { userId } = useAuth();

    return (
        <NavigationContainer>
            {userId ? (
                <TabNavigator />
            ) : (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignupScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <View style={styles.container}>
                <Header />
                <AppNavigator />
            </View>
        </AuthProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
