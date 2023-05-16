import 'react-native-gesture-handler';
import React, { useState} from 'react';
import type { PropsWithChildren } from 'react';
import SQLite from 'react-native-sqlite-storage';
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
    Button,
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

const db = SQLite.openDatabase(
    {
      name: 'QuanLiChiTieu',
      location: 'default',
    },
    () => {
    },
    error=>{console.log(error)}  
);


function RegisterScreen({ navigation }: any): JSX.Element {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);


    const [text, onChangeText] = React.useState('');
    const Register = () => (
        navigation.goBack()
    )
    const BackTo = () => (
        navigation.goBack()
    )

    const checkExistedUsername = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT username FROM Users WHERE username = ?",
                    [username],
                    (tx, results) =>{
                        var len = results.rows.length;
                        if (len > 0){
                            Alert.alert("Tên đăng nhập này đã có người sử dụng. Hãy chọn một tên đăng nhập khác!");
                            setUsernameIsValid(false);
                        }
                    }
                )
            })
        } catch (error) {
          console.log(error);
        }
    }
    const checkExistedEmail = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT email FROM Users WHERE email = ?",
                    [email],
                    (tx, results) =>{
                        var len = results.rows.length;
                        if (len > 0){
                            Alert.alert("Email này đã được sử dụng. Hãy chọn một email khác để đăng ký!");
                            setEmailIsValid(false);
                        }
                    }
                )
            })
        } catch (error) {
          console.log(error);
        }
    }

    const handleRegister = async () => {
        try {
          if (username && password && fullname && birthday && email){
            if (password != passwordConfirm){
                Alert.alert("Mật khẩu không trùng khớp!");
            }
            else {

                checkExistedUsername;
                checkExistedEmail;
                if (usernameIsValid && emailIsValid){
                     db.transaction( (tx) => {
                        tx.executeSql(
                            "INSERT INTO Users (username, password, fullname, birthday, email) VALUES (?,?,?,?,?)",
                            [username, password, fullname, birthday, email],
                            (tx, results) =>{
                                if (results.rowsAffected > 0){
                                    Alert.alert("Đăng ký tài khoản thành công!");
                                    Register;
                                }
                                else {
                                    Alert.alert("Đăng ký tài khoản không thành công! Hãy thử lại");
                                }
                            }
                        )
                    })
                }
            }
            
          }
          else {
              Alert.alert("Hãy điền đầy đủ các thông tin cần thiết!");
          }
          
        } catch (error) {
          console.log(error);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <ImageBackground style={styles.panel} resizeMode='cover' source={require('./assets/src/img/panel-login.png')}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    
                    <Text style={styles.header}>TẠO TÀI KHOẢN MỚI</Text>      
                    


                    <View style={styles.loginContainer}>

                        <TouchableOpacity style={{ marginLeft: -30, marginBottom: 10 }} onPress={BackTo}>
                            <Image source={require('./assets/src/img/icon-back.png')}></Image>
                        </TouchableOpacity>
                        <ScrollView style={{ flex: 1 }}>
                            <Text style={styles.titleInput}>Tên đăng nhập:</Text>
                            <TextInput
                                placeholder="Tên đăng nhập"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setUsername}
                            />
                            <Text style={styles.titleInput}>Họ và tên:</Text>
                            <TextInput
                                placeholder="Họ và tên"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setFullname}
                            />
                            <Text style={styles.titleInput}>Ngày sinh:</Text>
                            <TextInput
                                placeholder="Ngày sinh"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setBirthday}
                            />
                            <Text style={styles.titleInput}>Gmail:</Text>
                            <TextInput
                                placeholder="Gmail"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setEmail}
                            />
                            <Text style={styles.titleInput}>Nhập mật khẩu mới</Text>
                            <TextInput
                                placeholder="Nhập mật khẩu mới"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setPassword}
                            />
                            <Text style={styles.titleInput}>Nhập lại mật khẩu</Text>
                            <TextInput
                                placeholder="Nhập mật khẩu mới"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setPasswordConfirm}
                            />

                        </ScrollView>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text>Bạn đã có tài khoản ?</Text>
                            <TouchableOpacity onPress={BackTo}>
                                <Text style={{ color: 'rgba(0, 151, 126, 1)' }}> Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>ĐĂNG KÍ</Text>
                        </TouchableOpacity>


                    </View>

                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {
        width: 100,
        height: 100,
    },
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 38,
        marginBottom: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 25,
        
    },
    loginContainer: {
        paddingHorizontal: 20,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 10,
        width: 375,
        height: '70%',
        backgroundColor: 'white',
        elevation: 10,
        
    },
    titleInput: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'rgba(214, 149, 0, 1)',
    },
    textInput: {
        height: 35,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 25,

    },
    btnRegister: {
        borderRadius: 15,
        width: 120,
        height: 45,
        backgroundColor: 'rgba(0, 151, 126, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 90,
        marginTop: 20,
        elevation: 5

    },
    textLogin: {
        alignSelf: 'center',
        paddingTop: 5,
        fontWeight: 'bold',
        color: 'rgba(214, 149, 0, 1)',
    }

});

export default RegisterScreen;