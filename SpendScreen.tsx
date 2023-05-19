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


const DATA = [
  {
    month: '4/2023',
    id: 'thang4',
    value:
      [{
        id: 3,
        src: require('./assets/src/img/fillter-icon/hoa-don.png'),
        title: "Thanh toán tiền điện thoại",
        day: '21/4/2023',
        money: 100000
      },
      {
        id: 2,
        src: require('./assets/src/img/fillter-icon/cham-soc.png'),
        title: "Skincare",
        day: '12/4/2023',
        money: 218000
      },
      {
        id: 1,
        src: require('./assets/src/img/fillter-icon/an-vat.png'),
        title: "Ăn gà rán",
        day: '11/4/2023',
        money: 125000
      },
      ]
  },
  {
    month: '3/2023',
    id: 'thang5',
    value:
      [{
        id: 2,
        src: require('./assets/src/img/fillter-icon/tien-nha.png'),
        title: "Thanh toán tiền nhà",
        day: '21/3/2023',
        money: 2100000
      },
      {
        id: 1,
        src: require('./assets/src/img/fillter-icon/tien-dien.png'),
        title: "Thanh toán tiền điện",
        day: '21/3/2023',
        money: 421000
      },
      ]
  },
]


type ItemProps = { date: any, moneyMustSave: any, moneyPay: any, moneySaved: any }
const MoneyPayType = ({ date, moneyMustSave, moneyPay, moneySaved }: ItemProps) => {
  return (
    <View></View>
  )
}
const InputFind = ({ placeholder }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}
      />
      <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]}>
        <Text style={[styles.titleBtn, { color: '#00977E' }]}>TÌM KIẾM</Text>
      </TouchableOpacity>
    </View>
  )
}
type Props = { src: any, title: any, day: any, money: any }
const ListValuePay = ({ src, title, day, money }: Props) => {
  return (
    <View>
      <TouchableOpacity style={styles.MoneyTypeContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={{ borderRadius: 45, borderWidth: 4, justifyContent: 'center', alignItems: 'center', width: 70, height: 70, backgroundColor: 'white' }}>
            <Image style={{ height: 45, width: 45 }} source={src}></Image>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2, }}>
              <Text style={styles.textBigger}>{title}</Text>
              <Text style={styles.textBigger}>{day}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
              <Text style={styles.text}>Số tiền: {money}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}


const TotalSpendScreen = ({ navigation }: any) => {
  return (

    <View style={{ flex: 3, marginHorizontal: 20 }}>
      <View style={{ flex: 1, }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 }}>
          <View style={{ flex: 3, width: 70, height: 70, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 55, marginVertical:20, }}>
            <Image source={require('./assets/src/img/wallet.png')} style={{margin:10}} />
          </View>
          <View style={{ flex: 9, alignItems: 'center' }}>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>Số tiền đã chi tháng 4 này: </Text>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>8000 </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1,backgroundColor: '#00977E',height:40}}>
            <Text style={[styles.textBigger]}>DANH SÁCH CHI TIÊU</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>




      <View style={{ flex: 6, marginBottom: 30 }}>

        <FlatList
          data={DATA}
          renderItem={({ item }) =>

            <View>
              <Text style={[styles.textBigger, { marginTop: 10 }]}>{item.month}</Text>
              {item.value.map(value => (
                <ListValuePay src={value.src} title={value.title} day={value.day} money={value.money} />
              ))}
            </View>

          }
          keyExtractor={item => item.id}
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
    alignItems: 'center'
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
  MoneyTypeContainer: {
    height: 120,
    borderColor: 'black',
    borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 5, borderBottomWidth: 5,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})