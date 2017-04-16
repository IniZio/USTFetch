import React, { Component } from 'react'
import { Components } from 'expo'
import { ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Content, View, Text, Textarea, List, ListItem, Card, CardItem, Input, Button, Toast, Icon } from 'native-base'
import { KeyboardAwareScrollView, KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'

import variables from '../../theme/variables/platform'

import Dialog from './Dialog'

const fakedialogs = [
  { userAlias: 'bot',    content: 'ask epan where is he now :)', type: 'info' },
  { userAlias: 'me',     content: 'Where are you now?' },
  { userAlias: 'epan',   content: '@locate me', type: 'command' },
  { userAlias: 'bot',    content: 'epan is at HKUST', type: 'event' },
  { userAlias: 'epan',   content: '@task complete' },
  { userAlias: 'bot',    content: 'Is task complete?', type: 'decide' }
]

export default class dialogRoom extends Component {
  static navigationOptions = {
    header: ({navigate, state}) => ({
      title: <TouchableOpacity onPress={() => navigate('Profile', { user: state.params.receiver })}>
             <View>
              <Text>{ state.params.receiver.userAlias }<Text note style={{ fontSize: 12 }}> ({ state.params.receiver.role })</Text></Text>
              <Text note>{ state.params.objective }</Text>
             </View>
             </TouchableOpacity>,
      right: <Button transparent>
              <Icon name="md-more" />
             </Button>
    })
  }
  state = {
    dialogs: fakedialogs,
    dialog: ''
  }

  sendDialog = dialog => {
    if (dialog) {
      this.setState({
        dialogs: this.state.dialogs.concat([
          { alias: 'me',     content: dialog }
        ])
      })
    }
    // TODO clear textbox
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
        <Dialog dialog={dialog} navigation={this.props.navigation} />
      )} />
      <View style={{ height: 45,flexDirection: 'row', backgroundColor: variables.footerDefaultBg, padding: 5 }} >
        <Input
          blurOnSubmit
          clearTextOnFocus
          //multiline
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
