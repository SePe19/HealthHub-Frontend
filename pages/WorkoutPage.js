import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import fetchWorkouts from '../services/fetchService';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const workoutData = await fetchWorkouts();
                console.log("HEJSA",workoutData);
                setWorkouts(workoutData);
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };
        getWorkouts();
    }, []);
    return (
        <View>
            {workouts.map(workout => (
                <Text key={workout.id}>{workout.title}</Text>
            ))}
        </View>
    );
};

export default WorkoutPage;
