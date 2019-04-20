// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  calendarAPIs: {},
  defaultDate: config.calendar.defaultDate
}

export default (state = initialState, action = {}) => {
  const obj = {
    [types.SET_CALENDAR_APIS]: () => {
      return {
        ...state,
        ...action.payload
      }
    },
    [types.SET_CALENDAR_API]: () => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
