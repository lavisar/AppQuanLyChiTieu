import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
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

const ButtonUpdate = ({ onPress }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#00977E' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#00977E' }]}>Cập nhật</Text>
    </TouchableOpacity>
  );
}

const ButtonLogout = ({ onPress }: any) => {
  const event = () => {
    onPress();
  }
  return (
    <TouchableOpacity style={[styles.btn, { borderColor: '#D69500' }]} onPress={event}>
      <Text style={[styles.titleBtn, { color: '#D69500' }]}>Đăng xuất</Text>
    </TouchableOpacity>
  )
}
type ItemProps = { title: any, value: any, onChangeText: any, placeholder: string }
const InputInfo = ({ title, value, onChangeText, placeholder }: ItemProps) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>{title}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}


const UserScreen = ({ navigation }: any) => {
  // access userName in global variables
  const { userName } = useContext(UserContext); // get global variable
  const { password } = useContext(UserContext); // get global variable
  const { fullname } = useContext(UserContext); // get global variable
  const { birthday } = useContext(UserContext); // get global variable
  const { email } = useContext(UserContext); // get global variable

  console.log(" - Đang lấy dữ liệu từ biến global...")
  console.log(">> Dữ liệu lấy được: " + userName, password, fullname, birthday, email)

  //for new update infomation
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newFullname, setNewFullname] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newBirthday, setNewBirthday] = React.useState('');
  const [hide, setHide] = useState(true);
  const Hide = () => {
    setHide(!hide)
  }

  // log out
  const Logout = () => {
    navigation.popToTop()
  }

  // handle update
  const HandleUpdate = () => {
    try {
      console.log(" - Đang kiểm tra dữ liệu nhập vào")
      if (newPassword && newFullname) {
        console.log(" - Đang thực hiện truy vấn DB để cập nhật...")
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Users SET password = ?, fullname = ? WHERE username = ?",
            [newPassword, newFullname, userName],
            (tx, results) => {
              // Xử lý kết quả sau khi cập nhật dữ liệu
              if (results.rowsAffected > 0) {
                Alert.alert("Cập nhật thành công");
                console.log(" >> Ghi dữ liệu thành công");
              } else {
                console.log(" >> Điều kiện fasle");
                Alert.alert("Có lỗi xảy ra, vui lòng khởi động lại ứng dụng");
              }
            }
          );
        });
      }
      else {
        console.log(">> password và fullname chưa có dữ liệu")
        Alert.alert("Hãy điền tên và mật khẩu mới!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: 80, height: 80, borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 45 }}>
            <Image source={require('./assets/src/img/icon-account.png')} />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'flex-end' }}>  Xin chào, {fullname}</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>Tên Đăng Nhập</Text>
          <TextInput
            style={styles.textInput}
            placeholder={userName.toString()}
            editable={false}
          />
        </View>

        <InputInfo
          title="Họ và Tên"
          value={newFullname}
          onChangeText={setNewFullname}
          placeholder={fullname.toString()}
        />

        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>Ngày Sinh</Text>
          <TextInput
            style={styles.textInput}
            placeholder={birthday.toString()}
            editable={false}
          />
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder={email.toString()}
            editable={false}
          />
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}>Mật Khẩu</Text>
          <TextInput
            style={styles.textInput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder='Please enter your new password'
            placeholderTextColor='black'
            secureTextEntry={hide}
          />
          <TouchableOpacity style={{ flex: 1 }} onPress={Hide}>
            <Image source={require('./assets/src/img/showhide.png')}></Image>
          </TouchableOpacity>
        </View>

        {/* <InputInfo
          title="Mật khẩu"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder={"************"}
          secureTextEntry={hide}
        /> */}

        <ButtonUpdate onPress={HandleUpdate} />
        <ButtonLogout onPress={Logout} />

        {/* Empty view for margin bottom */}
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 5, marginLeft: 10, marginTop: 10 }}></Text>
        </View>
      </View>
    </ScrollView>

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