import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomTabNavigator = ({ selectedFooter, setSelectedFooter }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerItem} onPress={() => setSelectedFooter('Dashboard')}>
                <FontAwesome5 name="th-large" size={24} color={selectedFooter === 'Dashboard' ? 'green' : 'white'} />
                <Text style={[styles.footerText, selectedFooter === 'Dashboard' && styles.footerTextSelected]}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem} onPress={() => setSelectedFooter('Home')}>
                <FontAwesome5 name="home" size={24} color={selectedFooter === 'Home' ? 'green' : 'white'} />
                <Text style={[styles.footerText, selectedFooter === 'Home' && styles.footerTextSelected]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem} onPress={() => setSelectedFooter('Workouts')}>
                <FontAwesome5 name="dumbbell" size={24} color={selectedFooter === 'Workouts' ? 'green' : 'white'} />
                <Text style={[styles.footerText, selectedFooter === 'Workouts' && styles.footerTextSelected]}>Workouts</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#444',
        paddingVertical: 10,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
        marginTop: 5,
    },
    footerTextSelected: {
        color: 'green',
    },
});

export default BottomTabNavigator;
