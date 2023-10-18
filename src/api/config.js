export const app_config = {
  google_scope: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '335454022514-t5d87u9kmpfg4fu3puomhk7lvln6hgsq.apps.googleusercontent.com',
  API_URL: 'https://shorts.newsdx.io/ci/tikto/public',
  BASEURL: 'https://bolt-api.newsdx.io',

  SENDEMAILOTP: BASEURL + '/send-email-otp',
};

export const BASEURL = 'https://shorts.newsdx.io/ci/newsbolt-v2/public';
export const GET_CONFIG = BASEURL + '/get-config';
export const SENDEMAILOTP = BASEURL + '/send-email-otp';
export const VERIFYOTP = BASEURL + '/verify-email-otp';
export const GETLANGUAGE = BASEURL + '/languages';
export const GETCATEGORIES = id => BASEURL + '/categories?languages=' + `${id}`;
export const UPDATEPROFILE = BASEURL + '/update-profile';
export const GET_PROFILE = BASEURL + '/my-profile';
export const DELETE_ACC = BASEURL + '/delete-profile';

export const GET_CHANNEL_DETAIL = id => BASEURL + '/channel-info/' + `${id}`;
export const GET_VIDEO_INFO = id => BASEURL + '/video-info/' + `${id}`;

export const GETVIDEOS = page =>
  BASEURL + '/videos?languages=1,2,4,5,6,7,8,99&page=' + `${page}`;

export const FLAG_VIDEO = (video_id, flagId) =>
  BASEURL + '/flag-video/' + `${video_id}` + '?flagId=' + `${flagId}`;

export const LIKE_VIDEO = video_id =>
  BASEURL + '/like-unlike-video/' + `${video_id}`;
export const SHARE_VIDEO = video_id =>
  BASEURL + '/share-video-count/' + `${video_id}`;
export const BOOKMARK_VIDEO = video_id =>
  BASEURL + '/bookmark-video/' + `${video_id}`;

export const DISCOVER = page => BASEURL + '/channels?page=' + `${page}`;
export const SEARCH_CHANNEL = params =>
  BASEURL + '/channels?search=' + `${params}`;
export const GET_CHANNEL_VIDEOS = (id, page) => {
  return (
    BASEURL +
    '/videos?page=' +
    `${page}` +
    '&perPage=20' +
    '&channel=' +
    `${id}`
  );
};

export const FOLLOW_CHANNEL = id =>
  BASEURL + '/follow-unfollow-channel/' + `${id}`;

export const GET_COMMENTS = id => BASEURL + '/get-comments/' + `${id}`;
export const POST_COMMENT = id => BASEURL + '/comment-video/' + `${id}`;

export const GET_BOOKMARKS_VIDEO = page =>
  BASEURL + '/my-bookmarks?page=' + `${page}`;
export const GET_LIKED_VIDEO = page =>
  BASEURL + '/my-favorites?page=' + `${page}`;

export const GET_FOLLOWING = page => BASEURL + '/my-channels?page=' + `${page}`;
export const SEARCH_FOLLOWING = params =>
  BASEURL + '/my-channels?search=' + `${params}`;
export const FEEDBACK = BASEURL + '/submit-feedback';
