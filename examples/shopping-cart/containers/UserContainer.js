import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { displayUser } from '../actions'
import User from '../components/User'

class UserContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.props');
    console.log(this.props);
    console.log('nextProps');
    console.log(nextProps);
    console.log('nextState');
    console.log(nextState);
    return this.props.text.name != this.props.text.name
  }

  render() {
    console.log('UserContainer render');
    const { text } = this.props

    return (
      <User
        text={text}
        onDisplayUser={() => this.props.displayUser()} />
    )
  }
}

UserContainer.propTypes = {
  text: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  displayUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    text: state.text
  }
}

export default connect(
  mapStateToProps,
  { displayUser }
)(UserContainer)
