import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, FlatList } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from "./src/main";
import persistor from "./src/config/store";

const persistStore = persistor();

global.address = "http://35.226.186.96/api/";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  /*
  componentDidMount() {
    this.apiCall();
  }
  async apiCall() {
    let resp = await fetch("http://127.0.0.1:8000/api/behavior");
    let respJson = await resp.json();
    console.log(respJson);
  }
  */

  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flex: 1,
    justifyContent: "center",
  },
});
