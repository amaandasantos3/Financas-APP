import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import FinancasContext from '../../context/FinancasContext';
import { deleteFinancas } from '../../utils/api/request';
import { FAB } from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';


import img from '../../utils/img/fundo1.jpeg';
import { Icon } from 'react-native-elements'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default props => {
  const {financas, getFinancas} = useContext(FinancasContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const {signOut} = useAuth();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function getFinancasItem({item}) {
    return (
      <Card >
        <Card.Title>
          <Text> {item.item}</Text>
        </Card.Title>
        <Card.Divider />
        <Text style={{marginBottom: 10, textAlign: 'center'}}>
          Sua despesa foi de: R$ {item.value}
        </Text>
        <Card.Divider />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Financa', item)}>
            <Text style={{fontWeight: 'bold', color: '#e76f51'}}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
            onPress={ async () => {
             const response =  deleteFinancas(item._id);
             if(response){
              getFinancas();
             }   
            }}>
            <Text style={{fontWeight: 'bold', marginLeft: '73%', color: '#e63946'}}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
         <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <ImageBackground style={styles.image} source={img} resizeMode="cover" height='100%' >

      <FlatList
        keyExtractor={financa => financa._id.toString()}
        data={financas}
        renderItem={getFinancasItem}
      />

      <View style={{ marginTop: '40%'}}>
      
      <FAB style={styles.fab} onPress={() => props.navigation.navigate('Financa')} title="+" />
  </View>

  <View style={styles.out}>
    <TouchableOpacity onPress={signOut}>
    <Text style={styles.text}>Sair do App</Text>
    </TouchableOpacity>
  </View>
  </ImageBackground>
  </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 60,  
    height: 80,   
    borderRadius: 30,                                            
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  out:{
    justifyContent:'flex-end', 
    alignItems: 'center'
  },
  text:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15
  }
});
