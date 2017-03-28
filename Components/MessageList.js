import React, { Component } from 'react'
import {
  Content, View,
  Left, Body, Right,
  List, ListItem,
  Text, Button, Icon
} from 'native-base'
import {Avatar} from 'react-native-material-ui';

const fakeMessages = [
  { content: 'Where are you now?', username: 'Epan' },
  { content: 'What product would you like?', username: 'Yihao' }
]

export default class MessageList extends Component {
  state = {
    messages: fakeMessages
  }
  render = () => (
    <Content>
      <List dataArray={this.state.messages} renderRow={message => (
        <ListItem onPress={() => this.props.navigation.navigate('ChatRoom')} >
            <View style={{width: 70}}>
              <Avatar text={message.username[0]} size={40} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>{message.username}</Text>
              <Text note>{message.content}</Text>
            </View>
            <Right>
              <Button iconRight transparent >
                <Icon name="arrow-forward" />
              </Button>
            </Right>
        </ListItem>
      )} />
    </Content>
  )
}
