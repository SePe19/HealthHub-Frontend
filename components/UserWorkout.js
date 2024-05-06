import React from 'react';
import { View, Text, Image } from 'react-native';

const UserWorkout = () => {
    const workout_type = {
        src: { uri: "https://static-00.iconduck.com/assets.00/dumbbell-icon-2048x2048-tqr7t7ds.png" },
        type: "muscles"
    };
    const item = {
        title: "howdy",
        workout_type
    };
    return (
        <View>
            <Text>{item.title}</Text>
            <Image source={workout_type.src} style={{ width: 100, height: 100 }} />
        </View>
    );
};

export default UserWorkout;
