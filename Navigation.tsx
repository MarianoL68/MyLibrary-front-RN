import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


// Screens
import HomeScreen from "./screens/HomeScreen";
import FormScreen from "./screens/FormScreen";
import CardDetail from "./screens/CardDetail";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


const MyStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CardDetail"
        //@ts-ignore
        component={(props) => <CardDetail {...props} />}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
     initialRouteName="Home"
     screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle:{
          height: 60,
          backgroundColor: "lightblue",
          position: "absolute",
          
        }
    }}
    >
      <Tab.Screen 
       name="Home" 
       component={MyStack}
       options={{
        tabBarLabel:"My Books",
        headerShown: false,
        tabBarIcon: ({color, size}: any) => (
          <Ionicons name="library" size={size} color={color} />
        )
       }}
      />
      <Tab.Screen 
       name="Form" 
       component={FormScreen} 
       options={{
        tabBarLabel:"Add Book",
        headerShown: false,
        tabBarIcon: ({color, size}: any) => (
          <Entypo name="add-to-list" size={size} color={color} />
        )
       }}
       />
    </Tab.Navigator>
  );
};


const Navigation = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default Navigation;