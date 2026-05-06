import { StatusBar } from 'expo-status-bar';
import TeaserScreen from './src/TeaserScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F5F4F0" />
      <TeaserScreen />
    </>
  );
}
