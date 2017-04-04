import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Header } from 'react-navigation-native-base'

import Home from './Components/Home'
import TaskDetail from './Components/TaskDetail'
import TaskForm from './Components/TaskForm'
import ChatRoom from './Components/ChatRoom'
import UserProfile from './Components/UserProfile'

export default Router = StackNavigator({
  Home:          { screen: Home },
  TaskDetail:    { screen: TaskDetail },
  TaskForm:      { screen: TaskForm },
  ChatRoom:      { screen: ChatRoom },
  Profile:       { screen: UserProfile }
}, {
  initialRouteName: 'Home',
  headerComponent: Header,
  headerMode: 'screen',
  mode: Platform.OS === 'ios' ? 'card' : 'card',
})
