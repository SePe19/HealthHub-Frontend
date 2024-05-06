import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ profilePicture, username, motivationalQuote }) => {
    return (
        <View>
            <Text>{username}</Text>
        </View>
    );
};

export default Header;
