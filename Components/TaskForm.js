import React, { Component } from 'react'
import { Slider, Modal, TouchableOpacity } from 'react-native'
import {
  Container, Content, Body, View,
  Card, CardItem,
  Form,
  Item, InputGroup, Input, Label, Text, ListItem,
  Picker, Button, Icon, CheckBox,
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
    bidStatus: 'PENDING',
    cost: 0,
    tip: 0,
    preferFemale: false
  }

  submitRequest = () => {
    this.props.navigation.navigate('ChatRoom', { receiver: fakeFetcher })
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
              <Item style={{ marginVertical: 10 }}>
                <Label>I need:</Label><Input />
              </Item>
              <Item style={{ marginVertical: 10 }}>
                <Label>From:</Label><Input />
              </Item>
              <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                <Item style={{ width: 200 }}>
                  <Label>Within:</Label><Input keyboardType="numeric" />
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
              <Item style={{ marginVertical: 10 }}>
                <Label>Cost: $</Label><Input keyboardType="numeric" defaultValue={this.state.cost} onChange={({nativeEvent}) => this.setState({ cost: nativeEvent.text })} />
              </Item>
              <Item style={{ marginVertical: 10 }}>
                <Label>Tip: $</Label><Input keyboardType="numeric" defaultValue={this.state.tip} onChange={({nativeEvent}) => this.setState({ tip: nativeEvent.text })} />
              </Item>
              <Item stackedLabel style={{ marginVertical: 10 }}>
                <Label>Additional information</Label>
                <Input />
              </Item>
              <TouchableOpacity activeOpacity={70} onPress={() => this.setState({ preferFemale: !this.state.preferFemale })}>
              <View style={{ flex: 1, flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <View style={{ height: 20, width: 40 }}><CheckBox checked={this.state.preferFemale} /></View>
                <View><Text>I would prefer a female fetcher</Text></View>
              </View>
              </TouchableOpacity>
              <Button primary block onPress={() => this.submitRequest()}>
                <Text>Request!</Text>
              </Button>
            </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
  )
}
