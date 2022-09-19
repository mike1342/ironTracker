import React, { useEffect } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from '../redux/Store';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import QueryScreen from '../screens/QueryScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const RootStack = createNativeStackNavigator();


const TabStackScreen = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStack" component={HomeScreen}
          options={{
            header: () => <View />
          }
          } />
        <Tab.Screen name="FeedbackStack" component={ListScreen}
          options={{
            header: () => <View />
          }
          } />
        <Tab.Screen name="MemberStack" component={QueryScreen}
          options={{
            header: () => <View />
          }
          } />
      </Tab.Navigator>
    );
};

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="main">
                <RootStack.Screen name="main" component={TabStackScreen}
                    options={{
                    header: () => <View />,
                    }}
                />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

