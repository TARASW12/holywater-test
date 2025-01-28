import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import backButton from '../assets/images/backArrow.png'
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
    style?: object;
}

const BackButton: React.FC<BackButtonProps> = ({ style }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <Pressable onPress={handlePress} style={style}>
            <FastImage
                style={styles.arrow}
                source={backButton}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    arrow: {width: 26, height: 26, marginLeft: 16, marginBottom: 8},

});

export default BackButton;
