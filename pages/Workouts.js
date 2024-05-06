import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import UserWorkout from '../components/UserWorkout';
import httpService from '../services/httpService';
import {fetchWorkouts} from '../services/fetchService';

export const Workouts = () => {
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userWorkoutsURL = 'workout/user-workouts/';
    useEffect(() => {
        const fetchUserWorkouts = async () => {
            try {
                const { data } = await fetchWorkouts();
                console.log("FELIX", data);
                setUserWorkouts(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user workouts. Please try again later.');
                setLoading(false);
            }
        };
        fetchUserWorkouts();
    }, []);
    return (
        <View>
            <Header />
            <UserWorkout />
        </View>
    );
};
