import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
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
    let task = this.props.task
    let { navigate } = this.props.navigation
    return (
      <ListItem thumbnail onPress={() => navigate('TaskDetail', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' } , objective: task.objective } )}>
        <Left>
          <View style={{ height: 45, width: 50 }}>
              <Avatar text={task.userAlias[0]} size={50} />
            </View> 
          {/*<Thumbnail square size={90} source={require('../../Fetch.png')} />*/}
        </Left>
        <Body style={{ paddingVertical: 5 }}>
          <Text>{task.objective}</Text>
          <Text note><Icon style={{ fontSize: 13 }} name="cash" /> ${task.tip}</Text>
          <Text note><Icon style={{ fontSize: 13 }} name="stopwatch" />  {task.deadline}</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Profile', { user: { userID: task.userID, userAlias: task.userAlias } })}>
          <View style={{ flexDirection: 'row', flex: 1, marginVertical: 2 }}>
            {/*<View style={{ height: 45, width: 50 }}>
              <Avatar text={task.userAlias[0]} size={40} />
            </View>*/}
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text note>Requester: <Text>{task.userAlias}</Text></Text>
              <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', marginBottom: 2 }}>
                {[,...Array(5)].map((x, index) => (
                  <Icon name="ios-star" style={{ fontSize: 15, color: 'orange' }} key={index}/>
                ))}
              </View>
            </View>

          </View>
          </TouchableOpacity>

        </Body>
        <Right style={{ paddingVertical: 0 }}>
          {
            task.status !== 'MEETUP' ?
            <Button transparent block onPress={() => navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' } , objective: task.objective } )}>
              <Text style={{ fontSize: 18 ,color: variables.brandPrimary}}>Fetch!</Text>
            </Button> :
            <Button transparent block onPress={() => navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' } , objective: task.objective } )}>
              <Text>{task.status}</Text>
            </Button>
          }
        </Right>
      </ListItem>
    )
  }
}
