import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';

const renderChips = [
  'Action',
  'Drama',
  'Comedy',
  'Ecchi',
  'Adventure',
  'Mecha',
  'Romance',
  'Fantasy',
  'Horror',
  'Mystery',
  'Psychological',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Thriller',
  'Supernatural',
  'Historical',
  'Music',
  'Game',
  'Harem',
];

const languageChips = [
  'English',
  'Hindi',
  'Bangla',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Punjabi',
  'Gujarati',
  'Odia',
  'Urdu',
];

const editProfileData = [
  {
    title: 'About You',
    data: [
      {
        id: 1,
        icon: 'person-outline',
        type: 'Name',
        value: 'Andrew Ainsley',
      },
      {
        id: 2,
        icon: 'alert-circle-outline',
        type: 'Bio',
        value: 'Designer',
      },
    ],
  },
  {
    title: 'Account Information',
    data: [
      {
        id: 1,
        icon: 'mail-outline',
        type: 'Email',
        value: 'ans@gmail.com',
      },
      {
        id: 2,
        icon: 'calendar-outline',
        type: 'Date of Birth',
        value: '12/27/1995',
        rightIcon: 'calendar-outline',
      },
      {
        id: 3,
        icon: 'trash-outline',
        type: 'Delete Account',
        trash: true,
      },
    ],
  },
];

const manageAccData = [
  {
    title: 'Account Information',
    data: [
      {
        id: 1,
        icon: 'call-outline',
        type: 'Phone Number',
        value: '+1 111 467 378',
      },
      {
        id: 2,
        icon: 'mail-outline',
        type: 'Email',
        value: 'ans@gmail.com',
      },
      {
        id: 3,
        icon: 'calendar-outline',
        type: 'Date of Birth',
        value: '12/27/1995',
        rightIcon: 'calendar-outline',
      },
    ],
  },
  {
    title: 'Account Control',
    data: [
      {
        id: 1,
        icon: 'swap-vertical-outline',
        type: 'Switch to Business Account',
      },
      {
        id: 2,
        icon: 'trash-outline',
        type: 'Delete Account',
        trash: true,
      },
    ],
  },
];

const inboxData = [
  {
    id: 1,
    name: 'Charolette Hanlin',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    follow: 'Follow',
    profileImage: 'https://i.ibb.co/xjLGscf/user1.png',
  },
  {
    id: 2,
    name: 'Annabel Rohan',
    desc: 'Started following you',
    follow: 'Follow Back',
    profileImage: 'https://i.ibb.co/4JhzfZ6/user7.png',
  },
  {
    id: 3,
    name: 'Sanjuanita Ordonez',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: 'https://i.ibb.co/CtJMsKk/user3.png',
  },
  {
    id: 1,
    name: 'Rayford Chenail Hanlin',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    follow: 'Follow',
    profileImage: 'https://i.ibb.co/9psxy8J/user4.png',
  },
  {
    id: 2,
    name: 'Sanjuanita Rohan',
    desc: 'Started following you',
    profileImage: 'https://i.ibb.co/Z2BtDcm/user5.png',
  },
  {
    id: 3,
    name: 'Annabel Ordonez',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    follow: 'Follow Back',
    profileImage: 'https://i.ibb.co/J3q5m54/user6.png',
  },
  {
    id: 1,
    name: 'Charolette Hanlin',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: 'https://i.ibb.co/N2hx6tN/user2.png',
  },
  {
    id: 2,
    name: 'Annabel Rohan',
    desc: 'Started following you',
    profileImage: 'https://i.ibb.co/CtJMsKk/user3.png',
  },
  {
    id: 3,
    name: 'Sanjuanita Ordonez',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    follow: 'Follow Back',
    profileImage: 'https://i.ibb.co/J3q5m54/user6.png',
  },
];

const ProfileSetting = [
  {
    id: 1,
    title: strings.editProfile,
    icon: 'person-outline',
    route: StackNav.EditProfile,
  },
  {
    id: 4,
    title: strings.security,
    icon: 'shield-checkmark-outline',
    route: StackNav.Security,
  },
  {
    id: 5,
    title: strings.language,
    icon: 'options-outline',
    value: 'English(US)',
    route: StackNav.Language,
  },
  {
    id: 4,
    title: 'News Language',
    icon: 'language-outline',
  },
  {
    id: 2,
    title: 'Your Interests',
    icon: 'list-outline',
  },
  {
    id: 6,
    title: strings.darkMode,
    icon: 'contrast-outline',
    rightIcon: 'rightIcon',
  },
  {
    id: 2,
    title: strings.ads,
    icon: 'radio-outline',
  },
  {
    id: 3,
    title: 'FeedBack',
    icon: 'cloud-download-outline',
    route: StackNav.FeedBack,
  },
  {
    id: 7,
    title: strings.helpCenter,
    icon: 'information-circle-outline',
    route: StackNav.HelpCenter,
  },
  {
    id: 7,
    title: strings.termsServices,
    icon: 'newspaper-outline',
  },
  {
    id: 8,
    title: strings.privacyPolicy,
    icon: 'alert-circle-outline',
    route: StackNav.PrivacyPolicy,
  },
];

