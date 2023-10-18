// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

// Local Imports
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import ZHeader from '../../components/common/ZHeader';
import {styles} from '../../themes';
import strings from '../../i18n/strings';
import ZText from '../../components/common/ZText';
import {LANGUAGE, USER_DATA, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import {getRequestApi} from '../../api/axios';
import ZLoader from '../../components/common/ZLoader';
import {GETLANGUAGE, GET_PROFILE} from '../../api/config';
import {setAsyncStorageData, showPopupWithOk} from '../../utils/helpers';

const SelectLanguage = ({navigation, route}) => {
  const isFirstTime = route?.params?.isFirstTime;
  const colors = useSelector(state => state.theme.theme);
  const [selectedChips, setSelectedChips] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(GETLANGUAGE);
      if (response.data.status) {
        setLanguageData(response?.data?.data);
      } else {
        showPopupWithOk(strings.newsBolt, response.data.msg);
      }
    } catch (error) {
      showPopupWithOk(strings.newsBolt, strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const RenderChips = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChips(item)}
        style={[
          localStyles.chipsContainer,
          {borderColor: colors.primary},
          selectedChips.includes(item) && {backgroundColor: colors.primary},
        ]}>
        <ZText
          type={'b18'}
          color={selectedChips.includes(item) ? colors.white : colors.primary}>
          {item}
        </ZText>
      </TouchableOpacity>
    );
  };

  const onPressChips = value => {
    if (selectedChips.includes(value)) {
      setSelectedChips(selectedChips.filter(item => item !== value));
    } else {
      setSelectedChips([...selectedChips, value]);
    }
  };

  const onPressContinue = async () => {
    if (selectedChips.length === 0) {
      showPopupWithOk(strings.newsBolt, 'Please select at least one language');
      return;
    }
    setIsLoader(true);
    const langId = languageData
      .filter(item => selectedChips.includes(item.slug))
      .map(item => item.id);
    await setAsyncStorageData(LANGUAGE, langId.join(','));
    global.selectedLanguage = langId.join(',');
    // navigation.navigate(StackNav.SelectInterest, {
    //   langId: langId.join(','),
    //   isFirstTime: isFirstTime,
    // });
    if (isFirstTime) {
      navigation.navigate(StackNav.Gender);
    } else {
      const getProfile = await getRequestApi(GET_PROFILE);
      if (getProfile?.data?.status) {
        const userData = await getProfile?.data?.data;
        await setAsyncStorageData(USER_DATA, userData);
        global.userData = userData;
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.TabBar}],
        });
      } else {
        showPopupWithOk(strings.newsBolt, getProfile?.data?.msg);
      }
    }
    setIsLoader(false);
  };

  const InterestChips = () => {
    return languageData.map((item, index) => {
      return <RenderChips item={item?.slug} key={index} />;
    });
  };

  return (
    <ZSafeAreaView>
      <ZHeader isHideBack title={strings.languageHeader} />
      <View style={localStyles.root}>
        <ZText type={'m18'} style={styles.mv10}>
          {strings.selectLanguageDescription}
        </ZText>
        <View style={localStyles.chipMainContainer}>
          <InterestChips />
        </View>
      </View>
      <View style={localStyles.btnContainer}>
        <ZButton
          title={strings.continue}
          textType={'b18'}
          color={colors.white}
          onPress={onPressContinue}
        />
      </View>
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default SelectLanguage;

const localStyles = StyleSheet.create({
  chipMainContainer: {
    ...styles.wrap,
    ...styles.flexRow,
  },
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
  btnContainer: {
    ...styles.p20,
  },
  chipsContainer: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mt15,
    ...styles.mr15,
  },
});
