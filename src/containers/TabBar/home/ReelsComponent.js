// Libraries import
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

// Local import
import {commonColor, styles} from '../../../themes';
import {
  isAndroid,
  moderateScale,
  screenFullHeight,
} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {StackNav} from '../../../navigation/NavigationKeys';
import Comment from '../../../components/models/Comment';
import {getRequestApi} from '../../../api/axios';
import {
  CommentIcon,
  FlagIcon,
  LikeIcon,
  LinkIcon,
  SaveIcon,
  ShareIcon,
  UnLikeIcon,
  UnSaveIcon,
} from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import {
  BASEURL,
  BOOKMARK_VIDEO,
  FOLLOW_CHANNEL,
  GET_VIDEO_INFO,
  LIKE_VIDEO,
  SHARE_VIDEO,
} from '../../../api/config';
import ZLoader from '../../../components/common/ZLoader';
import {showPopupWithOk} from '../../../utils/helpers';

export default function ReelsComponent() {
  const colors = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [videoPlay, setVideoPlay] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [extraData, setExtraData] = useState(true);
  const [reelsData, setReelsData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [channelData, setChannelData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconsStyle = moderateScale(32);

  useEffect(() => {
    setExtraData(!extraData);
  }, [
    videoPlay,
    activeVideoIndex,
    isFocused,
    videoId,
    channelData,
    channelData?.id,
  ]);

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    getChannelApi(videoId);
  }, [videoId]);

  useEffect(() => {
    if (page > 1) {
      fetchPaginatedData(page);
    }
  }, [page]);

  const fetchData = async pageNum => {
    setIsLoader(true);
    try {
      const data = await getRequestApi(
        BASEURL +
          '/videos?languages=' +
          `${global.selectedLanguage}` +
          '&page=' +
          `${pageNum}`,
      );
      setTotalPage(data?.data?.total);
      setReelsData(data?.data?.data);
    } catch (e) {
      console.log('Error', e);
    } finally {
      setIsLoader(false);
    }
  };

  const fetchPaginatedData = async pageNum => {
    setIsLoader(true);
    try {
      const data = await getRequestApi(
        BASEURL +
          '/videos?languages=' +
          `${global.selectedLanguage}` +
          '&page=' +
          `${pageNum}`,
      );
      setTotalPage(data?.total);
      setReelsData([...reelsData, ...data.data]);
    } catch (e) {
      console.log('Error', e);
    } finally {
      setIsLoader(false);
    }
  };

  const getChannelApi = async id => {
    try {
      const data = await getRequestApi(GET_VIDEO_INFO(id));
      const index = reelsData.findIndex(item => item.id === id);
      if (index !== -1) {
        reelsData[index] = data?.data?.data;
        setReelsData([...reelsData]);
      }
      setChannelData(data?.data?.data);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onPressReport = id =>
    navigation.navigate(StackNav.Report, {
      channelId: id,
    });

  const onPressFollow = async (chanelId, videoId) => {
    try {
      const data = await getRequestApi(FOLLOW_CHANNEL(chanelId));
      if (data?.data?.status) {
        const index = reelsData.findIndex(item => item.id === videoId);
        if (index !== -1) {
          reelsData[index].following = data?.data?.data?.following;
          setReelsData([...reelsData]);
        }
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    }
  };

  const onPressProfile = id =>
    navigation.navigate(StackNav.ProfileDetail, {
      channelId: id,
    });

  const videoError = error => console.log('videoError', error);

  const onPressPause = () => setVideoPlay(!videoPlay);

  const onPressLike = async id => {
    try {
      const data = await getRequestApi(LIKE_VIDEO(id));
      if (data?.data?.status) {
        const index = reelsData.findIndex(item => item.id === id);
        if (index !== -1) {
          reelsData[index].liked = data?.data?.data.liked;
          reelsData[index].like_count = data?.data?.like_count;
          setReelsData([...reelsData]);
        }
      }
    } catch (error) {
      showPopupWithOk('Like Error', strings.someThingWentWrong);
    }
  };

  const onPressBookmark = async id => {
    try {
      const data = await getRequestApi(BOOKMARK_VIDEO(id));
      if (data?.data?.status) {
        const index = reelsData.findIndex(item => item.id === id);
        if (index !== -1) {
          reelsData[index].saved = data?.data?.data.saved;
          setReelsData([...reelsData]);
        }
      }
    } catch (error) {
      showPopupWithOk('Bookmark Error', strings.someThingWentWrong);
    }
  };

  const onPressShare = async (id, url) => {
    try {
      const data = await getRequestApi(SHARE_VIDEO(id));
      if (data?.data?.status) {
        Share.share({
          message: 'NewsBolt App | ' + url,
        });
      }
    } catch (error) {
      showPopupWithOk('Share Error', strings.someThingWentWrong);
    }
  };

  const onPressComment = () => {
    setIsModalOpen(true);
  };

  const RenderVideoItem = ({icon, onPress, data, size, color}) => {
    return (
      <Pressable onPress={onPress} style={localStyles.renderIconContainer}>
        {icon}
        {!!data && (
          <ZText
            type="m14"
            style={styles.flex}
            color={colors.white}
            numberOfLines={1}>
            {data}
          </ZText>
        )}
      </Pressable>
    );
  };

  const renderReelComponent = ({item, index}) => {
    return (
      <View
        style={{
          height: layoutHeight,
          backgroundColor: colors.darkBg,
        }}>
        <Pressable onPress={onPressPause}>
          {isFocused && (
            <Video
              key={activeVideoIndex === index ? 'active' : 'inactive'}
              source={{uri: item?.video_url}}
              style={[
                localStyles.imageContainer,
                {backgroundColor: colors.darkBg},
              ]}
              poster={item?.thumbnail + '?height=1020'}
              posterResizeMode="cover"
              resizeMode="cover"
              repeat={true}
              onError={videoError}
              seekColor={colors.primary}
              playWhenInactive={false}
              paused={activeVideoIndex !== index || videoPlay}
              playInBackground={false}
            />
          )}

          <View style={localStyles.bottomContainer}>
            <View style={[styles.flex, styles.ml10]}>
              <View style={[styles.flexRow, styles.itemsCenter]}>
                <TouchableOpacity
                  onPress={() => onPressProfile(item?.channel_id)}
                  style={styles.mb10}>
                  <Image
                    resizeMode="cover"
                    source={{uri: item?.channel_image}}
                    style={localStyles.userImage}
                  />
                </TouchableOpacity>
                <View style={[styles.mh10, {maxWidth: '45%'}]}>
                  <ZText
                    onPress={() => onPressProfile(item?.channel_id)}
                    type="b20"
                    numberOfLines={1}
                    color={colors.white}>
                    {item?.channelTitle}
                  </ZText>
                </View>
                <TouchableOpacity
                  onPress={() => onPressFollow(item?.channel_id, item?.id)}
                  style={localStyles.followContainer}>
                  <ZText type="S16" numberOfLines={1} color={colors.white}>
                    {item?.following ? strings.following : strings.follow}
                  </ZText>
                </TouchableOpacity>
              </View>
              <View style={localStyles.descriptionStyle}>
                <ZText type="m14" numberOfLines={2} color={colors.white}>
                  {item?.title}
                </ZText>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(item?.source_url)}
                style={localStyles.musicContainer}>
                <LinkIcon
                  height={moderateScale(22)}
                  width={moderateScale(22)}
                />
                <ZText
                  type="m14"
                  style={[styles.flex, styles.mh10]}
                  color={colors.primary}
                  numberOfLines={1}>
                  {'View Source'}
                </ZText>
              </TouchableOpacity>
            </View>
            <View style={localStyles.verticalContainer}>
              <RenderVideoItem
                icon={<FlagIcon height={iconsStyle} width={iconsStyle} />}
                onPress={() => onPressReport(item?.id)}
              />
              <RenderVideoItem
                icon={
                  item.liked ? (
                    <LikeIcon height={iconsStyle} width={iconsStyle} />
                  ) : (
                    <UnLikeIcon height={iconsStyle} width={iconsStyle} />
                  )
                }
                data={item?.like_count ? item?.like_count : 'Like'}
                color={item.liked ? colors.primary : colors.white}
                onPress={() => onPressLike(item.id)}
              />
              <RenderVideoItem
                icon={<CommentIcon height={iconsStyle} width={iconsStyle} />}
                data={item?.comment_count ? item?.comment_count : 'Comment'}
                onPress={onPressComment}
              />
              <RenderVideoItem
                icon={
                  item?.saved ? (
                    <SaveIcon height={iconsStyle} width={iconsStyle} />
                  ) : (
                    <UnSaveIcon height={iconsStyle} width={iconsStyle} />
                  )
                }
                data={'Save'}
                onPress={() => onPressBookmark(item?.id)}
              />
              <RenderVideoItem
                icon={<ShareIcon height={iconsStyle} width={iconsStyle} />}
                data={'Share'}
                onPress={() => onPressShare(item.id, item.source_url)}
              />
            </View>
          </View>
          <View style={[localStyles.muteIcon, videoPlay && styles.p15]}>
            {videoPlay && (
              <Ionicons
                name="play"
                size={videoPlay ? moderateScale(36) : 0}
                color={colors.white}
              />
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const keyExtractor = useCallback((item, index) => {
    return `item-${item?.id}`;
  }, []);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    if (!!viewableItems?.length) {
      setVideoId(viewableItems[0]?.item?.id);
      setActiveVideoIndex(viewableItems[0].index);
      setVideoPlay(false);
    }
  }).current;

  const onSetLayout = e => setLayoutHeight(e.nativeEvent.layout.height);

  const fetchMoreData = () => {
    if (totalPage > page) {
      setPage(page + 1);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <FlashList
        data={reelsData}
        extraData={extraData}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        renderItem={renderReelComponent}
        pagingEnabled={true}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}
        onLayout={onSetLayout}
        drawDistance={layoutHeight}
        snapToInterval={layoutHeight}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        disableIntervalMomentum={true}
        onEndReached={fetchMoreData}
        estimatedItemSize={!!layoutHeight ? layoutHeight : 300}
      />
      {isModalOpen && (
        <Comment
          isModalOpen
          onCloseModal={() => setIsModalOpen(false)}
          videoId={channelData?.id}
        />
      )}
      {isLoader && <ZLoader />}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  muteIcon: {
    position: 'absolute',
    top: screenFullHeight / 2 - moderateScale(30),
    ...styles.selfCenter,
    borderRadius: moderateScale(100),
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  topHeader: {
    position: 'absolute',
    top: isAndroid ? moderateScale(10) : moderateScale(50),
    left: moderateScale(20),
    right: 0,
    zIndex: 1,
    ...styles.pr10,
    ...styles.pt15,
  },
  headerContainer: {
    position: 'absolute',
    top: moderateScale(50),
    ...styles.ph20,
    ...styles.flex,
    ...styles.rowSpaceBetween,
  },
  headerInnerContainer: {
    ...styles.flex,
    ...styles.rowCenter,
  },
  headerCetegoryItemContainer: {
    ...styles.mh10,
    ...styles.pb15,
    borderBottomWidth: moderateScale(1),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: moderateScale(10),
    ...styles.ph10,
    ...styles.flexRow,
    ...styles.itemsEnd,
  },
  userImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(2),
    borderColor: commonColor.primary,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  musicImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    ...styles.mr25,
  },
  musicIcon1: {
    position: 'absolute',
    width: moderateScale(16),
    height: moderateScale(16),
    left: moderateScale(25),
    bottom: moderateScale(35),
  },
  musicContainer: {
    ...styles.rowCenter,
  },
  descriptionStyle: {
    height: moderateScale(48),
  },
  verticalContainer: {
    ...styles.pl5,
    width: moderateScale(65),
    ...styles.alignCenter,
  },
  renderIconContainer: {
    ...styles.itemsCenter,
    ...styles.mt20,
  },
  followContainer: {
    ...styles.ph15,
    ...styles.pv10,
    ...styles.itemsCenter,
    borderRadius: moderateScale(22),
    backgroundColor: commonColor.primary,
  },
});
