import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Clinic App</Text>
      <Text>Sign Up Form</Text>
      <Text>Form</Text>
      <TextInput type="text" className="email" />
      <TextInput type="text" className="password" secureTextEntry={true} />
      <TextInput type="text" className="clinic_name" />
      <TextInput type="text" className="phone" />
      <TextInput type="text" className="address" />
      <StatusBar style="auto" />
    </View>
  );
};
export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});
