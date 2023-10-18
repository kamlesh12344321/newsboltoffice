// Library import
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import ZHeader from '../../../components/common/ZHeader';
import {styles} from '../../../themes';
import {
  ACCESS_TOKEN,
  ASYNC_CONFIG,
  LANGUAGE,
  USER_DATA,
  moderateScale,
} from '../../../common/constants';
import images from '../../../assets/images';
import ZText from '../../../components/common/ZText';
import {SectionList} from 'react-native';
import {StackNav} from '../../../navigation/NavigationKeys';
import strings from '../../../i18n/strings';
import {
  getAsyncStorageData,
  showPopupWithOk,
  showPopupWithOkAndCancel,
} from '../../../utils/helpers';
import {deleteRequestApi} from '../../../api/axios';
import {DELETE_ACC} from '../../../api/config';
import ZLoader from '../../../components/common/ZLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const [isLoader, setIsLoader] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await getAsyncStorageData(USER_DATA);
    setProfileData(userData);
    console.log('userData', userData);
  };

  const editProfileData = [
    {
      title: 'About You',
      data: [
        {
          id: 1,
          icon: 'person-outline',
          type: 'Name',
          value: profileData?.name ? profileData?.name : 'N/A',
        },
        {
          id: 2,
          icon: 'alert-circle-outline',
          type: 'Bio',
          value: profileData?.bio ? profileData?.bio : 'N/A',
        },
      ],
    },
    {
      title: 'Account Information',
      data: [
        {
          id: 1,
          icon: 'mail-outline',
          type: 'Email',
          value: profileData?.email ? profileData?.email : 'N/A',
        },
        {
          id: 2,
          icon: 'calendar-outline',
          type: 'Date of Birth',
          value: profileData?.birth_date ? profileData?.birth_date : 'N/A',
          rightIcon: 'calendar-outline',
        },
        {
          id: 3,
          icon: 'trash-outline',
          type: 'Delete Account',
          trash: true,
        },
      ],
    },
  ];

  const onPressDeleteAccount = async () => {
    setIsLoader(true);
    try {
      const response = await deleteRequestApi(DELETE_ACC);
      if (response.data.status) {
        setIsLoader(false);
        await onLogOut();
      } else {
        showPopupWithOk('Error', response.data.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const onLogOut = async () => {
    try {
      const keys = [ACCESS_TOKEN, USER_DATA, LANGUAGE, ASYNC_CONFIG];
      await AsyncStorage.multiRemove(keys, err => {
        console.log('AsyncStorage err>>', err);
      });
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.Auth}],
        });
      }, 500);
      return true;
    } catch (exception) {
      return false;
    }
  };

  const onPressEditProfile = () =>
    navigation.navigate(StackNav.UpdateProfile, {
      profileData: profileData,
    });

  const onPressTrash = () => {
    showPopupWithOkAndCancel(
      'Delete Account',
      'Are you sure you want to delete your account?',
      () => onPressDeleteAccount(),
    );
  };

  const RenderInfoItem = memo(({item}) => {
    return (
      <TouchableOpacity
        onPress={item?.trash && onPressTrash}
        style={localStyles.infoContainer}>
        <View style={styles.rowCenter}>
          <Ionicons
            name={item.icon}
            size={moderateScale(26)}
            color={item?.trash ? colors.redColor : colors.textColor}
            style={styles.mr10}
          />
          <ZText
            type="s18"
            color={item?.trash ? colors.redColor : colors.textColor}>
            {item.type}
          </ZText>
        </View>

        {!item?.trash && (
          <View style={[styles.flexRow, styles.flex]}>
            <ZText
              type="s18"
              numberOfLines={1}
              align="right"
              style={[styles.flex, styles.mh10]}>
              {item.value}
            </ZText>
            <Ionicons
              name={
                !!item?.rightIcon ? item?.rightIcon : 'chevron-forward-outline'
              }
              size={moderateScale(20)}
              color={colors.textColor}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  });

  const RenderHeader = () => {
    return (
      <View
        style={[
          localStyles.userImageContainer,
          {borderBottomColor: colors.bColor},
        ]}>
        <TouchableOpacity onPress={onPressEditProfile} style={styles.mt40}>
          <Image
            source={
              profileData?.image?.length
                ? {uri: profileData?.image}
                : colors.dark
                ? images.userDark
                : images.userLight
            }
            style={localStyles.userImage}
          />
          <MaterialIcon
            name="pencil-box"
            size={moderateScale(30)}
            color={colors.primary}
            style={localStyles.editIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.editProfile} />
      <SectionList
        sections={editProfileData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderInfoItem item={item} key={item.id} />}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={[
              localStyles.titleContainer,
              {borderTopColor: colors.bColor},
            ]}>
            <ZText type={'b20'}>{title}</ZText>
          </View>
        )}
        stickyHeaderHiddenOnScroll={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={RenderHeader}
        contentContainerStyle={styles.ph20}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  userImageContainer: {
    ...styles.flexRow,
    ...styles.justifyCenter,
    ...styles.pb30,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  infoContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mb25,
  },
  titleContainer: {
    ...styles.pt30,
    ...styles.mb30,
    borderTopWidth: moderateScale(1),
  },
});
