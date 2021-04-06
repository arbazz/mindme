import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Switch
} from "react-native";


import Logo from "../../assets/logo.png";
import Form from "../components/form";

import { Actions } from "react-native-router-flux";
import { background, primary } from "./config";
import CustomInput from "../components/CustomInput";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { googleSignin, loginWithFacebook } from "../fire/auth";
import { addProfileData } from "../fire/addData";
import AsyncStorage from "@react-native-community/async-storage";
import Agree from "../components/Agree";

import axios from 'axios';

export default class Login extends Component {

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
      rememberMe: email ? true : false
    });
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
        
              AsyncStorage.setItem("token", res.data.access_token);
              Actions.ProfileScreen();
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

  signup() {
    Actions.signup();
  }

  forgotpwd = () => {
    Actions.forgotpwd();
  }

  startup() {
    Actions.startup();
  }

  async componentDidMount() {
    const uid = await AsyncStorage.getItem("uid");
    if (uid) {
      Actions.ProfileScreen();
    }
  }



  state = {
    mute: false,
    shouldPlay: false,
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  handleVolume = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute,
    }));
  };


  handleFacebook = () => {
    loginWithFacebook();
  };

  handleGoogle = async () => {
    const res = await googleSignin();
    console.log(res)
    if (res.additionalUserInfo) {
      AsyncStorage.setItem("uid", res.user?.uid)
      if (res.additionalUserInfo.isNewUser) {
        const profile = {
          ...res.additionalUserInfo.profile,
          uid: res.user.uid
        };
        await addProfileData(profile);
        Actions.ProfileScreen();
      } else {
        Actions.ProfileScreen();
      }

    }
  }

  toggleRememberMe = value => {
    this.setState({ rememberMe: value })
      if (value === true) {
    //user wants to be remembered.
      this.rememberUser();
    } else {
      this.forgetUser();
    }
  }

  render() {
    const { width, height } = Dimensions.get("window");

    return (
      <ScrollView contentContainerStyle={{ backgroundColor: background, flexGrow: 1 }}>
        <View style={styles.mainCOntianer}>
          <View />
          <View style={styles.container}>
            <Image source={Logo} style={styles.image} />
            <View style={[styles.contianerText]}>
              <Text style={styles.email}>Email</Text>
              <CustomInput
                placeholder="Email"
                onChange={e => this.setState({ email: e })}
              />
            </View>
            <View style={styles.contianerText}>
              <Text style={[styles.email, { marginTop: 20 }]}>Password</Text>
              <CustomInput
                placeholder={"Password"}
                password={this.state.showPassword}
                onChange={e => this.setState({ password: e })}
              />
            </View>
            <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
          
        /> 
        <Text>Show Password</Text>
            <TouchableOpacity style={styles.forgContiaenr} onPress={() => this.forgotpwd()}>
              <Text style={styles.forg}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contianerLogin} onPress={() => this.doLogin()}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <Switch
          value={this.state.rememberMe}
          onValueChange={(value) => this.toggleRememberMe(value)}
          activeText={'On'}
          /><Text >Remember Me</Text>
          </View>
          <View style={styles.social}>
            <TouchableOpacity onPress={() => Actions.signup()}>
              <Text style={styles.signUp}>Didnot have and accout? Sign up</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <AntDesign style={[styles.iconm]}
                onPress={this.handleFacebook}
                color="#4169e1" name="facebook-square" size={24} />
              <AntDesign
                onPress={this.handleGoogle}
                name="google" style={styles.iconm} size={24} color="#f8617a" />
            </View>
          </View>
          <Agree />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    alignItems: 'center'

  },
  contianerText: {
    width: '90%',
    alignSelf: 'center'
  },
  email: {
    marginLeft: 1,
    marginBottom: 10,
    fontSize: 16,
    color: 'grey'
  },
  forgContiaenr: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20
  },
  forg: {
    color: primary
  },
  contianerLogin: {
    backgroundColor: primary,
    padding: 10,
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  image: {
    marginBottom: 30
  },
  mainCOntianer: {
    justifyContent: 'space-between',
    height: '100%'
  },
  media: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  social: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  signUp: {
    alignSelf: 'center',
    color: 'grey'
  },
  iconm: {
    fontSize: 40,
    marginVertical: 10,
    marginHorizontal: 10
  }
});
