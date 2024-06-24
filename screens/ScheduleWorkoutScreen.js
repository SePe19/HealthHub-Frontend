import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import httpService from '../services/httpService';
import DateTimeInput from '../components/input/DateTimeInput';

const ScheduleWorkoutScreen = () => {
    const workoutTypesURL = 'workout/workout-types';
    const userWorkoutsByTypeURL = 'workout/user-workouts-by-workout-type';
    const scheduleWorkoutURL = 'user/scheduled-workouts';

    const [workoutType, setWorkoutType] = useState('');
    const [workoutTypeOptions, setWorkoutTypeOptions] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [scheduledAt, setScheduledAt] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkoutTypes = async () => {
            try {
                const { data } = await httpService.get(workoutTypesURL);
                setWorkoutTypeOptions(data);
                console.log(data, 'Workout types fetched');
            } catch (error) {
                setError('Error fetching workout types. Please try again later.');
            }
        };

        fetchWorkoutTypes();
    }, []);

    useEffect(() => {
        const fetchWorkoutsByType = async () => {
            if (workoutType) {
                try {
                    const { data } = await httpService.get(userWorkoutsByTypeURL, {
                        params: {
                            userId: parseInt(sessionStorage.getItem('userId')),
                            workoutType: workoutType,
                        },
                    });
                    setWorkouts(data);
                    console.log(data, 'Workouts fetched for type:', workoutType);
                } catch (error) {
                    setError('Error fetching workouts. Please try again later.');
                }
            }
        };

        fetchWorkoutsByType();
    }, [workoutType]);

    const handleSubmit = async () => {
        if (!selectedWorkout) {
            setError('Please select a workout.');
            return;
        }

        try {
            console.log(scheduledAt);
            await httpService.post(scheduleWorkoutURL, {
                userId: parseInt(sessionStorage.getItem('userId')),
                workoutId: selectedWorkout,
                scheduledAt: new Date(scheduledAt).toISOString(),
            });

            setWorkoutType('');
            setSelectedWorkout(null);
            setScheduledAt(new Date().toISOString().split('T')[0]);
            setError(null);

            console.log('Workout successfully scheduled!');
        } catch (error) {
            console.error('Error scheduling workout:', error);
            setError('Failed to schedule workout. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Schedule a workout</Text>
            <Picker
                selectedValue={workoutType}
                style={styles.picker}
                onValueChange={(itemValue) => setWorkoutType(itemValue)}
            >
                <Picker.Item label="Select Workout Type" value="" />
                {workoutTypeOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
            {workoutType && (
                <Picker
                    selectedValue={selectedWorkout}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedWorkout(itemValue)}
                >
                    <Picker.Item label="Select Workout" value={null} />
                    {workouts.map((workout) => (
                        <Picker.Item key={workout.id} label={workout.title} value={workout.id} />
                    ))}
                </Picker>
            )}
            <DateTimeInput
                value={scheduledAt}
                onChange={setScheduledAt}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Schedule Workout" onPress={handleSubmit} disabled={!selectedWorkout} />
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
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default ScheduleWorkoutScreen;