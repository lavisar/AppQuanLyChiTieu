import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type ItemProps = { title: any, name: any, value: any }
const StockButton = ({ title, name, value }: ItemProps) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <View style={styles.titleBtn}>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ color: 'white', fontSize: 18 }}> Giá trị: {value}</Text>
      </View>

    </TouchableOpacity>
  )
}

const DATA = [
  {
    id: 1,
    title: "VNM",
    name: "Vinamaik",
    value: 100
  },
  {
    id: 2,
    title: "VIN",
    name: "Vinpreal",
    value: 120
  },
  {
    id: 3,
    title: "POLI",
    name: "Petrolimex",
    value: 50
  },
  {
    id: 4,
    title: "TH",
    name: "TH true milk",
    value: 72
  },
]


const StockScreen = ({ navigation }:any) => {
  return (
    <View style={{ flex: 1 }}>


      <ImageBackground style={styles.panel} source={require('./assets/src/img/stock-bg.jpg')} resizeMode='cover'>
        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>TÊN STOCK(CALL API phaanf nayf)</Text>
        </View>

        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>GIÁ TRỊ</Text>
        </View>

        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>% TĂNG HAY GIẢM , NẾU GIẢM THÌ CHO MÀU ĐỎ , TĂNG THÌ CHO MÀU XANH</Text>
        </View>

        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>THÔNG TIN NẾU CÓ (CALL API phaanf nayf)</Text>
        </View>
      </ImageBackground>


      <View style={{ flex: 1, marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 10, marginTop: 10 }}>NGÀY THÁNG NĂM: </Text>
        <View style={{ justifyContent: 'center', marginBottom: 30, marginLeft: 50 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <StockButton title={item.title} name={item.name} value={item.value} />}
          />
        </View>
      </View>
    </View>

  )
}

export default StockScreen;





const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  btn: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 15,
    width: 300,
    height: 100,
    backgroundColor: 'rgba(0, 151, 126, 1)',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    flexDirection: 'row'
  },
  titleBtn: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 45,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 5
  }

})