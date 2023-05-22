import 'react-native-gesture-handler';
import React, {useState , useEffect} from 'react';
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
const db = SQLite.openDatabase(
  {
    name: 'QuanLiChiTieu',
    location: 'default',
  },
  () => {},
  error=>{console.log(error)}  
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
  useEffect(() => {
    getDataFromDatabase();
  }, [])

const getDataFromDatabase = () => {
  try {
    db.transaction((tx) => {
      
      tx.executeSql(
          "SELECT strftime('%Y-%m', date) AS formattedDate FROM Spending GROUP BY formattedDate ORDER BY formattedDate DESC;",
          [],
          (tx, result1) =>{
            for (let i = 0; i < result1.rows.length; i++) {
              let path : any;
              let [year, month] = result1.rows.item(i).formattedDate.split("-");
              const newData : Props = {
                month: `${month}-${year}`,
                id: i,
                value: []
              }
              
                tx.executeSql(
                  "SELECT * FROM Spending WHERE date LIKE ? ORDER by date DESC",
                  [`${result1.rows.item(i).formattedDate}%`],
                  (tx, result2) =>{
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
                    }
                  }
                )
                
                setData(prevData => [...prevData, newData]);
            }
            
          }
      )
     
  })
  } catch (error) {
      console.log(error);
  }
} 

const renderItem=({ item }: { item: Props }) => {
  return (
    <View>
      <Text style={[styles.textBigger, { marginTop: 10 }]}>{item.month}</Text>
      {item.value.map(pointer => (
        // <ListValuePay src = {pointer.src} purpose = {pointer.purpose} date = {pointer.date} amount = {pointer.amount}/>
        <View>
        <TouchableOpacity style={styles.MoneyTypeContainer}>
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

    </View>
      ))}

    </View>
  );
};

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
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshControl} onRefresh={() => {
              setRefreshControl(true);
              // setData([]);
              useEffect
              
              setRefreshControl(false);
            }}/>
          }
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