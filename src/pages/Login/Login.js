import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import img from '../../utils/img/economico.png';
import {useAuth} from '../../context/AuthContext';

export default ({route, navigation}) => {
  const [login, setLogin] = useState(route.params ? route.params : {}); // TODO remove
  const {signed, signIn, setEmail, email, error} = useAuth();

  console.log({setEmail, email});

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}>

        <Image style={styles.stretch} source={img} />

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text>{error}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#3d70a7',
            height: 40,
            margin: 12,
            borderRadius: 50,
            width: '50%',
          }}
          onPress={signIn}>
          <Text style={{textAlign: 'center', marginTop: '6%', color: '#fff'}}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 128,
    height: 128,
  },
  input: {
    height: 40,
    margin: 12,
    width: '70%',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
    marginTop: 30,
  },
});
