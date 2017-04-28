import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import {
  Content, View,
  Left, Body, Right,
  List, ListItem,
  Text, Button, Icon
} from 'native-base'
import {Avatar} from 'react-native-material-ui'

import { fetchChats } from '../api'

const ROLE_FETCHER = 'Fetcher'
const ROLE_REQUESTER = 'Requester'

export default class ChatList extends Component {
  state = {
    chats: []
  }
  constructor (props) {
    super(props)
    this.socket = this.props.socket
  }
  componentDidMount () {
    AsyncStorage.getItem('itsc').then(itsc => this.setState({ itsc }))
    fetchChats().then((chats) => {
      console.log(chats)
      if (chats) {
        this.setState({ chats })
        for (let chat of chats) {
          this.socket.emit('join room', chat._id, function () {
            this.socket.on('message history', history => {
              console.log('history: ', history)
              // TODO: store chat history
            })
          })
          this.socket.on('receive message', ({chatID, content}) => {
            console.log('received message from ' + chatID + ': ' + content)
          })
        }
      }
    })
  }
  render = () => {
    return (
    <Content>{
      this.state.chats &&
      <List dataArray={this.state.chats} renderRow={chat => (
        <ListItem onPress={() => this.props.navigation.navigate('ChatRoom', { socket: this.socket, receiver: { _id: chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id, userAlias: 'dummmyalias', role: chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER}, objective: chat.objective, chatID: chat._id })}>
            <View style={{width: 70, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar text={''} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{'dummyAlias'} ({chat.role})</Text>
              <Text note>{chat.objective}</Text>
              <Text note>{chat.content}</Text>
            </View>
            <Right>
              <Button iconRight transparent>
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    }</Content>
    )
  }
}
