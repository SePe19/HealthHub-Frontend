import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Header from '../components/Header'
import UserWorkout from '../components/UserWorkout'
import httpService from '../services/httpService'

export const Workouts = () => {
    const [userWorkouts, setUserWorkouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const userWorkoutsURL = 'workout/user-workouts/'

    useEffect(() => {
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
    }, []);

    return (
        <View>
            <Header/>
            <UserWorkout/>
        </View>
    )
}