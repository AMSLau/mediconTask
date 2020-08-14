import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const loginAuth = () => {
    try {
      fetch("localhost:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          try {
            console.log(data.token);
            await AsyncStorage.setItem("token");
            if (token) {
              console.log("200 : token valid --> direct to home");
              props.navigation.navigate("Home");
            } else {
              console.log("400 : token invalid --> direct to login");
              props.navigation.navigate("Login");
            }
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Clinic App</Text>
      <Text>Sign Up Form</Text>
      <Text>Form</Text>
      <TextInput style={styles.inputtext} className="email" />
      <TextInput
        style={styles.inputtext}
        className="password"
        secureTextEntry={true}
      />
      <TextInput style={styles.inputtext} className="clinic_name" />
      <TextInput style={styles.inputtext} className="phone" />
      <TextInput style={styles.inputtext} className="address" />
      <Button title="Submit" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};
export default RegistrationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  inputtext: {
    height: 40,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    margin: 2,
  },
});
