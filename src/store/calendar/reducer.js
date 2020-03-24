// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  currentDate: config.calendar.defaultDate
}
export default (state = initialState, action = {}) => {
  const obj = {
    [types.SET_DEFAULT_DAY]: () => {
      return {
        ...state,
        currentDate: action.payload.date
      }
    },
    [types.GET_EVENT_INFO]: () => {
      return {
        ...state,
        eventInfo: action.payload.eventInfo
      }
    },
    [types.DELETE_EVENT_INFO]: () => {
      return {
        ...state,
        eventInfo: ''
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
