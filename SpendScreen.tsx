import 'react-native-gesture-handler';
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
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
import { HandlerStateChangeEvent, LongPressGestureHandler, LongPressGestureHandlerEventPayload, State } from 'react-native-gesture-handler';
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
  id: any;
  value: {
    id: any;
    type: any;
    amount: any;
    date: any;
    purpose: any;
    src: any;
  }[];
};

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

// const ListValuePay: React.FC<Props> = (src : any, purpose : any, date : any, amount : any) => {
//   return (
//     <View>
//         <TouchableOpacity style={styles.MoneyTypeContainer}>
//         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//           <View style={{ borderRadius: 45, borderWidth: 4, justifyContent: 'center', alignItems: 'center', width: 70, height: 70, backgroundColor: 'white' }}>
//             <Image style={{ height: 45, width: 45 }} source={src}></Image>
//           </View>
//           <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
//             <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2, }}>
//               <Text style={styles.textBigger}>{purpose}</Text>
//               <Text style={styles.textBigger}>{date}</Text>
//             </View>
//             <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
//               <Text style={styles.text}>Số tiền: {amount}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>

//     </View>
//   )
// }

const TotalSpendScreen = ({ navigation }: any) => {
  const [data, setData] = useState<Props[]>([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();
  const [pull, setPull] = useState(false);
  const currentMonthYear = `${month}-${year}`;
  const [currentMonthSpending, setCurrentMonthSpending] = useState("0");
  // var currentMonthSpending = 0;

  const isFocused = useIsFocused();
 
  useEffect(() => {
    setData([])
    getDataFromDatabase();
    

  }, [isFocused]);

  const getDataFromDatabase = () => {
    try {
      db.transaction((tx) => {

        tx.executeSql(
          "SELECT strftime('%Y-%m', date) AS formattedDate FROM Spending GROUP BY formattedDate ORDER BY formattedDate DESC;",
          [],
          (tx, result1) => {
            for (let i = 0; i < result1.rows.length; i++) {
              let path: any;
              let [year, month] = result1.rows.item(i).formattedDate.split("-");
              const newData: Props = {
                month: `${month}-${year}`,
                id: i,
                value: []
              }
              // const currentDate = new Date();
              // const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
              // const currentYear = currentDate.getFullYear().toString();
              // let sum = 0;
              // const currentMonthYear = `${currentMonth}-${currentYear}`;

              tx.executeSql(
                "SELECT * FROM Spending WHERE date LIKE ? ORDER by date DESC",
                [`${result1.rows.item(i).formattedDate}%`],
                (tx, result2) => {
                  for (let j = 0; j < result2.rows.length; j++) {

                    switch (result2.rows.item(j).type) {
                      case "Quà tặng":
                        path = require("./assets/src/img/fillter-icon/qua-tang.png");
                        break;
                      case "Xã giao":
                        path = require("./assets/src/img/fillter-icon/xa-giao.png");
                        break;
                      case "Mua sắm":
                        path = require("./assets/src/img/fillter-icon/mua-sam.png");
                        break;
                      case "Gửi tiền":
                        path = require("./assets/src/img/fillter-icon/gui-tien.png");
                        break;
                      case "Nhận tiền":
                        path = require("./assets/src/img/fillter-icon/nhan-tien.png");
                        break;
                      case "Hóa đơn":
                        path = require("./assets/src/img/fillter-icon/hoa-don.png");
                        break;
                      case "Tiết kiệm":
                        path = require("./assets/src/img/fillter-icon/tiet-kiem.png");
                        break;
                      case "Tiền nhà":
                        path = require("./assets/src/img/fillter-icon/tien-nha.png");
                        break;
                      case "Hẹn hò":
                        path = require("./assets/src/img/fillter-icon/hen-ho.png");
                        break;
                      case "Học tập":
                        path = require("./assets/src/img/fillter-icon/hoc-tap.png");
                        break;
                      case "Mua Online":
                        path = require("./assets/src/img/fillter-icon/muado-online.png");
                        break;
                      case "CH Tiện Lợi":
                        path = require("./assets/src/img/fillter-icon/chtl.png");
                        break;
                      case "Du lịch":
                        path = require("./assets/src/img/fillter-icon/du-lich.png");
                        break;
                      case "Sức khỏe":
                        path = require("./assets/src/img/fillter-icon/suc-khoe.png");
                        break;
                      case "Tiền nước":
                        path = require("./assets/src/img/fillter-icon/tien-nuoc.png");
                        break;
                      case "Tiền điện":
                        path = require("./assets/src/img/fillter-icon/tien-dien.png");
                        break;
                      case "Ăn uống":
                        path = require("./assets/src/img/fillter-icon/an-uong.png");
                        break;
                      case "Thú cưng":
                        path = require("./assets/src/img/fillter-icon/thu-cung.png");
                        break;
                      case "Trẻ nhỏ":
                        path = require("./assets/src/img/fillter-icon/tre-nho.png");
                        break;
                      case "Ăn vặt":
                        path = require("./assets/src/img/fillter-icon/an-vat.png");
                        break;
                      case "Quần áo":
                        path = require("./assets/src/img/fillter-icon/quan-ao.png");
                        break;
                      case "Sửa chữa":
                        path = require("./assets/src/img/fillter-icon/sua-chua.png");
                        break;
                      case "Đi chơi":
                        path = require("./assets/src/img/fillter-icon/di-choi.png");
                        break;
                      case "Nhiên liệu":
                        path = require("./assets/src/img/fillter-icon/xang.png");
                        break;
                      case "Chăm sóc":
                        path = require("./assets/src/img/fillter-icon/cham-soc.png");
                        break;
                      case "Khác":
                        path = require("./assets/src/img/fillter-icon/khac.png");
                        break;
                    }

                    newData.value.push(
                      {
                        id: result2.rows.item(j).id,
                        type: result2.rows.item(j).type,
                        amount: result2.rows.item(j).amount,
                        date: result2.rows.item(j).date,
                        purpose: result2.rows.item(j).purpose,
                        src: path,
                      }
                    )
                    // if (newData.month === currentMonthYear){
                    //   sum += result2.rows.item(j).amount;
                    // }
                  }
                }
              )
              // setCurrentMonthSpending(sum);
              setData(prevData => [...prevData, newData]);
              // if (month == currentMonthYear){
              //   currentMonthSpending += result.rows.item(j).amount;
              // }

            }

          }
        )
      }
      )
      calculateSpendingOfCurrentMonth();
    } catch (error) {
      console.log(error);
    }
    // setCurrentMonthSpending(calculateSpendingOfCurrentMonth());
    // Alert.alert(currentMonthSpending.toString());

  }

  const calculateSpendingOfCurrentMonth = () => {
    let result = 0;
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const currentMonthYear = `${month}-${year}`;
    for (let i = 0; i < data.length; i++) {
      if (currentMonthYear == data[i].month) {
        for (let j = 0; j < data[i].value.length; j++) {
          result += data[i].value[j].amount;
        }
      }
    }
    setCurrentMonthSpending(result.toString());
  }



  const deleteSpendingRecord = async (item  : any) =>{
    // Alert.alert(item.toString())
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa dữ liệu này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () =>{
            try {
              db.transaction((tx) =>{
                tx.executeSql(
                  "DELETE FROM Spending WHERE id = ?",
                  [item],
                  (tx, results) => {
                    if (results.rowsAffected > 0){
                      Alert.alert('Xóa thành công');
                      setData([])
                      getDataFromDatabase();
                      // calculateSpendingOfCurrentMonth();
                      
                    }
                  }
                )
              })
            }
            catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  const renderItem=({ item }: { item: Props }) => {
    // const handleLongPress = (pointer : Props) => {
    //   (event: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
    //     if (event.nativeEvent.state === State.ACTIVE) {
    //       // Perform actions on long press
    //       console.log('Long press detected on item:', pointer.month);
    //     }
    //   }
    // }
    return (
      <View>
        <Text style={[styles.textBigger, { marginTop: 10 }]}>Tháng {item.month}</Text>
        {item.value.map(pointer => (
          <View>
            {/* <LongPressGestureHandler onHandlerStateChange={handleLongPress(pointer)}> */}
          <TouchableOpacity style={styles.MoneyTypeContainer} onLongPress={() => deleteSpendingRecord(pointer.id)}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ borderRadius: 45, borderWidth: 4, justifyContent: 'center', alignItems: 'center', width: 70, height: 70, backgroundColor: 'white' }}>
              <Image style={{ height: 45, width: 45 }} source={pointer.src}></Image>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2, }}>
                <Text style={styles.textBigger}>{pointer.purpose}</Text>
                <Text style={styles.textBigger}>{pointer.date}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                <Text style={styles.text}>Số tiền: {pointer.amount}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* </LongPressGestureHandler> */}
      </View>
        ))}

      </View>
    );
  };

  const Hide = () =>{
    setPull(true)
  }
  return (
    <View style={{ flex: 3, marginHorizontal: 20 }}>
      <View style={{ flex: 1, }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ flex: 3, width: 70, height: 70, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 55, marginVertical: 20, }}>
            <Image source={require('./assets/src/img/wallet.png')} style={{ margin: 10 }} />
          </View>
          <View style={{ flex: 9, alignItems: 'center' }}>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>Tiền chi tiêu tháng {currentMonthYear}: </Text>
            <Text style={[styles.textBigger, { marginLeft: 10 }]}>{pull==true ? currentMonthSpending : "*********"} </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1,marginBottom:10}}>
      {pull == false ? 
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Text style={[styles.textBigger,{fontSize:20,color:'#00977E'}]}>Vuốt xuống để mở khóa hoặc để refresh</Text>
          <View style={{  height: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 40, height: 40 }} source={require('./assets/src/img/icons8-here-48.png')}></Image>
        </View>
        </View>
        :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, backgroundColor: '#00977E', height: 40,borderRadius:15 }}>
            <Text style={[styles.textBigger,{fontSize:25}]}>DANH SÁCH CHI TIÊU</Text>
            
          </View>
        }
      </View>
        <View style={{ flex: 6, marginBottom: 30 }}>

          <FlatList
            data={pull == true ? data : null}
            renderItem={renderItem}
            keyExtractor={item => item.id}


            refreshControl={
              <RefreshControl refreshing={refreshControl} onRefresh={() => {
                setData([])
                getDataFromDatabase();
                setRefreshControl(true);
                setPull(true)
                setTimeout(() => {
                  setRefreshControl(false);
                }, 500)

              }} />
            }
            extraData={pull == true ? data : null}
          // refreshing={refreshControl}
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