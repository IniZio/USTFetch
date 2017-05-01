import React, { Component } from 'react'
import { AsyncStorage, RefreshControl } from 'react-native'
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
    chats: [],
    refreshing: false
  }
  constructor (props) {
    super(props)
    this.socket = this.props.socket
  }
  componentDidMount () {
    this.socket.on('message history', ({ chatID, history }) => {
      console.log('in chatlist -> history: ', history[0])
      const newChats = this.state.chats.map(chat => {
        if (chat._id === chatID) chat.lastDialog = history[0]
        return chat
      })
      this.setState({ chats: newChats })
    })
    this.socket.on('receive message', ({ chatID, dialog }) => {
      const newChats = this.state.chats.map(chat => {
        if (chat._id === chatID) chat.lastDialog = dialog
      })
      this.setState({ chats: newChats })
    })
    this.refreshChats()
  }
  refreshChats = () => {
    this.setState({ refreshing: true })
    AsyncStorage.getItem('itsc').then(itsc => {
      fetchChats().then((chats) => {
        if (chats) {
          this.setState({ chats })
          for (let chat of chats) {
            this.socket.emit('join room', { chatID: chat._id, userID: itsc })
          }
        }
        this.setState({ refreshing: false })
      })
    })
  }
  render = () => {
    return (
    <View style={{ flex: 1 }}>{
      this.state.chats &&
      <List refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshChats()} />
          } dataArray={this.state.chats} renderRow={chat => (
        <ListItem onPress={() => this.props.navigation.navigate('ChatRoom', { socket: this.socket, receiver: { _id: (chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id), userAlias: 'dummmyalias', role: (chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER)}, objective: chat.objective, chatID: chat._id })}>
            <View style={{width: 70, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar text={chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id} ({chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER})</Text>
              <Text note>{chat.objective}</Text>
              <Text note>{chat.lastDialog && chat.lastDialog.content}</Text>
            </View>
            <Right>
              <Button iconRight transparent>
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    }</View>
    )
  }
}
