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

const fakeChats = [
  { content: 'What product would you like?', chatID: 'abc', userID: 1, userAlias: 'Yihao', role: ROLE_REQUESTER, objective: 'Uniqlo Flannel' },
  { content: 'Where are you now?',           chatID: 'xyz', userID: 2, userAlias: 'Epan',  role: ROLE_FETCHER,   objective: 'Pencil' }
]

export default class ChatList extends Component {
  state = {
    chats: fakeChats
  }
  constructor (props) {
    super(props)
    this.socket = this.props.socket
  }
  componentDidMount () {
    for (let chat of this.state.chats) {
      this.socket.emit('join room', chat.chatID, function () {
        this.socket.on('message history', history => {
          console.log('history: ', history)
        })
      }).bind(this)
      this.socket.on('receive message', ({chatID, content}) => {
        console.log('received message from ' + chatID + ': ' + content)
      })
    }
  }
  render = () => {
    let {socket} = this.props
    return (
    <Content>
      <List dataArray={this.state.chats} renderRow={chat => (
        <ListItem onPress={() => this.props.navigation.navigate('ChatRoom', { socket: this.socket, receiver: { userID: chat.userID, userAlias: chat.userAlias, role: chat.role }, objective: chat.objective, chatID: chat.chatID })} >
            <View style={{width: 70, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar text={chat.userAlias[0]} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{chat.userAlias} ({chat.role})</Text>
              <Text note>{chat.objective}</Text>
              <Text note>{chat.content}</Text>
            </View>
            <Right>
              <Button iconRight transparent onPress={() => this.props.navigation.navigate('ChatRoom', { receiver: { userID: chat.userID, userAlias: chat.userAlias, role: chat.role }, objective: chat.objective })} >
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    </Content>
  )}
}
