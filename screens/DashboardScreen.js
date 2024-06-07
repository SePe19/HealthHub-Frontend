import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WorkoutCompletionCard from "../components/Dashboard/WorkoutCompletionCard";
import FavouriteWorkoutsCard from "../components/Dashboard/FavouriteWorkoutsCard";
import colors from '../styles/colors';

function DashboardScreen() {
    return (
        <View style={styles.section}>
            <WorkoutCompletionCard/>
            <FavouriteWorkoutsCard/>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: colors.background,
        height: '100%',
        paddingTop: 10,
        gap: 10
    },
});

export default DashboardScreen;