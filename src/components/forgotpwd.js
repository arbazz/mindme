import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

import { Actions } from "react-native-router-flux";

export default class Logo extends Component {
  signin() {
    Actions.login();
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
    };
  }

  state = {
    email: "",
    loading: false,
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  componentDidMount() {
    this.getToken();
  }

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);

      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  doLogin() {
    const { email } = this.state;

    if (email) {
      const headers = {
        "API-TOKEN": "ABCDEFGHIJK",
      };

      this.setState({
        loading: true,
      });
      const req = {
        email: email,
        loading: true,
      };
      axios
        .post(global.address + "password/reset", req, {
          headers: headers,
        })
        .then(
          (res) => {
            this.setState({
              userData: JSON.stringify(res.data),
              loading: false,
            });
            Alert.alert(
              "Password sent!",
              "Please check you email.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Login");
                  },
                },
              ],
              { cancelable: false }
            );

            Actions.login();
          },
          (err) => {
            this.setState({
              loading: false,
            });
            alert("Email is wrong");
            alert(err.message);
          }
        );
    } else {
      alert("Enter email");
    }
  }

  render() {
    const { email, loading } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          value={email}
          onChangeText={(value) => this.onChangeHandle("email", value)}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#ddd" : "#1c313a",
          }}
          onPress={() => {
            Linking.openURL("http://35.226.186.96/password/reset");
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Forgot Password"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});