const helperCategoryData = [
  'General',
  'Account',
  'Payment',
  'Subscription',
  'Others',
];

const helperData = [
  {
    title: 'What is NewsBolt?',
    description:
      'NewsBolt is a streaming service that offers a wide variety of anime titles.',
  },
  {
    title: 'How do I sign up for NewsBolt?',
    description:
      'You can sign up for NewsBolt by downloading the app from the App Store or Google Play Store.',
  },
  {
    title: 'How to remove anime on wishlist?',
    description:
      'You can remove anime on your wishlist by clicking the heart icon on the anime details page.',
  },
  {
    title: 'How do I subscribe to premium?',
    description:
      'You can subscribe to premium by clicking the premium button on the home page.',
  },
  {
    title: 'How do I can download anime?',
    description:
      'You can download anime by clicking the download icon on the anime details page.',
  },
  {
    title: 'How to unsubscribe from premium?',
    description:
      'You can unsubscribe from premium by clicking the premium button on the home page.',
  },
];

const contactUsData = [
  {
    id: 1,
    title: 'Contact Us',
    icon: 'headset',
  },
  {
    id: 2,
    title: 'WhatsApp',
    icon: 'whatsapp',
  },
  {
    id: 3,
    title: 'Website',
    icon: 'google-earth',
  },
  {
    id: 4,
    title: 'Facebook',
    icon: 'facebook',
  },
  {
    id: 5,
    title: 'Instagram',
    icon: 'instagram',
  },
  {
    id: 6,
    title: 'Twitter',
    icon: 'twitter',
  },
];

const languageData = [
  {
    title: 'Suggested',
    data: [{lnName: 'English(US)'}, {lnName: 'English(UK)'}],
  },
  {
    title: 'Language',
    data: [
      {
        lnName: 'English',
      },
      {
        lnName: 'Spanish',
      },
      {
        lnName: 'French',
      },
      {
        lnName: 'German',
      },
      {
        lnName: 'Italian',
      },
      {
        lnName: 'Portuguese',
      },
      {
        lnName: 'Russian',
      },
      {
        lnName: 'Turkish',
      },
      {
        lnName: 'Chinese',
      },
      {
        lnName: 'Japanese',
      },
      {
        lnName: 'Korean',
      },
      {
        lnName: 'Arabic',
      },
      {
        lnName: 'Hindi',
      },
      {
        lnName: 'Indonesian',
      },
      {
        lnName: 'Malay',
      },
      {
        lnName: 'Thai',
      },
    ],
  },
];

const reportData = [
  {
    lnName: 'Dangerous organizations/individuals',
  },
  {
    lnName: 'Frauds & Scams',
  },
  {
    lnName: 'Misleading Information',
  },
  {
    lnName: 'Illegal activities or regulated goods',
  },
  {
    lnName: 'Violent & graphic contents',
  },
  {
    lnName: 'Animal Cruelty',
  },
  {
    lnName: 'Pornography & nudity',
  },
  {
    lnName: 'Hate Speech',
  },
  {
    lnName: 'Harrashment or bullying',
  },
  {
    lnName: 'Intelectual property infringement',
  },
  {
    lnName: 'Spam',
  },
  {
    lnName: 'Minor Safety',
  },
  {
    lnName: 'Other',
  },
];

