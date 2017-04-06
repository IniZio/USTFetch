import React, { Component } from 'react'
import { Content, Body, View,
         Card, CardItem,
         Icon , Text,
         List, ListItem } from 'native-base'
import {Avatar} from 'react-native-material-ui'

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
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, status: 'MEETUP' },
  { objective: 'Uniqlo Flannel', deadline: '3 hours left', userAlias: 'yihao', userID: 1, status: 'MEETUP' }
]

const fakeCompletedTasks = []

const fakeReviews = [
  { reviewer: { userAlias: 'Yihao', userID: '1', role: 'Requester' }, content: 'This fetcher is nice and quick!', rating: 4 },
  { reviewer: { userAlias: 'Epan', userID: '2', role: 'Fetcher' }, content: 'Vestibulum eget vehicula erat, sit amet eleifend eros. Sed sed bibendum nulla. Vestibulum consequat ultrices neque, at efficitur eros tempor mattis. Curabitur id ante ligula. Integer ultricies tempus semper. Nullam.', rating: 2 }
]

export default class UserProfile extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: <View>
             <Text>{
               !state.params ?
               fakeProfile.userAlias :
               fakeUserBase.filter(user => user.userID === state.params.user.userID)[0].userAlias
             } 's Profile</Text>
             </View>
    })
  }
  state = {
    profile: fakeProfile,
    ongoingTasks: fakeOngoingTasks,
    completedTasks: fakeCompletedTasks,
    reviews: fakeReviews
  }

  componentWillMount () {
    let userID = this.props.navigation.state.params &&
                 this.props.navigation.state.params.user.userID
    let othersProfile = fakeUserBase.filter( user => user.userID === userID )[0]
    if (othersProfile) {
      this.setState({ profile: othersProfile })
    }
  }

  render = () => (
    <Content style={{ backgroundColor: 'white' }}>
      <Card>
        <CardItem>
          <Body>
            <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
              <View style={{ width: 55 }}>
                <Avatar text={this.state.profile.userAlias[0]} />
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>{this.state.profile.fullName}</Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  {[,...Array(5)].map((x, index) => (
                    <Icon name="ios-star" style={{ fontSize: 20 }} key={index}
                          style={{ color: (this.state.profile.rating >= index) ? 'orange' : 'grey' }}
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
      <ListItem itemHeader><Text>Reviews</Text></ListItem>
      <List dataArray={this.state.reviews} renderRow={review =>
        <ReviewItem review={review}/>
      } />
      </View>
    </Content>
  )
}
