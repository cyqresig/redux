import {
  DISPLAY_USER
  } from '../constants/ActionTypes'


const initialState = {
  text: { name: 'cyq' }
}

export function text(state = initialState.text, action) {
  switch (action.type) {
    case DISPLAY_USER:
      return { name: 'cyq' }
    default:
      return state
  }
}
