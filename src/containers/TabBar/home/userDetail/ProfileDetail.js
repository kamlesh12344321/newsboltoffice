// Library import
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

// Local import
import ZSafeAreaView from '../../../../components/common/ZSafeAreaView';
import ZHeader from '../../../../components/common/ZHeader';
import {getHeight, moderateScale} from '../../../../common/constants';
import {commonColor, styles} from '../../../../themes';
import ZText from '../../../../components/common/ZText';
import ZButton from '../../../../components/common/ZButton';
import ReelComponent from '../../../../components/ReelComponent';
import {ShareDarkIcon, ShareIcon} from '../../../../assets/svgs';
import {getRequestApi} from '../../../../api/axios';
import {showPopupWithOk} from '../../../../utils/helpers';
import {
  FOLLOW_CHANNEL,
  GET_CHANNEL_DETAIL,
  GET_CHANNEL_VIDEOS,
} from '../../../../api/config';
import ZLoader from '../../../../components/common/ZLoader';
import images from '../../../../assets/images';
import strings from '../../../../i18n/strings';

export default function ProfileDetail({route}) {
  const channelId = route.params?.channelId;
  const colors = useSelector(state => state.theme.theme);
  const [isFollow, setIsFollow] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [channelData, setChannelData] = useState({});
  const [channelVideo, setChannelVideo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const iconHeight = moderateScale(28);
  const iconWidth = moderateScale(28);

  const UserDetailCategory = [
    {
      title: strings.post,
      value: channelData?.views ? channelData?.views : 'N/A',
    },
    {
      title: strings.followers,
      value: channelData?.follows ? channelData?.follows : 'N/A',
    },
    {
      title: strings.following,
      value: channelData?.following ? channelData?.following : 'N/A',
    },
    {
      title: strings.like,
      value: channelData?.likes ? channelData?.likes : 'N/A',
    },
  ];

  useEffect(() => {
    getChannelDetail();
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchPaginatedData(page);
    }
  }, [page]);

  const getChannelDetail = async () => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(GET_CHANNEL_DETAIL(channelId));
      if (response.data.status) {
        setChannelData(response?.data?.data);
        setIsFollow(response?.data?.data?.following);
        await getChannelVideo(1);
      } else {
        showPopupWithOk('Error', strings.someThingWentWrong);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const onPressFollow = async () => {
    try {
      const data = await getRequestApi(FOLLOW_CHANNEL(channelData?.channel_id));
      if (data?.data?.status) {
        setIsFollow(data?.data?.data?.following);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    }
  };

  const getChannelVideo = async page => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(GET_CHANNEL_VIDEOS(channelId, page));
      if (response?.data?.status) {
        setChannelVideo(response?.data?.data);
        setTotalPage(response?.data?.total);
      } else {
        showPopupWithOk('Error', response?.data?.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const fetchPaginatedData = async page => {
    setIsLoader(true);
    try {
      const response = await getRequestApi(GET_CHANNEL_VIDEOS(channelId, page));
      if (response?.data?.status) {
        setChannelVideo([...channelVideo, ...response?.data?.data]);
      } else {
        showPopupWithOk('Error', response?.data?.msg);
      }
    } catch (error) {
      showPopupWithOk('Error', strings.someThingWentWrong);
    } finally {
      setIsLoader(false);
    }
  };

  const fetchMoreData = () => {
    if (totalPage > page) {
      setPage(page + 1);
    }
  };

  const RenderUserDetail = ({item}) => {
    return (
      <View style={styles.itemsCenter}>
        <ZText type="b24" align={'center'}>
          {item.value}
        </ZText>
        <ZText type="m16" align={'center'} style={styles.mt10}>
          {item.title}
        </ZText>
      </View>
    );
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? (
          <ShareIcon height={iconHeight} width={iconWidth} />
        ) : (
          <ShareDarkIcon height={iconHeight} width={iconWidth} />
        )}
      </TouchableOpacity>
    );
  };

  const renderHeaderFlatList = () => {
    return (
      <View style={localStyles.root}>
        <View style={localStyles.topContainer}>
          {!!channelData?.channel_image ? (
            <Image
              source={{
                uri: channelData?.channel_image,
              }}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )}
          <View style={[styles.flex, styles.ml20]}>
            <ZText type={'B24'} numberOfLines={2}>
              {channelData?.channelTitle}
            </ZText>
            <ZText type={'m14'} numberOfLines={1} style={styles.mt20}>
              {'28,7M Videos'}
            </ZText>
          </View>
        </View>
        <View style={[styles.flexRow, styles.justifyEvenly]}>
          {UserDetailCategory.map((item, index) => (
            <RenderUserDetail item={item} key={index} />
          ))}
        </View>
        <ZButton
          title={isFollow ? 'Following' : 'Follow'}
          onPress={onPressFollow}
          color={colors.white}
          textType="b16"
          style={styles.ml5}
          containerStyle={[
            localStyles.buttonContainer,
            {borderColor: colors.primary},
          ]}
          bgColor={colors.primary}
        />
        <View style={localStyles.mainContainer} />
      </View>
    );
  };

  const renderChannelVideo = ({item, index}) => (
    <ReelComponent
      item={item}
      data={channelVideo}
      reelUrl={item?.thumbnail}
      isPlay={true}
      index={index}
    />
  );

  return (
    <ZSafeAreaView>
      <ZHeader rightIcon={<RightIcon />} />
      <FlatList
        data={channelVideo}
        renderItem={renderChannelVideo}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.mh20, styles.pb20]}
        ListHeaderComponent={renderHeaderFlatList}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
      />
      {isLoader && <ZLoader />}
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.mb20,
  },
  headerContainer: {
    ...styles.flex,
    ...styles.flexRow,
    ...styles.alignCenter,
    ...styles.justifyBetween,
    ...styles.mt20,
  },
  userImage: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(24),
    resizeMode: 'cover',
  },
  editProfileContainer: {
    ...styles.flexRow,
    ...styles.justifyEvenly,
    ...styles.mt25,
  },
  buttonContainer: {
    ...styles.ph15,
    height: getHeight(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    width: '100%',
    ...styles.mt20,
  },
  mainContainer: {
    width: '100%',
    ...styles.mt20,
    height: moderateScale(2),
    backgroundColor: commonColor.borderColor,
  },
  tabItemStyle: {
    borderBottomWidth: moderateScale(2),
    width: '33%',
    ...styles.itemsCenter,
    ...styles.pv15,
  },
  topContainer: {
    ...styles.rowStart,
    ...styles.itemsCenter,
    ...styles.mv20,
  },
});
