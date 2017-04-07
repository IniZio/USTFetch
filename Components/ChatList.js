import React, { Component } from 'react'
import {
  Content, View,
  Left, Body, Right,
  List, ListItem,
  Text, Button, Icon
} from 'native-base'
import {Avatar} from 'react-native-material-ui'

const ROLE_FETCHER = 'Fetcher'
const ROLE_REQUESTER = 'Requester'

const fakeTasks = [
  { content: 'What product would you like?', userID: 1, userAlias: 'Yihao', role: ROLE_REQUESTER, objective: 'Uniqlo Flannel' },
  { content: 'Where are you now?',           userID: 2, userAlias: 'Epan',  role: ROLE_FETCHER,   objective: 'Pencil' }
]

export default class ChatList extends Component {
  state = {
    tasks: fakeTasks
  }
  render = () => (
    <Content>
      <List dataArray={this.state.tasks} renderRow={task => (
        <ListItem onPress={() => this.props.navigation.navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: task.role }, objective: task.objective })} >
            <View style={{width: 70, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar text={task.userAlias[0]} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{task.userAlias} ({task.objective})</Text>
              <Text note>{task.content}</Text>
            </View>
            <Right>
              <Button iconRight transparent onPress={() => this.props.navigation.navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: task.role }, objective: task.objective })} >
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    </Content>
  )
}
