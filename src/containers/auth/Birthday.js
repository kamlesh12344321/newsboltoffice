// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import ZHeader from '../../components/common/ZHeader';
import {styles} from '../../themes';
import strings from '../../i18n/strings';
import ZText from '../../components/common/ZText';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import {Birthday_Svg} from '../../assets/svgs';

const Birthday = ({navigation, route}) => {
  const gender = route?.params?.gender;
  console.log('gender', gender);
  const colors = useSelector(state => state.theme.theme);
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

  const onPressContinue = () => {
    navigation.navigate(StackNav.SetUpProfile, {
      title: strings.fillYourProfile,
      gender: gender,
      birthDate: birthDate,
      isFirstTime: true,
    });
  };
  const onPressSkip = () => {
    navigation.navigate(StackNav.SetUpProfile, {
      title: strings.fillYourProfile,
      gender: gender,
      birthDate: birthDate,
    });
  };

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.whenIsYourBirthday} />
      <View style={localStyles.root}>
        <ZText type={'m18'} style={styles.mv10}>
          {strings.whenIsYourBirthdayDesc}
        </ZText>
        <View style={styles.mt50}>
          <Birthday_Svg
            style={styles.selfCenter}
            width={moderateScale(220)}
            height={getHeight(220)}
          />
          <DateTimePicker
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            date={new Date()}
            maximumDate={new Date()}
          />
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={[
              localStyles.dobContainer,
              {backgroundColor: colors.inputBg},
            ]}>
            <ZText
              type={'b18'}
              color={!birthDate && colors.placeHolderColor}
              style={styles.mv10}>
              {birthDate ? birthDate : strings.selectDate}
            </ZText>
            <Ionicons
              name={'ios-calendar'}
              size={moderateScale(30)}
              color={colors.grayScale5}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={localStyles.btnContainer}>
        <ZButton
          title={strings.skip}
          textType={'b18'}
          color={!!colors.dark ? colors.white : colors.primary}
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
    </ZSafeAreaView>
  );
};

export default Birthday;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
  btnContainer: {
    ...styles.p20,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  dobContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt40,
    ...styles.ph20,
    height: getHeight(60),
    borderRadius: moderateScale(20),
  },
});
