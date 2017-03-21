/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  DrawerLayoutAndroid,
  View
} from 'react-native';
import Expo from 'expo';
import { 
  Toolbar,
  Card,
  COLOR,
  ThemeProvider,
  Avatar
 } from 'react-native-material-ui';
 import {
   TabBar
 } from 'react-native-tab-view'

export default class fetch extends Component {
  state = {
    isLoginned: true
  }
  render = () => (
    <ThemeProvider uiTheme={{
      palette: {
        primaryColor: COLOR.pink500,
      },
    }}>
      {
        this.state.isLoginned ?
          <View>
            <Toolbar
            centerElement={'USTFetch!'}
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            />
            <View style={{ padding: 10 }}>
              <Card>
                <View style={{ margin: 20 }}>
                  <Avatar text="E" size={50} style={{ margin: 20 }}/>
                </View>
              </Card>
              <Card>
                <View style={{ margin: 20 }}>
                  <Avatar text="Y" size={50} style={{ margin: 20 }}/>
                </View>
              </Card>
            </View>
          </View> :
          <View>
            <Text>Not logined</Text>
          </View>
      }
      
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
});

// AppRegistry.registerComponent('fetch', () => fetch);
Expo.registerRootComponent(fetch)
