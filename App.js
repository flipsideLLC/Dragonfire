import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IntroScreen from "./Screens/IntroScreen";
import ChatScreen from "./Screens/ChatScreen";

const AppNavigator = createStackNavigator(
  {
    Login: IntroScreen,
    Chat: ChatScreen
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
