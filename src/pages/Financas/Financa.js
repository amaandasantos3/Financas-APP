import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {FAB, Button, Card} from 'react-native-elements';
import {useFinancas} from '../../context/FinancasContext';
import {TextInputMask} from 'react-native-masked-text';
import Row from '../../components/Row';
import img from '../../utils/img/fundo1.jpeg';
import { Icon } from 'react-native-elements/dist/icons/Icon';

export default ({route: {params}, navigation}) => {
  const {createFinancas, updateFinancas} = useFinancas();

  console.log({params});

  if (params?.date) {
    //params.date = moment(params.date).format('DD/MM/YYYY');
  }

  useEffect(() => {
    console.debug(objAdditionalInfo);
  }, [objAdditionalInfo]);

  function addAdditional() {
    let error = null;

    if (!additionalInfoName) {
      error = 'Nome incorreto';
    }

    if (!additionalInfoValue) {
      error = error ? 'Nome e valor incorreto' : 'Valor incorreto';
    }

    setError(error);

    if (!error) {
      setObjAdditionalInfo({
        ...objAdditionalInfo,
        [additionalInfoName]: additionalInfoValue,
      });
    }
  }

  const _id = params?._id;
  const [date, setDate] = useState(params?.date);
  const [item, setItem] = useState(params?.item || '');
  const [value, setValue] = useState(params?.value?.toString() || '');
  const [additionalInfoName, setAdditionalInfoName] = useState('');
  const [additionalInfoValue, setAdditionalInfoValue] = useState('');
  const [objAdditionalInfo, setObjAdditionalInfo] = useState(
    params?.additionalInfo || {},
  );
  const [error, setError] = useState();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginTop: 35}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#3d70a7',
          }}>
          Adicione seus gastos
        </Text>
      </View>
      <View style={{marginTop: 35}}>
        <TextInputMask
          placeholder="Data"
          style={styles.input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          placeholder="Gasto"
          style={styles.input}
          onChangeText={setItem}
          value={item}
        />

        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder="Valor"
          keyboardType="numeric"
          value={value}
        />

        <View>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Informação adicional
          </Text>
          <Row>
            <TextInput
              style={[styles.input, styles.additional]}
              onChangeText={setAdditionalInfoName}
              placeholder="Nome"
              value={additionalInfoName}
            />
            <TextInput
              style={[styles.input, styles.additional]}
              onChangeText={setAdditionalInfoValue}
              placeholder="Valor"
              value={additionalInfoValue}
            />
            <FAB
              size={'small'}
              style={styles.additionalBtn}
              icon={{name: 'add', color: 'white'}}
              color={'#3d70a7'}
              onPress={addAdditional}
            />
          </Row>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>

      <View>
        {Object.entries(objAdditionalInfo).map(([key, value]) => (
          <Row key={key}>
            <Text>{key}</Text>
            <Icon name={'east'}/>
            <Text>{value}</Text>
          </Row>
        ))}
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3d70a7',
            height: 40,
            margin: 12,
            borderRadius: 50,
            width: '50%',
          }}
          onPress={() => {
            if (_id) {
              updateFinancas(_id, {
                date,
                item,
                value,
                additionalInfo: objAdditionalInfo,
              });
            } else {
              createFinancas({
                date,
                item,
                value,
                additionalInfo: objAdditionalInfo,
              });
            }
          }}>
          <Text style={{textAlign: 'center', marginTop: '6%', color: '#fff'}}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
  },
  additional: {
    flex: 0.5,
    marginHorizontal: 6,
  },
  additionalBtn: {
    marginHorizontal: 6,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});