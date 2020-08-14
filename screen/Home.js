import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";

const HomeScreen = ({ props, navigation }) => {
  //const [data, setData] = useState(true);
  //   const loadData = () => {
  //     try {
  //       fetch("localhost:5000", {
  //         method: "GET",
  //       })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //           console.log(responseJson);
  //           setData(responseJson);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //onPress={this.loginAuth()}
  //console.log("Image : " + require("../assets/ClinicLogo2.jpg"));
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require("./images/ClinicLogo.png")}
      />
      <Text>Clinic App</Text>
      <Text>Home</Text>
      <Button title="Log in" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Create Record"
        onPress={() => navigation.navigate("CreateRecord")}
      />
      <Button
        title="SignUp"
        onPress={() => navigation.navigate("Registration")}
      />
      <Button title="List" onPress={() => navigation.navigate("List")} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});
