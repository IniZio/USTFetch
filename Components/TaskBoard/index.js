import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { Content, List, View, Button, Icon, ListItem } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import Dropdown from 'react-native-modal-dropdown'

import variables from '../../theme/variables/platform'

import TaskItem from './TaskItem'

const fakeTasks = [
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5},
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, tip: 5}
]

const categoryFilter = ['All', 'Clothes', 'Food', 'Stationary']
const fromFilter = ['Hang Hau', 'HKUST', 'Choi Hung']
const rankbyFilter = ['Tip', 'Distance', 'Deadline']

export default class TaskBoard extends Component {
  state = {
    tasks: fakeTasks,
    scrollY: new Animated.Value(30),
    category: categoryFilter[0],
    from : fromFilter[0],
    rankby: rankbyFilter[0]
  }

  openFilter = (ref) => {
    this.refs[ref].show()
  }

  render = () => {
    const { navigate } = this.props.navigation
    const fabOffset = this.state.scrollY.interpolate({
      inputRange: [-100, 40],
      outputRange: [180, -45],
      extrapolate: 'clamp',
    })
    return (
      <View style={{ flex: 1 }}>
        <View style={{ left: 0, right: 0, height: 50, backgroundColor: variables.brandPrimary, flexDirection: 'row' }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, backgroundColor: variables.brandPrimary, flexDirection: 'row' }} elevation={1}>
          <Dropdown ref="categoryFilter" options={categoryFilter} defaultIndex={0}
                    dropdownStyle={{
                      width: 120,
                      maxHeight: 130,
                      borderRadius: 3,
                      margin: 2
                    }}
                    style={{height: 50, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 0}}
                    onSelect={(index, val) => this.setState({ category: val })}>
            <TouchableOpacity onPress={() => this.openFilter('categoryFilter')}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5, paddingHorizontal: 0}}>
                <Text note style={{ color: '#eee', fontSize: 12 }}>CATEGORY  <Icon style={{ color: variables.inverseTextColor, fontSize: 15 }} name="arrow-dropdown" /></Text>
                <View transparent full  style={{ padding: 0, flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={{ color: variables.inverseTextColor, fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>{this.state.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Dropdown>
          <Dropdown ref="fromFilter" options={fromFilter} defaultIndex={0}
                    dropdownStyle={{
                      width: 120,
                      height: 130,
                      borderRadius: 3,
                      margin: 2
                    }}
                    style={{height: 50, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 0}}
                    onSelect={(index, val) => this.setState({ from: val })}>
            <TouchableOpacity onPress={() => this.openFilter('fromFilter')}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5, paddingHorizontal: 0}}>
                <Text note style={{ color: '#eee', fontSize: 12 }}>FROM  <Icon style={{ color: variables.inverseTextColor, fontSize: 15 }} name="arrow-dropdown" /></Text>

                <View transparent full  style={{ padding: 0, flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
                  <Text style={{ color: variables.inverseTextColor, fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>{this.state.from}</Text>

                </View>
              </View>
            </TouchableOpacity>
          </Dropdown>
          <Dropdown ref="rankbyFilter" options={rankbyFilter} defaultIndex={0}
                    dropdownStyle={{
                      width: 120,
                      height: 130,
                      borderRadius: 3,
                      margin: 2
                    }}
                    style={{height: 50, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 0}}
                    onSelect={(index, val) => this.setState({ rankby: val })}>
            <TouchableOpacity onPress={() => this.openFilter('rankbyFilter')}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5, paddingHorizontal: 0}}>
                <Text note style={{ color: '#eee', fontSize: 12 }}>RANK BY  <Icon style={{ color: variables.inverseTextColor, fontSize: 15 }} name="arrow-dropdown" /></Text>
                <View transparent full  style={{ padding: 0, flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-start', overflow: 'scroll' }}>
                  <Text style={{ color: variables.inverseTextColor, fontSize: 14, fontWeight: 'bold' }} numberOfLines={1}>{this.state.rankby}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Dropdown>
        </View>

        <Content
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
        )}
         scrollEventThrottle={16} style={{ flex: 1 }}>
          <List dataArray={this.state.tasks} renderRow={task => (
            <TaskItem navigation={this.props.navigation} task={task} />
          )} />
        </Content>

        <Animated.View style={{position: 'absolute', left: 0, right: 0, bottom: fabOffset, justifyContent: 'center', alignItems: 'center', height: 50}}>
        <Button light full rounded style={{ alignSelf: 'center', width: 250, shadowColor: 'black', shadowOpacity: 0.4 , shadowRadius: 30, shadowOffset: { height: 20, width: 0 },  }}
          onPress={() => this.props.navigation.navigate('TaskForm')}
        >
          <Text>Create Task</Text>
        </Button>
        </Animated.View>
      </View>
    )
  }
}
