import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Index from './src/index.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContextProvider } from './contexts/ThemeContextProvider';

export default function App() {
  return (
    <ThemeContextProvider>
      <SafeAreaProvider>
          <Index />
      </SafeAreaProvider>
    </ThemeContextProvider>
  );
}

