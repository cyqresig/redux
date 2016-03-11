
import './style.css'

import 'es5-shim'
import 'es5-shim/es5-sham'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter)
const rootEl = document.getElementById('root')

function render() {

  console.log('一开始必然绘了一下?')

  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootEl
  )
}

render()
store.subscribe(render)

var serverSideStyle = document.getElementById("server-side-style");
if(serverSideStyle)
  document.getElementsByTagName("head")[0].removeChild(serverSideStyle);
