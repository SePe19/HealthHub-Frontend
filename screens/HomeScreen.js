import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Menu from '../components/Menu';
import Card from '../components/Card';
import BottomTabNavigator from '../components/navigation/BottomTabNavigator';

function HomeScreen() {
    const [selectedMenu, setSelectedMenu] = useState('Strength');
    const [selectedFooter, setSelectedFooter] = useState('Home');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>Kevin</Text>
                <Text style={styles.subtitle}>No one cared who I was 'til I started edging.</Text>
                <MaterialIcons name="account-circle" size={40} color="white" style={styles.profileIcon} />
            </View>
            <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <ScrollView style={styles.content}>
                <Card
                    title="Deadlift more!"
                    subtitle="You think water moves fast? You should see ice. It moves like it has a mind."
                    imageUrl="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D"
                />
                <Card
                    title="Benefits of Sprinting"
                    subtitle="You think water moves fast? You should see ice. It moves like it has a mind."
                    imageUrl="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D"
                />
                <Card
                    title="Train antagonist muscles"
                    subtitle="You think water moves fast? You should see ice. It moves like it has a mind."
                    imageUrl="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D"
                />
            </ScrollView>
            <BottomTabNavigator selectedFooter={selectedFooter} setSelectedFooter={setSelectedFooter} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    header: {
        padding: 20,
        backgroundColor: '#444',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    username: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    profileIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    content: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;
