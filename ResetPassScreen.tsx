
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


function ResetPassScreen({navigation}:any): JSX.Element {

    const [text, onChangeText] = React.useState('');
    const [confirm, setConfirm] = React.useState(false)
    const Reset = () => (
        navigation.goBack()
    )
    const BackTo = () => (
        navigation.goBack()
    )
    const KeyGmail = () =>{
        Alert.alert("Đã gửi lại mã")
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.panel} source={require('./assets/src/img/panel-login.png')}>
                <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.header}>QUÊN MẬT KHẨU</Text>

                    <View style={styles.loginContainer}>
                    <TouchableOpacity style={{marginLeft:-30,marginBottom:20}} onPress={BackTo}>
                        <Image source={require('./assets/src/img/icon-back.png')}></Image>
                    </TouchableOpacity>


                        <Text style={styles.titleInput}>Gmail:</Text>
                        <TextInput
                            placeholder="Gmail"
                            style={styles.textInput}
                            placeholderTextColor= 'black'
                        />
                        <Text style={styles.titleInput}>Mã xác nhận:</Text>
                        <TextInput
                            placeholder="Mã xác nhận"
                            style={styles.textInput}
                            placeholderTextColor= 'black'
                        />
                        <Text style={styles.titleInput}>Nhập mật khẩu mới</Text>
                        <TextInput
                            placeholder="Nhập mật khẩu mới"
                            style={styles.textInput}
                            placeholderTextColor= 'black'
                        />
                        <Text style={styles.titleInput}>Nhập lại mật khẩu</Text>
                        <TextInput
                            placeholder="Nhập lại mật khẩu"
                            style={styles.textInput}
                            placeholderTextColor= 'black'
                        />


                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Text>Bạn chưa nhận được ?</Text>
                            <TouchableOpacity onPress={KeyGmail}>
                                <Text style={{color: 'rgba(0, 151, 126, 1)'}}> Gửi lại mã</Text>
                            </TouchableOpacity>                          
                        </View>

                        
                        <TouchableOpacity style={styles.btnApct} onPress={BackTo}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold'}}>XÁC NHẬN</Text>
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
        textShadowOffset: {width:1,height:2},
        textShadowRadius: 20,
        
    },
    loginContainer: {
        paddingHorizontal: 20,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 10,
        width: 350,
        height: 580,
        backgroundColor: 'white',
        elevation:10
    },
    titleInput:{
        fontWeight: 'bold',
        fontSize: 18,
        color: 'rgba(214, 149, 0, 1)',
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,

    },
    btnApct: {
        borderRadius: 15,
        width: 120,
        height: 45,
        backgroundColor: 'rgba(0, 151, 126, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:90,
        marginTop:10,
        elevation:5

    },
    textLogin: {
        alignSelf: 'center',
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'rgba(214, 149, 0, 1)',
        fontFamily: 'Segoe UI'
    }
    
});

export default ResetPassScreen;