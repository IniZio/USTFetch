import React, { Component } from 'react'
import { Components } from 'expo'
import { AsyncStorage, ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Content, View, Text, Textarea, List, ListItem, Card, CardItem, Input, Button, Toast, Icon } from 'native-base'
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'

import variables from '../../theme/variables/platform'

import Dialog from './Dialog'

// const fakedialogs = [
//   { userAlias: 'bot', content: 'ask epan where is he now :)', type: 'info' },
//   { userAlias: 'me', content: 'Where are you now?' },
//   { userAlias: 'epan', content: '@locate me', type: 'command' },
//   { userAlias: 'bot', content: 'epan is at HKUST', type: 'event' },
//   { userAlias: 'epan', content: '@task complete' },
//   { userAlias: 'bot', content: 'Is task complete?', type: 'decide' }
// ]

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

  sendDialog = dialog => {
    if (dialog) {
      this.setState({
        dialogs: this.state.dialogs.concat([
          { senderID: this.state.itsc, content: dialog }
        ])
      })
      this.socket.emit('send message', { chatID: this.props.navigation.state.params.chatID, senderID: this.state.itsc, content: dialog })
    }
    if (this.dialogInput != null) {
      this.dialogInput._root.clear()
    }
  }
  checkMagic = dialog => {
    if (dialog[0] === '@' && dialog.length <= 1) {
      Toast.show({
        text: 'No magic yet >:D',
        type: 'danger',
        position: 'center',
        buttonText: 'dammit...',
        duration: 3000
      })
    }
  }

  render = () => (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <List dataArray={this.state.dialogs} renderRow={dialog => (
        <Dialog dialog={dialog} itsc={this.state.itsc} navigation={this.props.navigation} />
      )} />
      <View style={{ height: 45, flexDirection: 'row', backgroundColor: variables.footerDefaultBg, padding: 5 }} >
        <Input
          blurOnSubmit
          clearTextOnFocus
          ref={input => { this.dialogInput = input } }
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
