import React, {Component} from 'react'
import Expo from 'expo'
import { StyleProvider, Container } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui';

import getTheme from './theme/components'
import Router from './router'

import LoginForm from './Components/LoginForm'

function cacheImages(images) {
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
    isLoginned: true,
  }
  componentWillMount () {
    cacheAssets().then(() => {
      this.setState({ appReady: true })
    })
  }

  setUserState = loginState => {
    this.setState({
      isLoginned: loginState
    })
  }

  render = () => (
    <StyleProvider style={getTheme()}>
    <ThemeProvider>
      <Container>{
        this.state.appReady ?
          (this.state.isLoginned ? <Router /> : <LoginForm onLogin={this.setUserState} />) :
          // TODO make loading screen when assets not ready
          null
      }</Container>
    </ThemeProvider>
    </StyleProvider>
  )
}

Expo.registerRootComponent(Fetch)
