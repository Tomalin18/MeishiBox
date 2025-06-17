import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import { LoadingScreen } from '@/screens/LoadingScreen';
import { SubscriptionScreen } from '@/screens/SubscriptionScreen';
import { ContactListScreen } from '@/screens/ContactListScreen';
import { CameraScanScreen } from '@/screens/CameraScanScreen';
import { ContactDetailScreen } from '@/screens/ContactDetailScreen';
import { ContactEditScreen } from '@/screens/ContactEditScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

import { RootStackParamList, MainTabParamList } from '@/types';
import { getTheme } from '@/constants/theme';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'ContactList') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'card-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface.light,
          borderTopColor: theme.colors.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as const,
        },
      })}
    >
      <MainTab.Screen 
        name="ContactList" 
        component={ContactListScreen}
        options={{
          tabBarLabel: '名刺一覧',
        }}
      />
      <MainTab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: '設定',
        }}
      />
    </MainTab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background.light,
          },
        }}
      >
        <RootStack.Screen 
          name="Loading" 
          component={LoadingScreen} 
        />
        <RootStack.Screen 
          name="Subscription" 
          component={SubscriptionScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <RootStack.Screen 
          name="MainTabs" 
          component={MainTabs} 
        />
        <RootStack.Screen 
          name="CameraScan" 
          component={CameraScanScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        />
        <RootStack.Screen 
          name="ContactDetail" 
          component={ContactDetailScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <RootStack.Screen 
          name="ContactEdit" 
          component={ContactEditScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}; 