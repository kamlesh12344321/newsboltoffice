// Library import
import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Local import
import {TabRoute} from '../NavigationRoutes';
import {TabNav} from '../NavigationKeys';
import {checkPlatform} from '../../utils/helpers';
import {getHeight, moderateScale} from '../../common/constants';
import ZText from '../../components/common/ZText';
import strings from '../../i18n/strings';
import {
  Discover_Dark,
  Discover_Light,
  Home_Dark,
  Home_Light,
  Inbox_Dark,
  Inbox_Light,
  NotificationDark,
  NotificationLight,
  Profile_Dark,
  Profile_Light,
} from '../../assets/svgs';
import {styles} from '../../themes';

export default function TabBarNavigation({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();

  const iconHeight = moderateScale(24);
  const iconWidth = moderateScale(24);

  const TabText = ({text, focused, icon}) => (
    <View style={localStyles.tabViewContainer}>
      {icon}
      {!!text && (
        <ZText
          type={focused ? 'b14' : 'm14'}
          numberOfLines={1}
          style={styles.mt5}
          color={focused ? colors.primary : colors.grayScale5}>
          {text}
        </ZText>
      )}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          localStyles.tabBarStyle,
          {
            backgroundColor: colors.backgroundColor,
          },
        ],
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.Home}>
      <Tab.Screen
        name={TabNav.Home}
        component={TabRoute.Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.home}
              focused={focused}
              icon={
                focused ? (
                  <Home_Dark height={iconHeight} width={iconWidth} />
                ) : (
                  <Home_Light height={iconHeight} width={iconWidth} />
                )
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Discover}
        component={TabRoute.Discover}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.discover}
              focused={focused}
              icon={
                focused ? (
                  <Discover_Dark height={iconHeight} width={iconWidth} />
                ) : (
                  <Discover_Light height={iconHeight} width={iconWidth} />
                )
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Notification}
        component={TabRoute.Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.notification}
              focused={focused}
              icon={
                focused ? (
                  <NotificationDark height={iconHeight} width={iconWidth} />
                ) : (
                  <NotificationLight height={iconHeight} width={iconWidth} />
                )
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Following}
        component={TabRoute.FollowingTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.following}
              focused={focused}
              icon={
                focused ? (
                  <Inbox_Dark height={iconHeight} width={iconWidth} />
                ) : (
                  <Inbox_Light height={iconHeight} width={iconWidth} />
                )
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Profile}
        component={TabRoute.Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.profile}
              focused={focused}
              icon={
                focused ? (
                  <Profile_Dark height={iconHeight} width={iconWidth} />
                ) : (
                  <Profile_Light height={iconHeight} width={iconWidth} />
                )
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyles = StyleSheet.create({
  tabBarStyle: {
    height: checkPlatform() === 'ios' ? getHeight(100) : getHeight(70),
    paddingHorizontal: moderateScale(10),
  },
  tabViewContainer: {
    ...styles.center,
  },
});
