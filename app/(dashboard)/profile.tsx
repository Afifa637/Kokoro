import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';

const Profile = () => {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ThemedText title={true} style={{ fontSize: 24 }}>Profile</ThemedText>
      <Spacer height={20} />
      <ThemedText>Your personal info goes here.</ThemedText>
      <Spacer height={30} />
      <ThemedButton title="Edit Profile" onPress={() => console.log('Edit profile')} />
    </ThemedView>
  );
};

export default Profile;
