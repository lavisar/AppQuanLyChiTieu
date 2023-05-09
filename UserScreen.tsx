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


const ButtonUpdate = ({ onPress }:any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#00977E' }]}>Cập nhật</Text>
    </TouchableOpacity>
  );
}

const ButtonLogout = ({ onPress }:any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#D69500' }]}>Đăng xuất</Text>
    </TouchableOpacity>
  )
}
type ItemProps = { title: any, placeholder: any }
const InputInfo = ({ title, placeholder }: ItemProps) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='black'
        style={styles.textInput}

      />
    </View>
  )
}



const UserScreen = ({ navigation }:any) => {
  const [text, onChangeText] = React.useState('');
  const Logout = () => {
    navigation.popToTop()
  }
  const Update = () => {
    Alert.alert("UPDATE")
  }
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>


      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
        <View style={{ width: 80, height: 80, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 45 }}>
          <Image source={require('./assets/src/img/icon-account.png')} />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'flex-end' }}>  Xin chào, User</Text>
        </View>
      </View>



      <InputInfo title="Tên đăng nhập" placeholder="Tên đăng nhập" />
      <InputInfo title="SĐT" placeholder="SĐT" />
      <InputInfo title="Gmail" placeholder="Gmail" />
      <InputInfo title="Mật khẩu" placeholder="Mật khẩu" />


      <ButtonUpdate onPress={Update} />
      <ButtonLogout onPress={Logout} />

    </View>

  )
}

export default UserScreen





const styles = StyleSheet.create({
  btn: {
    marginTop: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    marginLeft: 230,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  titleBtn: {
    fontSize: 20, fontWeight: 'bold',
  },
  textInput: {

    height: 45,
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 15,
    paddingLeft: 15,
  },
})