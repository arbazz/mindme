import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Actions } from "react-native-router-flux";

import Logo from "../components/logo";
import InputText from "../components/InputText";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import { COLORS } from "../res/validColors";

import { SimpleSurvey } from "react-native-simple-survey";

//import { createNewUser } from "../actions/auth.actions";
//import Loader from "../components/Loader";
//import { ErrorUtils } from "../utils/auth.utils";

const GREEN = "#455a64";
const PURPLE = "#455a64";

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
const survey = [
  {
    questionType: "Info",
    questionText:
      "Welcome to your personal wellness screening!  Tap next to continue",
  },
  {
    questionType: "SelectionGroup",
    questionText:
      "At the moment, how well am I managing to be aware of my internal state of mind and perceive external reality?",
    questionId: "stateofmind",
    options: [
      {
        optionText: "Very well",
        value: "1",
      },
      {
        optionText: "Quite well",
        value: "2",
      },
      {
        optionText: "Moderately",
        value: "3",
      },
      {
        optionText: "Quite badly",
        value: "4",
      },
      {
        optionText: "Very badly",
        value: "5",
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
        optionText: "Very well",
        value: "1",
      },
      {
        optionText: "Quite well",
        value: "2",
      },
      {
        optionText: "Moderately",
        value: "3",
      },
      {
        optionText: "Quite badly",
        value: "4",
      },
      {
        optionText: "Very badly",
        value: "5",
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
        optionText: "Very well",
        value: "1",
      },
      {
        optionText: "Quite well",
        value: "2",
      },
      {
        optionText: "Moderately",
        value: "3",
      },
      {
        optionText: "Quite badly",
        value: "4",
      },
      {
        optionText: "Very badly",
        value: "5",
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
        optionText: "Very well",
        value: "1",
      },
      {
        optionText: "Quite well",
        value: "2",
      },
      {
        optionText: "Moderately",
        value: "3",
      },
      {
        optionText: "Quite badly",
        value: "4",
      },
      {
        optionText: "Very badly",
        value: "5",
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
        optionText: "Very well",
        value: "1",
      },
      {
        optionText: "Quite well",
        value: "2",
      },
      {
        optionText: "Moderately",
        value: "3",
      },
      {
        optionText: "Quite badly",
        value: "4",
      },
      {
        optionText: "Very badly",
        value: "5",
      },
    ],
  },
  {
    questionType: "Info",
    questionText: "That is all for the SMST, tap finish to see your results!",
  },
];

export default class SurveyScreen extends Component {
  SurveyComplete() {
    Actions.SurveyCompletedScreen();
  }

  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: "#455a64",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        elevation: 5,
      },
      headerTintColor: "#fff",
      headerTitle: "Personal Survey",
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = { backgroundColor: PURPLE, answersSoFar: "", tempNumber: 0 };
  }

  onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    console.log("here");
    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
      console.log(elem.value);
    }
    this.props.navigation.navigate("SurveyCompletedScreen", {
      surveyAnswers: answersAsObj,
    });
    /*this.SurveyComplete("SurveyCompleted", {
      surveyAnswers: answersAsObj,
    });*/
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
      tempNumber:
        parseInt(this.state.tempNumber) + parseInt(answer.value.value),
    });
    switch (answer.questionId) {
      case "favoriteColor": {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() });
        }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={"Previous"}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={"Next"}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button title={"Finished"} onPress={onPress} color={GREEN} />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: "flex-start" }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? GREEN : PURPLE}
          style={isSelected ? { fontWeight: "bold" } : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={"white"}
          placeholder={placeholder}
          placeholderTextColor={"rgba(184,184,184,1)"}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={(text) => {
          onChange(text);
        }}
        underlineColorAndroid={"white"}
        placeholderTextColor={"rgba(184,184,184,1)"}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={"numeric"}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.background,
          { backgroundColor: this.state.backgroundColor },
        ]}
      >
        <View style={styles.container}>
          <SimpleSurvey
            ref={(s) => {
              this.surveyRef = s;
            }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
        </View>

        <ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: "center" }}>Final Output</Text>
          {/*this.state.answersSoFar*/}
          <Text>{this.state.tempNumber}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    alignItems: "stretch",

    elevation: 20,
    borderRadius: 10,
  },
  answersContainer: {
    width: "90%",
    maxHeight: "20%",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: "auto",
    alignSelf: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: "center",
    padding: 5,
    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    alignContent: "flex-end",
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 10,

    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
  },
});
