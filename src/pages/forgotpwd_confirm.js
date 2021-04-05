import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import Logo from "../components/logo";
import Form from "../components/forgotpwd";

import { Actions } from "react-native-router-flux";

export default class Login extends Component {
  signup() {
    Actions.signup();
  }

  forgotpwd() {
    Actions.forgotpwd();
  }

  signin() {
    Actions.login();
  }

  startup() {
    Actions.startup();
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form type="Login" />
        <View style={styles.signupTextCont}>
          <TouchableOpacity onPress={this.signin}>
            <Text style={styles.singupButton}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.singupButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  singupButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    padding: 8,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
});
