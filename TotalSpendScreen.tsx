import 'react-native-gesture-handler';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
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
  FlatList,
  RefreshControl
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
type Props = {
  month: any;
  spendingCount: any;
  amountSpent: any;
};

const MoneySaveList = ({ month, spendingCount, amountSpent }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>THÁNG: {month}</Text>
      <View style={styles.border}>
        <Text style={styles.text}>Số lần chi tiêu trong tháng: {spendingCount} lần</Text>
      </View>
      <View style={styles.border}>
        <Text style={[styles.textPayed]}>Số tiền đã chi trong tháng: {amountSpent}đ</Text>
      </View>
      {/* <View style={styles.border}>
        <Text style={[styles.textSaved, { color: moneySaved > 0 ? "#00D62F" : "#C51515" }]}>Số tiền đã tiết kiệm được: {moneySaved}</Text>
      </View> */}
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

// const InputFind = ({ placeholder, color, onPress, value, onChangeText }: any) => {
//     const event = () => {
//     onPress();
//   }
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       <TextInput
//         placeholder={placeholder}
//         placeholderTextColor='black'
//         style={styles.textInput}
//         keyboardType='number-pad'
//         value={value}
//         onChangeText={onChangeText}
//       />
//       <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={handleFind(value)}>
//         <Text style={[styles.titleBtn, { color: '#00977E' }]}>TÌM</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }
const InputFind = ({ placeholder, color, onPress, value, onChangeText }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}
        keyboardType='number-pad'
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={event}>
        <Text style={[styles.titleBtn, { color: '#00977E' }]}>TÌM</Text>
      </TouchableOpacity>
    </View>
  )
}
const ButtonDateTime = ({ onPress }: any) => {

  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#D69500' }]}>CHỌN</Text>
    </TouchableOpacity>
  );
}
const TotalSpendScreen = ({ navigation }: any) => {
  const { userName } = useContext(UserContext);
  const [currentSpending, setCurrentSpending] = useState(0);
  const [data, setData] = useState<Props[]>([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();
  const [pull, setPull] = useState(false);
  const currentMonthYear = `${year}-${month}`;
  const currentMonthYearTitle = `${month}-${year}`;
  const [dateIndex, setDateIndex] = useState('');
  const [monthIndex, setMonthIndex] = useState('');
  const [yearIndex, setYearIndex] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const [searchInput, setSearchInput] = useState('');
  useLayoutEffect(() => {
    getDataFromDatabase();
    calculateSpending();

  }, [])
  
  const onChangeDate = (event: Event, value?: Date) => {
    const curDate = value || date;
    setDate(curDate);
    let tempDate = new Date(curDate);
    let fDate = tempDate.getDate() + "/" +(tempDate.getMonth()+1) + "/" + tempDate.getFullYear();
    setDateIndex(tempDate.getDate().toString());
    setMonthIndex((tempDate.getMonth()+1).toString());
    setYearIndex(tempDate.getFullYear().toString());
    setShow(!show);
    setText(fDate);
    setShowDatePicker(false);
  }
  const showDateTime = () => {
    setShow(true);
  }
  const calculateSpending = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT sum(amount) as SUM FROM Spending WHERE date LIKE ? AND spendUsername = ? ORDER by date DESC",
          [`${currentMonthYear}%`, userName],
          (tx, result) => {
            const sum = result.rows.item(0).SUM;
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
  const getDataFromDatabase = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT strftime('%m-%Y', date) AS Month, COUNT(*) AS RowsCount, SUM(amount) AS TotalAmount FROM Spending WHERE spendUsername = ? GROUP BY Month ORDER by Month DESC;",
          [userName],
          (tx, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              const newData: Props = {
                month: result.rows.item(i).Month,
                spendingCount: result.rows.item(i).RowsCount,
                amountSpent: result.rows.item(i).TotalAmount,
              }
              setData(prevData => [...prevData, newData]);
            }
          }
        )
      )
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleFind = () => {
    try {
      if (parseInt(searchInput) < 1 || parseInt(searchInput) > 12 || searchInput.length > 2){
        Alert.alert("Thông báo", "Số tháng không hợp lệ");
      }
      else {
        let searchInputString = searchInput.toString();
        if (searchInputString.length < 2){
          searchInputString = '0'+searchInputString;
        }
        setData([]);
        db.transaction((tx) =>
          tx.executeSql(
            "SELECT strftime('%m-%Y', date) AS Month, COUNT(*) AS RowsCount, SUM(amount) AS TotalAmount FROM Spending WHERE spendUsername = ? AND strftime('%m', date) = ? GROUP BY Month ORDER by Month DESC;",
            [userName, searchInputString],
            (tx, result) => {
              for (let i = 0; i < result.rows.length; i++) {
                const newData: Props = {
                  month: result.rows.item(i).Month,
                  spendingCount: result.rows.item(i).RowsCount,
                  amountSpent: result.rows.item(i).TotalAmount,
                }
                setData(prevData => [...prevData, newData]);
              }
            }
          )
        )
      }
    }
    catch (error) {
      console.log(error);
    }
    // console.log(searchInput);
  }
  return (

    <View style={{ flex: 4, marginHorizontal: 20 }}>
      <View style={{ flex: 4, }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 }}>
          <View style={{ flex: 3, width: 70, height: 70, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 55, marginVertical: 20 }}>
            <Image source={require('./assets/src/img/wallet.png')} />
          </View>
          <View style={{ flex: 9, alignItems: 'center' }}>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>Số tiền đã chi tháng {currentMonthYearTitle}: </Text>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>{pull == true ? currentSpending : "*******"} </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {pull == false ?
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',borderTopWidth:1 }}>
              <Text style={[styles.textBigger, { fontSize: 25, color: '#00977E' }]}>Vuốt xuống để mở khóa</Text>
              <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40 }} source={require('./assets/src/img/icons8-here-48.png')}></Image>
              </View>
            </View>
            :
            <View style={{flex:1,borderTopWidth:1}}>      
            <Text style={styles.textBigger}>Tháng cần tìm:</Text>
            <InputFind placeholder="Tháng" value={searchInput} onChangeText={setSearchInput} onPress={handleFind}/>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, backgroundColor: '#00977E', height: 40, marginTop: 20, }}>
              <Text style={[styles.textBigger]}>DANH SÁCH CHI TIÊU</Text>
            </View>
            </View>}
            {/* placeholder, color, onPress, value, onChangeText, eventHandle */}
        </View>
      </View>






      {/* <Text style={styles.textBigger}>Tháng cần tìm:</Text>
            <InputFind placeholder="Tháng/Năm" />
            <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, backgroundColor: '#00977E', height: 40 }}>
              <Text style={[styles.textBigger]}>DANH SÁCH CHI TIÊU</Text>
            </View> */}




      <View style={{ flex: 10, marginBottom: 30, paddingTop: 5, marginTop: 45 }}>

        <FlatList
          data={pull == true ? data : null}
          renderItem={({ item }: { item: Props }) => <MoneySaveList month={item.month} spendingCount={item.spendingCount} amountSpent={item.amountSpent} />}
          keyExtractor={item => item.month}


          refreshControl={
            <RefreshControl refreshing={refreshControl} onRefresh={() => {
              setData([])
              getDataFromDatabase();
              calculateSpending();
              setRefreshControl(true);
              setPull(true)
              setTimeout(() => {
                setRefreshControl(false);
              }, 500)

            }} />
          }
          extraData={pull == true ? data : null}
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
    fontSize: 19,
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