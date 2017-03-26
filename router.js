import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Header } from 'react-navigation-native-base'

import Home from './Components/Home'
import MissionDetail from './Components/MissionDetail'
import TaskForm from './Components/TaskForm'

export default Router = StackNavigator({
  Home:          { screen: Home },
  MissionDetail: { screen: MissionDetail },
  TaskForm:      { screen: TaskForm }
}, {
  initialRouteName: 'TaskForm',
  headerComponent: Header,
  mode: Platform.OS === 'ios' ? 'card' : 'card',
})
