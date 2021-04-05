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
import { background, primary } from "./config";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.main}>
        <MaterialIcons name="arrow-back" size={24} color="black" onPress={this.signin}/>
          <View style={styles.ohter}>
            <Text style={styles.reset}>Reset Password</Text>
            <Text style={styles.pleser}>Please enter your email address and we
             will send your password by email.</Text>
          </View>
          <View style={styles.email}>
            <Text style={styles.emailText}>Email</Text>
            <CustomInput />
          </View>
          <View style={styles.constinerHtn}>
            <CustomButton text={"Send"} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flexGrow: 1,
  },
  main: {
    marginTop: 40,
    width: '90%',
    alignSelf: 'center'
  },
  constinerHtn: {
    marginTop: 30
  },
  ohter: {
    marginTop: 80,
  },
  reset: {
    alignSelf: 'center',
    fontSize :24,
    fontWeight: 'bold',
  },
  pleser: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '70%'
  },
  email: {
    marginTop: 30,

  },
  emailText: {
    color: 'grey',
    marginLeft: 1,
    marginBottom: 4
  }
});
