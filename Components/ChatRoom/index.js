import React, { Component } from 'react'
import { Components } from 'expo'
import { AsyncStorage, ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Content, View, Text, Textarea, List, ListItem, Card, CardItem, Input, Button, Toast, Icon, Left, Body, Right } from 'native-base'
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu'
const { SlideInMenu } = renderers

import variables from '../../theme/variables/platform'

import Dialog from './Dialog'

const commands = [
  { syntax: 'abc', description: 'Sings the abc song...' },
  { syntax: 'complete', description: 'Completes task' }
]

export default class ChatRoom extends Component {
  static navigationOptions = {
    header: ({navigate, state}) => ({
      title: <TouchableOpacity onPress={() => navigate('Profile', { user: state.params.receiver })}>
             <View>
              <Text>{ state.params.receiver._id }<Text note style={{ fontSize: 12 }}> ({ state.params.receiver.role })</Text></Text>
              <Text note>{ state.params.objective }</Text>
             </View>
             </TouchableOpacity>
    })
  }
  state = {
    isMenuOpen: false,
    dialogs: [],
    dialog: '',
    itsc: '',
    history: []
  }
  constructor (props) {
    super(props)
    this.socket = this.props.navigation.state.params.socket
  }
  componentDidMount () {
    AsyncStorage.getItem('itsc').then(itsc => {
      this.setState({ itsc })
      this.socket.emit('join room', { chatID: this.props.navigation.state.params.chatID, userID: itsc })
    })
    this.socket.on('message history', ({ chatID, history }) => {
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: history.concat(this.state.dialogs) })
      }
      console.log('received history', history)
    })
    this.socket.on('receive message', ({ chatID, dialog }) => {
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: this.state.dialogs.concat(dialog) })
      }
    })
  }

  sendDialog = content => {
    if (content) {
      this.setState({
        dialogs: this.state.dialogs.concat([
          { senderID: this.state.itsc, content: content }
        ])
      })
      this.socket.emit('send message', { chatID: this.props.navigation.state.params.chatID, dialog: { senderID: this.state.itsc, content: content } })
    }
    if (this.dialogInput != null) {
      this.dialogInput._root.clear()
    }
  }
  checkMagic = dialog => {
    // If is start of commmand
    if (dialog[0] === '@' && !this.state.isMenuOpen) {
      this.setState({ isMenuOpen: true })
    } else if (dialog[0] !== '@' && this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false })
    }
  }

  render = () => (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <MenuContext>
      <List dataArray={this.state.dialogs} renderRow={dialog => (
        <Dialog dialog={dialog} itsc={this.state.itsc} navigation={this.props.navigation} />
      )} />
        <Menu name="numbers" renderer={SlideInMenu} opened={this.state.isMenuOpen} onClose={() => {
          console.log('closed')
          if (this.dialogInput != null) {
            this.dialogInput._root.clear()
          }
        }}>
          <MenuTrigger />
          <MenuOptions>
            <MenuOption>{
              commands.map(command => (
                <ListItem key={command.syntax}>
                  <Left style={{ flex: 1 }}><Text>@{command.syntax}</Text></Left>
                  <Body style={{ flex: 2 }}><Text>{command.description}</Text></Body>
                </ListItem>
              ))
            }</MenuOption>
          </MenuOptions>
        </Menu>
      </MenuContext>
      <View style={{ height: 45, flexDirection: 'row', backgroundColor: variables.footerDefaultBg, padding: 5 }} >
        <Input
          blurOnSubmit
          clearTextOnFocus
          ref={input => { this.dialogInput = input } }
          value={this.state.dialog}
          onChange={e => this.setState({ dialog: e.nativeEvent.text })}
          keyboardType="email-address"
          enablesReturnKeyAutomatically
          returnKeyType="send"
          clearButtonMode="always"
          style={{flex: 1, backgroundColor: '#CECDD2', fontSize: 16, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15 }}
          placeholderTextColor={variables.inputColorPlaceholder}
          placeholder="Type @ for magic ;)"
          onChangeText={text => this.checkMagic(text)}
          onSubmitEditing={({nativeEvent}) => this.sendDialog(nativeEvent.text)}
        />
      </View>
    </KeyboardAvoidingView>
    </View>
  )
}
