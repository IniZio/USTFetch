import React, { Component } from 'react'
import { Content, List } from 'native-base'

import MissionCard from './MissionCard'

const fakeMissions = [
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' },
  { name: 'Uniqlo Flannel', deadline: '3 hours left', username: 'Yihao' }
]

export default class MissionList extends Component {
  state = {
    missions: fakeMissions
  }
  render = () => {
    const { navigate } = this.props.navigation
    return (
      <Content>
        <List dataArray={this.state.missions} renderRow={mission => (
          <MissionCard navigation={this.props.navigation} mission={mission} />
        )} />
      </Content>
    )
  }
}
