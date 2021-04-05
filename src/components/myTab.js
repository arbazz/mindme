import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from "react-navigation";

class StackScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Title</Text>
        <Text>Some text</Text>
      </View>
    );
  }
}

const TabNavi = createMaterialTopTabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
});

const StackNavi = createStackNavigator({
  Main: {
    screen: TabNavi,
    navigationOptions: ({ navigation }) => ({
      header: <StackScreen navigation={navigation} />,
    }),
  },
});

export default createAppContainer(StackNavi);
