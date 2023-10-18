// Library import
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

// Local import
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';
import {soundTrendingData} from '../../../api/constant';
import SoundComponent from '../../../components/SoundComponent';
import {GET_CHANNEL_VIDEOS} from '../../../api/config';
import strings from '../../../i18n/strings';

export default function SoundCategory({discoverData, onEndReached}) {
  const navigation = useNavigation();
  const onPressTrendingSound = id =>
    navigation.navigate(StackNav.ProfileDetail, {channelId: id});

  const getChannelVideo = async id => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(`${GET_CHANNEL_VIDEOS(id, 1)})`);
      if (response?.data?.success) {
      } else {
        showPopupWithOk('Error', response?.data?.message);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const RenderSoundsItem = useCallback(
    ({item, index}) => {
      return (
        <View style={localStyles.soundContainer}>
          <SoundComponent
            key={index}
            title={item?.channelTitle}
            imgUrl={item?.channel_image}
            artist={item?.description}
            isforwadIcon={true}
            onPressSound={() => onPressTrendingSound(item?.channel_id)}
          />
        </View>
      );
    },
    [soundTrendingData],
  );

  return (
    <FlatList
      data={discoverData}
      renderItem={({item, index}) => (
        <RenderSoundsItem item={item} index={index} />
      )}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}

const localStyles = StyleSheet.create({
  soundContainer: {
    ...styles.mv10,
    ...styles.ph20,
  },
});
