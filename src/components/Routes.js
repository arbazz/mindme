import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";

import Login from "../pages/login";
import LearnMore from "../pages/learnmore";
import Signup from "../pages/signup";
import Startup from "../pages/startup";
import Forgotpwd from "../pages/forgotpwd";
import SurveyCompletedScreen from "../pages/SurveyCompletedScreen";
import NextStep from "../pages/nextsteps";
import SuggestionScreen from "../pages/SuggestionScreen";
import ProfileScreen from "../pages/profileScreen";
import userAllSurveyResult from "../pages/userAllSurveyResult";
import questionDetailScreen from "../pages/questionDetailScreen";
import WarmLine from '../pages/WarmLines';
import Files from "../pages/Files";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene   key="login" component={Login} title="Login" />
          <Scene  key="signup" component={Signup} title="Signup" />
          <Scene 
            hideTabBar={true}
          key="startup" component={Startup} title="Startup" />
          <Scene  key="forgotpwd" component={Forgotpwd} title="ForgotPassword" />
          <Scene   key="nextsteps" component={NextStep} title="NextStep" />
          <Scene  key="LearnMore"  component={LearnMore} title="LearnMore" />
          <Scene
          
            hideTabBar={true}
            key="ProfileScreen"
            hideNavBar={true}
            component={ProfileScreen}
          />
          <Scene
            key="userAllSurveyResult"
            component={userAllSurveyResult}
            title="userAllSurveyResult"
          />
          <Scene
            
            key="questionDetailScreen"
            component={questionDetailScreen}
            title="questionDetailScreen"
          />
          <Scene
          
            key="SurveyCompletedScreen"
            component={SurveyCompletedScreen}
            title="SurveyCompletedScreen"
          />
          <Scene
          
            key="WarmLine"
            component={WarmLine}
            title="WarmLine"
          />
          <Scene
            
            key="SuggestionScreen"
            component={SuggestionScreen}
            title="SuggestionScreen"
          />
          <Scene

            key="File"
            component={Files}
            title="File"
          />
        </Scene>
      </Router>
    );
  }
}
