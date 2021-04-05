import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  CheckBox,
} from "react-native";
import auth from '@react-native-firebase/auth';

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

import { Actions } from "react-native-router-flux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin } from "@react-native-community/google-signin";
import { getUser } from "../fire/getData";
export default class ProfileScreen extends Component {
  startup() {
    Actions.startup();
  }


  goBack() {
    Actions.pop();
  }

  async logout() {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      await AsyncStorage.removeItem("uid");
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      Actions.login();
    } catch (err) {
      console.log(err);
      await AsyncStorage.removeItem("uid");
      Actions.login();
    }

  }
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      pic: ''
    };
  }

  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    loading: false,
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  componentDidMount() {
    // this.getToken();
    this.profileDataByID();
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

  async profileDataByID() {
    const uid = AsyncStorage.getItem("uid");
    const res = await getUser(uid);
    console.log("user", res);
    const user = res[0];
    if (res.length) {
      this.setState({
        email: user?.docData?.email,
        name: user?.docData?.name,
        pic: user?.docData?.picture,
      })
    }

  }

  updateData() {
    axios
      .post(
        global.address + "updateProfile",
        {
          name: this.state.name,
          email: this.state.email,
          id: global.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "API-TOKEN": "ABCDEFGHIJK",
          },
        }
      )
      .then((res) => { })
      .catch(function (error) {
        console.log(error);
      });

    this.goBack();
  }

  render() {
    const {
      name,
      email,
      pic
    } = this.state;
    return (
      <>
        <View style={styles.inconCOntiner}>
          <MaterialCommunityIcons onPress={this.logout} name="logout" style={styles.logou} />
        </View>
        <View style={styles.container}>
          <View style={styles.alignCenter}>
            <Image
              style={styles.center}
              source={pic ? { uri: pic } : require('../../assets/splash.png')} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.te}>{email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Actions.startup()}
            style={styles.card}>
            <Text style={styles.smst}>SMST</Text>
            <View style={styles.pro}>
              <Text style={styles.proText}>Free</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.towCard}>
            <View style={styles.cardfHalf}>
              <View style={styles.card}>
                <Text style={styles.smst}>Daily Dose</Text>
                <View style={styles.pro}>
                  <Text style={styles.proText}>Podcast</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardfHalf}>
              <View style={styles.card}>
                <Text style={styles.smst}>SMST</Text>
                <View style={styles.pro}>
                  <Text style={styles.proText}>Pro</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.smst}>Monthly Calebrity Sidown</Text>
            <View style={styles.pro}>
              <Text style={styles.proText}>Pro</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => Actions.WarmLine()} style={styles.card}>
            <Text style={styles.smst}>Warm Lines</Text>
            <View style={styles.pro}>
              <Text style={styles.proText}>Free</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: -120
  },
  center: {
    borderRadius: 200,
    height: 100,
    width: 100
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10
  },
  alignCenter: {
    alignItems: 'center'
  },
  te: {
    color: 'grey',
    marginTop: 4
  },
  card: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 22,
    borderColor: 'grey',
    borderWidth: 0.5
  },
  pro: {
    backgroundColor: '#60acd7',
    borderRadius: 4,
    marginTop: -35,
    height: 30,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  proText: {
    color: 'white',
    fontWeight: 'bold'
  },
  smst: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  towCard: {
    width: '80%',
    flexDirection: 'row'
  },
  cardfHalf: {
    width: '56%',
    alignSelf: 'center'
  },
  inconCOntiner: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  logou: {
    fontSize: 32
  }
});
