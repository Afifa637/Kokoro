
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';

const Home = () => {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ThemedText title={true} style={{ fontSize: 24 }}>Home</ThemedText>
      <Spacer height={20} />
      <ThemedText>Welcome to your dashboard.</ThemedText>
      <Spacer height={30} />
      <ThemedButton title="Refresh" onPress={() => console.log('Home refresh clicked')} />
    </ThemedView>
  );
};

export default Home;
