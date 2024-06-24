import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, FlatList } from 'react-native';
import httpService from "../services/httpService";

const CreateWorkout = () => {
    const workoutTypesURL = 'workout/workout-types';
    const muscleGroupsURL = 'exercise/muscle-groups';
    const exercisesByMuscleGroupURL = 'exercise/exercises-by-muscle-group';
    const createUserWorkoutURL = 'workout/';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [workoutTypeOptions, setWorkoutTypeOptions] = useState([]);
    const [muscleGroup, setMuscleGroup] = useState('');
    const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkoutTypes = async () => {
            try {
                const { data } = await httpService.get(workoutTypesURL);
                setWorkoutTypeOptions(data);
                console.log(data, "Workout types fetched");
            } catch (error) {
                setError('Error fetching workout types. Please try again later.');
            }
        };

        const fetchMuscleGroups = async () => {
            try {
                const { data } = await httpService.get(muscleGroupsURL);
                setMuscleGroupOptions(data);
                console.log(data, "Muscle groups fetched");
            } catch (error) {
                setError('Error fetching muscle groups. Please try again later.');
            }
        };

        fetchWorkoutTypes();
        fetchMuscleGroups();
    }, []);

    useEffect(() => {
        if (muscleGroup) {
            const fetchExercisesBasedOnMuscleGroup = async () => {
                try {
                    const { data } = await httpService.get(exercisesByMuscleGroupURL, {
                        params: { muscleGroup }
                    });
                    setExerciseOptions(data);
                    console.log(data, "Exercises fetched for muscle group:", muscleGroup);
                } catch (error) {
                    setError('Error fetching exercises. Please try again later.');
                }
            };
            fetchExercisesBasedOnMuscleGroup();
        }
    }, [muscleGroup]);

    const handleAddExercise = (exerciseId) => {
        setSelectedExercises(prevExercises => [
            ...prevExercises,
            { exercise: { id: exerciseId } }
        ]);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !workoutType.trim() || !description.trim() || selectedExercises.length === 0) {
            setError('All fields are required.');
            return;
        }
        try {

            await httpService.post(createUserWorkoutURL, {
                title,
                description,
                workoutType,
                workoutHasExercises: selectedExercises
            }, {
                params: { userId: 1 }
            });

            setTitle('');
            setDescription('');
            setWorkoutType('');
            setMuscleGroup('');
            setSelectedExercises([]);
            setExerciseOptions([]);

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
            <Picker
                selectedValue={workoutType}
                style={styles.picker}
                onValueChange={(itemValue) => setWorkoutType(itemValue)}
            >
                <Picker.Item label="Select Workout Type" value="" />
                {workoutTypeOptions.map(option => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
            <Picker
                selectedValue={muscleGroup}
                style={styles.picker}
                onValueChange={(itemValue) => setMuscleGroup(itemValue)}
            >
                <Picker.Item label="Select Muscle Group" value="" />
                {muscleGroupOptions.map(option => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
            {muscleGroup && (
                <Picker
                    selectedValue={''}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleAddExercise(itemValue)}
                >
                    <Picker.Item label="Select Exercise" value="" />
                    {exerciseOptions.map(exercise => (
                        <Picker.Item key={exercise.id} label={exercise.title} value={exercise.id} />
                    ))}
                </Picker>
            )}
            <FlatList
                data={selectedExercises}
                keyExtractor={(item, index) => `${item.exercise.id}-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.selectedExercise}>
                        <Text>{`Exercise: ${item.exercise.id}`}</Text>
                    </View>
                )}
            />
            <Button title="Submit Workout" onPress={handleSubmit} />
            {error && <Text style={styles.error}>{error}</Text>}
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
    selectedExercise: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default CreateWorkout;
