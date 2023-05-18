import 'react-native-gesture-handler';
import React, { useState } from 'react';
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
  Pressable
} from 'react-native';
import { NavigationContainer, PrivateValueStore } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SpendScreen from './SpendScreen';
import TotalSpendScreen from './TotalSpendScreen';
import StockScreen from './StockScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';



const DATA = [
  {
    id: 1,
    name: 'Quà tặng',
    url: require('./assets/src/img/fillter-icon/qua-tang.png')
  },
  {
    id: 2,
    name: 'Xã giao',
    url: require('./assets/src/img/fillter-icon/xa-giao.png')
  },
  {
    id: 3,
    name: 'Mua sắm',
    url: require('./assets/src/img/fillter-icon/mua-sam.png')
  },
  {
    id: 4,
    name: 'Gửi tiền',
    url: require('./assets/src/img/fillter-icon/gui-tien.png')
  },
  {
    id: 5,
    name: 'Nhận tiền',
    url: require('./assets/src/img/fillter-icon/nhan-tien.png')
  },
  {
    id: 6,
    name: 'Hóa đơn',
    url: require('./assets/src/img/fillter-icon/hoa-don.png')
  },
  {
    id: 7,
    name: 'Tiết kiệm',
    url: require('./assets/src/img/fillter-icon/tiet-kiem.png')
  },
  {
    id: 8,
    name: 'Tiền nhà',
    url: require('./assets/src/img/fillter-icon/tien-nha.png')
  },
  {
    id: 9,
    name: 'Hẹn hò',
    url: require('./assets/src/img/fillter-icon/hen-ho.png')
  },
  {
    id: 10,
    name: 'Học tập',
    url: require('./assets/src/img/fillter-icon/hoc-tap.png')
  },
  {
    id: 11,
    name: 'Mua Online',
    url: require('./assets/src/img/fillter-icon/muado-online.png')
  },
  {
    id: 12,
    name: 'CH Tiện Lợi',
    url: require('./assets/src/img/fillter-icon/chtl.png')
  },
  {
    id: 13,
    name: 'Du lịch',
    url: require('./assets/src/img/fillter-icon/du-lich.png')
  },
  {
    id: 14,
    name: 'Sức khỏe',
    url: require('./assets/src/img/fillter-icon/suc-khoe.png')
  },
  {
    id: 15,
    name: 'Tiền nước',
    url: require('./assets/src/img/fillter-icon/tien-nuoc.png')
  },
  {
    id: 16,
    name: 'Tiền điện',
    url: require('./assets/src/img/fillter-icon/tien-dien.png')
  },
  {
    id: 17,
    name: 'Ăn uống',
    url: require('./assets/src/img/fillter-icon/an-uong.png')
  },
  {
    id: 18,
    name: 'Thú cưng',
    url: require('./assets/src/img/fillter-icon/thu-cung.png')
  },
  {
    id: 19,
    name: 'Trẻ nhỏ',
    url: require('./assets/src/img/fillter-icon/tre-nho.png')
  },
  {
    id: 20,
    name: 'Ăn vặt',
    url: require('./assets/src/img/fillter-icon/an-vat.png')
  },
  {
    id: 21,
    name: 'Quần áo',
    url: require('./assets/src/img/fillter-icon/quan-ao.png')
  },
  {
    id: 22,
    name: 'Sửa chữa',
    url: require('./assets/src/img/fillter-icon/sua-chua.png')
  },
  {
    id: 23,
    name: 'Đi chơi',
    url: require('./assets/src/img/fillter-icon/di-choi.png')
  },
  {
    id: 24,
    name: 'Nhiên liệu',
    url: require('./assets/src/img/fillter-icon/xang.png')
  },
  {
    id: 25,
    name: 'Chăm sóc',
    url: require('./assets/src/img/fillter-icon/cham-soc.png')
  },
  {
    id: 26,
    name: 'Khác',
    url: require('./assets/src/img/fillter-icon/khac.png')
  },

]


