import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  Text, Button, Icon,
  Card, CardItem,
  Content, Body, View,
  Left, Right
} from 'native-base'
import { Avatar } from 'react-native-material-ui';

export default class TaskDetail extends Component {
  static navigationOptions = {
    header: {
      title: 'Uniqlo Flannel',
      right:<View style={{ flexDirection: 'row' }}>
              <Button transparent>
                <Icon name="share"/>
              </Button>
            </View>
    }
  }

  render = () => (
    <Content>
    <Card>
      <CardItem>
        <Body>
          <View style={{}}>
            <View style={{ alignSelf: 'stretch', minHeight: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../USTFetch.png')} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text>Yihao Chan</Text>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {[,...Array(5)].map((x, index) => (
                  <Icon name="star" style={{ fontSize: 20 }} key={index}/>
                ))}
              </View>
            </View>
            <Text style={{ fontWeight: 'bold' }}>Detail</Text>
            <Text>
              Suspendisse nulla sem, pellentesque vel elit sed, mollis aliquam quam. Vestibulum ut velit sed neque mattis euismod. Sed at elementum mauris, quis eleifend lorem. Duis faucibus lacinia varius. Donec et velit sed orci mattis semper. Aliquam non laoreet urna. Vivamus vestibulum vulputate tellus nec blandit. Pellentesque cursus magna quis ante.
            </Text>
            <Button primary full onPress={() => this.props.navigation.navigate('TaskForm')}>
              <Text>Fetch!</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
    </Content>
  )
}
