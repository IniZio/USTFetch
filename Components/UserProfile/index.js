import React, { Component } from 'react'
import { Content, Body, Card, CardItem, View, Icon , Text} from 'native-base'
import {Avatar} from 'react-native-material-ui'

import MissionList from '../MissionList'

const fakeProfile = {
  username: 'inizio',
  fullname: 'Newman Chow',
  rating: 4
}

const fakeOngoingMissions = [
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
]

const fakeCompletedMissions = [
  { name: 'Uniqlo Flannel', username: 'Yihao' },
]

export default class UserProfile extends Component {
  state = {
    profile: fakeProfile,
    ongoingMissions: fakeOngoingMissions,
    completedMissions: fakeCompletedMissions
  }
  render = () => (
    <Content>
      <Card>
        <CardItem>
          <Body>
            <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
              <View style={{ height: 50, width: 55 }}>
                <Avatar text={this.state.profile.username[0]} size={40} />
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>{this.state.profile.fullname}</Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  {[,...Array(5)].map((x, index) => (
                    <Icon name="ios-star" style={{ fontSize: 20 }} key={index}
                          style={{ color: (this.state.profile.rating >= index) ? 'orange' : 'grey' }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
      <View><Text>Ongoing Missions</Text></View>
      <View><MissionList navigation={this.props.navigation} /></View>
    </Content>
  )
}
