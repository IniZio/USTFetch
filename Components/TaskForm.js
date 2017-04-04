import React, { Component } from 'react'
import { Slider, Modal } from 'react-native'
import {
  Container, Content, Body, View,
  Card, CardItem,
  Form,
  Item, InputGroup, Input, Label, Text,
  Picker, Button, Icon,
  Spinner
} from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

const ROLE_FETCHER = 'Fetcher'
const fakeFetcher =   { userID: 2, userAlias: 'Epan',  role: ROLE_FETCHER,   objective: 'Pencil' }

export default class TaskForm extends Component {
  static navigationOptions = {
    header: {
      title: 'New Task',
    }
  }
  state = {
    requestModalVisible: false,
    bidStatus: 'PENDING'
  }

  submitRequest = () => {
    this.setState({
      requestModalVisible: true
    })

    setTimeout(() => {
      this.setState({
        bidStatus: 'ACCEPTED'
      })
    }, 2000)
  }

  render = () => (
    <Content>
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.requestModalVisible}
      >
        <Container style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', paddingHorizontal: 50, paddingVertical: 200 }}>
          <Card>
            <CardItem>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>{
                this.state.bidStatus === 'PENDING' ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 70, marginHorizontal: 30 }}>
                    <Text>Waiting for Fetcher response</Text>
                    <Spinner />
                  </View> :
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 70, marginHorizontal: 30 }}>
                    <View><Text>Task {this.state.bidStatus} !</Text></View>
                    <Button primary block onPress={() => {
                      this.setState({
                        requestModalVisible: false
                      })
                      this.props.navigation.navigate('ChatRoom', { receiver: fakeFetcher })
                      }}>
                      <Icon name="arrow-forward" />
                    </Button>
                  </View>
              }</View>
            </CardItem>
          </Card>
        </Container>
      </Modal>
        <Card>
          <CardItem>
            <Body>
            <View style={{ alignSelf: 'stretch' }}>
              <Item stackedLabel>
                <Label>I need:</Label><Input />
              </Item>
              <Item stackedLabel>
                <Label>From:</Label><Input />
              </Item>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Item stackedLabel style={{ width: 200 }}>
                  <Label>Within:</Label><Input />
                </Item>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Picker
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue="key0"
                  onValueChange={() => {}}
                  style={{width: 100}}
                  mode="dropdown"
                >
                  <Picker.Item label="Hour" value="key0" />
                  <Picker.Item label="Day" value="key1" />
                </Picker>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Label>Cost: </Label>
                <Slider value={0.6}/>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Label>Tip: </Label>
                <Slider value={0.2}/>
              </View>
              <Item stackedLabel>
                <Label>Additional information</Label>
                <Input />
              </Item>
              <Button primary block style={{ marginTop: 30 }} onPress={() => this.submitRequest()}>
                <Text>Request!</Text>
              </Button>
            </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
  )
}
