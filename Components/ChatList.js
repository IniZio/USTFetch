import React, { Component } from 'react'
import { AsyncStorage, RefreshControl } from 'react-native'
import {
  Content, View,
  Left, Body, Right,
  List, ListItem,
  Text, Button, Icon
} from 'native-base'
import {Avatar} from 'react-native-material-ui'

import { fetchTaskByID, fetchChats } from '../api'

const ROLE_FETCHER = 'Fetcher'
const ROLE_REQUESTER = 'Requester'

export default class ChatList extends Component {
  state = {
    chats: [],
    refreshing: false
  }
  constructor (props) {
    super(props)
    this.state = {
      chats: [],
      refreshing: false
    }
    this.socket = this.props.socket
  }
  componentDidMount () {
    this.refreshChats()
    this.socket.on('message history', ({ chatID, history }) => {
      let newChats = this.state.chats.map(chat => {
        if (chat._id === chatID) chat.lastDialog = history[0]
        return chat
      })
      this.setState({ chats: newChats })
    })
    this.socket.on('receive message', ({ chatID, dialog }) => {
      const newChats = this.state.chats.map(chat => {
        if (chat._id === chatID) chat.lastDialog = dialog
        return chat
      })
      this.setState({ chats: newChats })
    })
  }
  refreshChats = async () => {
    this.setState({ refreshing: true })
    let itsc = await AsyncStorage.getItem('itsc')
    let chats = await fetchChats()
    if (chats) {
      for (let chat of chats) {
        let task = await fetchTaskByID(chat._id)
        chat = Object.assign(chat, task)
        this.socket.emit('join room', { chatID: chat._id, userID: itsc })
      }
      this.setState({ chats })
    }
    this.setState({ refreshing: false })
  }
  render = () => (
    <View style={{ flex: 1 }}>{
      <List refreshControl={
        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshChats()} />
      } dataArray={this.state.chats.filter(chat => chat.requester_id && chat.fetcher_id)} renderRow={chat => (
        <ListItem key={chat._id} onPress={() => this.props.navigation.navigate('ChatRoom', { socket: this.socket, receiver: { _id: (chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id), userAlias: 'dummmyalias', role: (chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER)}, objective: chat.objective, chatID: chat._id })}>
            <View style={{width: 70, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar text={chat.requester_id === this.state.itsc ? chat.fetcher_id[0] : chat.requester_id[0]} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id} ({chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER})</Text>
              <Text note>{chat.objective}</Text>
              <Text note>{!!chat.lastDialog && chat.lastDialog.content}</Text>
              {/*BUG: cannot rerender despite the state already updated for the last dialog?*/}
            </View>
            <Right>
              <Button iconRight transparent onPress={() => this.props.navigation.navigate('ChatRoom', { socket: this.socket, receiver: { _id: (chat.requester_id === this.state.itsc ? chat.fetcher_id : chat.requester_id), userAlias: 'dummmyalias', role: (chat.requester_id === this.state.itsc ? ROLE_FETCHER : ROLE_REQUESTER)}, objective: chat.objective, chatID: chat._id })}>
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    }</View>
  )
}
