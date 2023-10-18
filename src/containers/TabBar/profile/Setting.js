// Library import
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {createRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import ZHeader from '../../../components/common/ZHeader';
import strings from '../../../i18n/strings';
import {colors, styles} from '../../../themes';
import {
  ACCESS_TOKEN,
  ASYNC_CONFIG,
  LANGUAGE,
  moderateScale,
  THEME,
  USER_DATA,
} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {ProfileSetting} from '../../../api/constant';
import {changeThemeAction} from '../../../redux/action/themeAction';
import {setAsyncStorageData} from '../../../utils/helpers';
import {StackNav} from '../../../navigation/NavigationKeys';
import LogOut from '../../../components/models/LogOut';
import ZLoader from '../../../components/common/ZLoader';

export default Setting = ({navigation}) => {
  const color = useSelector(state => state.theme.theme);
  const language = useSelector(state => state.profile.language);
  const LogOutSheetRef = createRef();
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState({
    darkMode: !!color.dark,
    notification: false,
  });
  const [isLoader, setIsLoader] = useState(false);

  const ProfileSetting = [
    {
      id: 1,
      title: strings.editProfile,
      icon: 'person-outline',
      route: StackNav.EditProfile,
    },
    {
      id: 4,
      title: strings.security,
      icon: 'shield-checkmark-outline',
      route: StackNav.Security,
    },
    {
      id: 5,
      title: strings.language,
      icon: 'options-outline',
      lang: 'English(US)',
      route: StackNav.Language,
    },
    {
      id: 4,
      title: 'News Language',
      icon: 'language-outline',
    },
    {
      id: 2,
      title: 'Your Interests',
      icon: 'list-outline',
    },
    {
      id: 6,
      title: strings.darkMode,
      icon: 'contrast-outline',
      rightIcon: 'rightIcon',
      value: isEnabled.darkMode,
      toggleSwitch: () => {
        setIsEnabled({
          ...isEnabled,
          darkMode: isEnabled.darkMode ? false : true,
        });
        if (isEnabled.darkMode) {
          onPressLightTheme();
        } else {
          onPressDarkTheme();
        }
      },
    },
    {
      id: 6,
      title: strings.notification,
      icon: 'notifications-outline',
      rightIcon: 'rightIcon',
      value: isEnabled.notification,
      toggleSwitch: () => {
        setIsEnabled({
          ...isEnabled,
          notification: isEnabled.notification ? false : true,
        });
      },
    },
    {
      id: 2,
      title: strings.ads,
      icon: 'radio-outline',
    },
    {
      id: 3,
      title: 'FeedBack',
      icon: 'cloud-download-outline',
      route: StackNav.FeedBack,
    },
    {
      id: 7,
      title: strings.helpCenter,
      icon: 'information-circle-outline',
      route: StackNav.HelpCenter,
    },
    {
      id: 7,
      title: strings.termsServices,
      icon: 'newspaper-outline',
    },
    {
      id: 8,
      title: strings.privacyPolicy,
      icon: 'alert-circle-outline',
      route: StackNav.PrivacyPolicy,
    },
  ];

  const onPressLightTheme = async () => {
    await setAsyncStorageData(THEME, 'light');
    dispatch(changeThemeAction(colors.light));
  };

  const onPressDarkTheme = async () => {
    await setAsyncStorageData(THEME, 'dark');
    dispatch(changeThemeAction(colors.dark));
  };

  const onPressItem = item => {
    if (item.route) navigation.navigate(item.route, {title: item.header});
  };

  const onPressLogOutBtn = () => LogOutSheetRef?.current?.show();

  const onPressYesLogOut = async () => {
    setIsLoader(true);
    try {
      const keys = [ACCESS_TOKEN, USER_DATA, LANGUAGE, ASYNC_CONFIG];
      await AsyncStorage.multiRemove(keys, err => {
        console.log('AsyncStorage err>>', err);
      });
      LogOutSheetRef?.current?.hide();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.Auth}],
        });
      }, 500);
      return true;
    } catch (exception) {
      return false;
    } finally {
      setIsLoader(false);
    }
  };

  const onPressCancel = () => LogOutSheetRef?.current?.hide();

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.setting} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={localStyles.root}>
        {ProfileSetting.map((item, index) => {
          return (
            <TouchableOpacity
              disabled={item.title === strings.darkMode}
              onPress={() => onPressItem(item)}
              key={index}
              activeOpacity={item.rightIcon ? 1 : 0.5}
              style={localStyles.settingsContainer}>
              <Ionicons
                name={item.icon}
                size={moderateScale(28)}
                color={color.dark ? color.white : color.darkColor}
              />
              <ZText type="s18" style={styles.ml15}>
                {item.title}
              </ZText>
              <View style={localStyles.rightContainer}>
                {!!item.lang && (
                  <ZText type="s18" style={styles.mr10}>
                    {language}
                  </ZText>
                )}
                {!!item.rightIcon ? (
                  <Switch
                    trackColor={{
                      false: color.grayScale3,
                      true: color.primary,
                    }}
                    thumbColor={color.white}
                    onValueChange={item.toggleSwitch}
                    value={item.value}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward-outline"
                    size={moderateScale(20)}
                    color={color.textColor}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          onPress={onPressLogOutBtn}
          style={localStyles.settingsContainer}>
          <Ionicons
            name={'log-out-outline'}
            size={moderateScale(30)}
            color={color.dark ? color.white : color.darkColor}
          />
          <ZText type="s18" style={styles.ml15}>
            {strings.logout}
          </ZText>
        </TouchableOpacity>
      </ScrollView>
      <LogOut
        SheetRef={LogOutSheetRef}
        onPressLogOut={onPressYesLogOut}
        onPressCancel={onPressCancel}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph20,
    ...styles.mb20,
  },
  settingsContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mb20,
  },
  rightContainer: {
    ...styles.flex,
    ...styles.rowEnd,
  },
});
