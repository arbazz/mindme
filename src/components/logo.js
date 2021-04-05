import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../images/logo.png")} />
        <Text style={styles.logoText}>Personal Wellness Screening</Text>
      </View>
    );
  }
}
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    color: "#44aedd",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: "#44aedd",
  },
  logo: {
    width: 350,
    height: 63,
    padding:10
  },
  image: {
    width: deviceWidth / 2,
    height: deviceHeight / 2,
  },
});
