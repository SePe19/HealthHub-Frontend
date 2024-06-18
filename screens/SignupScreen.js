import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import httpService from '../services/httpService';
import bcrypt from "bcryptjs";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (username === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields.');
        } else if(password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 12);

                const signupResponse = await httpService.post('/auth/signup', {
                    username: username,
                    password: hashedPassword
                });

                console.log('Signup response:', signupResponse.data);

                const loginResponse = await httpService.post('/auth/login', {
                    username: username,
                    password: hashedPassword
                });

                sessionStorage.setItem('userId', loginResponse.data);

                Alert.alert('Success', `Successfully created account and logged in as ${username}`);
                console.log('Login response:', loginResponse.data);
            } catch (error) {
                Alert.alert('Error', `Login failed: ${error.response ? error.response.data : error.message}`);
                console.error('Login error:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Signup</Text>
                <Icon name="user" type="font-awesome" color="white" size={50} />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="Enter username"
                        placeholderTextColor="white"
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="white"
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor="white"
                        secureTextEntry
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupContainer: {
        width: '80%',
        backgroundColor: '#555',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    signupText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    loginText: {
        color: 'black',
    },
    signupButton: {
        backgroundColor: '#00ff00',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    signupButtonText: {
        color: 'white',
    },
    homeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    homeText: {
        color: '#00ff00',
        marginLeft: 10,
    },
});

export default SignupScreen;
