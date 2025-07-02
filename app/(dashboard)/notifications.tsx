
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';

const Notifications = () => {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ThemedText title={true} style={{ fontSize: 24 }}>Notifications</ThemedText>
      <Spacer height={20} />
      <ThemedText>You have no new notifications.</ThemedText>
      <Spacer height={30} />
      <ThemedButton title="Check Again" onPress={() => console.log('Check notifications')} />
    </ThemedView>
  );
};

export default Notifications;
