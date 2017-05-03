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
  { syntax: 'setmtl', description: 'set meetup location' },
  { syntax: 'setmtt', description: 'set meetup time' },
  { syntax: 'complete', description: 'comfirm complete task' }
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
    this.state = {
      isMenuOpen: false,
      dialogs: [],
      dialog: '',
      itsc: '',
      history: []
    }
    this.socket = this.props.navigation.state.params.socket
  }
  componentDidMount () {
    AsyncStorage.getItem('itsc').then(itsc => {
      this.setState({ itsc })
      this.socket.emit('join room', { chatID: this.props.navigation.state.params.chatID, userID: itsc })
    })
    this.socket.on('message history', ({ chatID, history }) => {
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: history.reverse().concat(this.state.dialogs) })
      }
    })
    this.socket.on('receive message', ({ chatID, dialog }) => {
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: this.state.dialogs.concat(dialog) })
      }
    })
  }

  submitDialog = content => {
    // If empty content
    if (!content) return

    let dialog = { senderID: this.state.itsc, content: content }

    // Append the dialog
    this.setState({
      dialogs: this.state.dialogs.concat(dialog)
    })
    this.socket.emit('send message', { chatID: this.props.navigation.state.params.chatID, dialog: dialog })

    // Clear dialog input
    if (this.dialogInput != null) {
      this.dialogInput._root.clear()
    }
  }
  listMagic = dialog => {
    // If is a command
    if (dialog[0] === '@' && commands.some(({syntax}) => `@${syntax}`.startsWith(dialog.split(' ')[0]))) {
      this.setState({ isMenuOpen: true })
    } else if (dialog[0] !== '@' && this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false })
    }
  }

  render = () => { var _dialogList ; return (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <MenuContext>
      <ScrollView ref={dialogList => _dialogList = dialogList}>
      <List dataArray={this.state.dialogs} renderRow={dialog => (
        <Dialog dialog={dialog} itsc={this.state.itsc} navigation={this.props.navigation} />
      )}  onContentSizeChange={() => { _dialogList && _dialogList.scrollToEnd({animated: true})}} scrollEnabled showsVerticalScrollIndicator />
      </ScrollView>
        <Menu name="numbers" renderer={SlideInMenu} opened={this.state.isMenuOpen}>
          <MenuTrigger />
          <MenuOptions>{
            commands.filter((({syntax}) => `@${syntax}`.startsWith(this.state.dialog.split(' ')[0]))).map(command => (
              <ListItem key={command.syntax} onPress={() => { this.setState({ dialog: `@${command.syntax} `, isMenuOpen: false }) }} >
                <Left style={{ flex: 1 }}><Text>@{command.syntax}</Text></Left>
                <Body style={{ flex: 2 }}><Text>{command.description}</Text></Body>
              </ListItem>
            ))
          }</MenuOptions>
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
          onChangeText={text => this.listMagic(text)}
          onSubmitEditing={({nativeEvent}) => this.submitDialog(nativeEvent.text)}
        />
      </View>
    </KeyboardAvoidingView>
    </View>
  )}
}
