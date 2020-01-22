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
    [types.SET_SWIPER_DIRECTION]: () => {
      return {
        ...state,
        swipeDirection: action.payload.swipeDirection
      }
    },
    [types.SET_DEFAULT_DAY]: () => {
      return {
        ...state,
        defaultDayRefresh: action.payload.defaultDayRefresh,
        defaultDate: action.payload.defaultDate
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
    [types.SET_VISIBLE_DAYS]: () => {
      return {
        ...state,
        visibleDays: [...action.payload.visibleDays]
      }
    },
    [types.SET_SWIPE_SIDE]: () => {
      return {
        ...state,
        side: action.payload.side
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
