import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

if (__DEV__) {
  // Sobrescreve as funções de log do console para não fazerem nada
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}


// Previne o auto-hide da tela de splash
SplashScreen.preventAutoHideAsync();


return (
    <View style={{ flex: 1 }}>
      <Stack>
      <Stack.Screen name="telaInicial" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
