import React, { Component } from 'react'
import { Components } from 'expo'
import { AsyncStorage, ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Content, View, Text, Textarea, List, ListItem, Card, CardItem, Input, Button, Toast, Icon, Left, Body, Right } from 'native-base'
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'
import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu'
const { SlideInMenu } = renderers

import variables from '../../theme/variables/platform'

import Dialog from './Dialog'

import commands from './commands'

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
    itsc: ''
  }
  constructor (props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      dialogs: [],
      dialog: '',
      itsc: ''
    }
    this.socket = this.props.navigation.state.params.socket
  }
  componentDidMount () {
    AsyncStorage.getItem('itsc').then(itsc => {
      this.setState({ itsc })
      this.socket.emit('join room', { chatID: this.props.navigation.state.params.chatID, userID: itsc })
    })
    this.socket.on('message history', ({ chatID, history }) => {
      history = history.reverse()
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: history })
      }
    })
    this.socket.on('receive message', ({ chatID, dialog }) => {
      if (this.props.navigation.state.params.chatID === chatID) {
        this.setState({ dialogs: this.state.dialogs.concat(dialog) })
      }
    })
    // NOTE: not sure if works, React might not react to the change
    this.socket.on('made decision', ({ chatID, dialogID, dialog }) => {
      let newDialogs = this.state.dialogs.map(oldDialog => {
        if (oldDialog._id === dialogID) return dialog
        else return oldDialog
      })
      this.setState({ dialogs: newDialogs })
    })
  }

  submitDialog = content => {
    // If empty content
    if (!content) return

    let dialog = { senderID: this.state.itsc, content: content }

    // Get parameter if is command
    // NOTE: now takes the parameter as sender's decision
    if (dialog.content[0] === '@') dialog.decision = dialog.content.substr(dialog.content.indexOf(' ')+1)

    // Append the dialog
    this.setState({
      dialogs: this.state.dialogs.concat(dialog)
    })
    this.socket.emit('send message', { chatID: this.props.navigation.state.params.chatID, dialog: dialog })

    // Clear dialog input
    this.setState({ dialog: '' })
    if (this.dialogInput != null) {
      this.dialogInput._root.clear()
    }
  }
  submitDecision = update => {
    this.socket.emit('make decision', { chatID: this.props.navigation.state.params.chatID, dialogID: update.dialogID, dialog: { decided: update.decided, decision: update.decision} })
  }
  listMagic = dialog => {
    // If is a command
    if (dialog[0] === '@' && commands.some(({syntax}) => (`@${syntax}`).startsWith(dialog))) {
      this.setState({ isMenuOpen: true })
    } else if (dialog[0] !== '@' && this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false })
    }
  }

  render = () => { var _dialogList ; return (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <MenuContext>
      <ScrollView ref={dialogList => { _dialogList = dialogList }}>
      <List dataArray={this.state.dialogs} renderRow={dialog => (
        <Dialog key={dialog._id} dialog={dialog} task_id={this.props.navigation.state.params.chatID} itsc={this.state.itsc} navigation={this.props.navigation} onMadeDecision={update=>this.submitDecision(update)} />
      )} onContentSizeChange={() => { _dialogList && _dialogList.scrollToEnd({animated: false}) }} scrollEnabled showsVerticalScrollIndicator />
      </ScrollView>
        <Menu name="numbers" renderer={SlideInMenu} opened={this.state.isMenuOpen}>
          <MenuTrigger />
          <MenuOptions>{
            commands.filter(({syntax}) => (`@${syntax}`).startsWith(this.state.dialog)).map(command => (
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
