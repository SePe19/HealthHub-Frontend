import React, { createContext, useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        setLoading(false);
    }, []);

    const login = (id) => {
        sessionStorage.setItem('userId', id);
        setUserId(id);
    };

    const logout = () => {
        sessionStorage.removeItem('userId');
        setUserId(null);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);