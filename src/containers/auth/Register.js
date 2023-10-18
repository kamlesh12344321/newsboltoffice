// Library Imports
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import ZText from '../../components/common/ZText';
import {EMAIL_ID, getHeight, moderateScale} from '../../common/constants';
import ZHeader from '../../components/common/ZHeader';
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import {StackNav} from '../../navigation/NavigationKeys';
import ZInput from '../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {validateEmail} from '../../utils/validators';
import ZButton from '../../components/common/ZButton';
import {Connect_Dark, Connect_Light} from '../../assets/svgs';
import {setAsyncStorageData, showPopupWithOk} from '../../utils/helpers';
import {postRequestApi} from '../../api/axios';
import {SENDEMAILOTP} from '../../api/config';
import ZLoader from '../../components/common/ZLoader';

const Register = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };
  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [isCheck, setIsCheck] = React.useState(false);
  const [isLoader, setIsLoader] = React.useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (email.length > 0 && !emailError) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, emailError]);

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };

  const onPressSignWithPassword = async () => {
    setIsLoader(true);
    try {
      const response = await postRequestApi(SENDEMAILOTP, {
        email: email,
      });
      if (response.data.status) {
        await setAsyncStorageData(EMAIL_ID, email);
        navigation.navigate(StackNav.SetPin, {
          email: email,
          otpId: response?.data?.data?.OTP_id,
        });
      } else {
        showPopupWithOk(strings.newsBolt, response.data.msg);
      }
    } catch (error) {
      console.log('error>>', error);
      showPopupWithOk(strings.newsBolt, strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  return (
    <ZSafeAreaView>
      <ZHeader isHideBack />
      <ZKeyBoardAvoidWrapper contentContainerStyle={styles.flex}>
        <View style={localStyles.mainContainer}>
          <View style={localStyles.imageContainer}>
            {colors.dark ? (
              <Connect_Dark
                width={moderateScale(237)}
                height={getHeight(200)}
              />
            ) : (
              <Connect_Light
                width={moderateScale(237)}
                height={getHeight(200)}
              />
            )}
          </View>
          <View>
            <ZText type={'b46'} align={'left'} style={styles.mv20}>
              {strings.createYourAccount}
            </ZText>
            <ZInput
              placeHolder={strings.email}
              keyBoardType={'email-address'}
              _value={email}
              _errorText={emailError}
              autoCapitalize={'none'}
              insideLeftIcon={() => <EmailIcon />}
              toGetTextFieldValue={onChangedEmail}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                emailInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusEmail}
              onBlur={onBlurEmail}
            />
            <TouchableOpacity
              onPress={() => setIsCheck(!isCheck)}
              style={localStyles.checkboxContainer}>
              <Ionicons
                name={isCheck ? 'square-outline' : 'checkbox'}
                size={moderateScale(26)}
                color={colors.primary}
              />
              <ZText type={'s14'} style={styles.mh10}>
                {strings.rememberMe}
              </ZText>
            </TouchableOpacity>
          </View>

          <ZButton
            title={strings.signUp}
            textType={'b18'}
            color={colors.white}
            containerStyle={[
              localStyles.signBtnContainer,
              isSubmitDisabled && {opacity: 0.5},
            ]}
            onPress={onPressSignWithPassword}
            disabled={isSubmitDisabled}
          />
        </View>
      </ZKeyBoardAvoidWrapper>
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default Register;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
    ...styles.flex,
    ...styles.justifyBetween,
  },
  signBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mv15,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
  },
  imageContainer: {
    ...styles.selfCenter,
    ...styles.mt40,
  },
});
