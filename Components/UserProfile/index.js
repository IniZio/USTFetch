import React, { Component } from 'react'
import { Content, Body, Card, CardItem, View, Icon , Text} from 'native-base'
import {Avatar} from 'react-native-material-ui'

const fakeUserBase = [
  { userID: 1, userAlias: 'yihao', fullName: 'Yihao Chan', rating: 5 },
  { userID: 2, userAlias: 'epan',  fullName:  'Edmun Pan', rating: 5 }
]

const fakeProfile = {
  userAlias: 'inizio',
  fullName: 'Newman Chow',
  rating: 4
}

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
    profile: fakeProfile
  }

  componentWillMount () {
    let userID = this.props.navigation.state.params && this.props.navigation.state.params.user.userID
    let othersProfile = fakeUserBase.filter( user => user.userID === userID )[0]
    if (othersProfile) {
      this.setState({ profile: othersProfile })
    }
  }

  render = () => (
    <Content>
      <Card>
        <CardItem>
          <Body>
            <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5 }}>
              <View style={{ height: 50, width: 55 }}>
                <Avatar text={this.state.profile.userAlias[0]} size={40} />
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
    </Content>
  )
}
