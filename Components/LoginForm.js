import React, { Component } from 'react';
import dismissKeyboard from 'react-native-dismiss-keyboard'
import {
  AsyncStorage,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { Grid, Col } from 'react-native-easy-grid'
import {
  StyleProvider,
  Form,
  Item,
  Label, Text,
  Input,
  Button,
  Container
} from 'native-base'

import { loginUser, registerUser } from '../api'
import variables from '../theme/variables/platform'

export default class LoginForm extends Component {
  static navigationOptions = {
    header: { visible: false }
  }
  state = {
    itsc: '',
    password: '',
    error: ''
  }

  submitLogin = () => {
    // IF login fail than try to register, if still fail than that means user used wrong password
    fetch(`https://api.usthing.xyz/Directory/api.php?itsc=${this.state.itsc}`).then(response => response.json())
    .then(result => {
      if (result.success) {
        this.setState({ error: '' })
      loginUser({ itsc: this.state.itsc, password: this.state.password }).then(({success, token}) => {
        if (success) {
          AsyncStorage.setItem('Authorization', token).then(() => {
            AsyncStorage.setItem('itsc', this.state.itsc).then(() => this.props.onLogin(token, this.state.itsc))
          })
        } else {
          registerUser({ itsc: this.state.itsc, password: this.state.password }).then(({success, token}) => {
            if (success) {
              AsyncStorage.setItem('Authorization', token).then(() => {
                // AsyncStorage.setItem('fresh', true)
                AsyncStorage.setItem('itsc', this.state.itsc).then(() => this.props.onLogin(token, this.state.itsc))
              })
            } else {
              this.setState({ error: 'Wrong password' })
            }
          })
        }
      })
      } else { this.setState({ error: 'Please enter valid itsc' }) }
    })
  }

  render = () => (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container contentContainerStyle={{flex: 1}} style={{padding: 60}}>
        <Grid style={{alignItems: 'center'}}>
          <Col size={9}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Image style={{ maxHeight: 40 }} resizeMethod="scale" source={require('../USTFetch.png')}/>
            </View>
            <Form>
              <Item>
                <Input placeholder="ITSC" onChangeText={itsc => this.setState({ itsc }) } autoCapitalize="none" autoCorrect={false} autoFocus/>
              </Item>
              <Item>
                <Input placeholder="Password" onChangeText={password => this.setState({ password })} secureTextEntry />
              </Item>{
                !!this.state.error &&
                <Item>
                  <Text style={{ fontSize: 12, color: 'red' }}>{this.state.error}</Text>
                </Item>
              }
              <Grid style={{ marginTop: 20 }}>
                <Col>
                  <Button light transparent>
                    <Text style={{ color: 'grey', fontSize: 10 }}>Forgot Password?</Text>
                  </Button>
                </Col>
                <Col>
                  <Button primary block onPressOut={() => this.submitLogin()}>
                    <Text>Login/Signup</Text>
                  </Button>
                </Col>
              </Grid>
            </Form>
          </Col>
        </Grid>
      </Container>
    </TouchableWithoutFeedback>
  )
}
