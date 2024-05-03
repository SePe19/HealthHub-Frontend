import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {Workouts} from "./pages/Workouts";

export default function App() {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <Workouts/>
      <StatusBar style="auto" />
    </View>
  );
}

