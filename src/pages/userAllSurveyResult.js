import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { CalendarList } from "react-native-common-date-picker";
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { background } from "./config";
import { Actions } from "react-native-router-flux";

const DATA = [
  {
    id: "1",
    name: "Arman Ali",
    date: "20-10-2020",
    time: "09:55:16 am",
  },
  {
    id: "2",
    name: "Zeeshan khan",
    date: "22-09-2020",
    time: "09:11:56 pm",
  },
];

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export default class index extends Component {

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
    };
  }

  profileDataByID() {
    axios
      .post(
        global.address + "AllSurveyUser",
        {
          id: global.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "API-TOKEN": "ABCDEFGHIJK",
          },
        }
      )
      .then((res) => {
        var daata = res.data;
        this.setState({
          DATA: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.profileDataByID();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: background, flexGrow: 1 }}>
        <View style={styles.conteianr}>
          <Text style={styles.text}>• Survey Submitted</Text>
          {this.state.DATA.map((item, i) => {

            let selectedColor = colorArray[this.getRandomInt(49)];
            let c = item?.created_at;
            c = new Date(c);
            c = c.toLocaleDateString()
            let t = new Date(item?.created_at);
            t = t.toLocaleTimeString();
            return (
              <TouchableOpacity 
              onPress={()=>Actions.questionDetailScreen({
                ID: item.question_id,
                CreatedAT: item.created_at,
              })}
              style={[styles.card, { borderColor: selectedColor }]} key={i}>
                <Text style={[styles.survey, { color: selectedColor }]}>Survey {i + 1}</Text>
                <View style={[styles.indent, { borderLeftColor: selectedColor }]}>
                  {/* <Text style={styles.newweb}>New Web ui dsign</Text>
                  <Text style={styles.website}>Website design dor $100</Text> */}
                </View>
                <View style={styles.lastConteinr}>
                  <View style={styles.iconContaienr}>
                    <AntDesign name="calendar" style={[styles.icon, { color: selectedColor }]} />
                    <Text>{c}</Text>
                  </View>
                  <View style={styles.iconContaienr} >
                    <AntDesign name="clockcircleo" style={[styles.icon, { color: selectedColor }]} />
                    <Text>{t}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  conteianr: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10
  },
  card: {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    marginTop: 25
  },
  survey: {
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 5
  },
  indent: {
    borderLeftColor: 'orange',
    borderLeftWidth: 2,
    paddingHorizontal: 10,
    marginTop: 5
  },
  newweb: {
    fontWeight: 'bold'
  },
  website: {
    color: 'grey',
    fontSize: 13,
  },
  lastConteinr: {
    marginTop: 20,
    flexDirection: 'row',
  },
  iconContaienr: {
    flexDirection: 'row',
    marginRight: 20,
    alignContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: 'orange',
    marginRight: 10,
    fontSize: 20
  }
});
