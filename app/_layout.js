import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

if (__DEV__) {
  // Sobrescreve os logs para ambiente de desenvolvimento
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export default function RootLayout() {
  useEffect(() => {
    // Previne o auto-hide da tela de splash
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="telaInicial" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
