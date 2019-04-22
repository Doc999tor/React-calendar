// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  calendarAPIs: {},
  currentView: config.calendar.defaultView,
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
    },
    [types.SWITCH_VIEW]: () => {
      return {
        ...state,
        currentView: action.payload.currentView
      }
    },
    [types.SET_DEFAULT_DAY]: () => {
      return {
        ...state,
        defaultDate: action.payload.defaultDate
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
