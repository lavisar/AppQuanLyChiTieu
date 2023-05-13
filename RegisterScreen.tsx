
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
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


function RegisterScreen({ navigation }: any): JSX.Element {

    const [text, onChangeText] = React.useState('');
    const Register = () => (
        navigation.goBack()
    )
    const BackTo = () => (
        navigation.goBack()
    )


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.panel} resizeMode='cover' source={require('./assets/src/img/panel-login.png')}>
                <ScrollView style={{flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header}>TẠO TÀI KHOẢN MỚI</Text>

                        <View style={styles.loginContainer}>
                            <TouchableOpacity style={{ marginLeft: -30, marginBottom: 10 }} onPress={BackTo}>
                                <Image source={require('./assets/src/img/icon-back.png')}></Image>
                            </TouchableOpacity>

                            <Text style={styles.titleInput}>Tên đăng nhập:</Text>
                            <TextInput
                                placeholder="Tên đăng nhập"
                                style={styles.textInput}
                                placeholderTextColor='black'
                            />


                            <Text style={styles.titleInput}>Họ và tên:</Text>
                            <TextInput
                                placeholder="Họ và tên"
                                style={styles.textInput}
                                placeholderTextColor='black'
                            />
                            <Text style={styles.titleInput}>Ngày sinh:</Text>
                            <TextInput
                                placeholder="Ngày sinh"
                                style={styles.textInput}
                                placeholderTextColor='black'
                            />
                            <Text style={styles.titleInput}>Gmail:</Text>
                            <TextInput
                                placeholder="Gmail"
                                style={styles.textInput}
                                placeholderTextColor='black'

                            />
                            <Text style={styles.titleInput}>Nhập mật khẩu mới</Text>
                            <TextInput
                                placeholder="Nhập mật khẩu mới"
                                style={styles.textInput}
                                placeholderTextColor='black'

                            />
                            <Text style={styles.titleInput}>Nhập lại mật khẩu</Text>
                            <TextInput
                                placeholder="Nhập lại mật khẩu"
                                style={styles.textInput}
                                placeholderTextColor='black'

                            />
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text>Bạn đã có tài khoản ?</Text>
                                <TouchableOpacity onPress={BackTo}>
                                    <Text style={{ color: 'rgba(0, 151, 126, 1)' }}> Đăng nhập</Text>
                                </TouchableOpacity>
                            </View>


                            <TouchableOpacity style={styles.btnRegister} onPress={Register}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>ĐĂNG KÍ</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
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
        height: 675,
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