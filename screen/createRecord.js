import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const CreateRecordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Clinic App</Text>
      <Text>Sign Up Form</Text>
      <Text>Form</Text>
      <TextInput style={styles.input} type="text" className="email" />
      <TextInput style={styles.input} type="text" className="password" />
      <TextInput style={styles.input} type="text" className="clinic_name" />
      <TextInput style={styles.input} type="text" className="phone" />
      <TextInput style={styles.input} type="text" className="address" />
      <Button
        title="Submit"
        onPress={() => navigation.navigate("Registration")}
      />
      <StatusBar style="auto" />
    </View>
  );
};
export default CreateRecordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    margin: 2,
  },
});
