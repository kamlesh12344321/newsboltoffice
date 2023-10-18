// Libraries import
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {createRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import CountryPicker, {
  FlagButton,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';

// Local import
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import ZHeader from '../../components/common/ZHeader';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {styles} from '../../themes';
import {
  EMAIL_ID,
  USER_DATA,
  getHeight,
  moderateScale,
} from '../../common/constants';
import ZInput from '../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';
import ProfilePicture from '../../components/models/ProfilePicture';
import ZButton from '../../components/common/ZButton';
import SuccessModal from '../../components/models/SuccessModal';
import ZLoader from '../../components/common/ZLoader';
import {getRequestApi, postRequestApi} from '../../api/axios';
import {
  getAsyncStorageData,
  setAsyncStorageData,
  showPopupWithOk,
} from '../../utils/helpers';
import {GET_PROFILE, UPDATEPROFILE} from '../../api/config';
import ZText from '../../components/common/ZText';
import {
  validateEmail,
  validateMobileNumber,
  validateName,
} from '../../utils/validators';

const SetUpProfile = props => {
  const {navigation, route} = props;
  const gender = route?.params?.gender;
  const birthDate = route?.params?.birthDate;

  const colors = useSelector(state => state.theme.theme);
  const ProfilePictureSheetRef = createRef();

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

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = useState(BlurredStyle);
  const [addressInputStyle, setAddressInputStyle] = useState(BlurredStyle);
  const [nicknameInputStyle, setNicknameInputStyle] = useState(BlurredStyle);
  const [emailIcon, setEmailIcon] = useState(BlurredIconStyle);
  const [addressIcon, setAddressIcon] = useState(BlurredIconStyle);
  const [selectImage, setSelectImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chevronDown, setChevronDown] = useState(BlurredIconStyle);
  const [callingCodeLib, setCallingCodeLib] = useState(+91);
  const [countryCodeLib, setCountryCodeLib] = useState('IN');
  const [visiblePiker, setVisiblePiker] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    ProfilePictureSheetRef?.current?.hide();
  }, [selectImage]);

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const onFocusAddress = () => {
    onFocusInput(setAddressInputStyle);
    onFocusIcon(setAddressIcon);
  };

  const onBlurAddress = () => {
    onBlurInput(setAddressInputStyle);
    onBlurIcon(setAddressIcon);
  };

  const onFocusFullName = () => onFocusInput(setFullNameInputStyle);
  const onFocusNickName = () => onFocusInput(setNicknameInputStyle);
  const onFocusPhoneNo = () => {
    onFocusInput(setPhoneNoInputStyle);
    onFocusIcon(setChevronDown);
  };

  const onBlurFullName = () => onBlurInput(setFullNameInputStyle);
  const onBlurNickName = () => onBlurInput(setNicknameInputStyle);
  const onBlurPhoneNo = () => {
    onBlurInput(setPhoneNoInputStyle);
    onBlurIcon(setChevronDown);
  };

  const onChangedFullName = text => {
    const {msg} = validateName(text);
    setFullName(text);
    setFullNameError(msg);
  };

  const onChangedNickName = text => setNickname(text);

  const onChangedPhoneNo = text => {
    const {msg} = validateMobileNumber(text);
    setPhoneNo(text);
    setPhoneNoError(msg);
  };
  const onChangedAddress = text => setAddress(text);
  const onChangedEmail = text => {
    const {msg} = validateEmail(text);
    setEmail(text);
    setEmailError(msg);
  };

  const getEmail = async () => {
    const getEmail = await getAsyncStorageData(EMAIL_ID);
    setEmail(getEmail);
  };

  const onSelectCountry = country => {
    setCountryCodeLib(country.cca2);
    setCallingCodeLib('+' + country.callingCode[0]);
    closeCountryPicker();
  };

  const openCountryPicker = () => setVisiblePiker(true);
  const closeCountryPicker = () => setVisiblePiker(false);

  const onPressCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      setSelectImage(image);
    });
  };

  const onPressGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
    }).then(images => {
      setSelectImage(images);
    });
  };

  const EmailIcon = () => (
    <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />
  );

  const AddressIcon = () => (
    <Ionicons name="location" size={moderateScale(20)} color={addressIcon} />
  );

  const onPressContinue = async () => {
    if (!!fullName) {
      if (!!fullNameError) {
        showPopupWithOk(strings.newsBolt, 'Enter a valid full name');
        return false;
      }
    }
    // if (fullName.length && !fullNameError) {
    //   showPopupWithOk(strings.newsBolt, 'Enter a valid full name');
    //   return false;
    // }

    // if (nickname.length && !nickNameError) {
    //   showPopupWithOk(strings.newsBolt, 'Enter a valid nickname');
    //   return false;
    // }

    // if (phoneNo.length && !phoneNoError) {
    //   showPopupWithOk(strings.newsBolt, 'Enter a valid phone number');
    //   return false;
    // }

    // if (address.length && !addressError) {
    //   showPopupWithOk(strings.newsBolt, 'Enter a valid address');
    //   return false;
    // }

    setIsLoader(true);
    try {
      const formData = new FormData();
      const imgData = {
        uri: selectImage?.path,
        type: selectImage?.mime,
        name:
          Platform.OS === 'ios'
            ? selectImage?.filename
            : selectImage?.path?.split('/').pop(),
      };
      !!selectImage?.path && formData.append('image', imgData);
      !!fullName?.length && formData.append('name', fullName);
      !!gender?.length && formData.append('gender', gender);
      !!birthDate?.length && formData.append('birth_date', birthDate);
      !!address?.length && formData.append('address', address);
      !!nickname?.length && formData.append('nick_name', nickname);
      !!callingCodeLib?.length &&
        formData.append('country_code', callingCodeLib);
      !!phoneNo?.length && formData.append('phone_number', phoneNo);

      if (formData['_parts'].length) {
        const headers = {
          'Content-Type': 'multipart/form-data',
        };
        const response = await postRequestApi(UPDATEPROFILE, formData, headers);
        if (response?.data?.status) {
          const getProfile = await getRequestApi(GET_PROFILE);
          if (getProfile?.data?.status) {
            const userData = getProfile?.data?.data;
            await setAsyncStorageData(USER_DATA, userData);
            global.userData = userData;
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
              navigation.reset({
                index: 0,
                routes: [{name: StackNav.TabBar}],
              });
            }, 1500);
          } else {
            showPopupWithOk(strings.newsBolt, response.data.msg);
          }
        } else {
          showPopupWithOk(strings.newsBolt, response.data.msg);
        }
      } else {
        const getProfile = await getRequestApi(GET_PROFILE);
        if (getProfile?.data?.status) {
          const userData = getProfile?.data?.data;
          await setAsyncStorageData(USER_DATA, userData);
          global.userData = userData;
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.reset({
              index: 0,
              routes: [{name: StackNav.TabBar}],
            });
          }, 1500);
        } else {
          showPopupWithOk(strings.newsBolt, response.data.msg);
        }
      }
    } catch (error) {
      showPopupWithOk(strings.newsBolt, strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const onPressSkip = () => onPressContinue();

  const onPressModalClose = () => setModalVisible(false);

  const onPressProfilePic = () => {
    ProfilePictureSheetRef?.current.show();
  };

  const countryIcon = () => {
    return (
      <View style={styles.rowCenter}>
        <FlagButton
          value={callingCodeLib}
          onOpen={openCountryPicker}
          withEmoji={true}
          countryCode={countryCodeLib}
          containerButtonStyle={localStyles.countryPickerButton}
        />
        <Ionicons
          name="chevron-down-outline"
          size={moderateScale(20)}
          color={chevronDown}
        />
        <ZText type={'r16'} style={styles.ml10}>
          {callingCodeLib}
        </ZText>
      </View>
    );
  };

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.fillYourProfile} />
      <ZKeyBoardAvoidWrapper containerStyle={[styles.p20]}>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={[styles.selfCenter, styles.mb20]}>
          {!!selectImage?.path ? (
            <Image
              source={{uri: selectImage?.path}}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )}
          <MaterialIcon
            name="pencil-box"
            size={moderateScale(30)}
            color={colors.primary}
            style={localStyles.editIcon}
          />
        </TouchableOpacity>

        <ZInput
          placeHolder={strings.fullName}
          keyBoardType={'email-address'}
          _value={fullName}
          _errorText={fullNameError}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedFullName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            fullNameInputStyle,
          ]}
          _onFocus={onFocusFullName}
          onBlur={onBlurFullName}
        />
        <ZInput
          placeHolder={strings.nickname}
          _value={nickname}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedNickName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            nicknameInputStyle,
          ]}
          _onFocus={onFocusNickName}
          onBlur={onBlurNickName}
        />
        <ZInput
          placeHolder={strings.email}
          keyBoardType={'email-address'}
          _value={email}
          _errorText={emailError}
          _editable={false}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedEmail}
          rightAccessory={() => <EmailIcon />}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            emailInputStyle,
          ]}
          _onFocus={onFocusEmail}
          onBlur={onBlurEmail}
        />
        <ZInput
          placeHolder={strings.phoneNumber}
          keyBoardType={'number-pad'}
          _value={phoneNo}
          _errorText={phoneNoError}
          _maxLength={10}
          toGetTextFieldValue={onChangedPhoneNo}
          insideLeftIcon={countryIcon}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            phoneNoInputStyle,
          ]}
          inputBoxStyle={{paddingLeft: moderateScale(5)}}
          _onFocus={onFocusPhoneNo}
          onBlur={onBlurPhoneNo}
        />
        <ZInput
          placeHolder={strings.address}
          _value={address}
          toGetTextFieldValue={onChangedAddress}
          rightAccessory={() => <AddressIcon />}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            addressInputStyle,
          ]}
          _onFocus={onFocusAddress}
          onBlur={onBlurAddress}
        />
      </ZKeyBoardAvoidWrapper>
      <View style={localStyles.btnContainer}>
        <ZButton
          title={strings.skip}
          textType={'b18'}
          color={colors.dark ? colors.white : colors.primary}
          containerStyle={[localStyles.skipBtnContainer]}
          bgColor={colors.dark3}
          onPress={onPressSkip}
        />
        <ZButton
          title={strings.continue}
          textType={'b18'}
          color={colors.white}
          containerStyle={[localStyles.skipBtnContainer]}
          onPress={onPressContinue}
        />
      </View>
      <ProfilePicture
        onPressCamera={onPressCamera}
        onPressGallery={onPressGallery}
        SheetRef={ProfilePictureSheetRef}
      />
      <SuccessModal
        visible={modalVisible}
        onPressModalClose={onPressModalClose}
      />
      <CountryPicker
        countryCode={'IN'}
        withFilter={true}
        visible={visiblePiker}
        withFlag={true}
        withFlagButton={true}
        onSelect={country => onSelectCountry(country)}
        withCallingCode={true}
        withAlphaFilter={true}
        withCountryNameButton={true}
        onClose={closeCountryPicker}
        renderFlagButton={() => {
          return null;
        }}
        theme={colors.dark ? DARK_THEME : DEFAULT_THEME}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default SetUpProfile;

const localStyles = StyleSheet.create({
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
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  btnContainer: {
    ...styles.p20,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  countryPickerButton: {
    width: moderateScale(32),
  },
});
