import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import moment from 'moment';
import {FAB, Button, Card} from 'react-native-elements';
import {useFinancas} from '../../context/FinancasContext';
import {TextInputMask} from 'react-native-masked-text';
import Row from '../../components/Row';
import img from '../../utils/img/fundo1.jpeg';

export default ({route: {params}, navigation}) => {
  const {createFinancas, updateFinancas} = useFinancas();

  console.log({params});

  if (params?.date) {
    //params.date = moment(params.date).format('DD/MM/YYYY');
  }

  useEffect(() => {
    console.debug(objAdditionalInfo);
  }, [objAdditionalInfo]);

  const _id = params?._id;
  const [date, setDate] = useState(params?.date);
  const [item, setItem] = useState(params?.item || '');
  const [value, setValue] = useState(params?.value?.toString() || '');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [objAdditionalInfo, setObjAdditionalInfo] = useState({a: 1, b: 2});

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

        <TextInput
          style={styles.input}
          onChangeText={setAdditionalInfo}
          placeholder="Adicionais"
          value={additionalInfo}
        />
      </View>

      <View>
      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Informação adicional</Text>
      {Object.entries(objAdditionalInfo).map(([key, value]) => (
        <Row>
          <Text>{key}</Text>
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
            if(_id) {
              updateFinancas(_id, {
                date,
                item,
                value,
                additionalInfo,
              });
            } else {
              createFinancas({
                date,
                item,
                value,
                additionalInfo,
              });
            }

          }}>
          <Text style={{textAlign: 'center', marginTop: '6%', color:'#fff'}}>Salvar</Text>
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
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
});
