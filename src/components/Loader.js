import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { Actions } from "react-native-router-flux";

export default class Loader extends Component {
  constructor() {
    super();
    this.checkToken();
  }
  checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Actions.startup();
    } else {
      Actions.login();
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    justifyContent: "center",
  },
});
