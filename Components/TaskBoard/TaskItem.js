import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import {
  Body, Left, Right,
  Card, CardItem,
  ListItem, Thumbnail,
  Button, Icon, Text
} from 'native-base'
import {Avatar} from 'react-native-material-ui'

import variables from '../../theme/variables/platform'

export default class TaskItem extends Component {
  render = () => {
    let { task, navigation } = this.props
    return (
      <ListItem onPress={() => navigation.navigate('TaskDetail', task)} thumbnail>
        <Left>
          <View style={{ height: 45, width: 50 }}>
            <Image style={{ height: 45, width: 50 }} resizeMethod="resize" source={require('../../Fetch.png')} />
          </View>
        </Left>
        <Body style={{ paddingVertical: 5 }}>
          <Text>{task.objective}</Text>
          <Text note><Icon style={{ fontSize: 13 }} name="cash" /> ${task.tip} tips</Text>
          <Text note><Icon style={{ fontSize: 13 }} name="stopwatch" />{task.deadline}</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile', { user: { userID: task.userID, userAlias: task.userAlias } })}>
          <View style={{ flexDirection: 'row', flex: 1, marginVertical: 2 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text>{task.userAlias}</Text>
              <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', marginBottom: 2 }}>
                {[, ...Array(5)].map((x, index) => (
                  <Icon name="ios-star" style={{ fontSize: 15, color: 'orange' }} key={index}/>
                ))}
              </View>
            </View>

          </View>
          </TouchableOpacity>

        </Body>
        <Right style={{ paddingVertical: 0 }}>
          {
            task.status !== 'MEETUP'
            ? <Button transparent block onPress={() => navigation.navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' }, objective: task.objective })}>
              <Text style={{ fontSize: 18, color: variables.brandPrimary}}>Fetch!</Text>
            </Button>
            : <Button transparent block onPress={() => navigation.navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' }, objective: task.objective })}>
              <Text>{task.status}</Text>
            </Button>
          }
        </Right>
      </ListItem>
    )
  }
}
