/**
 * Ponto de entrada do app.
 * - Envolve a aplicação com SafeAreaProvider para habilitar uso de SafeAreaView/useSafeAreaInsets.
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './components/MapScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <MapScreen />
    </SafeAreaProvider>
  );
}
