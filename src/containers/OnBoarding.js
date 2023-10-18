// Library Imports
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';

//Local Imports
import ZText from '../components/common/ZText';
import images from '../assets/images';
import {styles} from '../themes';
import {
  APP_OPEN_FIRST_TIME,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../common/constants';
import {StackNav} from '../navigation/NavigationKeys';
import {setAsyncStorageData} from '../utils/helpers';
import ZButton from '../components/common/ZButton';
import strings from '../i18n/strings';
import ZSafeAreaView from '../components/common/ZSafeAreaView';
import ZLoader from '../components/common/ZLoader';

const OnBoarding = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [isLoader, setIsLoader] = useState(false);
  const [OnBoardingData, setOnBoardingData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    getConfigData();
  }, []);

  const getConfigData = async () => {
    setOnBoardingData(global.config?.data?.onboarding);
  };

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setAsyncStorageData(APP_OPEN_FIRST_TIME, 'firstTimeOpen');
      navigation.reset({
        index: 0,
        routes: [{name: StackNav.Auth}],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: deviceWidth * (currentIndex + 1),
      });
    }
  };

  const RenderOnboardingItem = useCallback(
    ({item, index}) => {
      return (
        <View style={localStyles.renderItemContainer}>
          <SvgUri
            uri={item.image}
            height="70%"
            width={deviceWidth - moderateScale(60)}
          />
          <ZText type={'b36'} align={'center'}>
            {item.text}
          </ZText>
        </View>
      );
    },
    [OnBoardingData],
  );

  return (
    <ZSafeAreaView>
      <FlatList
        data={OnBoardingData}
        ref={slideRef}
        renderItem={({item, index}) => (
          <RenderOnboardingItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        pagingEnabled
      />

      <View style={styles.rowCenter}>
        {OnBoardingData.map((_, index) => (
          <View
            key={index}
            style={[
              localStyles.bottomIndicatorStyle,
              {
                width:
                  index !== currentIndex
                    ? moderateScale(10)
                    : moderateScale(20),
                backgroundColor:
                  index == currentIndex ? colors.primary : colors.grayScale4,
              },
            ]}
          />
        ))}
      </View>

      <ZButton
        title={currentIndex === 2 ? strings.getStarted : strings.next}
        containerStyle={localStyles.submitButton}
        textType={'b18'}
        color={colors.white}
        onPress={onPressRightArrow}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
};

export default OnBoarding;

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mb20,
    ...styles.mh25,
    height: moderateScale(55),
    borderRadius: moderateScale(50),
  },
  renderItemContainer: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  bottomIndicatorStyle: {
    height: getHeight(10),
    ...styles.mv30,
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
});
