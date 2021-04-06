import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  CheckBox,
  Switch,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Logo from "../components/logo";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import { Actions } from "react-native-router-flux";
import CustomInput from "../components/CustomInput";
import { primary } from "./config";
import { addProfileData } from "../fire/addData";

export default class Login extends Component {
  startup() {
    Actions.startup();
  }

  goBack() {
    Actions.pop();
  }

  signin() {
    Actions.login();
  }
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      isSelected: false,
    };
  }

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

  checkValidation() {
    if (this.state.isSelected == false) {
      Alert.alert("Warning", "Please Check Term & Condition");
    } else {
      this.doLogin();
    }
  }

  doLogin() {
    const { name, email, password, password_confirmation } = this.state;
    console.log(name)
    if (name && email && password) {
      const headers = {
        "API-TOKEN": "ABCDEFGHIJK",
      };

      this.setState({
        loading: true,
      });
      const req = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password,
        loading: true,
      };

      axios
        .post(global.address + "register", req, {
          headers: headers,
        })
        .then(
          (res) => {
            // console.log('Consel',res)
            this.setState({
              userData: JSON.stringify(res.data),
              loading: false,
            });

            this.storeToken(res.data).then((res) => {
               addProfileData(req);
              Actions.ProfileScreen();
            });

            //AsyncStorage.setItem("id", res.data.user.id);
            //AsyncStorage.setItem("token", res.data.access_token).then((res) => {
            //  Actions.startup();
            //});

            //this.props.navigation.navigate(startup);
            //console.warn(res);
          },
          (err) => {
            this.setState({
              loading: false,
            });
            console.log(err);
            alert(err.response.data?.message);
          }
        );
    } else {
      alert("Enter username and passwwod");
    }
  }

  render() {
    const {
      name,
      email,
      password,
      password_confirmation,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={{width: '80%'}}>
          <Text style={styles.logoText}>Create New Account</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomInput
              style={[styles.inputBox, {width: '45%'}]}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="First Name"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              value={name}
              onChange={(value) => this.onChangeHandle("name", value)}
            />
            <CustomInput
              style={[styles.inputBox, {width: '45%'}]}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Last Name"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              value={name}
              onChange={(value) => this.onChangeHandle("name", value)}
            />
          </View>
            <CustomInput
              style={[styles.inputBox]}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              value={email}
              onChange={(value) => this.onChangeHandle("email", value)}
            />
          <CustomInput
            clearTextOnFocus={false}
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            value={password}
            onChange={(value) => this.onChangeHandle("password", value)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#ddd" : "#1c313a",
              ...styles.contianerLogin
            }}
            onPress={() => this.checkValidation()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Create An Accout"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.signupText}>
            I accept Term and Conditions &nbsp;
            <Switch
              value={this.state.isSelected}
              onValueChange={() =>
                this.setState({ isSelected: !this.state.isSelected })
              }
            />
          </Text>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Not A Member?</Text>
          <TouchableOpacity onPress={this.signin}>
            <Text style={styles.singupButton}> Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    fontSize: 16,
    color: "black",
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

  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextCont: {
    flexGrow: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 100
  },
  signupText: {
    color: "black",
    fontSize: 16,
  },
  singupButton: {
    color: "#44aedd",
    fontSize: 16,
    fontWeight: "500",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 22,
    alignItems: "center",
    alignSelf: 'center'
  },
  contianerLogin: {
    backgroundColor: primary,
    padding: 10,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
