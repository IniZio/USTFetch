import React, {Component} from 'react';
import Expo from 'expo';
import {StyleSheet, View, Image} from 'react-native';
import {
  StyleProvider,
  Container, Header, Content, 
  Card, CardItem,
  Button,
  Left, Right,
  Body,
  Text,
  Icon,
  Title,
  Tab, Tabs
} from 'native-base';
import {ThemeProvider, Avatar} from 'react-native-material-ui';
import {TabBar} from 'react-native-tab-view'

import getTheme from './theme/components'

import MissionBoard from './Components/MissionBoard'
import AuthForm from './Components/AuthForm.js'

export default class fetch extends Component {
  state = {
    isLoginned: true
  }

  setUserState = loginState => {
    this.setState({
      isLoginned: loginState
    })
  }

  render = () => (
    <StyleProvider style={getTheme()}>
    <ThemeProvider>
        {
          this.state.isLoginned ?
            <Container>
              <Header hasTabs>
                <Left>
                  <Image style={{ maxHeight: 40 }} resizeMethod="scale" source={require('./USTFetch1.png')}/>
                </Left>
                <Body>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name="heart"/>
                  </Button>
                  <Button transparent>
                    <Icon name="people"/>
                  </Button>
                  <Button transparent>
                    <Icon name="search"/>
                  </Button>
                </Right>
              </Header>
              <Tabs>
                <Tab heading="Missions">
                  <MissionBoard />
                </Tab>
                <Tab heading="Messages"></Tab>
                <Tab heading="Me"></Tab>
              </Tabs>
            </Container>:
            <AuthForm onLogin={this.setUserState}/>
        }
    </ThemeProvider>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({});

// AppRegistry.registerComponent('fetch', () => fetch);
Expo.registerRootComponent(fetch)
