import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IntroScreen from "./Screens/IntroScreen";
import ChatScreen from "./Screens/ChatScreen";
import SettingsScreen from "./Screens/SettingsScreen";

const AppNavigator = createStackNavigator(
  {
    Login: IntroScreen,
    Chat: ChatScreen,
    Settings: SettingsScreen
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
