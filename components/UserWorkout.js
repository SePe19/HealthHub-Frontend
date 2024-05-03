import React from 'react'
import { View, Text, Image } from 'react-native'


const UserWorkout = () => {
    const workout_type = {
        src: "https://static-00.iconduck.com/assets.00/dumbbell-icon-2048x2048-tqr7t7ds.png",
        type: "muskles"
    }
    const item = {
        title: "howdy",
        workout_type
    }
    return (
        <View>

            <Text>{item.title}</Text>
            <Image source={item.workout_type.src}></Image>

        </View>
    )}

export default UserWorkout;