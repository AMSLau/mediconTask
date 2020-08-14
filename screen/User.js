import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const DetailScreen = ({ navigation }) => {
  const data = [
    {
      recordID: "1",
      doctor_name: "Alex Lau",
      patient_name: "Tracy Al",
      diagnosis: "Flu",
      Date: "2020-08-09",
    },
    {
      recordID: "2",
      doctor_name: "Adrian Tong",
      patient_name: "Amy Wong",
      diagnosis: "Flu",
      Date: "2020-08-08",
    },
    {
      recordID: "3",
      doctor_name: "lorem ipsum",
      patient_name: "Alan ng",
      diagnosis: "Flu",
      Date: "2020-08-09",
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Clinic App</Text>
      <Text>Sign Up Form</Text>
      <div key={index}>
        <span>{c}</span>
        <span>{card.caption[i]}</span>
      </div>
      <StatusBar style="auto" />
      <Button title="Detail" onPress={() => navigation.navigate("Detail")} />
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
