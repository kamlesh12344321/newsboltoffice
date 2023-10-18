import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {showPopupWithOk} from '../../../utils/helpers';
import strings from '../../../i18n/strings';
import {getRequestApi} from '../../../api/axios';
import ReelComponent from '../../../components/ReelComponent';
import {styles} from '../../../themes';
import {GET_LIKED_VIDEO} from '../../../api/config';
import ZText from '../../../components/common/ZText';
import ZLoader from '../../../components/common/ZLoader';

export default function LikeVideo() {
  const [likeVideo, setLikeVideo] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    getLikeVideo();
  }, []);

  const getLikeVideo = async () => {
    setIsLoader(true);
    try {
      const likeData = await getRequestApi(GET_LIKED_VIDEO(1));
      if (likeData.data.status) {
        setLikeVideo(likeData?.data?.data);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const RenderEmptyComponent = () => {
    return (
      <View style={[styles.center, styles.mt40]}>
        <ZText type={'b22'} style={styles.mt40}>
          {'No data found!'}
        </ZText>
      </View>
    );
  };

  const renderLikeVideo = ({item, index}) => (
    <ReelComponent
      item={item}
      data={likeVideo}
      reelUrl={item?.thumbnail}
      isPlay={true}
      index={index}
    />
  );

  return (
    <View style={styles.flex}>
      <FlatList
        data={likeVideo}
        renderItem={renderLikeVideo}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.mv20}
        ListEmptyComponent={RenderEmptyComponent}
      />
      {isLoader && <ZLoader />}
    </View>
  );
}
