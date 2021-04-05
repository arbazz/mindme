import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { background } from "./config";
import {
  LineChart,
} from "react-native-chart-kit";
import { Actions } from "react-native-router-flux";
import axios from "axios";

const data = {
  labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ]
    }
  ]
}
const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}
const labels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"];


export default class SurveyCompletedScreen extends Component {

  _isMounted = false;

  SuggestionScreen() {
    Actions.SuggestionScreen();
  }

  constructor(props) {
    super(props);

    this.state = {
      answersSoFar: null,
      userID: 0,
      starCount: "",
      isLoading: true,
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  profileDataByID() {
    const self = this;
    console.log("here...prof in...");
    axios
      .post(
        global.address + "allSurveyUserScores",
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
        const dataClone = { ...self.state.data };

        console.log("coming in...");

        const result = Object.keys(res.data).map((key) => res.data[key].score);
        console.log(result);
        // var daata = JSON.stringify(res.data);
        //const values = responseJson.map(value => value.IMPORTO);

        console.log("data" + result);
        this.setState({
          chartData: result,
          data: result,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  goSubmit() {
    console.warn("to submit xx");

    this._isMounted = true;

    const headers = {
      "API-TOKEN": "ABCDEFGHIJK",
    };

    console.warn("to submit");

    if (this._isMounted) {
      this.getToken;

      const req = {
        score: tempNumber,
        user_id: this.state.userID,
        smst: "xxx",
        // smst_todayifeel: smst_todayifeel,
        // smst_relationship: smst_relationship,
        // smst_stateofmind: smst_stateofmind,
        // smst_priorities: smst_priorities,
        // smst_decisions: smst_decisions,
        // smst_managetodo: smst_managetodo,
      };
      axios
        .post(global.address + "mindmeSave", req, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          //AsyncStorage.setItem("id", res.data.user.id);
          //AsyncStorage.setItem("token", res.data.access_token).then((res) => {
          //  Actions.startup();
          //});
          //this.props.navigation.navigate(startup);
          //console.warn(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      this.setState({ userID: data.user.id });
      console.warn(data.user.id);
      return data;
      userID: data.user.id;
      console.warn(userID);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {
    this.getToken();
    this.profileDataByID();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const answers = this.props.navigation.getParam(
      "surveyAnswers",
      "surveyScore",
      "randomBehavior"
    );

    //data.datasets[0].data = this.state.dataSource.map((value) => value.IMPORTO);

    const randomBehavior = this.props.navigation.getParam("randomBehavior");

    console.warn("sdf" + randomBehavior);

    const { navigation } = this.props;

    const tempNumber = this.props.surveyScore;
    console.log(tempNumber)
    /*console.warn(tempNumber);
    console.warn(answers[0]);
    console.warn(answers["smst_relationship"]);
    console.warn(answers["smst_priorities"]);
    console.warn(answers["smst_decisions"]);
    console.warn(answers["smst_managetodo"]);*/

    const lowestResult = [];

    const result = Object.keys(answers).map((key) => ({ [key]: answers[key] }));
    const { width, height } = Dimensions.get("window");
    //<Text style={styles.questionText}>The results are in!</Text>
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: background, flexGrow: 1 }}>


        <View style={styles.conteianer}>
          <Text style={styles.qna}>Question And Details</Text>
          <View style={styles.dexConsirna}>

            <Text style={styles.dexText}>
              {
                tempNumber > 16 ? (
                  <Text style={styles.questionresponse}>
                    Overall, you are doing very well. You are practicing
                    excellent self-management. You can keep going.
                  </Text>
                ) : tempNumber > 12 && tempNumber < 17 ? (
                  <Text style={styles.questionresponse}>
                    Overall, you are doing fairly well. You are practicing
                    good self-management. You are almost there.
                  </Text>
                ) : tempNumber > 9 && tempNumber < 13 ? (
                  <Text style={styles.questionresponse}>
                    Overall, you are doing moderately well. You could do more
                    for your self-management. You are on the right track.
                  </Text>
                ) : tempNumber > 4 && tempNumber < 9 ? (
                  <Text style={styles.questionresponse}>
                    Overall, you are not doing well. You could clearly do more
                    for your self-management.
                  </Text>
                ) : tempNumber < 5 ? (
                  <Text style={styles.questionresponse}>
                    Overall, you are not doing well at all. You could do a
                    great deal more for your self-management. You may have to
                    seek help.
                  </Text>
                ) : tempNumber < 11 ?
                  <Text style={styles.questionresponse}>
                    {"\n\n"}Based on your results, you are advised to seek
                    professional help in order to improve your wellness
                  </Text> : null
              }
            </Text>

          </View>

        </View>

        <View style={styles.graphCOntienar}>
          <LineChart
            data={{ labels: labels, datasets: [{ data: this.state.data }] }}
            width={width - 50}
            withHorizontalLabels={false}
            height={height - 500}
            yAxisInterval={1}
            fromZero={true}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#D9D9D9",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
            }}
            bezier
            style={{ marginVertical: 5, borderRadius: 15 }}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <CustomButton
            onPress={() => Actions.SuggestionScreen()}
            text="Suggestions" />
        </TouchableOpacity>
        <View style={styles.btn}>
          <CustomButton text="My History" onPress={()=>Actions.userAllSurveyResult()} />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  conteianer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  qna: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 40,
  },
  dexConsirna: {
    borderLeftColor: 'blue',
    borderLeftWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 2
  },
  graphCOntienar: {
    marginTop: 30,
    marginBottom: 30,
  },
  btn: {
    marginTop: 30,

  }
});
