import React, { Component } from 'react';
import dismissKeyboard from 'react-native-dismiss-keyboard'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { Grid, Col } from 'react-native-easy-grid'
import {
  StyleProvider,
  Form,
  Item,
  Label,
  Input,
  Button,
  Container
} from 'native-base'

export default class AuthForm extends Component {
  render = () => (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container theme={{ brandPrimary: '#FF69B4' }}
        contentContainerStyle={{flex: 1}} style={{padding: 60}}
      >
        <Grid style={{alignItems: 'center'}}>
          <Col size={9}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Image style={{ maxHeight: 40 }} resizeMethod="scale" source={require('../USTFetch.png')}/>
            </View>
            <Form>
              <Item>
                <Input placeholder="ITSC"/>
              </Item>
              <Item>
                <Input placeholder="Password" secureTextEntry />
              </Item>
              <Grid style={{ marginTop: 20 }}>
                <Col>
                  <Button light transparent>
                    <Text style={{ color: 'grey', fontSize: 10 }}>Forgot Password?</Text>
                  </Button>
                </Col>
                <Col>
                  <Button primary onPressOut={() => this.props.onLogin(true)}>
                    <Text style={{color: '#fff'}}>Login/Signup</Text>
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