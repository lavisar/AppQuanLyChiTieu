import 'react-native-gesture-handler';
import React, { useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

const db = SQLite.openDatabase(
    {
        name: 'QuanLiChiTieu',
        location: 'default',
    },
    () => {
    },
    error => { console.log(error) }
);
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

function RegisterScreen({ navigation }: any): JSX.Element {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);

    const [selected, setSelected] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [hide, setHide] = React.useState(true);
    const [show, setShow] = React.useState(false);

    const onChangeDate = (event: any, value?: Date) => {
        const curDate = value || date;
        setDate(curDate);
        let tempDate = new Date(curDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth()+1) + "/" + tempDate.getFullYear();
        setShow(!show);
        setBirthday(fDate);

    }
    const Show = () => {
        setShow(!show)
      }
    const showDateTime = () => {
        setShow(true);
    }
    const Hide = () => {
        setHide(!hide)
      }
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
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
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
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
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
            if (username && password && fullname && birthday && email) {
                if (password != passwordConfirm) {
                    Alert.alert("Mật khẩu không trùng khớp!");
                }
                else {
                    checkExistedUsername;
                    checkExistedEmail;
                    if (usernameIsValid && emailIsValid) {
                        db.transaction((tx) => {
                            tx.executeSql(
                                "INSERT INTO Users (username, password, fullname, birthday, email) VALUES (?,?,?,?,?)",
                                [username, password, fullname, birthday, email],
                                (tx, results) => {
                                    if (results.rowsAffected > 0) {
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

                <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} behavior='height'>

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
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.titleInput}>Ngày tháng năm:</Text>
                                    <View style={[styles.textInput, { justifyContent: 'center', alignItems: 'flex-start' }]}>
                                        <Text style={{ color: 'black' }}>{birthday}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1.35, alignSelf: 'center', paddingBottom: 9, marginTop: -30 }}>
                                    <ButtonDateTime onPress={() => showDateTime()}></ButtonDateTime>
                                    {show && (
                                        <View>
                                            <DateTimePicker
                                                testID='dateTimePicker'
                                                value={date}
                                                mode={'date'}
                                                display='spinner'
                                                onChange={onChangeDate}

                                            />
                                        </View>)

                                    }
                                </View>
                            </View>
                            <Text style={styles.titleInput}>Gmail:</Text>
                            <TextInput
                                placeholder="Gmail"
                                style={styles.textInput}
                                placeholderTextColor='black'
                                onChangeText={setEmail}
                            />
                            <Text style={styles.titleInput}>Nhập mật khẩu mới</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor='black'
                                    style={styles.textInput}
                                    secureTextEntry={hide}
                                    onChangeText={setPassword}
                                >

                                </TextInput>
                                <TouchableOpacity style={{ flex: 1 }} onPress={Hide}>
                                    <Image source={require('./assets/src/img/showhide.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.titleInput}>Nhập lại mật khẩu mới</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor='black'
                                    style={styles.textInput}
                                    secureTextEntry={hide}
                                    onChangeText={setPasswordConfirm}
                                >

                                </TextInput>
                                <TouchableOpacity style={{ flex: 1 }} onPress={Hide}>
                                    <Image source={require('./assets/src/img/showhide.png')}></Image>
                                </TouchableOpacity>
                            </View>
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



                </KeyboardAvoidingView>

            </ImageBackground>
        </View >
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
        height: '80%',
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
        flex:5

    },
    btnRegister: {
        borderRadius: 15,
        width: 120,
        height: 45,
        backgroundColor: 'rgba(0, 151, 126, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 90,
        marginTop: 10,
        elevation: 5

    },
    textLogin: {
        alignSelf: 'center',
        paddingTop: 5,
        fontWeight: 'bold',
        color: 'rgba(214, 149, 0, 1)',
    },
    btnDT: {
        marginTop: 35,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 15,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
        fontSize: 12
    },
    titleBtnDT: {
        fontSize: 20, fontWeight: 'bold',
    },
    textInputHideShow: {
        flex:7,
        height: 45,
        borderColor: 'black',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 15,
        paddingLeft: 15,
      },
});

export default RegisterScreen;