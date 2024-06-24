import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header.js';
import UserWorkout from '../components/UserWorkout.js';
import httpService from '../services/httpService';
import colors from '../styles/colors'

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
        navigation.navigate('CreateWorkoutScreen', { date: selectedDate });
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
                            workout.completed
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
                                    <TouchableOpacity style={styles.editWorkoutButton} onPress={() => alert(`Edit workout: ${workout.name}`)}>
                                        <Text styles={styles.smallButtonText}>Edit Workout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.playWorkoutButton} onPress={() => alert(`Play workout: ${workout.name}`)}>
                                        <Text styles={styles.smallButtonText}>Play Workout</Text>
                                    </TouchableOpacity>
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
                    <Text style={styles.weekChangeButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.weekHeading}>{selectedDate.toDateString()}</Text>
                <TouchableOpacity onPress={() => handleWeekChange(1)}>
                    <Text style={styles.weekChangeButton}>→</Text>
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
                            ></View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            {selectedDay ? (
                renderSelectedDayWorkouts()
            ) : (
                <Text style={styles.placeholderText}>Please select a day to view workouts</Text>
            )}
            <TouchableOpacity style={styles.createWorkoutButton} onPress={handleCreateWorkout}>
                <Text style={styles.bigButtonText}>Create Workout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: "auto",
        marginBottom: 16,
    },

    weekChangeButton: {
        fontSize: 60,
        color: colors.white,
        padding: 20,
    },
    weekHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color:colors.white,
    },
    daysContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        width: '100%',
    },
    dayContainer: {
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    day: {
        padding: 0,
        borderRadius: 8,
        backgroundColor: colors.secondaryColor,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    selectedDay: {
        backgroundColor: colors.mainColor,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 500,
        color: colors.darkGrey,
    },
    divContent: {
        marginTop: 8,
        width: 40,
        height: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    completedWorkout: {
        backgroundColor: colors.mainColor,
    },
    notCompletedWorkout: {
        backgroundColor: colors.gold,
    },
    placeholderText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: colors.secondaryColor,
    },
    workoutsContainer: {
        flex:1,
        margin: 0,
        padding: 0,
        borderRadius: 10,
        marginTop: '-45vh',
        marginBottom: '2vh',
        overflow:"scroll",
    },
    workoutDiv: {
        backgroundColor: colors.grey,
        padding: 10,
        paddingLeft:20,
        borderRadius: 10,
        marginBottom: 10,
    },
    workoutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workoutHeaderText: {
        fontSize: 24,
        color: colors.white,
        fontWeight: 400,
        marginLeft: 10,
    },
    arrow: {
        marginLeft: 'auto',
        width: 40,
        height: 40,
        tintColor: colors.mainColor,
    },
    rotateArrow: {
        transform: [{ rotate: '90deg' }],
    },
    workoutIcon: {
        width: 50,
        height: 50,
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
        color:colors.white,
    },
    exerciseSets: {
        fontSize: 14,
        marginBottom: 4,
        color:colors.white,
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignSelf: 'end',
    },
    editWorkoutButton: {
        backgroundColor:colors.secondaryColor,
        marginBottom: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,

    },
    playWorkoutButton: {
        backgroundColor:colors.mainColor,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    createWorkoutButton:{
        backgroundColor:colors.mainColor,
        paddingHorizontal:'auto',
        paddingVertical:20,
        margin: "auto",
        width: '100%',
        display: 'flex',
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 10,
    },
    bigButtonText: {
        color:colors.darkGrey,
        fontWeight:500,
        fontSize: 20,
    },
    smallButtonText: {
        color:colors.darkGrey,
        fontWeight:400,
        fontSize: 20,
    },
});

export default Workouts;
