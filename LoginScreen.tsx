
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
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


function LoginScreen({ navigation }:any): JSX.Element {
    // const db = SQLite.openDatabase({ name: 'QuanLyChiTieu.db', createFromLocation: '~QuanLyChiTieu.db' });

    // db.then((dbInstance) => {
    //     dbInstance.transaction((tx) => {
    //         tx.executeSql(
    //             `CREATE TABLE IF NOT EXISTS account (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             username TEXT,
    //             password TEXT
    //             )`,
    //             [],
    //             () => console.log('Table created successfully'),
    //             (error) => console.log('Error creating table: ', error)
    //         );
    //     });
    // }).catch((error) => console.log('Error opening database: ', error));

    const initializeDatabase = async () => {
        try {
          const db = await SQLite.openDatabase({ name: 'QuanLyChiTieu.db', createFromLocation: '~QuanLyChiTieu.db' });
          return db;
        } catch (error) {
          console.log('Error opening database: ', error);
          return null;
        }
      };
    
      const createTable = async (db: SQLite.SQLiteDatabase) => {
        try {
          await db.transaction((tx) => {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS Accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT,
                fullname TEXT,
                birthday TEXT,
                email TEXT
              )`,
              [],
              () => console.log('Table created successfully'),
              (error) => console.log('Error creating table: ', error)
            );
          });
        } catch (error) {
          console.log('Error executing transaction: ', error);
        }
      };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        const db = await initializeDatabase();
        if (db) {
          await createTable(db);
          
          if (username && password) {
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT * FROM account WHERE username = ? AND password = ?',
                [username, password],
                (_, { rows }) => {
                  if (rows.length > 0) {
                    Alert.alert('Login successful');
                  } else {
                    Alert.alert('Invalid username or password');
                  }
                },
                (error) => console.log('Error executing query: ', error)
              );
            });
          } else {
            Alert.alert('Please enter username and password');
          }
        }
      };
      
    const [text, onChangeText] = useState('');


    const Login = () => {
        navigation.navigate("HomeScreen")
    }

    const Register = () => {
        navigation.navigate("RegisterScreen")
    }

    const ResetPass = () => {
        navigation.push("ResetPassScreen")
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.panel} source={require('./assets/src/img/panel-login.png')}>
                <Image style={styles.icon} source={require('./assets/src/img/icon-app-removebg-preview.png')}></Image>
                <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }}>

                    <Text style={styles.header}>WATCH YOUR MONEY </Text>



                    <View style={styles.loginContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Tên đăng nhập:</Text>
                        <TextInput
                            placeholder="Tên đăng nhâp"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText={setUsername}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Mật khẩu:</Text>
                        <TextInput
                            placeholder="Mật khẩu"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText={setPassword}
                        />



                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: -20 }}>
                            <TouchableOpacity onPress={ResetPass}>
                                <Text style={{ color: 'rgba(214, 149, 0, 1)', fontWeight: 'bold' }}> Quên mật khẩu ?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                            <Text style={{ color: 'rgba(0, 151, 126, 1)', fontSize: 18, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 40 }}>
                            <Text>Bạn chưa có có tài khoản ?</Text>
                            <TouchableOpacity onPress={Register}>
                                <Text style={{ color: 'rgba(0, 151, 126, 1)', fontWeight: 'bold' }}> Đăng kí</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 10,
        width: 300,
        height: 350,
        backgroundColor: 'white',
        elevation: 10,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 6,
        borderBottomWidth: 6,
        borderColor: 'rgba(0, 151, 126, 1)'
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 30,

    },
    btnLogin: {
        borderRadius: 15,
        width: 120,
        height: 45,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 120,
        marginTop: 10,
        elevation: 10,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: 'rgba(0, 151, 126, 1)'

    },
    textLogin: {
        alignSelf: 'center',
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'rgba(214, 149, 0, 1)',
        fontFamily: 'Segoe UI'
    }

});

export default LoginScreen;

