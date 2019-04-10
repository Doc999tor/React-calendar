// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  eventsFetching: false,
  events: []
}

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_STANDART_EVENTS]: () => {
      return { ...state, eventsFetching: true }
    },
    [types.GET_STANDART_EVENTS_SUCCESS]: () => {
      return {
        ...state,
        events: action.payload.events,
        eventsFetching: false
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
