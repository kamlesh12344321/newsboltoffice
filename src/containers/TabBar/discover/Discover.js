// Library import
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import {moderateScale} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import SoundCategory from './SoundCategory';
import {getRequestApi} from '../../../api/axios';
import {showPopupWithOk} from '../../../utils/helpers';
import {DISCOVER, SEARCH_CHANNEL} from '../../../api/config';
import ZLoader from '../../../components/common/ZLoader';
import ZDebounce from '../../../components/common/ZDebounce';
import ZInput from '../../../components/common/ZInput';

export default function Discover({navigation}) {
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
  const [discoverData, setDiscoverData] = useState([]);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const onHighlightInput = () => {
    setSearchInputStyle(FocusedStyle);
    setSearchIconStyle(FocusedIconStyle);
  };
  const onUnHighlightInput = () => {
    setSearchInputStyle(BlurredStyle);
    setSearchIconStyle(BlurredIconStyle);
  };

  useEffect(() => {
    getChannelData(1);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMoreChannel(page);
    }
  }, [page]);

  const onSearchChanel = async () => {
    if (!!search?.length) {
      setIsLoader(true);
      try {
        const response = await getRequestApi(SEARCH_CHANNEL(search));
        if (response.data.status) {
          setDiscoverData(response?.data?.data);
        } else {
          showPopupWithOk('Error', response.data.msg);
        }
      } catch (error) {
        showPopupWithOk('Error', strings.someThingWentWrong);
      } finally {
        setIsLoader(false);
      }
    } else {
      getChannelData();
    }
  };

  const onEndReached = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const onSearchInput = text => setSearch(text);

  const getChannelData = async (page = 1) => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(DISCOVER(page));
      if (response.data.status) {
        setDiscoverData(response?.data?.data);
        setTotalPage(response?.data?.total);
      } else {
        showPopupWithOk('Error', response.data.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const fetchMoreChannel = async page => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(DISCOVER(page));
      if (response.data.status) {
        setDiscoverData([...discoverData, ...response?.data?.data]);
      } else {
        showPopupWithOk('Error', response.data.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const onPressSearch = () => {
    setIsShowSearch(!isShowSearch);
    setSearch('');
  };

  const SearchIcon = () => {
    return (
      <Feather name="search" size={moderateScale(20)} color={searchIconStyle} />
    );
  };

  return (
    <ZSafeAreaView>
      <View style={localStyles.headerContainer}>
        <View style={styles.ph20}></View>
        <ZText type="b24">{strings.discover}</ZText>
        <TouchableOpacity onPress={onPressSearch}>
          <Ionicons
            name="search-outline"
            size={moderateScale(30)}
            color={colors.dark ? colors.white : colors.darkColor}
          />
        </TouchableOpacity>
      </View>
      {isShowSearch && (
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
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onHighlightInput}
          onBlur={onUnHighlightInput}
          onSubmitEditing={onSearchChanel}
        />
      )}
      <SoundCategory discoverData={discoverData} onEndReached={onEndReached} />
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
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    width: '90%',
    ...styles.selfCenter,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
});
