// Library Imports
import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local Imports
import {colors, styles} from '../../themes';
import {StackNav} from '../../navigation/NavigationKeys';
import {
  ACCESS_TOKEN,
  APP_OPEN_FIRST_TIME,
  ASYNC_CONFIG,
  LANGUAGE,
  THEME,
  USER_DATA,
} from '../../common/constants';
import {changeThemeAction} from '../../redux/action/themeAction';
import {setAsyncStorageData, showPopupWithOk} from '../../utils/helpers';
import {getRequestApi} from '../../api/axios';
import {GET_CONFIG} from '../../api/config';
import strings from '../../i18n/strings';

const Splash = ({navigation}) => {
  const color = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const asyncProcess = async () => {
    try {
      let asyncData = await AsyncStorage.multiGet([
        THEME,
        APP_OPEN_FIRST_TIME,
        ACCESS_TOKEN,
        LANGUAGE,
        USER_DATA,
      ]);
      if (!!asyncData) {
        const themeColor = JSON.parse(asyncData[0][1]);
        const appOpenFirstTime = JSON.parse(asyncData[1][1]);
        const access_token = JSON.parse(asyncData[2][1]);
        const selectedLanguage = JSON.parse(asyncData[3][1]);
        const userData = JSON.parse(asyncData[4][1]);
        if (!!selectedLanguage) {
          global.selectedLanguage = selectedLanguage;
        }
        if (!!userData) {
          global.userData = userData;
        }
        if (!!themeColor) {
          if (themeColor === 'light') {
            dispatch(changeThemeAction(colors.light));
          } else {
            dispatch(changeThemeAction(colors.dark));
          }
        }
        if (!!access_token) {
          global.token = access_token;
          navigation.reset({
            index: 0,
            routes: [{name: StackNav.TabBar}],
          });
        } else {
          if (!!appOpenFirstTime) {
            navigation.reset({
              index: 0,
              routes: [{name: StackNav.Auth}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: StackNav.onBoarding}],
            });
          }
        }
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  const getConfig = async () => {
    try {
      const response = await getRequestApi(GET_CONFIG);
      if (response.data.status) {
        await setAsyncStorageData(ASYNC_CONFIG, response.data);
        global.config = response.data;
        await asyncProcess();
      } else {
        showPopupWithOk('Error', response.data.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    }
  };

  useEffect(() => {
    getConfig();
    SplashScreen.hide();
  }, []);

  return (
    <View style={[localStyles.container, {backgroundColor: color.background}]}>
      <ActivityIndicator size="large" color={color.darkColor} />
    </View>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
