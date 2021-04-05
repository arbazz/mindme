import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import { Actions } from "react-native-router-flux";
import { background } from "./config";

export default class Login extends Component {

  startup() {
    Actions.startup();
  }
  _isMounted = false;
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: background,
        height: 40,
        elevation: 5,
      },
      headerTintColor: "#000",
      headerTitle: "Suggestions",
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/logo.png')} />
        <Text style={[styles.title, {backgroundColor: '#fff5e1'}]}>MindMe is an innovative app designed to offer the ability for you to self-monitor your mental health from wherever you are. </Text>
        <Text style={[styles.title, {backgroundColor: '#ffeaf6'}]}>The MindMe app utilizes a scientifically validated assessment instrument called the Self-Management Self-Test developed to help you monitor for depression, anxiety, stress, fatigue and burnout. </Text>
        <Text style={styles.title}>The Self-Management Self-Test (SMST) was developed to assess your self-management competence. It consists of five questions that relate the following five dimensions of self-management: </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    alignItems: 'center',
    flex: 1
  },
  title: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f8f7f7',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 12
  },
  image: {
    marginTop: 30,
    marginBottom: 10
  }
});
