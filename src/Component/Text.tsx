import React from 'react';
import {StyleSheet, Text as NativeText, View} from 'react-native';

type PropsText = {
  children: any;
  color?: string;
  style?: Object;
  numberOfLines?: number;
  size?: number;
  // type: 'thin' | 'regular' | 'semibold' | 'bold';
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  [key: string]: any;
  maxWidth?: string | number;
};

const Text = ({
  children,
  color,
  style,
  numberOfLines,
  size,
  weight,
  textAlign,
  maxWidth,
}: PropsText) => {
  return (
    <NativeText
      numberOfLines={numberOfLines}
      ellipsizeMode={'tail'}
      style={[
        style !== undefined && style,
        {
          fontSize: size ? size : 14,
          color: color ? color : '#000',
          fontWeight: weight ?? 'normal',
        },
        textAlign !== undefined && {textAlign: textAlign},
        maxWidth !== undefined && {maxWidth: maxWidth},
      ]}>
      {children}
    </NativeText>
  );
};

export default Text;
