import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ShareMenu from 'react-native-share-menu';

function App() {
  const [safeData, setSafeData] = useState('');

  const [sharedData, setSharedData] = useState('');
  // const [sharedMimeType, setSharedMimeType] = useState('');
  // const [sharedExtraData, setSharedExtraData] = useState(null);

  const handleShare = useCallback(item=> {
    if (!item) {
      return;
    }
    const {mimeType, data, extraData} = item;

    setSharedData(data);
    // setSharedExtraData(extraData);
    // setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  const AlertFunct = inputData => {
    Alert.alert('Safe link?', inputData, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setSafeData(inputData)},
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Recieve a  Link</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="link"
          onChangeText={text => setSharedData(text)}
          defaultValue={sharedData}
        />
      </View>
      <TouchableOpacity
        disabled={sharedData === null || sharedData === ''}
        style={[
          styles.submitButton,
          sharedData === null || sharedData === ''
            ? styles.submitButtonNull
            : styles.submitButtonDone,
        ]}
        onPress={() => AlertFunct(sharedData)}>
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
      <Text style={styles.safeLinkText}> Link Safe:</Text>
      <Text style={styles.safeLink}> {sharedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    position: 'absolute',
    top: 70,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  containerInput: {
    backgroundColor: 'white',
    borderColor: '#29AF75',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    padding: 5,
    marginVertical: 10,
  },
  safeLinkText: {
    fontSize: 25,
    marginTop: 10,
    color: 'black',
  },
  safeLink: {
    fontSize: 15,
    marginTop: 10,
    color: 'black',
    width: '90%',
  },
  submitButton: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15,
    width: '90%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  submitButtonNull: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  submitButtonDone: {
    backgroundColor: '#29AF75',
    opacity: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default App;
