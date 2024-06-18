import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import Header from '../components/Header.js';
import UserWorkout from '../components/UserWorkout.js';
import httpService from '../services/httpService';

const Workouts = ({ navigation }) => {
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState('');
    const userWorkoutsURL = 'user/1/scheduled-workouts-for-week';

    const handleCreateWorkout = () => {
        navigation.navigate('CreateWorkout', { date: selectedDate });
    };

    const username = 'John Doe';
    const motivationalQuote = 'Stay motivated!';

    const days = [
        { short: 'M', full: 'Monday' },
        { short: 'T', full: 'Tuesday' },
        { short: 'W', full: 'Wednesday' },
        { short: 'T', full: 'Thursday' },
        { short: 'F', full: 'Friday' },
        { short: 'S', full: 'Saturday' },
        { short: 'S', full: 'Sunday' },
    ];

    const handleDayChange = (day) => {
        const dayIndex = days.findIndex(d => d.full === day);
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + (dayIndex - newDate.getDay() + 1));
        setSelectedDate(newDate);
        setSelectedDay(day);
    };

    const handleWeekChange = (increment) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + increment * 7);
        setSelectedDate(newDate);
        setSelectedDay(''); // Reset day selection when week changes
    };

    useEffect(() => {
        const fetchUserWorkouts = async () => {
            try {
                const { data } = await httpService.get(userWorkoutsURL, {
                    params: {date: selectedDate}
                });
                setUserWorkouts(data);
                setLoading(false);
                console.log(data, "This is our user workout data");
            } catch (error) {
                setError('Error fetching user workouts. Please try again later.');
                setLoading(false);
            }
        };
        fetchUserWorkouts();
    }, [selectedDate]);

    const filterWorkouts = () => {
        return userWorkouts.filter(workout => {
            const scheduledAt = new Date(workout.scheduledAt);
            return scheduledAt.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
        });
    };

    return (
        <View style={styles.container}>
            <Header username={username} motivationalQuote={motivationalQuote} />
            <View style={styles.weekContainer}>
                <TouchableOpacity onPress={() => handleWeekChange(-1)}>
                    <Text style={styles.weekChangeButton}>Previous Week</Text>
                </TouchableOpacity>
                <Text style={styles.weekHeading}>{selectedDate.toDateString()}</Text>
                <TouchableOpacity onPress={() => handleWeekChange(1)}>
                    <Text style={styles.weekChangeButton}>Next Week</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.daysContainer}>
                {days.map(day => (
                    <TouchableOpacity
                        key={day.full}
                        style={[styles.day, selectedDay === day.full && styles.selectedDay]}
                        onPress={() => handleDayChange(day.full)}
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

export default Workouts;