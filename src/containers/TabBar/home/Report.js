// Library import
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import ZHeader from '../../../components/common/ZHeader';
import strings from '../../../i18n/strings';
import ZText from '../../../components/common/ZText';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import ZButton from '../../../components/common/ZButton';
import {showPopupWithOk} from '../../../utils/helpers';
import {FLAG_VIDEO} from '../../../api/config';
import {getRequestApi} from '../../../api/axios';

export default function Report({navigation, route}) {
  const channelId = route.params?.channelId;
  console.log('channelId', channelId);
  const colors = useSelector(state => state.theme.theme);
  const [isSelected, setIsSelected] = useState('');
  const [flagData, setFlagData] = useState([]);

  useEffect(() => {
    getFlag();
  }, []);

  const getFlag = () => {
    setFlagData(global.config?.data?.video_flag_reasons);
  };

  const onPressItem = item => {
    setIsSelected(item);
  };

  const onPressSkip = () => navigation.goBack();

  const onPressSubmit = async () => {
    try {
      const data = await getRequestApi(FLAG_VIDEO(channelId, isSelected));
      if (data?.data?.status) {
        navigation.goBack();
      }
    } catch (e) {
      showPopupWithOk('Error', strings.someThingWentWrong);
      console.log('Error', e);
    }
  };

  const renderData = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item.id)}
        style={localStyles.settingsContainer}>
        <Ionicons
          name={isSelected === item.id ? 'radio-button-on' : 'radio-button-off'}
          size={moderateScale(24)}
          color={colors.primary}
          style={styles.mr10}
        />
        <ZText type="s18">{item.name}</ZText>
      </TouchableOpacity>
    );
  };

  return (
    <ZSafeAreaView>
      <ZHeader title={strings.report} />
      <View style={[styles.ph20, styles.flex]}>
        <FlatList
          data={flagData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderData}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={localStyles.btnContainer}>
        <ZButton
          title={strings.cancel}
          textType={'b18'}
          color={colors.dark ? colors.white : colors.primary}
          containerStyle={localStyles.skipBtnContainer}
          bgColor={colors.dark3}
          onPress={onPressSkip}
        />
        <ZButton
          title={strings.submit}
          textType={'b18'}
          color={colors.white}
          containerStyle={localStyles.skipBtnContainer}
          onPress={onPressSubmit}
        />
      </View>
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  settingsContainer: {
    ...styles.flexRow,
    ...styles.mt20,
  },
  btnContainer: {
    ...styles.ph20,
    ...styles.pv10,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
});
