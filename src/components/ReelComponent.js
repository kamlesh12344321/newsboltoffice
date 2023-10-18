// Library import
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

// Local import
import images from '../assets/images';
import {getHeight, moderateScale} from '../common/constants';
import {styles} from '../themes';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../navigation/NavigationKeys';

export default function ReelComponent({
  data,
  item,
  isPlay = false,
  reelUrl = '',
  style,
  index,
}) {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  const onPressReel = () =>
    navigation.navigate(StackNav.ParticularReelComponent, {
      reelData: data,
      item: item,
      index: index,
    });

  return (
    <TouchableOpacity
      onPress={onPressReel}
      style={[
        localStyles.postContainer,
        {
          ...style,
        },
      ]}>
      <FastImage
        source={reelUrl ? {uri: reelUrl} : images.post}
        style={localStyles.postImgStyle}>
        {!!isPlay && (
          <View style={localStyles.playIconStyle}>
            <Ionicons
              name="play-circle"
              size={moderateScale(28)}
              color={colors.white}
            />
          </View>
        )}
      </FastImage>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  postContainer: {
    width: '33%',
  },
  postImgStyle: {
    ...styles.mt5,
    height: getHeight(190),
    marginHorizontal: '3%',
    borderRadius: moderateScale(10),
  },
  playStyle: {
    ...styles.rowCenter,
    position: 'absolute',
    bottom: getHeight(10),
    left: moderateScale(10),
  },
  playIconStyle: {
    ...styles.rowCenter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
