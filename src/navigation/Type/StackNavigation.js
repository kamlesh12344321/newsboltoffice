import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  // Auth Stack
  function AuthNavigation() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={StackNav.Register}>
        <Stack.Screen
          name={StackNav.Register}
          component={StackRoute.Register}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.SelectInterest}
          component={StackRoute.SelectInterest}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.SelectLanguage}
          component={StackRoute.SelectLanguage}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.SetPin}
          component={StackRoute.SetPin}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.Birthday}
          component={StackRoute.Birthday}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.Gender}
          component={StackRoute.Gender}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={StackNav.SetUpProfile}
          component={StackRoute.SetUpProfile}
          options={{
            animation: 'none',
          }}
        />
      </Stack.Navigator>
    );
  }

  // Main Stack
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen
        name={StackNav.Splash}
        component={StackRoute.Splash}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.onBoarding}
        component={StackRoute.OnBoarding}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Auth}
        component={AuthNavigation}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.TabBar}
        component={StackRoute.TabBar}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SetPin}
        component={StackRoute.SetPin}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SetUpProfile}
        component={StackRoute.SetUpProfile}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Setting}
        component={StackRoute.Setting}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Report}
        component={StackRoute.Report}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.ManageAccount}
        component={StackRoute.ManageAccount}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.ProfileDetail}
        component={StackRoute.ProfileDetail}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Privacy}
        component={StackRoute.Privacy}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.PrivacyPolicy}
        component={StackRoute.PrivacyPolicy}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.HelpCenter}
        component={StackRoute.HelpCenter}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Security}
        component={StackRoute.Security}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Language}
        component={StackRoute.Language}
        options={{
          animation: 'none',
        }}
      />

      <Stack.Screen
        name={StackNav.TrendingSound}
        component={StackRoute.TrendingSound}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.Search}
        component={StackRoute.Search}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchTop}
        component={StackRoute.SearchTop}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchUser}
        component={StackRoute.SearchUser}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchVideo}
        component={StackRoute.SearchVideo}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchSound}
        component={StackRoute.SearchSound}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchLive}
        component={StackRoute.SearchLive}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.SearchHashtag}
        component={StackRoute.SearchHashtag}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.ReelsComponent}
        component={StackRoute.ReelsComponent}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.FeedBack}
        component={StackRoute.FeedBack}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.UpdateProfile}
        component={StackRoute.UpdateProfile}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNav.ParticularReelComponent}
        component={StackRoute.ParticularReelComponent}
        options={{
          animation: 'none',
        }}
      />
    </Stack.Navigator>
  );
}
