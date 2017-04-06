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
  { userAlias: 'epan',   content: '@locate me' },
  { userAlias: 'bot',    content: 'epan is at HKUST', type: 'event' },
  // { userAlias: 'bot',    content: <Image style={{ height: 180, width: 180 }} source={require('../../mapSample.png')} /> , type: 'info' },
  /*{ userAlias: 'bot',    content: <Components.MapView
                                    style={{ flex: 1, height: 180, width: 180 }}
                                    initialRegion={{
                                      latitude: 37.78825,
                                      longitude: -122.4324,
                                      latitudeDelta: 0.0922,
                                      longitudeDelta: 0.0421,
                                    }}
                                  >
                                    <Components.MapView.Marker draggable
                                      coordinate={{latitude: 37.78825, longitude: -122.4324 }}
                                      title={'somewhere'}
                                      description={'some description maybe'}
                                    />
                                  </Components.MapView> , type: 'consensus' },*/
  { userAlias: 'epan',   content: '@task complete' },
  { userAlias: 'bot',    content: 'Is task complete?', type: 'decide' }
]

export default class dialogRoom extends Component {
  static navigationOptions = {
    header: ({navigate, state}) => ({
      title: <TouchableOpacity onPress={() => navigate('Profile', { user: state.params.receiver })}>
             <View>
              <Text>{ state.params.receiver.userAlias }<Text style={{ fontSize: 10 }}>({ state.params.objective })</Text></Text>
              <Text note style={{ textAlign: 'center' }}>{ state.params.receiver.role }</Text>
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={65} contentContainerStyle={{flex: 1}} style={{flex: 1}}>
      <List dataArray={this.state.dialogs} renderRow={dialog => (
        <Dialog dialog={dialog} navigation={this.props.navigation} />
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
          onSubmitEditing={e => this.sendDialog(e.nativeEvent.text)}
        />
      </View>
    </KeyboardAvoidingView>
    </View>
  )
}
