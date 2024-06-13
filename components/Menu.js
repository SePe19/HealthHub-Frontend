import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../styles/colors'

const Menu = ({ selectedMenu, setSelectedMenu }) => {
    return (
        <View style={styles.menu}>
            <TouchableOpacity style={[styles.menuItem, selectedMenu === 'Warmup' && styles.menuItemSelected]} onPress={() => setSelectedMenu('Warmup')}>
                <FontAwesome5 name="running" size={30} color={selectedMenu === 'Warmup' ? 'green' : 'white'} />
                <Text style={[styles.menuText, selectedMenu === 'Warmup' && styles.menuTextSelected]}>Warmup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, selectedMenu === 'Strength' && styles.menuItemSelected]} onPress={() => setSelectedMenu('Strength')}>
                <FontAwesome5 name="dumbbell" size={30} color={selectedMenu === 'Strength' ? 'green' : 'white'} />
                <Text style={[styles.menuText, selectedMenu === 'Strength' && styles.menuTextSelected]}>Strength</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, selectedMenu === 'Cardio' && styles.menuItemSelected]} onPress={() => setSelectedMenu('Cardio')}>
                <FontAwesome5 name="walking" size={30} color={selectedMenu === 'Cardio' ? 'green' : 'white'} />
                <Text style={[styles.menuText, selectedMenu === 'Cardio' && styles.menuTextSelected]}>Cardio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.grey,
        marginTop: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 40,
    },
    menuItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        padding: 20,
    },
    menuItemSelected: {
        backgroundColor: colors.darkGrey,
        borderRadius: 10,
    },
    menuText: {
        color: 'white',
        marginTop: 5,
    },
    menuTextSelected: {
        color: colors.mainColor,
    },
});

export default Menu;
