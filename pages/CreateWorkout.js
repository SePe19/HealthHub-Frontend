import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateWorkout = () => {
    const [title, setTitle] = useState('');
    const [workoutType, setWorkoutType] = useState('');

    const handleSubmit = () => {
        // Validate form data
        if (!title.trim() || !workoutType.trim()) {
            return;
        }

        // Submit form data
        const workoutData = {
            title,
            workoutType,
            // Add additional fields here
        };

        // Clear form inputs
        setTitle('');
        setWorkoutType('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create a New Workout</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Workout Type"
                value={workoutType}
                onChangeText={setWorkoutType}
            />
            {/* Add more input fields as needed */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default CreateWorkout;