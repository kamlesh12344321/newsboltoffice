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
import {USER_DATA, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import {GETCATEGORIES, GET_PROFILE} from '../../api/config';
import {getRequestApi} from '../../api/axios';
import ZLoader from '../../components/common/ZLoader';
import {setAsyncStorageData, showPopupWithOk} from '../../utils/helpers';

const SelectInterest = ({navigation, route}) => {
  const langId = route?.params?.langId;
  const isFirstTime = route?.params?.isFirstTime;

  const colors = useSelector(state => state.theme.theme);
  const [selectedChips, setSelectedChips] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getInterestData();
  }, []);

  const getInterestData = async () => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(GETCATEGORIES(langId));
      if (response.data.status) {
        setCategoryData(response?.data?.data);
      } else {
        showPopupWithOk('Error', response.data.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
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
    setIsLoader(true);
    try {
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
    } catch (error) {
      console.log('error>>', error);
    } finally {
      setIsLoader(false);
    }
  };

  const InterestChips = () => {
    return categoryData.map((item, index) => {
      return <RenderChips item={item?.name} key={index} />;
    });
  };

  return (
    <ZSafeAreaView>
      <ZHeader isHideBack title={strings.interestHeader} />
      <View style={localStyles.root}>
        <ZText type={'m18'} style={styles.mv10}>
          {strings.selectInterestDescription}
        </ZText>
        <View style={localStyles.chipMainContainer}>
          <InterestChips />
        </View>
      </View>
      <View style={localStyles.btnContainer}>
        <ZButton
          title={strings.skip}
          textType={'b18'}
          color={!!colors.dark ? colors.white : colors.primary}
          containerStyle={[localStyles.skipBtnContainer]}
          bgColor={colors.dark3}
          onPress={onPressContinue}
        />
        <ZButton
          title={strings.continue}
          textType={'b18'}
          color={colors.white}
          containerStyle={[localStyles.skipBtnContainer]}
          onPress={onPressContinue}
        />
      </View>
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default SelectInterest;

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
    ...styles.rowSpaceAround,
  },
  chipsContainer: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mt15,
    ...styles.mr15,
  },
  skipBtnContainer: {
    width: '45%',
  },
});
