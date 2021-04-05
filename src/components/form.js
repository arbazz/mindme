import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

import { Actions } from "react-native-router-flux";
import { setToken } from "../api/token";

export default class Logo extends Component {
  startup() {
    Actions.startup();
  }

  servayScreen() {
    Actions.SurveyCompletedScreen();
  }

  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: false,
      showPassword: true,
    };
  }

  state = {
    email: "",
    password: "",
    loading: false,
  };

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  _isMounted = false;
  async componentDidMount() {
    
    this._isMounted = true;
    this.getToken();
    const email = await this.getRememberedUser();
    this.setState({ 
       email: email || "", 
       rememberMe: email ? true : false });
    }

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      
      await setToken(user.access_token);
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
  //This is the toggle button to remember user
  toggleRememberMe = value => {
    this.setState({ rememberMe: value })
      if (value === true) {
    //user wants to be remembered.
      this.rememberUser();
    } else {
      this.forgetUser();
    }
  }

  //lets remember the user when they login
  rememberUser = async () => {
    try {
      await AsyncStorage.setItem(user.access_token, this.state.email);
    } catch (error) {
      // Error saving data
    }
    };
    getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem(user.access_token);
      
      if (email !== null) {
        // We have username!!
        return email;
      }
    } catch (error) {
      // Error retrieving data
    }
    };
    forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('Longtail-User');
        await AsyncStorage.clear();
      } catch (error) {
       // Error removing
      }
    };

  doLogin() {
    const { email, password } = this.state;

    if (email && password) {
      const headers = {
        "API-TOKEN": "ABCDEFGHIJK",
      };

      this.setState({
        loading: true,
      });
      const req = {
        email: email,
        password: password,
        loading: true,
      };
      axios
        .post(global.address + "login", req, {
          headers: headers,
        })
        .then(
          (res) => {
            this.setState({
              userData: JSON.stringify(res.data),
              loading: false,
            });

            this.storeToken(res.data).then((res) => {
              Actions.startup();
              AsyncStorage.setItem("token", res.data.access_token);
            });

            //AsyncStorage.setItem("id", res.data.user.id);
            //AsyncStorage.setItem("token", res.data.access_token).then((res) => {
            //  Actions.startup();
            //});

            //this.props.navigation.navigate(startup);
            console.warn(res.message);
          },
          (err) => {
            this.setState({
              loading: false,
            });
            alert("Username/password is wrong");
            alert(err.message);
          }
        );
    } else {
      alert("Enter username and passwwod");
    }
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="#fff"
          placeholder="Email"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={email}
          onChangeText={(value) => this.onChangeHandle("email", value)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="#fff"
          secureTextEntry={this.state.showPassword}
          placeholder="Password"
          //secureTextEntry={true}
          placeholderTextColor="#fff"
          value={password}
          onChangeText={(value) => this.onChangeHandle("password", value)}
        />
        
      <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
          
        /> 
        <Text>Show Password</Text>
        
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#fff" : "#1c313a",
          }}
          onPress={() => this.doLogin()}
          disabled={loading}
        >
          
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Log In"}
          </Text>
          
        </TouchableOpacity>

        <Switch
          value={this.state.rememberMe}
          onValueChange={(value) => this.toggleRememberMe(value)}
          activeText={'On'}
          /><Text >Remember Me</Text>
        
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
    backgroundColor: "#44aedd",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
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
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  rememberText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "left",
    paddingHorizontal: 5,
  },
});
