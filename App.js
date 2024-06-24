import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/navigation/TabNavigator';
import Header from './components/common/Header';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
