// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  currentDate: config.calendar.defaultDate,
  dataLoading: false
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
    },
    [types.SET_LOADING]: () => {
      return {
        ...state,
        dataLoading: action.payload.dataLoading
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
