import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Left, Button, Icon } from 'native-base'
import { Avatar } from 'react-native-material-ui'

import variables from '../../theme/variables/platform'

export default class Dialog extends Component {
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
      this.props.dialog.userAlias === 'me' ?
      // When author is user
        <View style={{...styles.dialogRow, ...styles.dialogRowRight}}>
          <View style={{...styles.dialog, ...styles.dialogRight}}>
              <Text style={{ backgroundColor: 'transparent', color: variables.inverseTextColor }}>
                {this.props.dialog.content}
              </Text>
          </View>
        </View>:
        this.props.dialog.userAlias === 'bot' ?
          // When author is bot
          <View style={{...styles.dialogRow, ...styles.dialogRowCenter}}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ alignSelf: 'center', height: 8, zIndex: 100 }}>
                <Avatar size={16} style={{ container: {backgroundColor: variables.brandPrimary } }} />
              </View>
              <View style={{...styles.dialog, ...styles.dialogCenter}}>
                  <Text style={{ backgroundColor: 'transparent', color: variables.textColor, fontSize: 12 }}>
                    {this.props.dialog.content}
                  </Text>
              </View>
            </View>
          </View> :
          // Other users
          <View style={styles.dialogRow}>
            <View style={{ alignSelf: 'flex-end', height: 30 }}>
              <Avatar size={30} text="E" />
            </View>
            <View style={styles.dialog}>
                <Text style={{ backgroundColor: 'transparent', color: variables.textColor }}>
                  {this.props.dialog.content}
                </Text>
            </View>
          </View>
    }

    {
      this.props.dialog.type === 'decide' ?
        !this.state.decided ?
        <View style={{...styles.dialogRow, ...styles.dialogRowCenter}}>
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
  // Rows of dialog bubbles
  dialogRow: {
    marginVertical: 5,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialogRowRight: {
    justifyContent: 'flex-end'
  },
  dialogRowCenter: {
    justifyContent: 'center'
  },

  // dialog bubble
  dialog: {
    borderColor: '#F6F4F7',
    backgroundColor: '#F6F4F7',
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    maxWidth: 200,
    marginHorizontal: 2,
    justifyContent: 'center'
  },
  dialogRight: {
    borderColor: variables.brandPrimary,
    backgroundColor: variables.brandPrimary,
    alignSelf: 'flex-end',
  },
  dialogCenter: {
    borderColor: '#F6F4F7',
    backgroundColor: '#F6F4F7',
    alignSelf: 'center',
  }
}
