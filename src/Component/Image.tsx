import {
  StyleSheet,
  Text,
  View,
  Image as NativeImage,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ImageResizeMode,
} from 'react-native';
import React from 'react';

interface ImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode | undefined;
}

const Image = ({source, style, resizeMode}: ImageProps) => {
  return (
    <NativeImage
      source={source}
      style={[
        style,
        styles.image,
        {resizeMode: resizeMode ? resizeMode : 'cover'},
      ]}
    />
  );
};

export default Image;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
