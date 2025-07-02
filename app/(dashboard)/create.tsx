
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';

const Create = () => {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ThemedText title={true} style={{ fontSize: 24 }}>Create</ThemedText>
      <Spacer height={20} />
      <ThemedText>Create new content here.</ThemedText>
      <Spacer height={30} />
      <ThemedButton title="Start Creating" onPress={() => console.log('Create button pressed')} />
    </ThemedView>
  );
};

export default Create;
