import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { Content, List, View, Button, Icon, ListItem } from 'native-base'
import Dropdown from 'react-native-modal-dropdown'

import variables from '../../theme/variables/platform'

import TaskItem from './TaskItem'

const fakeTasks = [
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1 }
]

const natureFilter = ['All', 'Clothes', 'Food', 'Stationary']

export default class TaskBoard extends Component {
  state = {
    tasks: fakeTasks,
    nature: 'All',
    language: 'java'
  }

  openFilter = () => {
    this.refs.naturePicker.show()
  }

  render = () => {
    const { navigate } = this.props.navigation
    return (
      <Content onScroll={()=>{}} scrollEventThrottle={40}>
        <View style={{ left: 0, right: 0, height: 40, backgroundColor: variables.brandPrimary, flexDirection: 'row' }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, backgroundColor: variables.brandPrimary, flexDirection: 'row' }}>
          <Dropdown ref="naturePicker" options={natureFilter} defaultIndex={0}
                    dropdownStyle={{
                      width: 75,
                      height: 130,
                      borderRadius: 3
                    }}
                    style={{height: 40, flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    onSelect={(index, val) => this.setState({ nature: val })}>
            <Button transparent full onPress={() => this.openFilter()}>
              <Text style={{ color: variables.inverseTextColor }}>{this.state.nature}</Text><Icon style={{ color: variables.inverseTextColor }} name="arrow-down" />
            </Button>
          </Dropdown>
        </View>
        <List dataArray={this.state.tasks} renderRow={task => (
          <TaskItem navigation={this.props.navigation} task={task} />
        )} />
      </Content>
    )
  }
}
