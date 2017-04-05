import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import {
  Body, Left, Right,
  Card, CardItem,
  ListItem, Thumbnail,
  Button, Icon, Text
} from 'native-base'
import {Avatar} from 'react-native-material-ui';

export default class TaskItem extends Component {
  render = () => {
    let task = this.props.task
    let { navigate } = this.props.navigation
    return (
      <ListItem thumbnail onPress={() => navigate('TaskDetail')}>
        <Left>
          <Thumbnail square size={90} source={require('../../Fetch.png')} />
        </Left>
        <Body style={{ paddingVertical: 5 }}>
          <Text>{task.objective}</Text>
          <Text note>{task.deadline}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Profile', { user: { userID: task.userID, userAlias: task.userAlias } })}>
          <View style={{ flexDirection: 'row', flex: 1, marginVertical: 2 }}>
            <View style={{ height: 45, width: 50 }}>
              <Avatar text={task.userAlias[0]} size={40} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text>{task.userAlias}</Text>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {[,...Array(5)].map((x, index) => (
                  <Icon name="ios-star" style={{ fontSize: 15, color: 'orange' }} key={index}/>
                ))}
              </View>
            </View>
          </View>
          </TouchableOpacity>
        </Body>
        <Right style={{ paddingVertical: 0 }}>
          <Button primary block onPress={() => navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' } , objective: task.objective } )}>
            <Text>Fetch!</Text>
          </Button>
        </Right>
      </ListItem>
    )
  }
}

    {/*<Card>
      <CardItem onPress={() => navigate('TaskDetail')}>
        <Body>
          <View style={{ flexDirection: 'row', flex: 1 }}>

            <View style={{justifyContent: 'center', alignItems: 'center'}}><Image source={require('../../Fetch.png')} /></View>

            <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
              <Text style={{ fontSize: 20 }}>{task.objective}</Text>
              <Text note>{task.deadline}</Text>

              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Profile', { user: { userID: task.userID, userAlias: task.userAlias } })}>
                <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
                  <View style={{ height: 50, width: 55 }}>
                    <Avatar text={task.userAlias[0]} size={40} />
                  </View>
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text>{task.userAlias}</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      {[,...Array(5)].map((x, index) => (
                        <Icon name="ios-star" style={{ fontSize: 15, color: 'orange' }} key={index}/>
                      ))}
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              </View>
              <View>
                <Button light block onPress={() => navigate('ChatRoom', { receiver: { userID: task.userID, userAlias: task.userAlias, role: 'Requester' } , objective: task.objective } )}>
                  <Text>Fetch!</Text>
                </Button>
              </View>

            </View>
          </View>
        </Body>
      </CardItem>
    </Card>*/}