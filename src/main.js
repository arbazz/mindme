import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import Routes from "../src/components/Routes";

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && (
          <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
        )}
        <Routes />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default connect(null, null)(Main);
