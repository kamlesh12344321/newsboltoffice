// Library import
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import {styles} from '../../../themes';
import {USER_DATA, moderateScale} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {StackNav} from '../../../navigation/NavigationKeys';
import images from '../../../assets/images';
import {
  LikeGrayIcon,
  LikeIcon,
  SaveGrayIcon,
  SaveIcon,
} from '../../../assets/svgs';
import {getAsyncStorageData} from '../../../utils/helpers';
import BookmarkVideo from './BookmarkVideo';
import LikeVideo from './LikeVideo';

export default function Profile({navigation}) {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState(1);
  const [userData, setUserData] = useState({});
  const iconHeight = moderateScale(28);
  const iconWidth = moderateScale(28);

  useEffect(() => {
    isFocused && getUserData();
  }, [isFocused]);

  const getUserData = async () => {
    const userData = await getAsyncStorageData(USER_DATA);
    setUserData(userData);
  };

  const categoryData = [
    {
      id: 1,
      iconName: id =>
        isSelect === id ? (
          <SaveIcon height={iconHeight} width={iconWidth} />
        ) : (
          <SaveGrayIcon height={iconHeight} width={iconWidth} />
        ),
      onPress: () => setIsSelect(1),
    },
    {
      id: 2,
      iconName: id =>
        isSelect === id ? (
          <LikeIcon height={iconHeight} width={iconWidth} />
        ) : (
          <LikeGrayIcon height={iconHeight} width={iconWidth} />
        ),
      onPress: () => setIsSelect(2),
    },
  ];

  const onPressSetting = () => navigation.navigate(StackNav.Setting);

  const HeaderCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={[
          localStyles.tabItemStyle,
          {
            borderBottomColor:
              isSelect === item.id ? colors.primary : colors.bColor,
          },
        ]}>
        {item.iconName(item.id)}
      </TouchableOpacity>
    );
  };

  return (
    <ZSafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={localStyles.root}>
        <View style={localStyles.headerContainer}>
          <View style={styles.ph20}></View>
          <View>
            <ZText style={styles.flex} numberOfLines={1} type="b24">
              {userData?.nick_name}
            </ZText>
          </View>
          <TouchableOpacity onPress={onPressSetting}>
            <Ionicons
              name="settings-outline"
              size={moderateScale(30)}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsCenter}>
          <TouchableOpacity style={styles.mt40}>
            <Image
              source={
                userData?.image?.length
                  ? {uri: userData?.image}
                  : colors.dark
                  ? images.userDark
                  : images.userLight
              }
              style={localStyles.userImage}
            />
          </TouchableOpacity>
          <View style={styles.mv20}>
            <ZText type="b24" align={'center'}>
              {userData?.name}
            </ZText>
            <ZText type="m14" align={'center'} style={styles.mt10}>
              {userData?.email}
            </ZText>
          </View>
        </View>
        <View style={localStyles.mainContainer}>
          {categoryData.map((item, index) => (
            <HeaderCategory item={item} key={index} />
          ))}
        </View>
        {isSelect === 1 ? <BookmarkVideo /> : <LikeVideo />}
      </ScrollView>
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph20,
  },
  headerContainer: {
    ...styles.flex,
    ...styles.flexRow,
    ...styles.alignCenter,
    ...styles.justifyBetween,
    ...styles.mt20,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  mainContainer: {
    ...styles.flexRow,
    width: '100%',
    ...styles.mt15,
  },
  tabItemStyle: {
    borderBottomWidth: moderateScale(2),
    width: '50%',
    ...styles.itemsCenter,
    ...styles.pv15,
  },
});
