import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ReadNowButton = ({onPress}: {onPress?: () => void}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Read Now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D9328A',
    paddingVertical: 16,
    marginBottom: 52,
    marginTop: 24,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default ReadNowButton;
