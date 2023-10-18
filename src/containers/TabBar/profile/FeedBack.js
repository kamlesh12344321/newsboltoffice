import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// Local Imports
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import ZHeader from '../../../components/common/ZHeader';
import strings from '../../../i18n/strings';
import {getHeight, moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import ZInput from '../../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../../components/common/ZKeyBoardAvoidWrapper';
import ZButton from '../../../components/common/ZButton';
import {showPopupWithOk} from '../../../utils/helpers';
import ZLoader from '../../../components/common/ZLoader';
import {postRequestApi} from '../../../api/axios';
import {FEEDBACK} from '../../../api/config';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';

export default function FeedBack({}) {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const [feedBack, setFeedBack] = useState('');
  const [feedBackInputStyle, setFeedBackInputStyle] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const onFocusInput = () => setFeedBackInputStyle(FocusedStyle);
  const onBlurInput = () => setFeedBackInputStyle(BlurredStyle);

  const onChangedFeedBack = text => setFeedBack(text);

  const onPressSubmit = async () => {
    if (feedBack.length === 0) {
      showPopupWithOk('Error', 'Please enter your feedback');
      return;
    } else {
      setIsLoader(true);
      try {
        const feedbackData = {
          message: feedBack,
        };
        const resFeedBack = await postRequestApi(FEEDBACK, feedbackData);
        if (resFeedBack?.data?.status) {
          navigation.navigate(TabNav.Profile);
        } else {
          showPopupWithOk('resFeedBack Error', resFeedBack?.data?.msg);
        }
      } catch (error) {
        console.log('error>>', error);
      } finally {
        setIsLoader(false);
      }
    }
  };

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.feedback} />
      <ZKeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <ZInput
          placeHolder={strings.enterYourFeedback}
          keyBoardType={'email-address'}
          _value={feedBack}
          multiline={true}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedFeedBack}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            feedBackInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
      </ZKeyBoardAvoidWrapper>
      <ZButton
        title={strings.submit}
        textType={'b18'}
        color={colors.white}
        containerStyle={localStyles.signBtnContainer}
        onPress={onPressSubmit}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  inputContainerStyle: {
    height: getHeight(150),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  signBtnContainer: {
    ...styles.center,
    width: '90%',
    ...styles.m20,
  },
});
