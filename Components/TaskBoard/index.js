import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity, Animated, Modal } from 'react-native'
import { Content, List, View, Button, Icon, ListItem, Card, CardItem, Body, Input, Header, Item } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import Dropdown from 'react-native-modal-dropdown'

import variables from '../../theme/variables/platform'

import FilterForm from './FilterForm'
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

export default class TaskBoard extends Component {
  state = {
    tasks: fakeTasks,
    scrollY: new Animated.Value(30),
    category: '',
    from : '',
    rankby: '',
    filterVisible: false,
    filters: {}
  }

  toggleFilter = () => {
    this.setState({ filterVisible: !this.state.filterVisible })
  }
  applyFilters = (filters) => {
    this.setState({ filters })
  }

  render = () => {
    const { navigate } = this.props.navigation
    const fabOffset = this.state.scrollY.interpolate({
      inputRange: [-50, 40],
      outputRange: [120, -45],
      extrapolate: 'clamp',
    })
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.filterVisible}
        >
          <FilterForm closeFilter={this.toggleFilter} applyFilters={this.applyFilters} />
        </Modal>
        <Header searchBar rounded style={{ height: 40, paddingVertical: 5 }}>
          <Item>
            <Icon name="search" />
            <Input returnKeyType="search" placeholder="Search" onSubmitEditing={()=>{}} />
          </Item>
          <Button iconRight light small style={{ width: 80, marginLeft: 10 }} onPress={() => this.toggleFilter()}>
            <Text>Filter </Text>
            <FontAwesome name="filter" />
          </Button>
        </Header>

        <Content
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16} style={{ flex: 1 }}
        >
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
