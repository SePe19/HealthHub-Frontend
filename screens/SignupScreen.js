import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import httpService from '../services/httpService';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (username === '' || password === '' || confirmPassword === '') {
            Alert.alert('Error', 'Please fill in all fields.');
        } else if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
        } else {
            try {
                const response = await httpService.post('/user/signup', {
                    username: username,
                    password: password
                });
                Alert.alert('Success', `Signed up as ${username}`);
                console.log('Signup response:', response.data);
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Error', `Signup failed: ${error.response ? error.response.data : error.message}`);
                console.error('Signup error:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Signup</Text>
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
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
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
});

export default SignupScreen;