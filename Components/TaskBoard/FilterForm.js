import React, { Component } from 'react'
import { Header, Left, Body, Right, Icon, Button, Content, Title, Container, Text, View, Form, List, ListItem, Item, Label, Picker } from 'native-base'
import variables from '../../theme/variables/platform'

const Filters = [
  { name: 'Category', choices: ['All', 'Clothes', 'Food', 'Stationary'] },
  { name: 'From',     choices: ['All', 'Hang Hau', 'HKUST', 'Choi Hung'] },
  { name: 'To',       choices: ['All', 'Hang Hau', 'HKUST', 'Choi Hung'] },
  { name: 'SortBy',   choices: ['All', 'Tip', 'Distance', 'Deadline'] }
]

export default class FilterForm extends Component {
  state= {
    filters: {}
  }

  chooseFilter(choice, filter) {
    this.setState({ filters: {...this.state.filters, [filter.name]: choice } })
  }

  render = () => (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.closeFilter()}><Icon name="close" /></Button>
        </Left>
        <Body>
          <Title>Filter</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => {this.props.closeFilter();this.props.applyFilters(this.state.filters)}}>
            <Text style={{ color: variables.brandPrimary }}>Apply</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <List>{
          Filters.map(filter => (
            <ListItem key={filter.name}>
              <Left><Text>{filter.name}</Text></Left>
              <Body>
              <Picker
                iosHeader={filter.name}
                mode="dropdown"
                selectedValue={this.state.filters[filter.name] || 'All'}
                onValueChange={choice => this.chooseFilter(choice, filter)}
              >{
                  filter.choices.map(choice =>
                    <Item key={choice} value={choice} label={choice} />
                  )
              }</Picker>
              </Body>
            </ListItem>
          ))
        }</List>
      </Content>
    </Container>
  )
}