const privacyPolicyData = [
  {
    title: strings.privacyPolicy1,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
];

const videoData = [
  {
    id: 1,
    channelName: 'Rashmika_Mandanna',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/d86ffeb68574a00ed1063ee4483d09cd/manifest/video.m3u8',
    caption:
      'Rashmika Mandanna is an Indian actress and model who works in Telugu and Kannada films. She made her acting debut in the Kannada film Cheluvi (2011).',
    musicName: 'Song #1',
    likes: '10.2M',
    comments: '284K',

    bookmark: '120K',
    share: '1.2M',
    categoty: 'Entertainment',
    avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    poster:
      'https://user-images.githubusercontent.com/129170600/231969719-2cd83643-5b10-4d41-98c5-d0c0d939bfd7.jpg',
    views: '21.2M',
  },
  {
    id: 2,
    channelName: 'zuzu_fan',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/b991ac434bd250c5326c01acc981a4b4/manifest/video.m3u8',
    caption: '#cute #girls #NewsBolt #NewsBoltapp #NewsBoltfan #NewsBoltfans',
    musicName: 'Song #2',
    likes: '24K',
    comments: '122',
    bookmark: '1K',
    share: '1.2K',
    categoty: 'Sports & Gaming',
    avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    poster:
      'https://user-images.githubusercontent.com/129170600/231969791-ef979955-921b-4773-8971-7c03c1ba9edf.jpeg',
    views: '2.2M',
  },
  {
    id: 3,
    channelName: 'katrinakaif',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/0028bd61768856ae0476befa62b24ce3/manifest/video.m3u8',
    caption: 'kat hot dance #katrinakaif #dance #hot #sexy #bollywood #india',
    musicName: 'Song #3',
    likes: '31k',
    comments: '801',
    bookmark: '1.2K',
    share: '110',
    categoty: 'News & Politics',
    avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
    poster:
      'https://user-images.githubusercontent.com/129170600/231969855-618e8d6b-e3dd-4db3-8836-f361b3ee5832.jpg',
    views: '220K',
  },
  {
    id: 4,
    channelName: 'zesu__123',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/090113471ea4ad6c52c74335e8fdf661/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231969921-72e1dcb1-4af6-41b9-a824-3e6b9213e872.jpeg',
    caption:
      'Zesu...... #hot #hollywood #sexy #girls #NewsBolt #NewsBoltapp #NewsBoltfan #NewsBoltfans',
    musicName: 'Song #4',
    likes: '432K',
    comments: '284',
    bookmark: '12K',
    share: '13K',
    categoty: 'Style & Fashion',
    avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    views: '510K',
  },
  {
    id: 5,
    channelName: 'NewsBolt_fan',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/a529d362e4eb67f10847c2ce32cf4d8b/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231969994-09ab3ca2-90c7-484e-bf91-1208f3d47ff0.jpeg',
    caption: 'Hotty and cute #NewsBolt #NewsBoltapp #NewsBoltfan #NewsBoltfans',
    musicName: 'Song #5',
    likes: '241K',
    comments: '12K',

    bookmark: '2.3K',
    share: '145',
    categoty: 'Nature & Travel',
    avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    views: '7.8M',
  },
  {
    id: 6,
    channelName: 'anushkasharma',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/425ecaacbf07edf66533e5cb7dadd94c/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231970010-773f30db-3977-4276-a8dc-7882b54a111d.jpeg',
    caption: 'Feel the love in the air #anushkasharma #india #bollywood #hot',
    musicName: 'Song #6',
    likes: '310K',
    comments: '81K',

    bookmark: '10K',
    share: '88K',
    categoty: 'Nature & Travel',
    avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
    views: '345K',
  },
  {
    id: 7,
    channelName: 'ayodhya_wale',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/143838329f4e2f3a77463637da7a0b23/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231970027-0ee9b05e-52a6-4e77-81ae-5f38af8bf1f4.jpeg',
    caption: 'ram navmi #ramnavmi #ayodhya #ram #ramayana #ramayan #ramji',
    musicName: 'Song #7',
    likes: '321K',
    comments: '28K',

    bookmark: '120K',
    share: '111.2K',
    categoty: 'God & Religion',
    avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    views: '670K',
  },
  {
    id: 8,
    channelName: 'shiddat_ka_safar',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/b1d59f1d9a40412ebe871f8de9941d2b/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231970045-6a572624-0653-4cfa-a3e4-516daf00f23c.jpeg',
    caption:
      'Love some one #love #Shiddat #NewsBolt #NewsBoltapp #NewsBoltfan #NewsBoltfans',
    musicName: 'Song #8',
    likes: '241k',
    comments: '15k',

    bookmark: '1.5K',
    share: '1.2K',
    categoty: 'Film & Animation',
    avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    views: '622K',
  },
  {
    id: 9,
    channelName: 'mahakal_bhakt',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/a4397be2bff9224cf5b553db1c9787e2/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231970060-9ed373d9-bc3f-4f35-a7cb-29c01b69b792.jpeg',
    caption: 'Har har mahadev #mahakal #mahadev #shiv #shivji #shivji #shivji',
    musicName: 'Song #9',
    likes: '782K',
    comments: '80K',

    bookmark: '1.2K',
    share: '2.5K',
    categoty: 'God & Religion',
    avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
    views: '1.4M',
  },
  {
    id: 10,
    channelName: 'gujju_smile',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/94e062c5d48fbb9c2b1074e7b98cee1f/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231970075-8cdf2e42-c345-4a58-83be-5bc4fb9f2376.jpeg',
    caption:
      'Gujju smile #gujju #gujarat #gujarati #gujaratis #gujaratis #gujaratis',
    musicName: 'Song #10',
    likes: '4321',
    comments: '2841',

    bookmark: '12K',
    share: '13K',
    categoty: 'music & Dance',
    avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    views: '110K',
  },
  {
    id: 11,
    channelName: 'nughty_meme',
    uri: 'https://customer-qso4i6nl9bcqxas6.cloudflarestream.com/2716ae9ced1cb8ec00ad25a5eae90ad3/manifest/video.m3u8',
    poster:
      'https://user-images.githubusercontent.com/129170600/231972475-a35385a3-7584-443d-843b-75104af589f6.jpeg',
    caption: 'Nora Fatehi #meme #nughty #nughty_meme #nughty_meme',
    musicName: 'Song #11',
    likes: '321K',
    comments: '28K',

    bookmark: '120K',
    share: '111.2K',
    categoty: 'Film & Animation',
    avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    views: '1.7M',
  },
];

const soundTrendingData = [
  {
    id: 1,
    title: 'Favorite Girl',
    artist: 'Justin Bieber',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:20',
    totalViews: '240M',
    artistUrl: 'https://picsum.photos/200/300',
    artistDesc: 'Justin Drew Bieber is a Canadian singer and songwriter.',
  },
  {
    id: 2,
    title: 'Despacito',
    artist: 'Luis Fonsi',
    imgUrl: 'https://picsum.photos/200/300',
    time: '2:45',
    totalViews: '1.3B',
    artistUrl: 'https://picsum.photos/200/300',
    artistDesc:
      'Luis Fonsi is a Puerto Rican singer, songwriter, actor, and record producer.',
  },
];

const searchVideoData = [
  {
    id: 1,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '1.2M',
    userName: 'Sophie Brown',
  },
  {
    id: 2,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '600K',
    userName: 'Miles Davis',
  },
  {
    id: 3,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '1M',
    userName: 'Olivia White',
  },
  {
    id: 4,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '1.2M',
    userName: 'Nathan Parker',
  },
  {
    id: 5,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '100K',
    userName: 'Avery Martinez',
  },
  {
    id: 6,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '635K',
    userName: 'Gabriella Foster',
  },
  {
    id: 7,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '11M',
    userName: 'Benjamin James',
  },
  {
    id: 8,
    reelImgUrl: 'https://picsum.photos/200/300',
    views: '2M',
    userName: 'Aria Lopez',
  },
];

const searchMusicData = [
  {
    id: 1,
    title: 'Favorite Girl',
    artist: 'Justin Bieber',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:20',
    totalViews: '240M',
    artistUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'Beautiful Day',
    artist: 'U2',
    imgUrl: 'https://picsum.photos/200/300',
    time: '4:10',
    totalViews: '150M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 3,
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    imgUrl: 'https://picsum.photos/200/300',
    time: '4:50',
    totalViews: '300M',
    artistUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    title: 'Cant Stop the Feeling!',
    artist: 'Justin Timberlake',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:56',
    totalViews: '500M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 5,
    title: 'Chasing Pavements',
    artist: 'Adele',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:31',
    totalViews: '120M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 6,
    title: 'Clocks',
    artist: 'Coldplay',
    imgUrl: 'https://picsum.photos/200/300',
    time: '5:07',
    totalViews: '400M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 7,
    title: 'Sorry',
    artist: 'Halsey',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:39',
    totalViews: '250M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 8,
    title: 'Back to You',
    artist: 'Louis Tomlinson',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:11',
    totalViews: '80M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 9,
    title: 'Roar',
    artist: 'Katy Perry',
    imgUrl: 'https://picsum.photos/200/300',
    time: '4:30',
    totalViews: '600M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 10,
    title: 'Dancing Queen',
    artist: 'ABBA',
    imgUrl: 'https://picsum.photos/200/300',
    time: '3:51',
    totalViews: '900M',
    artistUrl: 'https://picsum.photos/200/300',
  },

  {
    id: 11,
    title: 'Stay',
    artist: 'Rihanna',
    imgUrl: 'https://picsum.photos/200/300',
    time: '4:00',
    totalViews: '200M',
    artistUrl: 'https://picsum.photos/200/300',
  },
];

const userDetail = [
  {
    name: 'Dracel Steward',
    description: 'arianacooper | 24.5M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    isFollow: false,
  },
  {
    name: 'John Doe',
    description: 'johndoe | 10M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: true,
  },
  {
    name: 'Jane Smith',
    description: 'janesmith | 5M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHVzZXIlMjBwcm9maWxlJTIwd2l0aCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: true,
  },
  {
    name: 'Bob Johnson',
    description: 'bobjohnson | 2M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    isFollow: false,
  },
  {
    name: 'Sara Wilson',
    description: 'sarawilson | 1M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: false,
  },
  {
    name: 'Tom Wilson',
    description: 'tomwilson | 500K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: true,
  },
  {
    name: 'Alice Brown',
    description: 'alicebrown | 250K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: true,
  },
  {
    name: 'Emily Davis',
    description: 'emilydavis | 100K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: false,
  },
  {
    name: 'Mark Lee',
    description: 'marklee | 50K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: false,
  },
  {
    name: 'Laura Lee',
    description: 'lauralee | 10K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1610737241336-371badac3b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isFollow: true,
  },
];
const hashtagDetail = [
  {
    id: 1,
    views: '1.2M',
    title: 'amazingfood',
  },
  {
    id: 2,
    views: '800K',
    title: 'delicious desserts',
  },
  {
    id: 3,
    views: '2.5M',
    title: 'tasty seafood',
  },
  {
    id: 4,
    views: '600K',
    title: 'vegan delights',
  },
  {
    id: 5,
    views: '1.8M',
    title: 'juicy burgers',
  },
  {
    id: 6,
    views: '1.1M',
    title: 'ethnic cuisine',
  },
  {
    id: 7,
    views: '4.2M',
    title: 'chef specials',
  },
  {
    id: 8,
    views: '900K',
    title: 'farm-to-table',
  },
  {
    id: 9,
    views: '3.6M',
    title: 'gourmet pizza',
  },
  {
    id: 10,
    views: '1.5M',
    title: 'hearty soups',
  },
  {
    id: 11,
    views: '2.2M',
    title: 'spicy wings',
  },
  {
    id: 12,
    views: '500K',
    title: 'breakfast classics',
  },
  {
    id: 13,
    views: '1.9M',
    title: 'dessert first',
  },
];

const searchCategoryData = [
  {
    id: 0,
    title: strings.top,
  },
  {
    id: 1,
    title: strings.user,
  },
  {
    id: 2,
    title: strings.video,
  },
  {
    id: 3,
    title: strings.sounds,
  },
  {
    id: 4,
    title: strings.live,
  },
  {
    id: 5,
    title: strings.hashtag,
  },
];

const UserDetailCategory = [
  {
    title: strings.post,
    value: '247',
  },
  {
    title: strings.followers,
    value: '368K',
  },
  {
    title: strings.following,
    value: '374',
  },
  {
    title: strings.like,
    value: '3.7M',
  },
];

const commentData = [
  {
    name: 'Dracel Steward',
    description: 'What is your favorite fruit?',
    imgUrl:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    commentLike: '1.1K',
  },
  {
    name: 'John Doe',
    description: 'Do you have any pet peeves?',
    imgUrl:
      'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '974',
  },
  {
    name: 'Jane Smith',
    description: 'What is your favorite color?',
    imgUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHVzZXIlMjBwcm9maWxlJTIwd2l0aCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '664',
  },
  {
    name: 'Bob Johnson',
    description: 'What is your favorite movie?',
    imgUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    commentLike: '76',
  },
  {
    name: 'Sara Wilson',
    description: 'What is your favorite food?',
    imgUrl:
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '24',
  },
  {
    name: 'Tom Wilson',
    description: 'How do you like your coffee?',
    imgUrl:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '147',
  },
  {
    name: 'Alice Brown',
    description: 'is it cold where you are?',
    imgUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '54',
  },
  {
    name: 'Emily Davis',
    description: 'How the weather today?',
    imgUrl:
      'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '46',
  },
  {
    name: 'Mark Lee',
    description: 'the weather is so nice today',
    imgUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '456',
  },
  {
    name: 'Laura Lee',
    description: 'what is your favorite season?',
    imgUrl:
      'https://images.unsplash.com/photo-1610737241336-371badac3b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    commentLike: '54',
  },
];

export {
  renderChips,
  ProfileSetting,
  helperCategoryData,
  helperData,
  contactUsData,
  languageData,
  privacyPolicyData,
  editProfileData,
  inboxData,
  videoData,
  reportData,
  manageAccData,
  soundTrendingData,
  userDetail,
  searchVideoData,
  searchMusicData,
  hashtagDetail,
  searchCategoryData,
  UserDetailCategory,
  commentData,
  languageChips,
};
