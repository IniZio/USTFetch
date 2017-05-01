import React, { Component } from 'react'
import { Slider, Modal, TouchableOpacity } from 'react-native'
import { createTask } from '../../api'
import {
  Container, Content, Body, View, Header,
  Left, Right,
  Card, CardItem,
  Form,
  Item, InputGroup, Input, Label, Text, ListItem, Title,
  Picker, Button, Icon, CheckBox,
  Spinner
} from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

const ROLE_FETCHER = 'Fetcher'
const fakeFetcher = { userID: 2, userAlias: 'Epan', role: ROLE_FETCHER, objective: 'Pencil' }

export default class TaskForm extends Component {
  static navigationOptions = {
    header: {
      title: 'New Task'
    }
  }
  state = {
    requestModalVisible: false,
    bidStatus: 'PENDING',
    cost: 0,
    tip: 0,
    preferFemale: false,
    objective: '',
    fromWhere: '',
    toWhere: '',
    description: '',
    within: 0,
    withinUnit: ''
  }

  submitRequest = () => {
    createTask({
      requester_id: 'abc',
      objective: this.state.objective,
      from_where: this.state.fromWhere,
      to_where: this.state.toWhere,
      description: this.state.description,
      cost: this.state.cost,
      tip: this.state.tip
    })
    .then(() => { this.props.closeForm() })
  }

  render = () => (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.closeForm()}><Icon name="close" /></Button>
        </Left>
        <Body>
          <Title>Create Task</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <Card>
          <CardItem>
            <Body>
            <View style={{ alignSelf: 'stretch' }}>
              <Item style={{ marginVertical: 10 }}>
                <Label>I need:</Label><Input onChangeText={objective => this.setState({ objective })} />
              </Item>
              <Item style={{ marginVertical: 10 }}>
                <Label>From:</Label><Input onChangeText={fromWhere => this.setState({ fromWhere })} />
              </Item>
              <Item style={{ marginVertical: 10 }}>
                <Label>To:</Label><Input onChangeText={toWhere => this.setState({ toWhere })} />
              </Item>
              <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                <Item style={{ width: 200 }}>
                  <Label>Within:</Label><Input keyboardType="numeric" onChangeText={within => this.setState({ within }) } />
                </Item>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Picker
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue="key0"
                  onValueChange={withinUnit => this.setState({ withinUnit })}
                  style={{width: 100}}
                  mode="dropdown"
                >
                  <Picker.Item label="Hour" value="key0" />
                  <Picker.Item label="Day" value="key1" />
                </Picker>
                </View>
              </View>
              <Item style={{ marginVertical: 10 }}>
                <Label>Cost: $</Label><Input keyboardType="numeric" defaultValue={this.state.cost} onChangeText={cost => this.setState({ cost })} />
              </Item>
              <Item style={{ marginVertical: 10 }}>
                <Label>Tip: $</Label><Input keyboardType="numeric" defaultValue={this.state.tip} onChangeText={tip => this.setState({ tip })} />
              </Item>
              <Item stackedLabel style={{ marginVertical: 10 }}>
                <Label>Additional information</Label>
                <Input onChangeText={description => this.setState({ description })} />
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
    </Container>
  )
}
