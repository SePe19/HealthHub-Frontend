import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import httpService from '../services/httpService';
import bcrypt from "bcryptjs";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields.');
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 12);

                const response = await httpService.post('/auth/login', {
                    username: username,
                    password: hashedPassword
                });
                Alert.alert('Success', `Logged in as ${username}`);
                console.log('Login response:', response.data);
                sessionStorage.setItem('userId', response.data);
            } catch (error) {
                Alert.alert('Error', `Login failed: ${error.response ? error.response.data : error.message}`);
                console.error('Login error:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Login</Text>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
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
    loginContainer: {
        width: '80%',
        backgroundColor: '#555',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginText: {
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
    signUpButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    signUpText: {
        color: 'black',
    },
    loginButton: {
        backgroundColor: '#00ff00',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    loginButtonText: {
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

export default LoginScreen;
