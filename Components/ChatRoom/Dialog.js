import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Left, Button, Icon } from 'native-base'
import { Avatar } from 'react-native-material-ui'

import variables from '../../theme/variables/platform'

const exampleDialog = { senderID: 'xxx', content: '@setmtl', decision: '', decided: false }

export default class Dialog extends Component {
  state = {
    decided: this.props.dialog.decided,
    decision: this.props.dialog.decision
  }

  makeDecision = decision => {
    this.setState({
      decided: true,
      decision: decision
    })
  }

  commandDialog = dialog => {
    switch (dialog.content.slice(1)) {
      case 'complete': return (
        !this.state.decided ?
          <View style={{...styles.dialogRow, ...styles.dialogRowCenter}}>
            <Button transparent small onPress={() => this.makeDecision(false)}>
              <Text>No</Text>
            </Button>
            <Button primary rounded small onPress={() => this.makeDecision(true)}>
              <Text>Yes</Text>
            </Button>
          </View> :
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>{
            dialog.decision ?
              <Icon name="checkmark" style={{ color: variables.brandSuccess }} /> :
              <Icon name="close" style={{ color: variables.brandDanger }} />
          }</View>
      )
    }
  }

  render = () => (
    <View>{
      // TODO: use command list to validate if is command instead of using first char
      // If content is command, show command description
      this.props.dialog.content[0] === '@' ?
        <View style={{...styles.dialogRow, ...styles.dialogRowCenter}}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ alignSelf: 'center', height: 8, zIndex: 100 }}>
              <Avatar size={16} style={{ container: {backgroundColor: variables.brandPrimary } }} />
            </View>
            <View style={{...styles.dialog, ...styles.dialogCenter}}>
                <Text style={{ backgroundColor: 'transparent', color: variables.textColor, fontSize: 13 }}>
                  {this.props.dialog.content}
                </Text>
            </View>
          </View>
        </View> :
      // When sender is user
      this.props.dialog.senderID === this.props.itsc ?
        <View style={{...styles.dialogRow, ...styles.dialogRowRight}}>
          <View style={{...styles.dialog, ...styles.dialogRight}}>
              <Text style={{ backgroundColor: 'transparent', color: variables.inverseTextColor }}>
                {/*TODO: use command desciption with user id prefix*/}
                {this.props.dialog.content}
              </Text>
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

    {/* Command interaction or result */}
    { this.commandDialog(this.props.dialog) }
    </View>
  )
}

const styles = {
  // Rows of dialog bubbles
  dialogRow: {
    marginVertical: 8,
    marginHorizontal: 4,
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
    marginHorizontal: 4,
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
