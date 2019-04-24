// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  currentView: config.calendar.defaultView,
  defaultDate: config.calendar.defaultDate
}
export default (state = initialState, action = {}) => {
  const obj = {
    [types.SET_CALENDAR_API]: () => {
      return {
        ...state,
        ...action.payload
      }
    },
    [types.SET_SWIPER_API]: () => {
      return {
        ...state,
        swiperApi: action.payload.swiperApi
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
        defaultDayRefresh: action.payload.defaultDayRefresh,
        defaultDate: action.payload.defaultDate
      }
    },
    [types.SET_DEFAULT_DAY_REFRESH]: () => {
      return {
        ...state,
        defaultDayRefresh: action.payload.defaultDayRefresh
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
