import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import httpService from '../../services/httpService';
import colors from '../../styles/colors';
import PercentageCircle from 'react-native-percentage-circle';

async function getUserStats() {
    const completionDaysAmount = 91;
    const completionUrl = `user/${sessionStorage.getItem('userId')}/workout-completion`;
    try {
        const completionData = await httpService.get(completionUrl, {
            params: {
                days: completionDaysAmount
            }
        });
        const comData = {
            completed_workouts: completionData.data.complete,
            incomplete_workouts: completionData.data.incomplete,
            workout_completion_percent: completionData.data.percentage
        };
        return comData;
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return null;
    }
}

const WorkoutCompletionCard = () => {
    const [comData, setComData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getUserStats();
            setComData(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!comData) {
        return <Text>Error loading data</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.text}>Training sessions completed in the last 3 months:</Text>
                <Text style={styles.completedNum}>{comData.completed_workouts}</Text>
            </View>
            <View style={styles.column}>
                <PercentageCircle radius={60} borderWidth={10} percent={comData.workout_completion_percent} color={colors.mainColor} bgcolor={colors.darkGrey} innerColor={colors.grey} textStyle={{fontSize: 22, color: colors.textPrimary}}></PercentageCircle>
                <Text style={styles.text}>Completed {comData.completed_workouts}/{comData.incomplete_workouts + comData.completed_workouts} Training sessions completed. Great Job!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.grey,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        padding:20,
    },
    column: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        margin: 5,
        color: 'white',
        textAlign: 'left',
        padding: 'auto',
    },
    completedNum: {
        fontSize: 100,
        color: colors.mainColor,
        marginTop: 20,
    }
});

export default WorkoutCompletionCard;