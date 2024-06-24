// Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../styles/colors'

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>John Doe</Text>
                <Text style={styles.welcomeText}>insert bane quote here</Text>
            </View>
            <Image
                source={require('../../assets/profile.png')} // path to your local image
                style={styles.profileIcon}
            />
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
