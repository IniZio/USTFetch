import React, {Component} from 'react'
import { AsyncStorage } from 'react-native'
import Expo from 'expo'
import { StyleProvider, Container } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui';

import getTheme from './theme/components'
import Router from './router'

import LoginForm from './Components/LoginForm'

function cacheImages (images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Expo.Asset.fromModule(image).downloadAsync();
    }
  });
}

async function cacheAssets () {
  const imageAssets = await cacheImages([
    require('./USTFetch.png'),
    require('./USTFetch1.png'),
    require('./mapSample.png')
  ])
}

export default class Fetch extends Component {
  state = {
    appReady: false,
    token: null,
    itsc: ''
  }
  componentWillMount () {
    cacheAssets().then(async () => {
      try {
        const token = await AsyncStorage.getItem('Authorization')
        if (token) {
          this.setState({ token })
        }
        const itsc = await AsyncStorage.getItem('itsc')
        if (itsc) {
          this.setState({ itsc })
        }
      } catch (err) {
        console.log(err)
      }
      this.setState({ appReady: true })
    })
  }

  render = () => (
    <StyleProvider style={getTheme()}>
    <ThemeProvider>
      <Container>{
        this.state.appReady ?
          (this.state.token ? <Router /> : <LoginForm onLogin={(token, itsc) => this.setState({ token, itsc })} />) :
          // TODO make loading screen when assets not ready
          null
      }</Container>
    </ThemeProvider>
    </StyleProvider>
  )
}

Expo.registerRootComponent(Fetch)
