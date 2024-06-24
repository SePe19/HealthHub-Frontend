import React from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';

const DateTimeInput = ({ dateValue, timeValue, onDateChange, onTimeChange }) => {
    if (Platform.OS === 'web') {
        return (
            <View>
                <input
                    type="date"
                    value={dateValue}
                    onChange={(e) => onDateChange(e.target.value)}
                    style={styles.webInput}
                />
                <input
                    type="time"
                    value={timeValue}
                    onChange={(e) => onTimeChange(e.target.value)}
                    style={styles.webInput}
                />
            </View>
        );
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                value={dateValue}
                onChangeText={onDateChange}
                placeholder="YYYY-MM-DD"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={timeValue}
                onChangeText={onTimeChange}
                placeholder="HH:MM"
                keyboardType="numeric"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    webInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default DateTimeInput;