import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'QuanLiChiTieu',
        location: 'default',
    },
    () => { },
    (error) => {
        console.log(error);
    }
);

function ResetPassScreen({ navigation }: any) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = () => {
        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu không khớp, vui lòng kiểm tra lại');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND email = ?',
                [username, email],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        db.transaction((tx) => {
                            tx.executeSql(
                                'UPDATE users SET password = ? WHERE username = ?',
                                [password, username],
                                (tx, results) => {
                                    if (results.rowsAffected > 0) {
                                        Alert.alert('Thông báo', 'Mật khẩu đã được đặt lại thành công');
                                        console.log(">> Đặt lại mật khẩu thành công");
                                        console.log(">> Mật khẩu mới :", password);
                                        navigation.goBack();
                                    } else {
                                        Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại sau');
                                    }
                                }
                            );
                        });
                    } else {
                        Alert.alert('Thông báo', 'Thông tin không khớp, vui lòng kiểm tra lại');
                    }
                }
            );
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.panel} source={require('./assets/src/img/panel-login.png')}>
                <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                    <Text style={styles.header}>QUÊN MẬT KHẨU</Text>

                    <View style={styles.loginContainer}>
                        <TouchableOpacity
                            style={{ marginLeft: -30, marginBottom: 20 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('./assets/src/img/icon-back.png')} />
                        </TouchableOpacity>
                        <ScrollView style={{flex:1}}   scrollEnabled={false}
  nestedScrollEnabled={false}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Tên đăng nhập:</Text>
                            <TextInput
                                placeholder="Tên đăng nhâp của tài khoản bạn"
                                style={styles.textInput}
                                placeholderTextColor="black"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Email:</Text>
                            <TextInput
                                placeholder="Nhập Email của tài khoản bạn"
                                style={styles.textInput}
                                placeholderTextColor="black"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Mật Khẩu mới:</Text>
                            <TextInput
                                placeholder="Mật khẩu mới"
                                style={styles.textInput}
                                placeholderTextColor="black"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                            
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'rgba(214, 149, 0, 1)', }}>Nhập lại mật khẩu mới:</Text>
                            <TextInput
                                placeholder="Xác nhận mật khẩu"
                                style={styles.textInput}
                                placeholderTextColor="black"
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry
                            />
                            
                            </ScrollView>
                            <Text style={{fontSize: 15, color: 'rgba(0, 151, 126, 1)', }}>Vui lòng nhập đúng tên đăng nhập và email để thay đổi được mật khẩu mới của bạn</Text>
                            <TouchableOpacity style={styles.btnApct} onPress={handleResetPassword}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>XÁC NHẬN</Text>
                            </TouchableOpacity>
                        
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
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 38,
        marginBottom: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 20,
        marginTop: 10,
    },
    loginContainer: {
        paddingHorizontal: 20,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 10,
        width: 350,
        height: '65%',
        backgroundColor: 'white',
        elevation: 10,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 28,
        fontWeight: 'bold'
    },
    btnApct: {
        borderRadius: 15,
        width: 120,
        height: 50,
        backgroundColor: 'rgba(0, 151, 126, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        elevation: 5,
    },
});

export default ResetPassScreen;
