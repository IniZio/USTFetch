import React, { Component } from 'react'
import { ScrollView, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { Content, View, Text, Textarea, List, ListItem, Card, CardItem, Input, Button, Toast } from 'native-base'
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'

import variables from '../../theme/variables/platform'

import ChatRow from './ChatRow'

const fakeMessages = [
  { name: 'me',     content: 'Where are you now?' },
  { name: 'epan',   content: '@locate me' },
  { name: 'bot',    content: 'epan wants to locate himself', type: 'event' },
  { name: 'bot',    content: <Image style={{ height: 180, width: 180 }} source={require('../../mapSample.png')} /> , type: 'info' },
  { name: 'epan',   content: '@mission complete' },
  { name: 'bot',    content: 'epan wants to confirm mission complete', type: 'event' },
  { name: 'bot',    content: 'Is mission complete?', type: 'decide' }
]

export default class ChatRoom extends Component {
  static navigationOptions = {
    header: {
      title: 'Edmund Pan'
    }
  }
  state = {
    messages: fakeMessages,
    message: ''
  }

  sendMessage = message => {
    if (message) {
      this.setState({
        messages: this.state.messages.concat([
          { name: 'me',     content: message }
        ])
      })
    }
    // TODO clear textbox
  }
  checkMagic = message => {
    if (message[0] === '@') {
      // Toast.show({
      //   text: 'No magic yet >:D',
      //   type: 'danger',
      //   position: 'center',
      //   buttonText: 'dammit...',
      //   duration: 3000
      // })
    }
  }

  render = () => (
    <View style={{ flex: 1 }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <List dataArray={this.state.messages} renderRow={message => (
        <ChatRow message={message} />
      )} />
      <View style={{ height: 40,flexDirection: 'row' }} >
        <Input
          blurOnSubmit
          clearTextOnFocus
          //multiline
          keyboardType="email-address"
          enablesReturnKeyAutomatically
          returnKeyType="send"
          clearButtonMode="always"
          style={{flex: 1, backgroundColor: variables.footerDefaultBg, fontSize: 16, padding: 5 }}
          placeholderTextColor={variables.inputColorPlaceholder}
          placeholder="Type @ for magic ;)"
          onChangeText={text => this.checkMagic(text)}
          onSubmitEditing={e => this.sendMessage(e.nativeEvent.text)}
        />
      </View>
    </KeyboardAvoidingView>
    </View>
  )
}
