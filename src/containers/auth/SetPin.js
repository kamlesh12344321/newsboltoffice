// Library import
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// Local import
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import ZHeader from '../../components/common/ZHeader';
import strings from '../../i18n/strings';
import ZText from '../../components/common/ZText';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {styles} from '../../themes';
import {
  ACCESS_TOKEN,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import {postRequestApi} from '../../api/axios';
import {setAsyncStorageData, showPopupWithOk} from '../../utils/helpers';
import ZLoader from '../../components/common/ZLoader';
import {VERIFYOTP} from '../../api/config';

const SetPin = ({navigation, route}) => {
  const email = route.params?.email;
  const otpId = route.params?.otpId;

  const colors = useSelector(state => state.theme.theme);
  const [pin, setPin] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(false);

  const onPinChange = code => setPin(code);
  const onPressPinContinue = async () => {
    if (pin.length < 6) {
      showPopupWithOk('Error', 'Please enter valid pin');
      return;
    }
    setIsLoader(true);
    try {
      const httpBody = {
        OTP: pin,
        OTP_id: otpId,
      };
      const response = await postRequestApi(VERIFYOTP, httpBody);
      console.log('response Otp>>', response?.data);
      if (response?.data?.status) {
        console.log('access_token>>>>', response.data.data.access_token);
        await setAsyncStorageData(
          ACCESS_TOKEN,
          response?.data?.data?.access_token,
        );
        global.token = response.data.data.access_token;
        navigation.navigate(StackNav.SelectLanguage, {
          isFirstTime: response?.data?.data?.first_time_user,
        });
      } else {
        showPopupWithOk(strings.newsBolt, response.data.msg);
        setPin('');
      }
    } catch (error) {
      console.log('error>>', error);
      showPopupWithOk(strings.newsBolt, strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <ZSafeAreaView>
      <ZHeader />
      <ZKeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <ZText type={'b46'} align={'left'} style={styles.mv30}>
            {strings.pinHeader}
          </ZText>
          <ZText type={'r18'} style={styles.mt20} align={'center'}>
            {strings.pinDesc}
          </ZText>
          <ZText type={'B18'} style={styles.mt5} align={'center'}>
            {email}
          </ZText>
          <OTPInputView
            pinCount={6}
            code={pin}
            onCodeChanged={onPinChange}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[
              localStyles.pinInputStyle,
              {
                color: colors.textColor,
                backgroundColor: colors.inputBg,
                borderColor: colors.bColor,
              },
            ]}
            codeInputHighlightStyle={{
              backgroundColor: colors.inputFocusColor,
              borderColor: colors.primary,
            }}
            style={localStyles.inputStyle}
            secureTextEntry={true}
          />
        </View>
        <ZButton
          textType={'b18'}
          color={colors.white}
          title={strings.verifyOTP}
          onPress={onPressPinContinue}
          containerStyle={localStyles.btnContainerStyle}
        />
      </ZKeyBoardAvoidWrapper>
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default SetPin;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.justifyStart,
    ...styles.flex,
  },
  pinInputStyle: {
    height: getHeight(60),
    width: deviceWidth / 7,
    fontSize: moderateScale(26),
    borderRadius: moderateScale(15),
  },
  btnContainerStyle: {
    ...styles.m20,
  },
  inputStyle: {
    height: getHeight(60),
    ...styles.mv30,
  },
});
