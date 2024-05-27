import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ title, subtitle, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{subtitle}</Text>
                <Text style={styles.cardLink}>Read more</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#444',
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        width: 100,
        height: 100,
    },
    cardTextContainer: {
        flex: 1,
        padding: 10,
    },
    cardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: 'white',
        fontSize: 14,
        marginVertical: 5,
    },
    cardLink: {
        color: 'green',
        marginTop: 5,
    },
});

export default Card;
