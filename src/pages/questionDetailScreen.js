import React from "react";
import {
  View, Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { background } from "./config";
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";

export default class index extends React.Component {

  text = [
    "Live the Life of Your Dreams: Be brave enough to live the life of your dreams according to your vision and purpose instead of the expectations and opinions of others.",
    "The greatness of a man is not in how much wealth he acquires, but in his integrity and his ability to affect those around him positively",
    "In life, finding a voice is speaking and living the truth. Each of you is an original. Each of you has a distinctive voice. When you find it, your story will be told. You will be heard.",
  ]


  constructor(props) {
    super(props);
    this.state = {
      Question1: "",
      Question2: "",
      Question3: "",
      Question4: "",
      Question5: "",
      Question6: "",
      CreatedAT: "",
    };
  }

  profileDataByID() {
    const ID = this.props.navigation.getParam("ID", {});
    const CreatedAT = this.props.navigation.getParam("CreatedAT", {});

    //console.warn(global.address + "mindmeReportFetchRepor" + ID);
    axios
      .post(
        global.address + "mindmeReportFetchRepor",
        {
          id: ID,
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
          Question1: res.data[0].smst_todayifeel,
          Question2: res.data[0].smst_stateofmind,
          Question3: res.data[0].smst_relationship,
          Question4: res.data[0].smst_priorities,
          Question5: res.data[0].smst_decisions,
          Question6: res.data[0].smst_managetodo,
          CreatedAT: CreatedAT,
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
    let c = this.state.CreatedAT;
    c = new Date(c);
    c = c.toLocaleDateString()
    let t = new Date(this.state.CreatedAT);
    t = t.toLocaleTimeString();
    return (
      <>
        <ScrollView contentContainerStyle={{ backgroundColor: background, flexGrow: 1 }}>
          <View style={styles.conteianr}>

            <View>

              <View style={[styles.card,]}>
                <View style={[styles.indent]}>
                  {/* <Text style={styles.newweb}>New Web ui dsign</Text>
                  <Text style={styles.website}>Website design dor $100</Text> */}
                </View>
                <View style={styles.lastConteinr}>
                  <View style={styles.iconContaienr}>
                    <AntDesign name="calendar" style={[styles.icon,]} />
                    <Text>{c}</Text>
                  </View>
                  <View style={styles.iconContaienr} >
                    <AntDesign name="clockcircleo" style={[styles.icon,]} />
                    <Text>{t}</Text>
                  </View>
                </View>
              </View>

            </View>
            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "Today I feel..?"
            </Text>

              {this.state.Question1 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question1 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question1 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question1 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question1 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}
              <View style={{ marginTop: 10 }}></View>
            </View>

            {/* =========== Question# 02 ============= */}

            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "At the moment, how well am I managing to be aware of my internal
                state of mind and perceive external reality?"
            </Text>

              {this.state.Question2 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question2 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question2 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question2 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question2 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}

              <View style={{ marginTop: 10 }}></View>
            </View>

            {/* =========== Question# 03 ============= */}

            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "At the moment, how well am I managing to sustain my relationships
                wit others and to maintain social contacts?"
            </Text>

              {this.state.Question3 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question3 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question3 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question3 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question3 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}

              <View style={{ marginTop: 10 }}></View>
            </View>

            {/* =========== Question# 04 ============= */}

            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "At the moment, how well am I managing to set priorities and plan
                my own future?"
            </Text>

              {this.state.Question4 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question4 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question4 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question4 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question4 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}

              <View style={{ marginTop: 10 }}></View>
            </View>

            {/* =========== Question# 05 ============= */}

            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "At the moment, how well am I managing to choose among several
                options and make decisions?"
            </Text>

              {this.state.Question5 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question5 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question5 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question5 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question5 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}

              <View style={{ marginTop: 10 }}></View>
            </View>

            {/* =========== Question# 06 ============= */}

            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                "At the moment, how well am I managing to do what can
                realistically be done and act effectively?"
            </Text>

              {this.state.Question6 == "1" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very badly
                </Text>
              ) : this.state.Question6 == "2" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite badly
                </Text>
              ) : this.state.Question6 == "3" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Moderately
                </Text>
              ) : this.state.Question6 == "4" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Quite well
                </Text>
              ) : this.state.Question6 == "5" ? (
                <Text
                  style={{
                    color: "black",
                    marginLeft: 20,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  Very well
                </Text>
              ) : null}

              <View style={{ marginTop: 10 }}></View>
            </View>

            <View style={{ marginTop: 20 }}></View>
          </View>


        </ScrollView>
      </>
    )

  };
};

const styles = StyleSheet.create({
  conteianr: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    marginTop: 25
  },
  survey: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5
  },
  indent: {
    borderLeftColor: 'green',
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
    color: 'green',
    marginRight: 10,
    fontSize: 20
  },
  cardSecondText: {
    marginTop: 30,
    backgroundColor: '#f9fbfc',
    borderRadius: 10,
    padding: 15,
    lineHeight: 21,
    letterSpacing: 1
  }
})
