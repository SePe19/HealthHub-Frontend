import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../styles/colors';

const MainButton = ({ title, onPress, style, textStyle }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
                pressed ? styles.buttonPressed : styles.button,
                style
            ]}
            accessibilityRole="button"
            accessibilityState={{ pressed: false }}
        >
            {({ pressed }) => (
                <LinearGradient
                    colors={pressed ? colors.gradients.primaryGradientPressed : colors.gradients.primaryGradient}
                    style={styles.buttonBackground}
                >
                    <View style={styles.buttonContent}>
                        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                    </View>
                </LinearGradient>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        //backgroundColor: colors.gold,
        height: '75px',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        //width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.textSecondary,
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default MainButton;
