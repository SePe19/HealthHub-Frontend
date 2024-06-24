import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Button, Image } from 'react-native';
import Header from '../components/Header.js';
import UserWorkout from '../components/UserWorkout.js';
import httpService from '../services/httpService';

// Import your local PNG images
import workoutsArrow from '../assets/workoutIcons/workouts_arrow.png';
import strengthIcon from '../assets/workoutIcons/strength.png';
import cardioIcon from '../assets/workoutIcons/cardio.png';
import mobilityIcon from '../assets/workoutIcons/mobility.png';

const Workouts = ({ navigation }) => {
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState('');
    const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
    const userWorkoutsURL = 'user/2/scheduled-workouts-for-week';

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
        const todayIndex = selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1;
        const diff = dayIndex - todayIndex;
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + diff);
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
                    params: { date: selectedDate }
                });
                setUserWorkouts(data);
                setLoading(false);
                console.log(data, "This is our user workout data");
                //update
            } catch (error) {
                setError('Error fetching user workouts. Please try again later.');
                setLoading(false);
            }
        };
        fetchUserWorkouts();
    }, [selectedDate]);

    const getWorkoutsForDay = (dayIndex) => {
        return userWorkouts.filter(workout => {
            const scheduledAt = new Date(workout.scheduledAt);
            const workoutDayIndex = (scheduledAt.getDay() + 6) % 7; // Adjust to match Monday as the start of the week
            return workoutDayIndex === dayIndex;
        });
    };

    const toggleWorkoutDetails = (workoutId) => {
        setExpandedWorkoutId(expandedWorkoutId === workoutId ? null : workoutId);
    };

    const getWorkoutIcon = (workoutType) => {
        switch (workoutType.toLowerCase()) {
            case 'strength':
                return strengthIcon;
            case 'cardio':
                return cardioIcon;
            case 'mobility':
                return mobilityIcon;
            default:
                return null; // or a default icon
        }
    };

    const renderSelectedDayWorkouts = () => {
        const dayIndex = days.findIndex(d => d.full === selectedDay);
        const workoutsForDay = getWorkoutsForDay(dayIndex);

        return (
            <View style={styles.workoutsContainer}>
                {workoutsForDay.map((workout, index) => (
                    <View
                        key={index}
                        style={[
                            styles.workoutDiv,
                            workout.completed ? styles.completedWorkout : styles.notCompletedWorkout
                        ]}
                    >
                        <TouchableOpacity onPress={() => toggleWorkoutDetails(workout.id)}>
                            <View style={styles.workoutHeader}>
                                <Image source={getWorkoutIcon(workout.workout.workoutType)} style={styles.workoutIcon} />
                                <Text style={styles.workoutHeaderText}>{workout.workout.title}</Text>
                                <Image
                                    source={workoutsArrow}
                                    style={[styles.arrow, expandedWorkoutId === workout.id && styles.rotateArrow]}
                                />
                            </View>
                        </TouchableOpacity>
                        {expandedWorkoutId === workout.id && (
                            <View style={styles.expandedContent}>
                                <View style={styles.exercisesContainer}>
                                    {workout.workout.workoutHasExercises.map((exercise, idx) => (
                                        <View key={idx} style={styles.exerciseRow}>
                                            <Text style={styles.exerciseTitle}>{exercise.exercise.title}</Text>
                                            <Text style={styles.exerciseSets}>{exercise.sets}x{exercise.repetitions}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <Button title="Edit Workout" onPress={() => alert(`Edit workout: ${workout.name}`)} />
                                    <Button title="Play Workout" onPress={() => alert(`Play workout: ${workout.name}`)} />
                                </View>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        );
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
                {days.map((day, index) => (
                    <View key={day.full} style={styles.dayContainer}>
                        <TouchableOpacity
                            style={[styles.day, selectedDay === day.full && styles.selectedDay]}
                            onPress={() => handleDayChange(day.full)}
                        >
                            <Text style={styles.dayText}>{day.short}</Text>
                        </TouchableOpacity>
                        {getWorkoutsForDay(index).map((workout, workoutIndex) => (
                            <View
                                key={workoutIndex}
                                style={[
                                    styles.divContent,
                                    workout.completed ? styles.completedWorkout : styles.notCompletedWorkout
                                ]}
                            >
                                <Text>Workout: {workout.name}</Text>
                                <Text>Time: {new Date(workout.scheduledAt).toLocaleTimeString()}</Text>
                                {/* Add more content or components here */}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            {selectedDay ? (
                renderSelectedDayWorkouts()
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
        padding: 16,
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    weekChangeButton: {
        fontSize: 16,
        color: 'blue',
    },
    weekHeading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    daysContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    dayContainer: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    day: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#eee',
        width: 40,
        alignItems: 'center',
    },
    selectedDay: {
        backgroundColor: 'lightblue',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    divContent: {
        marginTop: 8,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    completedWorkout: {
        backgroundColor: 'lightgreen',
    },
    notCompletedWorkout: {
        backgroundColor: 'lightcoral',
    },
    placeholderText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#888',
    },
    workoutsContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    workoutDiv: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    workoutHeaderText: {
        fontSize: 16,
    },
    arrow: {
        width: 20,
        height: 20,
    },
    rotateArrow: {
        transform: [{ rotate: '90deg' }],
    },
    workoutIcon: {
        width: 30,
        height: 30,
        marginRight: 10, // Adjust as needed
    },
    expandedContent: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    exercisesContainer: {
        flex: 1,
        marginRight: 16, // Adjust margin as needed
    },
    exerciseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exerciseTitle: {
        fontSize: 14,
        marginBottom: 4,
    },
    exerciseSets: {
        fontSize: 14,
        marginBottom: 4,
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignSelf: 'end',
    },
});

export default Workouts;
