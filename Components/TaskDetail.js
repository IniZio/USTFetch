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
    header: ({state}) => ({
      title: state.params.task.objective,
      right:<View style={{ flexDirection: 'row' }}>
              <Button transparent>
                <Icon name="share"/>
              </Button>
            </View>
    })
  }

  render = () => { const {task} = this.props.navigation.state.params; return (
    <Content>
    <Card>
      <CardItem>
        <Body>
          <View style={{}}>
            <View style={{ alignSelf: 'stretch', minHeight: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../USTFetch.png')} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text>{task.requester_id}</Text>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {[,...Array(5)].map((x, index) => (
                  <Icon name="star" style={{ color: 'orange', fontSize: 20 }} key={index}/>
                ))}
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', marginTop: 2 }}>Details</Text>
            <Text>
              {task.description}
            </Text>
            <Button style={{margin: 8}} primary full onPress={() => this.props.navigation.navigate('TaskForm')}>
              <Text>Fetch!</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
    </Content>
  )}
}
