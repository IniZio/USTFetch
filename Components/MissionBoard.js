import React, { Component } from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import {
  Content, Body,
  Card, CardItem,
  Button,
  Icon, Text,
  List
} from 'native-base'
import {Avatar} from 'react-native-material-ui';

const fakeMissions = [
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' }
]

export default class MissionBoard extends Component {
  state = {
    missions: fakeMissions
  }
  render = () => {
    const { navigate } = this.props.navigation
    return (
      <Content>
        <List dataArray={this.state.missions} renderRow={mission => (
          <Card>
            <CardItem onPress={() => navigate('MissionDetail')}>
              <Body>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  {/*Center align the picture*/}
                  <View style={{justifyContent: 'center', alignItems: 'center'}}><Image source={require('../Fetch.png')} /></View>
                  {/*Align the product attributes*/}
                  <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>{mission.name}</Text>
                    <Text>{mission.deadline}</Text>
                    <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
                      <View style={{ height: 50, width: 55 }}>
                        <Avatar text={mission.username[0]} size={40} />
                      </View>
                      <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text>{mission.username}</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                          {[,...Array(5)].map((x, index) => (
                            <Icon name="star" style={{ fontSize: 20 }} key={index}/>
                          ))}
                        </View>
                      </View>
                    </View>
                    <View>
                      <Button primary block onPress={() => navigate('TaskForm')}>
                        <Text>Join</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        )} />
      </Content>
    )
  }
}
