import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, FlatList } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./screen/Home";
import LoginScreen from "./screen/Login";
import RegistrationScreen from "./screen/SignUp";
import CreateRecordScreen from "./screen/createRecord";
import DetailScreen from "./screen/Detail";
import ListScreen from "./screen/User";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    CreateRecord: CreateRecordScreen,
    Detail: DetailScreen,
    List: ListScreen,
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
