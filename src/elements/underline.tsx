import {View} from 'react-native';
import React from 'react';

type Props = {
  styles?: object;
};

export const Underline = ({styles}: Props) => (
  <View
    style={{
      borderTopWidth: 1,
      marginTop: 10,
      borderStyle: 'solid',
      borderColor: '#D9D5D6',
      ...styles,
    }}
  />
);
