import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReelComponent from '../../../components/ReelComponent';
import {getRequestApi} from '../../../api/axios';
import {GET_BOOKMARKS_VIDEO} from '../../../api/config';
import {showPopupWithOk} from '../../../utils/helpers';
import strings from '../../../i18n/strings';
import {styles} from '../../../themes';
import ZText from '../../../components/common/ZText';
import ZLoader from '../../../components/common/ZLoader';

export default function BookmarkVideo() {
  const [bookmarkVideo, setBookmarkVideo] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    getBookmarkVideo();
  }, []);

  const getBookmarkVideo = async () => {
    setIsLoader(true);
    try {
      const bookmarkVideo = await getRequestApi(GET_BOOKMARKS_VIDEO(1));
      if (bookmarkVideo.data.status) {
        setBookmarkVideo(bookmarkVideo?.data?.data);
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

  const renderBookMarkList = ({item, index}) => (
    <ReelComponent
      item={item}
      data={bookmarkVideo}
      reelUrl={item?.thumbnail}
      isPlay={true}
      index={index}
    />
  );

  return (
    <View style={styles.flex}>
      <FlatList
        data={bookmarkVideo}
        renderItem={renderBookMarkList}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.mv20}
        ListEmptyComponent={RenderEmptyComponent}
      />
      {isLoader && <ZLoader />}
    </View>
  );
}
