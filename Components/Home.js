import React, {Component} from 'react';
import { StyleSheet, Image, StatusBar, Animated } from 'react-native'
import {
  View, Container, Content,
  Left, Right, Body,
  Card, CardItem,
  Text, Icon, Button,
  Title,
  Tab, Tabs
} from 'native-base';
import ActionButton from 'react-native-action-button';

import variables from '../theme/variables/platform'

// Tab components
import TaskBoard from './TaskBoard'
import ChatList from './ChatList'
import UserProfile from './UserProfile'

export default class Home extends Component {
  static navigationOptions = {
    header: {
      visible: false,
      style: {
        elevation: 0
      },
      left: <Image style={{ height: 25, width: 75 }} source={require('../Fetch.png')}/>,
      right:<View style={{ flexDirection: 'row' }}>
              <Button transparent>
                <Icon name="heart"/>
              </Button>
              <Button transparent>
                <Icon name="people"/>
              </Button>
              <Button transparent>
                <Icon name="search"/>
              </Button>
            </View>
    }
  }

  hideCreateButton = () => {
    console.log('Hidding button')
  }

  render = () => (
    <Container style={{ marginTop: StatusBar.currentHeight }}>
      <View style={{ height: 6, backgroundColor: variables.footerDefaultBg }}></View>
      <Tabs initialPage={0}>
        <Tab heading="Explore">
          <TaskBoard navigation={this.props.navigation} onScroll={() => this.hideCreateButton()} />
        </Tab>
        <Tab heading="Chats">
          <ChatList navigation={this.props.navigation} />
        </Tab>
        <Tab heading="Me">
          <UserProfile navigation={this.props.navigation} />
        </Tab>
      </Tabs>
      {/*<ActionButton buttonColor={variables.brandPrimary} title="New Task" degrees={0} activeOpacity={0.8} useNativeFeedback={true}
        onPress={() => this.props.navigation.navigate('TaskForm')}
      >
        <Icon name="add" />
      </ActionButton>*/}
    </Container>
  )
}

const styles = StyleSheet.create({});
