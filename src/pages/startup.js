import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Anchor,
  Alert,
  Image,
  Dimensions,
} from "react-native";

import { Actions } from "react-native-router-flux";
import CustomButton from "../components/CustomButton";
import { background, primary } from "./config";
import { SimpleSurvey } from "react-native-simple-survey";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CutomHeader from "./CutomHeader";
import axios from "axios";
import { getUser } from "../fire/getData";
import AsyncStorage from "@react-native-community/async-storage";

// SMST Questions
// 1. Show some sort of an introductory... (Look at the animation - Al)
// 2. Click on a button "Today I feel"
// 3. Ask the questions of -- Today I feel:
// 4. SMST
// 5. Final Score
// 6.
// 7. A button - would you like to see suggestions or what are my next steps?
// 8. They see the options
// 9. Show the Threshold of above of 10.5 vs below 10.5 -- Ryan and Peter -- wording


export default function SelfAssesment() {

  const [surveyStarted, setSurveyStarted] = useState(false);
  const [survey, setSurvey] = useState([
    {
      questionType: "Info",
      questionText: "Welcome to MindMe, the newest development in personalized mental wellness.",
    },
    {
      questionType: "SelectionGroup",
      questionText:
        "Today I feel                                                                ",
      questionId: "todayifeel",
      options: [
        {
          label: "😃 Happy",
          value: 0,
          act: 6,
        },
        {
          label: "😞 Stressed",
          value: 1,
          act: 5,
        },
        {
          label: "😰 Anxious",
          value: 2,
          act: 4,
        },
        {
          label: "😫 Fatigued",
          value: 3,
          act: 3,
          act: 3,
        },
        {
          label: "😔 Burned Out",
          value: 4,
          act: 2,
        },
        {
          label: "😟 Unhappy",
          value: 5,
          act: 1,
        },
        {
          label: "🤔 Don't Know",
          value: 6,
          act: 0,
        },
      ],
    },
    {
      questionType: "SelectionGroup",
      questionText:
      "At the moment, how well am I managing to be aware of my internal state of mind and perceive external reality?",
      questionId: "stateofmind",
      options: [
        {
          label: "Very well",
          value: 0,
          act: 5,
        },
        {
          label: "Quite well",
          value: 1,
          act: 4,
        },
        {
          label: "Moderately",
          value: 2,
          act: 3,
        },
        {
          label: "Quite badly",
          value: 3,
          act: 2,
        },
        {
          label: "Very badly",
          value: 4,
          act: 1,
        },
      ],
    },
    {
      questionType: "SelectionGroup",
      questionText:
      "At the moment, how well am I managing to sustain my relationships with others and to maintain social contacts?",
      questionId: "relationship",
      options: [
        {
          label: "Very well",
          value: 0,
          act: 5,
        },
        {
          label: "Quite well",
          value: 1,
          act: 4,
        },
        {
          label: "Moderately",
          value: 2,
          act: 3,
        },
        {
          label: "Quite badly",
          value: 3,
          act: 2,
        },
        {
          label: "Very badly",
          value: 4,
          act: 1,
        },
      ],
    },
    {
      questionType: "SelectionGroup",
      questionText:
      "At the moment, how well am I managing to set priorities and plan my own future?",
      questionId: "priorities",
      options: [
        {
          label: "Very well",
          value: 0,
          act: 5,
        },
        {
          label: "Quite well",
          value: 1,
          act: 4,
        },
        {
          label: "Moderately",
          value: 2,
          act: 3,
        },
        {
          label: "Quite badly",
          value: 3,
          act: 2,
        },
        {
          label: "Very badly",
          value: 4,
          act: 1,
        },
      ],
    },
    {
      questionType: "SelectionGroup",
      questionText:
      "At the moment, how well am I managing to choose among several options and make decisions?",
      questionId: "decisions",
      options: [
        {
          label: "Very well",
          value: 0,
          act: 5,
        },
        {
          label: "Quite well",
          value: 1,
          act: 4,
        },
        {
          label: "Moderately",
          value: 2,
          act: 3,
        },
        {
          label: "Quite badly",
          value: 3,
          act: 2,
        },
        {
          label: "Very badly",
          value: 4,
          act: 1,
        },
      ],
    },
    {
      questionType: "SelectionGroup",
      questionText:
      "At the moment, how well am I managing to do what can realistically be done and act effectively?",
      questionId: "managetodo",
      options: [
        {
          label: "Very well",
          value: 0,
          act: 5,
        },
        {
          label: "Quite well",
          value: 1,
          act: 4,
        },
        {
          label: "Moderately",
          value: 2,
          act: 3,
        },
        {
          label: "Quite badly",
          value: 3,
          act: 2,
        },
        {
          label: "Very badly",
          value: 4,
          act: 1
        },
      ],
    },
    {
      questionType: "Info",
      questionText:
      "You have completed your Personal Assessment, tap Finished to see your results.  ",
    },
  ]);
  const [currnet, setCurrent] = useState(0);
  const [surveyEnded, setSurveyEnded] = useState(false);
  const [userID, setUSerId] = useState(false);
  const [survetData, setSurveyData] = useState("");
  
  function SurveyComplete() {
    Actions.SurveyCompletedScreen();
  }

  function LearnMore() {
    Actions.LearnMore();
  }

  function profileScreen() {
    Actions.ProfileScreen();
  }

  const _termsPress = () => {
    Linking.openURL("http://www.MindMe.net/Terms-Conditions.html");
    this.props.onPress && this.props.onPress();
  };

  const _discPress = () => {
    Linking.openURL("http://www.MindMe.net/Disclosures.html");
    this.props.onPress && this.props.onPress();
  };

  const _privacyPress = () => {
    Linking.openURL("http://www.MindMe.net/PrivacyPolicy.html");
    this.props.onPress && this.props.onPress();
  };

  const _studyPress = () => {
    Linking.openURL("http://www.MindMe.net/ScientificPapers.html");
    this.props.onPress && this.props.onPress();
  };

  const handleSurveySelect = (e, j) => {
    let newSurvey = [...survey];
    newSurvey[currnet].selected = e;
    newSurvey[currnet].act = j.act;
    setSurvey(newSurvey);
    // console.log(newSurvey);

  };

  const handleSurvetStart = () => {
    setSurveyStarted(true);
    setCurrent(1)
  }

  const RenderInfoText = (infoText) => {
    return (
      <View style={styles.tet}>
        <Image
          style={styles.image}
          source={require('../../assets/logo.png')} />
        <Text style={styles.txt}>{survey[currnet].questionText}</Text>
        <CustomButton
          text="Next"
          onPress={() => handleSurvetStart()}
        />
        <TouchableOpacity onPress={() => Actions.LearnMore()}>
          <Text style={styles.learnMore}>Learn More!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getUserId();
  }, []);

 function profileDataByID() {
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
        console.log("asdfasdfasf" + JSON.stringify(res.data[0].question_id));
        setSurveyData(res.data)

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getUserId = async() => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.warn(data.user.id);
      setUSerId(data.user.id);

      global.userId = data.user.id;

      profileDataByID();
      //return data.user.id;
      //userID: data.user.id;
      //console.warn(this.state.userID);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const handleSurveyNext = () => {
    // console.log(survey)
    if (currnet === 7) {
      // setSurveyStarted(false)
      saveSurvey();
      // Actions.SurveyCompletedScreen()
    } else {
      if (survey[currnet].selected || survey[currnet].selected === 0 ) {
        setCurrent(currnet + 1)
      }
    }
  };

  const saveSurvey = () => {
    
    const tempNumber =
      parseInt( survey[1].act) +
      parseInt( survey[2].act) +
      parseInt( survey[3].act) +
      parseInt( survey[4].act) +
      parseInt( survey[5].act);

    const req = {
      score: tempNumber,
      smst_todayifeel: survey[1].act,
      smst_relationship: survey[3].act,
      smst_stateofmind: survey[2].act,
      smst_priorities: survey[4].act,
      smst_decisions: survey[5].act,
      smst_managetodo: survey[6].act,
      user_id: 0 + userID,
    };
    console.log(req);
    // return
    axios
      .post(global.address + "mindmeSave", req, {
        headers: {
          "Content-Type": "application/json",
          "API-TOKEN": "ABCDEFGHIJK",
        },
      })
      .then((res) => {
        console.log("submitting after finished");
        console.log(res);
        console.log(res.data);
        //AsyncStorage.setItem("id", res.data.user.id);
        //AsyncStorage.setItem("token", res.data.access_token).then((res) => {
        //  Actions.startup();
        //});
        //this.props.navigation.navigate(startup);
        //console.warn(res);
        console.log("about to navigate");

        Actions.SurveyCompletedScreen({
          surveyAnswers: res.data,
            surveyScore: tempNumber,
            randomBehavior: Math.random() * 7,
        })
        // this.props.navigation.navigate("SurveyCompletedScreen", {
        //   surveyAnswers: res.data,
        //   surveyScore: tempNumber,
        //   randomBehavior: randomBehavior,
        // });
      })
      .catch((error) => {
        console.warn("There is an issue");
        console.log(
          `Error received from axios.post:` + error
        );
        console.log(error.response);
      });
  }

  const Survey = () => {

    return (
      <View style={styles.tet}>
        <Text style={[styles.txt, styles.txt2]}>{survey[currnet].questionText}</Text>

        <View style={styles.soo}>
          <RadioForm
            style={{
            }}
          >
            {
              survey[currnet].options?.length &&
               survey[currnet].options.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}
                  style={[styles.btnR, survey[currnet].selected === i && { borderColor: primary, borderWidth: 2 }]} >
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={survey[currnet].selected === i}
                    onPress={(value) => handleSurveySelect(value, obj)}
                    buttonInnerColor={survey[currnet].selected === i ? '#2196f3' : '#000'}
                    buttonOuterColor={survey[currnet].selected === i ? '#2196f3' : '#000'}
                    buttonSize={20}
                    buttonOuterSize={20}
                    buttonStyle={{ borderColor: 'grey', marginRight: 10 }}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(value) => handleSurveySelect(value, obj)}
                    labelStyle={styles.redioLabl}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))
            }
          </RadioForm>
        </View>
        <View style={styles.btnNext}>
          <CustomButton
            text="Next"
            onPress={() => handleSurveyNext(true)}
          />
        </View>
        <TouchableOpacity onPress={() => Actions.LearnMore()}>
          <Text style={styles.learnMore}>Learn More!</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <CutomHeader title="Slef Assessment" />
      <View style={styles.contianer}>
        {!surveyStarted && <RenderInfoText />}
        {!!surveyStarted && <Survey />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: background,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tet: {
    width: '80%',
    alignItems: 'center',
  },
  image: {
    marginBottom: 30,
  },
  txt: {
    color: 'grey',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 1,
    marginBottom: 30
  },
  learnMore: {
    marginTop: 30,
    color: primary,
  },
  contianerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt2: {
    textAlign: 'left',
    width: '100%'
  },
  soo: {
    width: '100%',

  },
  btnR: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.4,

  },
  redioLabl: {
    color: 'grey',
  },
  btnNext: {
    marginTop: 30,
    width: '100%'
  }
});
