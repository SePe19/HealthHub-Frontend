import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../../styles/colors'

const Header = ({ profilePicture, username, motivationalQuote }) => {
    return (
        <View style={styles.header}>
            <View style={styles.profileContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.motivationalQuote}>{motivationalQuote}</Text>
            </View>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        </View>
    )
}

const styles= StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGrey,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        marginRight: 10,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    motivationalQuote: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
    },
})

export default Header;