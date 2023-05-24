import 'react-native-gesture-handler';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
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
import SQLite from 'react-native-sqlite-storage';
import { UserContext } from './UserContext';

const db = SQLite.openDatabase(
  {
    name: 'QuanLiChiTieu',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const DATA = [
  {
    date: "4/2023",
    moneyMustSave: 10000,
    moneyPay: 8000,
    moneySaved: 2000,
  },
  {
    date: "3/2023",
    moneyMustSave: 4000,
    moneyPay: 9000,
    moneySaved: -5000
  },
  {
    date: "2/2023",
    moneyMustSave: 6000,
    moneyPay: 6000,
    moneySaved: 0
  },
]


type ItemProps = { date: any, moneyMustSave: any, moneyPay: any, moneySaved: any }
const MoneySaveList = ({ date, moneyMustSave, moneyPay, moneySaved }: ItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>THÁNG: {date}</Text>
      <View style={styles.border}>
        <Text style={styles.text}>Số tiền phải tiết kiệm: {moneyMustSave}</Text>
      </View>
      <View style={styles.border}>
        <Text style={[styles.textPayed]}>Số tiền đã chi trong tháng: {moneyPay}</Text>
      </View>
      <View style={styles.border}>
        <Text style={[styles.textSaved, { color: moneySaved > 0 ? "#00D62F" : "#C51515" }]}>Số tiền đã tiết kiệm được: {moneySaved}</Text>
      </View>
    </View>
  )
}
const InputAdd = ({ placeholder }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}
      />
      <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]}>
        <Text style={[styles.titleBtn, { color: '#00977E' }]}>THÊM</Text>
      </TouchableOpacity>
    </View>
  )
}
const InputFind = ({ placeholder,color }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}
      />
      <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]}>
        <Text style={[styles.titleBtn, { color: '#00977E' }]}>TÌM</Text>
      </TouchableOpacity>
    </View>
  )
}

const TotalSpendScreen = ({ navigation }:any) => {
  const { userName } = useContext(UserContext);
  const [currentSpending, setCurrentSpending] = useState(0);

  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();
  const [pull, setPull] = useState(false);
  const currentMonthYear = `${year}-${month}`;
  useLayoutEffect(() => {

    loadSpending();

  }, [])
  const loadSpending = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT sum(amount) as SUM FROM Spending WHERE date LIKE ? AND spendUsername = ? ORDER by date DESC",
          [`${currentMonthYear}%`, userName],
          (tx, result2) => {
            const sum = result2.rows.item(0).SUM;
            setCurrentSpending(sum);
            console.log(sum);
          }
        )
      )
    }
    catch (error) {
      console.log(error);
    }
}
  return (

    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <View style={{ flex: 2, }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 }}>
          <View style={{ flex: 3, width: 70, height: 70, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 55, marginVertical: 20 }}>
            <Image source={require('./assets/src/img/wallet.png')} />
          </View>
          <View style={{ flex: 9, alignItems: 'center' }}>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>Số tiền đã chi tháng này: </Text>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>{currentSpending} </Text>
          </View>
        </View>
      </View>

      

      <KeyboardAvoidingView style={{ flex: 1, }} enabled={true} behavior='padding'>
        <View style={{ flex: 6, }}>
          <View style={{ flex: 4, marginTop: 10, }}>
            <Text style={styles.textBigger}>Số tiền cần được tiết kiệm tháng hiện tại: (Tháng 4)</Text>

            <InputAdd placeholder="Số tiền" />

            <Text style={styles.textBigger}>Tháng cần tìm:</Text>

            <InputFind placeholder="Tháng/Năm" />

          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={{ flex: 6, marginBottom: 40, marginTop: 160, borderTopWidth: 1, paddingTop: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}> DANH SÁCH</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <MoneySaveList moneyMustSave={item.moneyMustSave} moneyPay={item.moneyPay} moneySaved={item.moneySaved} date={item.date} />}
        />
      </View>
    </View>


  )
}

export default TotalSpendScreen;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginTop: 5,
    justifyContent: 'center',

  },
  textBigger: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  textPayed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00977E'
  },
  textSaved: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  border: {
    paddingLeft: 10,
    marginTop: 5,
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    flex: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    paddingLeft: 15,
    marginTop: 10,
    width: 250,
    marginBottom: 10
  },
  btn: {
    marginLeft: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  titleBtn: {
    fontSize: 20, fontWeight: 'bold',
  },
})