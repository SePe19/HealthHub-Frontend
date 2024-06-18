import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import httpService from "../services/httpService";

const CreateWorkout = () => {
    const workoutTypesURL = 'workout/workout-types'
    const createUserWorkoutURL = 'workout/'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [workoutTypeOptions, setWorkoutTypeOptions] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserWorkoutTypes = async () => {
            try {
                const {data} = await httpService.get(workoutTypesURL)
                const options = data.map(type => ({ key: type, value: type }))
                setWorkoutTypeOptions(options)
                console.log(data, "This is the workout types data")
            } catch (error) {
                setError('Error fetching workout types. Please try again later.');
            }
        }
        fetchUserWorkoutTypes()
    }, []);

    const handleSubmit = async () => {
        // Validate form data
        if (!title.trim() || !workoutType.trim() || !description.trim()) {
            return;
        }
        try {
            // Submit form data
            await httpService.post(createUserWorkoutURL, {
                title,
                description,
                workoutType,
            }, {
                params: {
                    userId: 1
                }
            });
            // Clear form inputs after successful submission
            setTitle('');
            setDescription('');
            setWorkoutType('');

            console.log('Workout successfully submitted!');
        } catch (error) {
            console.error('Error submitting workout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create a New Workout</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                value={description}
                onChangeText={setDescription}
            />
            <SelectList
                setSelected={setWorkoutType}
                data={workoutTypeOptions}
                placeholder="Select Workout Type"
                boxStyles={styles.dropdown} // optional: to style the dropdown box
                dropdownStyles={styles.dropdown} // optional: to style the dropdown items
            />
            <Button title="Submit" onPress={handleSubmit} />
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
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default CreateWorkout;