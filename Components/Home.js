import React, {Component} from 'react';
import { StyleSheet, Image } from 'react-native'
import {
  View, Container, Content,
  Left, Right, Body,
  Card, CardItem,
  Text, Icon, Button,
  Title,
  Tab, Tabs
} from 'native-base';
import ActionButton from 'react-native-action-button';

import variables from '../theme/variables/platform'

import MissionBoard from './MissionBoard'

export default class Home extends Component {
  static navigationOptions = {
    header: {
      style: {
        elevation: 0
      },
      left: <Image style={{ maxHeight: 40 }} resizeMethod="scale" source={require('../USTFetch1.png')}/>,
      right:<View style={{ flexDirection: 'row' }}>
              <Button transparent>
                <Icon name="heart"/>
              </Button>
              <Button transparent>
                <Icon name="people"/>
              </Button>
              <Button transparent>
                <Icon name="search"/>
              </Button>
            </View>
    }
  }

  render = () => (
    <Container>
      <Tabs>
        <Tab heading="Missions">
          <MissionBoard navigation={this.props.navigation} />
        </Tab>
        <Tab heading="Messages"></Tab>
        <Tab heading="Me"></Tab>
      </Tabs>
      <ActionButton buttonColor={variables.brandPrimary} title="New Mission" degrees={0} activeOpacity={1} useNativeFeedback={true}>
        <Icon name="add" />
      </ActionButton>
    </Container>
  )
}

const styles = StyleSheet.create({});