const ButtonUpdateGet = ({ onPress }: any) => {

  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#00977E' }]}>Nhận tiền</Text>
    </TouchableOpacity>
  );
}
const ButtonDateTime = ({ onPress }: any) => {

  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btnDT, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtnDT, { color: '#D69500' }]}>Chọn</Text>
    </TouchableOpacity>
  );
}
const ButtonUpdatePay = ({ onPress }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#D69500' }]}>Chi tiền</Text>
    </TouchableOpacity>
  )
}
const InputInfo = ({ title, placeholder }: any) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 10, marginTop: 10 }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}

      />
    </View>
  )
}
type ItemProps = { title: any, src: any, onPress: any }
const IconButton = ({ title, src, onPress }: ItemProps) => {
  const event = () => {
    onPress()
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}>
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={event} >
        <View style={{ borderRadius: 45, borderColor: 'rgba(0, 0, 0, 0.51)', borderWidth: 3, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 40, height: 40 }} source={src}></Image>
        </View>
        <Text style={styles.textNotSelected}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}



const AddSpendScreen = ({ navigation }: any) => {
  const [type, setType] = React.useState('');
  const [text, setText] = React.useState('');
  const [selected, setSelected] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const [show,setShow]=React.useState(false);
  const Pay = () => {
    Alert.alert("Pay")
  }
  const Get = () => {
    Alert.alert("Get")
  }
  const onChangeDate = (event,value) => {
    const curDate = value || date;
    setDate(curDate);
    let tempDate = new Date(curDate);
    let fDate = tempDate.getDate() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
    setShow(!show);
    setText(fDate);
    
  }
  const showDateTime = () =>{
    setShow(true);
    
  }


  return (

    <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">

      <View style={{ backgroundColor: '#00977E', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}> THÊM GIAO DỊCH</Text>
      </View>
      <View style={{ flex: 11, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, flex: 0.5, marginBottom: 20 }}>
          <View style={{ width: 60, height: 60, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 55, flex: 1 }}>
            <Image resizeMode='cover' source={require('./assets/src/img/icon-account.png')} />
          </View>
          <View style={{ marginLeft: 50, flex: 3.3 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Xin chào, User</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Số tiền đã chi</Text>
          </View>
        </View>


        <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, height: 100, marginTop: 5, paddingTop: 5, borderColor: 'rgba(0, 0, 0, 0.51)', flex: 1 }}>
          <FlatList
            horizontal={true}
            data={DATA}
            renderItem={({ item }) => <IconButton title={item.name} src={item.url}
              onPress={() => { setType(item.name) }}
            />}
            keyExtractor={(item)=>item.name}
          />

        </View>


        <View style={{ flex: 4 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#00977E', marginLeft: 10, marginTop: 10 }}>Loại chi tiêu</Text>
          <View style={{ justifyContent: 'center', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 4, borderBottomWidth: 4, borderRadius: 15, height: 35, flex: 0.45 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#00977E', marginLeft: 10, }}>{type}</Text>
          </View>
          <InputInfo title="Tên chi tiêu" placeholder="Tên chi tiêu" />

          <View style={{ flexDirection: 'row' }}>
            <View style={{flex:3}}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 10, marginTop: 10,marginBottom: 2 }}>Ngày tháng năm</Text>
              <View style={[styles.textInput,{justifyContent:'center',alignItems:'flex-start'}]}>
                <Text style={{fontSize: 14,color:'black'}}>{text}</Text>
              </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ButtonDateTime onPress={()=> showDateTime()}></ButtonDateTime>

            </View>
          </View>

          <InputInfo title="Số tiền chi" placeholder="Số tiền" />
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <ButtonUpdateGet onPress={Get} />
            <ButtonUpdatePay onPress={Pay} />
          </View>
        </View>


      </View>
      {show && 
              <DateTimePicker 
              testID='dateTimePicker'
              value={date}
              mode={'date'}
              display='spinner'
              onChange={onChangeDate}
              
              
              
              />
              
            }
    </KeyboardAvoidingView>



  )
}

export default AddSpendScreen





const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 45,
    fontSize: 15
  },
  btnDT: {
    marginTop: 35,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    marginLeft:10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
    fontSize: 12
  },
  titleBtn: {
    fontSize: 20, fontWeight: 'bold',
  },
  titleBtnDT: {
    fontSize: 20, fontWeight: 'bold',
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
  },
  textSelected: {
    fontWeight: 'bold', fontSize: 18, color: '#D69500',
  },
  textNotSelected: {
    fontWeight: 'bold', fontSize: 18, color: 'black',
  }
})