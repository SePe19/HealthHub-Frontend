import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UserWorkout = ({ user_workouts }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={user_workouts}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.workout_type}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default UserWorkout;