import React, { Component } from 'react'
import { Content, Body, View,
         Card, CardItem,
         Icon, Text, Button,
         List, ListItem } from 'native-base'
import { AsyncStorage } from 'react-native'
import {Avatar} from 'react-native-material-ui'

import { fetchTasks, fetchUserProfile, logoutUser } from '../../api'

import TaskItem from '../TaskBoard/TaskItem'
import ReviewItem from './ReviewItem'

const fakeUserBase = [
  { userID: 1, userAlias: 'yihao', fullName: 'Yihao Chan', rating: 5 },
  { userID: 2, userAlias: 'epan',  fullName:  'Edmun Pan', rating: 5 }
]

const fakeProfile = {
  userAlias: 'inizio',
  fullName: 'Newman Chow',
  rating: 4
}

const fakeOngoingTasks = [
  // { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, status: 'MEETUP', tip: 5 },
  // { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, status: 'MEETUP', tip: 5 }
]

const fakeCompletedTasks = []

const fakeReviews = [
  { reviewer: { userAlias: 'yihao', userID: '1', role: 'Requester' }, content: 'This fetcher is nice and quick!', rating: 4 },
  { reviewer: { userAlias: 'epan', userID: '2', role: 'Fetcher' }, content: 'Vestibulum eget vehicula erat, sit amet eleifend eros. Sed sed bibendum nulla. Vestibulum consequat ultrices neque, at efficitur eros tempor mattis. Curabitur id ante ligula. Integer ultricies tempus semper. Nullam.', rating: 2 }
]

export default class UserProfile extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: <View>
             <Text>{
               state.params.user._id
             } 's Profile</Text>
             </View>
    })
  }
  state = {
    itsc: '',
    profile: fakeProfile,
    ongoingTasks: fakeOngoingTasks,
    completedTasks: fakeCompletedTasks,
    reviews: fakeReviews
  }

  componentDidMount () {
    AsyncStorage.getItem('itsc').then(itsc => {
      this.setState({ itsc })
      return fetchUserProfile(itsc)
    })
    .then(profile => this.setState({ profile }))
    .then(() => fetchTasks({ rfid: this.state.itsc }))
    .then(tasks => this.setState({
      ongoingTasks: tasks.filter(task => task.status !== 'COMPLETED').slice(0, 3),
      completedTasks: tasks.filter(task => task.status === 'COMPLETED').slice(0, 3)
    }))
  }

  render = () => (
    <Content style={{ backgroundColor: 'white' }}>
      <Card>
        <CardItem>
          <Body>
            <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
              <View style={{ width: 55 }}>
                <Avatar text={this.state.itsc[0]} />
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>{this.state.profile.fullname || this.state.profile.username}</Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  {[,...Array(5)].map((x, index) => (
                    <Icon name="ios-star" key={index}
                          style={{ color: ((this.state.profile.rating >= index) ? 'orange' : 'grey') }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
      <View style={{ flex: 1 }}>
      <ListItem itemHeader first><Text>Ongoing Tasks</Text></ListItem>
      <List dataArray={this.state.ongoingTasks} renderRow={task =>
        <TaskItem navigation={this.props.navigation} task={task} />
      } />
      <ListItem itemHeader><Text>Completed Tasks</Text></ListItem>
      <List dataArray={this.state.completedTasks} renderRow={task =>
        <TaskItem navigation={this.props.navigation} task={task} />
      } />
      <ListItem itemHeader><Text>Reviews</Text></ListItem>
      <List dataArray={this.state.reviews} renderRow={review =>
        <ReviewItem review={review}/>
      } />
      </View>
      <Button danger block onPressOut={logoutUser}><Text>Logout</Text></Button>
    </Content>
  )
}
