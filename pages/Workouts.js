import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import Header from '../components/Header.js'
import UserWorkout from '../components/UserWorkout.js'
import httpService from '../services/httpService'

const Workouts = ({ navigation }) => {
    const [userWorkouts, setUserWorkouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(20)
    const [selectedDay, setSelectedDay] = useState('')
    const userWorkoutsURL = 'workout/user-workouts/'

    const handleCreateWorkout = () => {
        navigation.navigate('CreateWorkout')
    }

    const username = 'John Doe';
    const motivationalQuote = 'Stay motivated!';
    //Dummy Data for fetching Workout Properties. Replace workouts variable with the userWorkout useState
    const workouts = [
        { id: 1, title: 'Workout 1', description: 'Cardio Day, quick 10min warmup', workout_type: 'Running' },
        { id: 2, title: 'Workout 2', description: 'Rough Cardio Day, 2km swim', workout_type: 'Swimming' },
        { id: 3, title: 'Workout 3', description: 'Cycling practice, 80km', workout_type: 'Cycling' },
        { id: 4, title: 'Workout 4', description: 'Morning workout', workout_type: 'Yoga' },
        { id: 5, title: 'Workout 5', description: '4x10 Chest - 3x10 Biceps', workout_type: 'Strength' },
        { id: 6, title: 'Workout 6', description: 'Cardio Day, quick 10min warmup', workout_type: 'Running' },
        { id: 7, title: 'Workout 7', description: 'Rough Cardio Day, 2km swim', workout_type: 'Swimming' },
    ];

    //This is just dummy data, the idea is to get a calendar from an API to cycle through weeks, and then connect days to that week.
    const workoutSchedule = {
        20: {
            Monday: [1],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [1, 5],
            Saturday: [],
            Sunday: [],
        },
        21: {
            Monday: [6],
            Tuesday: [2, 7],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        },
    };

    const days = [
        { short: 'M', full: 'Monday' },
        { short: 'T', full: 'Tuesday' },
        { short: 'W', full: 'Wednesday' },
        { short: 'T', full: 'Thursday' },
        { short: 'F', full: 'Friday' },
        { short: 'S', full: 'Saturday' },
        { short: 'S', full: 'Sunday' },
    ];

    const filterWorkouts = () => {
        const workoutIds = workoutSchedule[selectedWeek]?.[selectedDay] || [];
        return workouts.filter(workout => workoutIds.includes(workout.id));
    };

    const handleWeekChange = (increment) => {
        setSelectedWeek(prevWeek => prevWeek + increment);
        setSelectedDay(''); // Reset day selection when week changes
    };

    /*    useEffect(() => {
            const fetchUserWorkouts = async () => {
                try {
                    const {data} = await httpService.get(userWorkoutsURL)
                    setUserWorkouts(data)
                    setLoading(false)
                    console.log(userWorkouts, "This is out user workout data")
                } catch (error) {
                    setError('Error fetching user workouts. Please try again later.');
                    setLoading(false);
                }
            }
            fetchUserWorkouts()
        }, []);*/

    return (
        <View style={styles.container}>
            <Header username={username} motivationalQuote={motivationalQuote} />
            <View style={styles.weekContainer}>
                <TouchableOpacity onPress={() => handleWeekChange(-1)}>
                    <Text style={styles.weekChangeButton}>Previous Week</Text>
                </TouchableOpacity>
                <Text style={styles.weekHeading}>Week {selectedWeek}</Text>
                <TouchableOpacity onPress={() => handleWeekChange(1)}>
                    <Text style={styles.weekChangeButton}>Next Week</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.daysContainer}>
                {days.map(day => (
                    <TouchableOpacity
                        key={day.full}
                        style={[styles.day, selectedDay === day.full && styles.selectedDay]}
                        onPress={() => setSelectedDay(day.full)}
                    >
                        <Text style={styles.dayText}>{day.short}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {selectedDay ? (
                <UserWorkout user_workouts={filterWorkouts()} />
            ) : (
                <Text style={styles.placeholderText}>Please select a day to view workouts</Text>
            )}
            <Text>Workouts Page</Text>
            <Button title="Create Workout" onPress={handleCreateWorkout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    weekContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    weekHeading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    weekChangeButton: {
        fontSize: 18,
        color: '#007AFF',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    day: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedDay: {
        backgroundColor: '#007AFF',
    },
    dayText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholderText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Workouts