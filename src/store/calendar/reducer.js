// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  currentDate: config.calendar.defaultDate,
  dataLoading: false,
  dayCapacity: {},
  holidays: JSON.parse(localStorage.getItem('holidays_data'))?.data
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
    },
    [types.SET_DAY_CAPACITY]: () => {
      return {
        ...state,
        dayCapacity: {...state.dayCapacity, ...action.payload.obj}
      }
    },
    [types.REFRESH_HOLIDAYS]: () => {
      return {
        ...state,
        holidays: {...JSON.parse(localStorage.getItem('holidays_data')).data}
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
