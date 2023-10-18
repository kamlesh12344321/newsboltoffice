// Library import
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Modal from 'react-native-modal';

// Local import
import {styles} from '../../themes';
import {getHeight, moderateScale, screenHeight} from '../../common/constants';
import ZText from '../common/ZText';
import ZInput from '../common/ZInput';
import strings from '../../i18n/strings';
import {GET_COMMENTS, POST_COMMENT} from '../../api/config';
import {getRequestApi, postRequestApi} from '../../api/axios';
import {showPopupWithOk} from '../../utils/helpers';

export default function Comment({isModalOpen, videoId, onCloseModal}) {
  const colors = useSelector(state => state.theme.theme);
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.btnColor1,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const [addChat, setAddChat] = useState('');
  const [chatStyle, setChatStyle] = useState(BlurredStyle);
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height), setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0), setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight, isKeyboardVisible]);

  useEffect(async () => {
    await getComments();
    onFocusInput();
  }, [videoId]);

  const getComments = async () => {
    try {
      const data = await getRequestApi(GET_COMMENTS(videoId));
      if (data?.data?.status) {
        setCommentList(data?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error===>', error);
      showPopupWithOk('Comments Error', strings.someThingWentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  const postComment = async () => {
    try {
      const commentData = {
        comment: addChat,
      };
      console.log('global.userData===>', global.userData);
      setCommentList([
        {
          comment: addChat,
          user_image: global.userData.image,
          user_name: global.userData.name,
          created_at: new Date(),
        },
        ...commentList,
      ]);
      const data = await postRequestApi(POST_COMMENT(videoId), commentData);
      if (data?.data?.status) {
        setAddChat('');
      }
    } catch (error) {
      showPopupWithOk('comment Error', strings.someThingWentWrong);
    }
  };

  const onFocusInput = () => setChatStyle(FocusedStyle);

  const onBlurInput = () => setChatStyle(BlurredStyle);

  const onchangeComment = text => setAddChat(text);

  const renderEmptyList = () => {
    return (
      <View style={localStyles.emptyContainer}>
        <ZText type="b18" align={'center'}>
          {strings.noComments}
        </ZText>
      </View>
    );
  };

  console.log('commentList===>', isKeyboardVisible, keyboardHeight);

  const commentRender = ({item}) => {
    return (
      <View style={styles.mh20}>
        <View style={localStyles.profileContainer}>
          <View style={styles.rowCenter}>
            <Image
              source={{
                uri: item?.user_image,
              }}
              style={localStyles.userImage}
            />
            <ZText type="b16" numberOfLines={1} align={'center'}>
              {item?.user_name}
            </ZText>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={moderateScale(30)}
              color={colors.textColor}
            />
          </TouchableOpacity>
        </View>
        <ZText type="r14" style={styles.mv10} numberOfLines={2}>
          {item?.comment}
        </ZText>
        <View style={localStyles.likeContainer}>
          <ZText type="r14">{moment(item?.created_at).format('L')}</ZText>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      avoidKeyboard
      style={{
        margin: 0,
      }}>
      <View style={localStyles.mainContainer}>
        <TouchableOpacity
          style={localStyles.closeArea}
          onPress={onCloseModal}
        />
        <View
          style={[
            localStyles.insideContainer,
            {
              backgroundColor: colors.backgroundColor,
              height: isKeyboardVisible
                ? screenHeight - keyboardHeight
                : screenHeight - getHeight(100),
            },
          ]}>
          <View style={styles.flex}>
            <View
              style={[
                localStyles.headerContainer,
                {
                  borderBottomColor: colors.bColor,
                },
              ]}>
              <ZText type="b24" align={'center'} style={styles.mv20}>
                {strings.comments}
              </ZText>
            </View>
            {!isLoading ? (
              <FlatList
                data={commentList}
                renderItem={commentRender}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={localStyles.flatListContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
                estimatedItemSize={10}
                ListEmptyComponent={renderEmptyList}
              />
            ) : (
              <View style={localStyles.emptyContainer}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            )}
          </View>

          <View style={[styles.rowCenter, styles.mb20]}>
            <ZInput
              placeHolder={strings.addComment}
              keyBoardType={'default'}
              _value={addChat}
              autoCapitalize={'none'}
              toGetTextFieldValue={onchangeComment}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                chatStyle,
              ]}
              _onFocus={onFocusInput}
              onBlur={onBlurInput}
            />
            <TouchableOpacity
              onPress={postComment}
              style={[
                localStyles.sendBtn,
                {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Feather
                name={'send'}
                size={moderateScale(24)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.p20,
    height: '80%',
  },
  headerContainer: {
    ...styles.pb5,
    ...styles.mb5,
    borderBottomWidth: 1,
  },
  profileContainer: {
    ...styles.mt20,
    ...styles.rowSpaceBetween,
  },
  userImage: {
    height: moderateScale(44),
    width: moderateScale(44),
    borderRadius: moderateScale(22),
    ...styles.mr10,
  },
  likeContainer: {
    ...styles.mt5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  flatListContainer: {
    ...styles.flexGrow,
    ...styles.pb30,
  },
  senderContainer: {
    ...styles.p15,
    ...styles.flexRow,
    borderRadius: moderateScale(12),
    maxWidth: '80%',
    ...styles.itemsEnd,
    ...styles.mt10,
  },
  inputContainerStyle: {
    height: moderateScale(60),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    ...styles.ph15,
    width: moderateScale(300),
  },
  sendBtn: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    ...styles.rowCenter,
    ...styles.ml10,
  },
  emptyContainer: {
    ...styles.mt40,
    ...styles.center,
  },
  mainContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    height: '100%',
    // maxHeight: screenHeight - getHeight(100),
  },
  closeArea: {
    flex: 1,
    minHeight: getHeight(100),
  },
  insideContainer: {
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    height: screenHeight - getHeight(150),
  },
});
