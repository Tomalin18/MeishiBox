import React from 'react';
import { StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { getTheme } from './src/constants/theme';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  return (
    <>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background.light}
      />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 