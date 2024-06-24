// Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../styles/colors'

const logout = () => {
    sessionStorage.clear()
}

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                {sessionStorage.getItem('userId') ? (
                    <Text style={styles.nameText}>welcome user</Text>
                ):(
                    <Text>please login</Text>
                    )}
            </View>
            <Image
                source={require('../../assets/profile.png')}
                style={styles.profileIcon}
            />
            <button onClick={logout}>Logout</button>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.lightGrey,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    textContainer: {
        flexDirection: 'column',
    },
    welcomeText: {
        fontSize: 12,
        color: colors.white,
        fontWeight: 400,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 500,
        color: colors.white,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default Header;
