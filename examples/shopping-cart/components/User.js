import React, { Component, PropTypes } from 'react'


export default class User extends Component {



  render() {
    console.log('User render');
    const { text, onDisplayUser } = this.props
    return (
      <div>
        <h3>Display User</h3>
        <div>{text.name}</div>
        <button onClick={onDisplayUser}>
          user click!
        </button>
      </div>
    )
  }
}

User.propTypes = {
  text: PropTypes.object,
  onDisplayUser: PropTypes.func
}
