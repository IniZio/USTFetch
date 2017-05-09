import React, {Component} from 'react'
import { AsyncStorage } from 'react-native'
import Expo from 'expo'
import { StyleProvider, Container } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui';
import AppIntro from 'react-native-app-intro'

import getTheme from './theme/components'
import Router from './router'

import LoginForm from './Components/LoginForm'

const pageArray = [{
  title: 'Save Time and Money',
  description: 'Want to eat or go shopping without getting out of your seat? Create a request by pressing the plus button',
  img: require('./image.png'),
  imgStyle: {
    height: 80 * 2.5,
    width: 109 * 2.5,
  },
  backgroundColor: '#fa931d',
  fontColor: '#fff',
  level: 10,
}, {
  title: 'Earn Money on the Go',
  description: 'Earn tips by accepting shopping tasks for other students when you go out by pressing',
  img: require('./image 2.png'),
  imgStyle: {
    height: 93 * 2.5,
    width: 103 * 2.5,
  },
  backgroundColor: '#a4b602',
  fontColor: '#fff',
  level: 10,
}, {
  title: 'Intelligent Chatbot',
  description: 'To make sure your transaction runs smoothly, make use of the chatbot’s intuitive commands by typing',
  img: require('./image 3.png'),
  imgStyle: {
    height: 93 * 2.5,
    width: 103 * 2.5,
  },
  backgroundColor: 'grey',
  fontColor: '#fff',
  level: 10,
}, {
  title: 'Dependable Peers',
  description: 'Users must have an HKUST ITSC account and maintain a high rating to ensure safety and dependability',
  img: require('./image 4.png'),
  imgStyle: {
    height: 93 * 2.5,
    width: 103 * 2.5,
  },
  backgroundColor: 'grey',
  fontColor: '#fff',
  level: 10,
}];

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
    itsc: '',
    fresh: false
  }
  componentWillMount () {
    cacheAssets().then(async () => {
      try {
        // const fresh = await AsyncStorage.getItem('fresh')
        const fresh = true
        if (fresh) {
          this.setState({ fresh })
        }
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
  endIntro = () => {
    AsyncStorage.removeItem('fresh')
    this.setState({ fresh: false })
  }

  render = () => (
    <StyleProvider style={getTheme()}>
    <ThemeProvider>
      <Container>{
        this.state.appReady ?
          (this.state.token ? this.state.fresh ? <AppIntro onDoneBtnClick={this.endIntro} onSkipBtnclick={this.endIntro} pageArray={pageArray} /> : <Router /> : <LoginForm onLogin={(token, itsc) => this.setState({ token, itsc })} />) :
          null
      }</Container>
    </ThemeProvider>
    </StyleProvider>
  )
}

Expo.registerRootComponent(Fetch)
