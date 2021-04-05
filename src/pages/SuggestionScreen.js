import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";


import { Rating, AirbnbRating } from "react-native-ratings";
import StarRating from "react-native-star-rating";

import Logo from "../components/logo";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { setToken } from "../api/token";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const GREEN = "#44aedd";
const PURPLE = "#44aedd";

import { COLORS } from "../res/validColors";
import { Actions } from "react-native-router-flux";
import { background } from "./config";

const Tab = createMaterialTopTabNavigator();

export default class SuggestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: "",
      video_url:"",
      radioBtnsData: ["Item1", "Item2", "Item3"],
      checked: 0,
    };
  }

  _isMounted = false;
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: "#FFF",
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
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }

  helpfulButton(value) {}

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
    console.log("Current Rating", rating);
    console.log("Star Rating", this.state.starCount);
  }

  suggestionbyItem() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("randomBehavior", {});
    console.log("ITEM..." + itemId);
    let randomBehavior = null;
    switch (itemId) {
      case "relationship":
        randomBehavior = "Relationships";
        this._isMounted = true;
        break;
      case "stateofmined":
        randomBehavior = "Awareness";
        this._isMounted = true;
        break;
      case "priorities":
        randomBehavior = "Planning";
        this._isMounted = true;
        break;
      case "decisions":
        randomBehavior = "Decision Making";
        this._isMounted = true;
        break;
      case "managetodo":
        randomBehavior = "Action";
        this._isMounted = true;
        break;
      default:
        randomBehavior = "Action";
        this._isMounted = true;
        break;
    }

    console.log(
      "Here is  " + global.address + "getBehavior?item=" + randomBehavior
    );

    axios
      .post(
        global.address + "getBehavior",
        {
          item: randomBehavior,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "API-TOKEN": "ABCDEFGHIJK",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].description);
        var daata = res.data[0].description;
        var vid = res.data[0].video_url;
        console.log(res.data[0].video_url);
        this.setState({
          suggestion: res.data[0].description,
          video_url: res.data[0].video_url,
        });
        //const randomBehavior = randomBehavior;
        //this.setState({ randomBehavior: randomBehavior });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.suggestionbyItem();
  }

  logout = async () => {
    //console.log("trying to logout" + setToken);
    AsyncStorage.removeItem("userData");
    //alert("You have been logged out.");
    Actions.login();
  };

  render() {
    //this.setState({ randomBehavior: randomBehavior });
    //console.warn("sss" + this.state.suggestion);
    const { width, height } = Dimensions.get("window");
    var radio_props = [
      { label: "Yes", value: 0 },
      { label: "No", value: 1 },
    ];

    return (
      <View style={styles.background}>
            <Image style={styles.images} source={require('../../assets/my.jpg')} />
        <View style={styles.container}>
          <ScrollView>
            <TouchableOpacity>
              <Text style={styles.questionText}>&nbsp;</Text>
              <Text style={styles.questionText}></Text>
              <Text style={styles.questionText}>{this.state.suggestion}</Text>
              <Text style={styles.questionText}>&nbsp;</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  marginLeft: 10,
                  color: "#fff",
                  marginBottom: 20,
                  fontSize: 18,
                  fontFamily: "Verdana",
                  color: "#000",
                  fontWeight: 'bold'
                }}
              >
                Select 1 or 5 stars on the ease of use
              </Text>

              <View
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "Verdana",
                  color: "#000",
                  borderColor: 'grey',
                  borderWidth: 1,
                  padding: 20,
                  borderRadius: 30
                }}
              >
                <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={22}
                  fullStarColor={"#FFD700"}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                style={styles.appButtonContainer}
                color={"#a9bac2"}
                onPress={this.logout}
              >
                <Text style={styles.appButtonText}>See you tomorrow!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    alignItems: "stretch",
    elevation: 0,
    borderRadius: 10,
  },
  background: {
    flex: 1,
    backgroundColor: background,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
    lineHeight: 22,
    fontFamily: "Verdana",
    letterSpacing: 0.5
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1c313a",
    borderWidth: 4,
    borderColor: "#1c313a",
    height: 70,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    textShadowColor: "#585858",
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
  },
  appButtonContainerSelected: {
    elevation: 8,
    backgroundColor: "#a9bac2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonEndContainer: {
    backgroundColor: "#44aedd",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#fff",
    height: 60,
    borderRadius: 5,
    borderWidth: 3,
    margin: 7,
  },
  appButtonEndText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
  },
  appButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    borderStyle: "solid",
  },
  images: {
    marginTop: 100

  }
});
