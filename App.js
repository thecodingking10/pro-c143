import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/home';

export default function App() {
  return (
    <View style={{flex:1, backgroundColor:"#d1dde3"}}>
      <SafeAreaProvider>
        <HomeScreen/>
      </SafeAreaProvider>
    </View>
  );
}