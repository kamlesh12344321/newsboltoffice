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
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import ZHeader from '../../../components/common/ZHeader';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {USER_DATA, getHeight, moderateScale} from '../../../common/constants';
import ZInput from '../../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../../components/common/ZKeyBoardAvoidWrapper';
import {TabNav} from '../../../navigation/NavigationKeys';
import ProfilePicture from '../../../components/models/ProfilePicture';
import ZButton from '../../../components/common/ZButton';
import ZLoader from '../../../components/common/ZLoader';
import {getRequestApi, postRequestApi} from '../../../api/axios';
import {setAsyncStorageData, showPopupWithOk} from '../../../utils/helpers';
import {GET_PROFILE, UPDATEPROFILE} from '../../../api/config';
import ZText from '../../../components/common/ZText';
import {
  validateEmail,
  validateMobileNumber,
  validateName,
} from '../../../utils/validators';
import DateTimePicker from 'react-native-modal-datetime-picker';

const UpdateProfile = props => {
  const {navigation, route} = props;
  const profileData = route?.params?.profileData;

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

  const [email, setEmail] = useState(profileData?.email);
  const [fullName, setFullName] = useState(profileData?.name);
  const [nickname, setNickname] = useState(profileData?.nick_name);
  const [phoneNo, setPhoneNo] = useState(profileData?.phone_number);
  const [address, setAddress] = useState(profileData?.address);
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = useState(BlurredStyle);
  const [addressInputStyle, setAddressInputStyle] = useState(BlurredStyle);
  const [nicknameInputStyle, setNicknameInputStyle] = useState(BlurredStyle);
  const [emailIcon, setEmailIcon] = useState(BlurredIconStyle);
  const [addressIcon, setAddressIcon] = useState(BlurredIconStyle);
  const [selectImage, setSelectImage] = useState('');
  const [chevronDown, setChevronDown] = useState(BlurredIconStyle);
  const [callingCodeLib, setCallingCodeLib] = useState(
    profileData?.country_code ? '+' + profileData?.country_code : +91,
  );
  const [countryCodeLib, setCountryCodeLib] = useState('IN');
  const [visiblePiker, setVisiblePiker] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [birthDate, setBirthDate] = useState('');

  const handleDateConfirm = date => {
    var birthDate = date.toISOString().split('T')[0];
    const day = birthDate.split('-')[2];
    const month = birthDate.split('-')[1];
    const year = birthDate.split('-')[0];
    setBirthDate(year + '/' + month + '/' + day);
    setDatePickerVisible(false);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

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

  useEffect(() => {
    ProfilePictureSheetRef?.current?.hide();
  }, [selectImage]);

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
      selectImage.path && formData.append('image', imgData);
      formData.append('name', fullName);
      formData.append('address', address);
      formData.append('nick_name', nickname);
      formData.append('country_code', callingCodeLib);
      formData.append('phone_number', phoneNo);
      formData.append('birth_date', birthDate);
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const response = await postRequestApi(UPDATEPROFILE, formData, headers);
      if (response?.data?.status) {
        const getProfile = await getRequestApi(GET_PROFILE);
        if (getProfile?.data?.status) {
          const userData = await getProfile?.data?.data;
          await setAsyncStorageData(USER_DATA, userData);
          global.userData = userData;

          navigation.navigate(TabNav.Profile);
        } else {
          showPopupWithOk(strings.newsBolt, response.data.msg);
        }
      } else {
        showPopupWithOk(strings.newsBolt, response.data.msg);
      }
    } catch (error) {
      showPopupWithOk(strings.newsBolt, strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

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
      <ZHeader title={strings.editProfile} />
      <ZKeyBoardAvoidWrapper containerStyle={[styles.p20]}>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={[styles.selfCenter, styles.mb20]}>
          {!!selectImage?.path ? (
            <Image
              source={{
                uri: selectImage?.path ? selectImage?.path : profileData?.image,
              }}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={
                profileData?.image
                  ? {uri: profileData?.image}
                  : colors.dark
                  ? images.userDark
                  : images.userLight
              }
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
        <DateTimePicker
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          date={new Date()}
          maximumDate={new Date()}
        />
        {!profileData?.birth_date && (
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={[
              localStyles.dobContainer,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.bColor,
              },
            ]}>
            <ZText
              type={'r16'}
              color={!birthDate && colors.placeHolderColor}
              style={styles.mv10}>
              {birthDate ? birthDate : strings.selectDate}
            </ZText>
            <Ionicons
              name={'ios-calendar'}
              size={moderateScale(20)}
              color={colors.grayScale5}
            />
          </TouchableOpacity>
        )}
      </ZKeyBoardAvoidWrapper>
      <ZButton
        textType={'b18'}
        color={colors.white}
        title={strings.update}
        containerStyle={styles.m20}
        onPress={onPressContinue}
      />
      <ProfilePicture
        onPressCamera={onPressCamera}
        onPressGallery={onPressGallery}
        SheetRef={ProfilePictureSheetRef}
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

export default UpdateProfile;

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
  dobContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt15,
    ...styles.ph25,
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
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
