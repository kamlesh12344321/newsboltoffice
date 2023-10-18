// Libraries import
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';

// Local import
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import images from '../../../assets/images';
import strings from '../../../i18n/strings';
import ZInput from '../../../components/common/ZInput';
import {getRequestApi} from '../../../api/axios';
import {showPopupWithOk} from '../../../utils/helpers';
import {GET_FOLLOWING, SEARCH_FOLLOWING} from '../../../api/config';
import ZLoader from '../../../components/common/ZLoader';
import {StackNav} from '../../../navigation/NavigationKeys';
import ZDebounce from '../../../components/common/ZDebounce';

export default function FollowingTab({navigation}) {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);

  useEffect(() => {
    onUnHighlightInput();
  }, [colors]);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.btnColor1,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [search, setSearch] = useState('');
  const [searchInputStyle, setSearchInputStyle] = useState(BlurredStyle);
  const [searchIconStyle, setSearchIconStyle] = useState(BlurredIconStyle);
  const [isLoader, setIsLoader] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    isFocused && getFollowingData();
  }, [isFocused]);

  const debounceSearch = ZDebounce(search, 300);

  useEffect(() => {
    filterData();
  }, [debounceSearch]);

  const filterData = async () => {
    if (!!debounceSearch) {
      setIsLoader(true);
      try {
        const response = await getRequestApi(SEARCH_FOLLOWING(debounceSearch));
        if (response.data.status) {
          setFollowingList(response?.data?.data);
        } else {
          showPopupWithOk('Error', response.data.msg);
        }
      } catch (error) {
        showPopupWithOk('Error', strings.someThingWentWrong);
      } finally {
        setIsLoader(false);
      }
    } else {
      getFollowingData();
    }
  };

  const getFollowingData = async () => {
    setIsLoader(true);
    try {
      const data = await getRequestApi(GET_FOLLOWING(1));
      if (data?.data?.status) {
        console.log('Following Data>>>', data?.data?.data);
        setFollowingList(data?.data?.data);
      }
    } catch (error) {
      showPopupWithOk('Following Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const onPressMessage = () => {};

  const onSearchInput = text => setSearch(text);

  const onPressProfile = id =>
    navigation.navigate(StackNav.ProfileDetail, {
      channelId: id,
    });

  const onHighlightInput = () => {
    setSearchInputStyle(FocusedStyle);
    setSearchIconStyle(FocusedIconStyle);
  };
  const onUnHighlightInput = () => {
    setSearchInputStyle(BlurredStyle);
    setSearchIconStyle(BlurredIconStyle);
  };

  const SearchIcon = () => {
    return (
      <Feather name="search" size={moderateScale(20)} color={searchIconStyle} />
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={localStyles.emptyContainer}>
        <ZText type="b18" align={'center'} style={styles.mt40}>
          {strings.noChannels}
        </ZText>
      </View>
    );
  };

  const renderInboxItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressProfile(item.channel_id)}
        style={localStyles.renderItemCoontainer}>
        <View>
          {!!item?.channel_image ? (
            <Image
              source={{
                uri: item.channel_image,
              }}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )}
        </View>
        <View style={[styles.mh10, styles.flex]}>
          <ZText type="b18" numberOfLines={1}>
            {item.channelTitle}
          </ZText>
          <ZText type="m14" numberOfLines={2} style={styles.mt5}>
            {item.desc}
          </ZText>
        </View>
        {/* {!!item.follow ? (
          <TouchableOpacity
            style={[localStyles.followBtn, {backgroundColor: colors.primary}]}>
            <ZText type="b14" color={colors.white}>
              {item.follow}
            </ZText>
          </TouchableOpacity>
        ) : (
          <View style={styles.rowCenter}>
            <TouchableOpacity>
              <ZText type="M14" color={colors.primary}>
                {'unfollow'}
              </ZText>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="close-outline"
                size={moderateScale(24)}
                color={colors.primary}
                style={styles.ml5}
              />
            </TouchableOpacity>
          </View>
        )} */}
      </TouchableOpacity>
    );
  };

  return (
    <ZSafeAreaView>
      <View style={localStyles.headerContainer}>
        <View style={styles.ph20}></View>
        <ZText type="b24">{strings.following}</ZText>
        <TouchableOpacity onPress={onPressMessage}>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={moderateScale(30)}
            color={colors.dark ? colors.white : colors.darkColor}
          />
        </TouchableOpacity>
      </View>
      <ZInput
        placeHolder={strings.search}
        _value={search}
        keyBoardType={'default'}
        autoCapitalize={'none'}
        insideLeftIcon={() => <SearchIcon />}
        toGetTextFieldValue={onSearchInput}
        inputContainerStyle={[
          {backgroundColor: colors.inputBg},
          localStyles.inputContainerStyle,
          searchInputStyle,
        ]}
        inputBoxStyle={[localStyles.inputBoxStyle]}
        _onFocus={onHighlightInput}
        onBlur={onUnHighlightInput}
      />
      <FlashList
        data={followingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInboxItem}
        bounces={false}
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
        ListEmptyComponent={renderEmptyComponent}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.pb10,
  },
  userImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
  },
  followBtn: {
    ...styles.ph20,
    ...styles.pv10,
    borderRadius: moderateScale(30),
  },
  titleContainer: {
    ...styles.pt10,
    ...styles.mb20,
  },
  renderItemCoontainer: {
    ...styles.rowCenter,
    ...styles.mb15,
  },
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    width: '90%',
    ...styles.selfCenter,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  emptyContainer: {
    ...styles.mt40,
  },
});
