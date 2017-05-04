import React, { Component } from 'react'
import { Text, ScrollView, RefreshControl, TouchableOpacity, Animated, Modal } from 'react-native'
import { Content, List, View, Button, Icon, ListItem, Card, CardItem, Body, Input, Header, Item, Spinner } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import Dropdown from 'react-native-modal-dropdown'

import { fetchTasks } from '../../api'
import variables from '../../theme/variables/platform'

import FilterForm from './FilterForm'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

export default class TaskBoard extends Component {
  state = {
    tasks: [],
    scrollY: new Animated.Value(30),
    category: '',
    from: '',
    rankby: '',
    filterVisible: false,
    taskFormVisible: false,
    filters: {},
    refreshing: false,
    keyword: '',
    page: 0
  }

  componentDidMount () {
    this.refreshTask({step: 0})
  }

  refreshTask = ({step, keyword}) => {
    this.setState({ refreshing: true, page: this.state.page + step })
    fetchTasks({page: this.state.page + step, status: 'PENDING', keyword: keyword || this.state.keyword }).then(tasks => {
      if (Math.abs(step)) {
        this.setState({ tasks: this.state.tasks.concat(tasks) })
      } else {
        this.setState({ tasks })
      }
      this.setState({ refreshing: false })
    })
  }
  toggleFilter = () => {
    this.setState({ filterVisible: !this.state.filterVisible })
  }
  applyFilters = (filters) => {
    this.setState({ filters })
  }
  toggleTaskForm = () => {
    this.setState({ taskFormVisible: !this.state.taskFormVisible })
  }

  render = () => {
    const { navigate } = this.props.navigation
    const fabOffset = this.state.scrollY.interpolate({
      inputRange: [-50, 40],
      outputRange: [120, -45],
      extrapolate: 'clamp'
    })
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          visible={this.state.filterVisible}
        >
          <FilterForm closeFilter={this.toggleFilter} applyFilters={this.applyFilters} />
        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.taskFormVisible}
         >
          <TaskForm closeForm={this.toggleTaskForm} />
        </Modal>
        <Header searchBar rounded style={{ height: 40, paddingVertical: 5 }}>
          <Item>
            <Icon name="search" />
            <Input returnKeyType="search" placeholder="Search" onSubmitEditing={({nativeEvent})=>{this.setState({ keyword: nativeEvent.text }); this.refreshTask({ keyword: nativeEvent.text })}} />
          </Item>
          <Button iconRight light small style={{ width: 80, marginLeft: 10 }} onPress={() => this.toggleFilter()}>
            <Text>Filter </Text>
            <FontAwesome name="filter" />
          </Button>
        </Header>

        <View
          style={{ flex: 1 }}
        >{
          <List onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16} refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshTask({step: 0})} />
          } dataArray={this.state.tasks.filter(task => task.status === 'PENDING')} renderRow={task => (
            <TaskItem navigation={this.props.navigation} task={task} />
          )} onEndReached={()=>{ console.log('end reached'); this.refreshTask({ step: 1 }) }} />
        }</View>

        <Animated.View style={{position: 'absolute', left: 0, right: 0, bottom: fabOffset, justifyContent: 'center', alignItems: 'center', height: 50}}>
        <Button primary full rounded style={{ alignSelf: 'center', width: 250, shadowColor: 'black', shadowOpacity: 0.4 , shadowRadius: 30, shadowOffset: { height: 20, width: 0 }  }}
          onPress={() => this.toggleTaskForm()}
        >
          <Text style={{ color: 'white' }}>Create Task</Text>
        </Button>
        </Animated.View>
      </View>
    )
  }
}
