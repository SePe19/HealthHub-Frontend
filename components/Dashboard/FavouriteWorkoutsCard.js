import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import httpService from '../../services/httpService';
import colors from '../../styles/colors';

// Import local icons
import strengthIcon from '../../assets/workoutIcons/strength.png';
import mobilityIcon from '../../assets/workoutIcons/mobility.png';
import cardioIcon from '../../assets/workoutIcons/cardio.png';

async function getUserStats() {
    const userId = '1';
    const favouriteUrl = `user/${userId}/workout-favourite`;
    const favouriteData = await httpService.get(favouriteUrl);
    const favData = {
        strength_workouts: favouriteData.data.STRENGTH,
        mobility_workouts: favouriteData.data.MOBILITY,
        cardio_workouts: favouriteData.data.CARDIO
    };
    // Convert the data to an array and sort it
    const sortedData = Object.entries(favData).sort(([, a], [, b]) => b - a);
    return sortedData;
}

function FavouriteWorkoutsCard() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getUserStats();
            setWorkouts(data);
        }
        fetchData();
    }, []);

    const formatWorkoutText = (key, value) => {
        const workoutType = key.replace('_workouts', '').toUpperCase();
        return `${value} ${workoutType.toLowerCase()} session${value !== 1 ? 's' : ''}`;
    };

    const getIconSource = (key) => {
        switch (key) {
            case 'strength_workouts':
                return strengthIcon;  // Icon for strength
            case 'mobility_workouts':
                return mobilityIcon;  // Icon for mobility
            case 'cardio_workouts':
                return cardioIcon;    // Icon for cardio
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {workouts.map(([key, value]) => (
                <View key={key} style={styles.row}>
                    <Image source={getIconSource(key)} style={styles.icon} />
                    <Text style={styles.text}>{formatWorkoutText(key, value)}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: colors.grey,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        padding:20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 30,
        color: colors.textPrimary
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});

export default FavouriteWorkoutsCard;