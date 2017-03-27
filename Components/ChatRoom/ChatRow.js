import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Left, Button, Icon } from 'native-base'
import { Avatar } from 'react-native-material-ui'

import variables from '../../theme/variables/platform'

export default class ChatRow extends Component {
  state = {
    decided: false,
    decision: false
  }

  makeDecision = decision => {
    this.setState({
      decided: true,
      decision: decision
    })
  }

  render = () => (
    <View>{
      this.props.message.name === 'me' ?
      // When author is user
        <View style={{...styles.chatRow, ...styles.chatRowRight}}>
          <View style={{...styles.chatBubble, ...styles.chatBubbleRight}}>
              <Text style={{ backgroundColor: 'transparent', color: variables.textColor }}>
                {this.props.message.content}
              </Text>
          </View>
        </View>:
        this.props.message.name === 'bot' ?
          // When auther is bot
          <View style={{...styles.chatRow, ...styles.chatRowCenter}}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ alignSelf: 'center', height: 8, zIndex: 100 }}>
                <Avatar size={16} style={{ container: {backgroundColor: variables.brandPrimary } }} />
              </View>
              <View style={{...styles.chatBubble, ...styles.chatBubbleCenter}}>
                  <Text style={{ backgroundColor: 'transparent', color: variables.textColor, fontSize: 12 }}>
                    {this.props.message.content}
                  </Text>
              </View>
            </View>
          </View> :
          // Other users
          <View style={styles.chatRow}>
            <View style={{ alignSelf: 'flex-end', height: 30 }}>
              <Avatar size={30} text="E" />
            </View>
            <View style={styles.chatBubble}>
                <Text style={{ backgroundColor: 'transparent', color: variables.inverseTextColor }}>
                  {this.props.message.content}
                </Text>
            </View>
          </View>
    }

    {
      this.props.message.type === 'decide' ?
        !this.state.decided ?
        <View style={{...styles.chatRow, ...styles.chatRowCenter}}>
          <Button transparent small onPress={() => this.makeDecision(false)}>
            <Text>No</Text>
          </Button>
          <Button primary rounded small onPress={() => this.makeDecision(true)}>
            <Text>Yes</Text>
          </Button>
        </View>:
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>{
            this.state.decision ?
              <Icon name="checkmark" style={{ color: variables.brandSuccess }} />:
              <Icon name="close" style={{ color: variables.brandDanger }} />
        }</View> :
        null
    }
    </View>
  )
}

const styles = {
  // Rows of chat bubbles
  chatRow: {
    marginVertical: 5,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatRowRight: {
    justifyContent: 'flex-end'
  },
  chatRowCenter: {
    justifyContent: 'center'
  },

  // Chat bubble
  chatBubble: {
    borderColor: variables.brandPrimary,
    backgroundColor: variables.brandPrimary,
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    maxWidth: 200,
    marginHorizontal: 2,
    justifyContent: 'center'
  },
  chatBubbleRight: {
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  chatBubbleCenter: {
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
  }
}
