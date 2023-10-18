// Libraries import
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Local import
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import {inboxData} from '../../../api/constant';
import strings from '../../../i18n/strings';
import ZInput from '../../../components/common/ZInput';
import NotificationComponent from '../../../components/NotificationComponent';
import ZText from '../../../components/common/ZText';

export default function Notification({navigation}) {
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

  const onPressMessage = () => {};

  const onSearchInput = text => setSearch(text);

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

  return (
    <ZSafeAreaView>
      <View style={localStyles.headerContainer}>
        <View style={styles.ph20}></View>
        <ZText type="b24">{strings.notification}</ZText>
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
        data={inboxData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <NotificationComponent item={item} key={item.id} />
        )}
        bounces={false}
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
      />
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    width: '90%',
    ...styles.selfCenter,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.pb10,
  },
});
