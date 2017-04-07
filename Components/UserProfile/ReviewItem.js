import React, { Component } from 'react'
import { View, Left, Right, Body,
         ListItem,
         Icon, Text } from 'native-base'
import {Avatar} from 'react-native-material-ui'

export default class ReviewItem extends Component {
  render = () => {
    let review = this.props.review
    return (
      <ListItem>
        <View style={{width: 70}}>
          <Avatar text={review.reviewer.userAlias[0]} size={50} />
        </View>
        <Body style={{ flexDirection: 'column' }}>
          <Text>{review.reviewer.userAlias}<Text note> as {review.reviewer.role}</Text></Text>
          <Text numberOfLines={5}>{review.content}</Text>
        </Body>
        <Right>{
          review.rating >= 3 ?
          <Icon style={{ color: 'green' }} name="thumbs-up" /> :
          <Icon style={{ color: 'red' }} name="thumbs-down" />
        }</Right>
      </ListItem>
    )
  }
}
