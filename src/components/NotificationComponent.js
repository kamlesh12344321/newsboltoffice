import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import images from '../assets/images';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import ZText from './common/ZText';
import {styles} from '../themes';
import {moderateScale} from '../common/constants';

export default function NotificationComponent({item}) {
  const colors = useSelector(state => state.theme.theme);
  const [isSave, setIsSave] = useState(true);

  const onPressSave = () => setIsSave(!isSave);
  return (
    <TouchableOpacity style={localStyles.renderItemContainer}>
      <View>
        {!!item?.profileImage ? (
          <Image
            source={{
              uri: item.profileImage,
            }}
            style={localStyles.userImage}
          />
        ) : (
          <Image
            source={colors.dark ? images.userDark : images.userLight}
            style={localStyles.userImage}
          />
        )}
      </View>
      <View style={[styles.mh10, styles.flex]}>
        <ZText type="b18" numberOfLines={1}>
          {item.name}
        </ZText>
        <ZText type="m14" numberOfLines={1} style={styles.mt5}>
          {item.desc}
        </ZText>
        <ZText type="m14" numberOfLines={1} style={styles.mt5}>
          {'12 min ago'}
        </ZText>
      </View>
      <TouchableOpacity onPress={onPressSave}>
        <Ionicons
          name={isSave ? 'bookmark-outline' : 'bookmark'}
          size={moderateScale(26)}
          color={colors.primary}
          style={styles.ml5}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  renderItemContainer: {
    ...styles.rowCenter,
    ...styles.mb15,
  },
  userImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    backgroundColor: 'green',
  },
});
