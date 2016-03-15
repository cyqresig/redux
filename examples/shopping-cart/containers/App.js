import React, { Component } from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import UserContainer from './UserContainer'

export default class App extends Component {
  render() {
    console.log('App render')
    return (
      <div>
        <div>
          <UserContainer />
        </div>
        <h2>Shopping Cart Example</h2>
        <hr/>
        <ProductsContainer />
        <hr/>
        <CartContainer />
      </div>
    )
  }
}
