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
import Form from "../components/form";

import { Actions } from "react-native-router-flux";

export default class Login extends Component {
  signup() {
    Actions.signup();
  }

  forgotpwd() {
    Actions.forgotpwd();
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
          <TouchableOpacity onPress={this.forgotpwd}>
            <Text style={styles.singupButton}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.singupButton}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    color: "#44aedd",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "#44aedd",
    fontSize: 16,
  },
  singupButton: {
    color: "#44aedd",
    fontSize: 16,
    fontWeight: "500",
    padding: 8,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#44aedd",
  },
});
