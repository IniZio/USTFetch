import React, { Component } from 'react';
import dismissKeyboard from 'react-native-dismiss-keyboard'
import {
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

import variables from '../theme/variables/platform'

export default class LoginForm extends Component {
  static navigationOptions = {
    header: { visible: false }
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
                <Input placeholder="ITSC" autoCapitalize="none" autoCorrect={false} autoFocus/>
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
