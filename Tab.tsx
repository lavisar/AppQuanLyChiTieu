import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpendScreen from './SpendScreen';
import TotalSpendScreen from './TotalSpendScreen';
import UserScreen from './UserScreen';
import StockScreen from './StockScreen';
import AddSpendScreen from './AddSpendScreen'
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import type { PropsWithChildren } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Button
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const Tab = createBottomTabNavigator();


const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    marginHorizontal: 15,
                    height: 80,
                    bottom: 10,
                    borderRadius: 15,
                    ...styles.shadow
                },
                tabBarHideOnKeyboard: true,

            }}
        >
            <Tab.Screen name="SpendScreen" component={SpendScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60, height: 85,
                        borderTopWidth: 5,
                        borderColor: focused ? '#D69500' : 'transparent'
                    }}>
                        <Image source={require('./assets/src/img/icon-chitieu.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? 50 : 40,
                                height: focused ? 50 : 40,

                            }}
                        />
                        <Text style={{ color: focused ? '#D69500' : '#00977E', fontSize: 13, fontWeight: 'bold' }}>Chi tiêu</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="TotalSpendScreen" component={TotalSpendScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60, height: 85,
                        borderTopWidth: 5,
                        borderColor: focused ? '#D69500' : 'transparent'
                    }}>
                        <Image source={require('./assets/src/img/icon-baocao.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? 50 : 40,
                                height: focused ? 50 : 40,
                            }}
                        />
                        <Text style={{ color: focused ? '#D69500' : '#00977E', fontSize: 13, fontWeight: 'bold' }}>Báo cáo</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="AddSpendScreen" component={AddSpendScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.containerSelect}>
                        <Image source={require('./assets/src/img/icon-add.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? 75 : 65,
                                height: focused ? 75 : 65,
                                top: focused ? -30 : -20,
                                
                                
                            }}
                        />
                    </View>
                )
            }} />
            < Tab.Screen name="StockScreen" component={StockScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60, height: 85,
                        borderTopWidth: 5,
                        borderColor: focused ? '#D69500' : 'transparent'
                    }}>
                        <Image source={require('./assets/src/img/icon-ck.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? 50 : 40,
                                height: focused ? 50 : 40,

                            }}
                        />
                        <Text style={{ color: focused ? '#D69500' : '#00977E', fontSize: 13, fontWeight: 'bold' }}>Stock</Text>
                    </View>
                )
            }} />
            < Tab.Screen name="UserScreen" component={UserScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60, height: 85,
                        borderTopWidth: 5,
                        borderColor: focused ? '#D69500' : 'transparent'
                    }}>
                        <Image source={require('./assets/src/img/icon-user.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? 50 : 40,
                                height: focused ? 50 : 40,

                            }}
                        />
                        <Text style={{ color: focused ? '#D69500' : '#00977E', fontSize: 13, fontWeight: 'bold' }}>Tài khoản</Text>
                    </View>
                )
            }} />
        </Tab.Navigator >
    )
}
const styles = StyleSheet.create({
    containerSelect: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60, height: 10,
        
        
    },
    shadow: {
        shadowColor: 'black',
        textShadowOffset: {
            width: 0,
            height: 2,
        }
    }
});
export default Tabs;