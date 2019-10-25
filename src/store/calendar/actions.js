// import { fetchingEvents } from 'project-services'
// import React from 'react'
import * as types from './actionTypes'

export const setDefaultDay = (defaultDate, defaultDayRefresh = false) => dispatch => {
  dispatch({ type: types.SET_DEFAULT_DAY, payload: { defaultDate, defaultDayRefresh } })
  if (defaultDayRefresh) {
    setTimeout(() => { dispatch({ type: types.SET_DEFAULT_DAY, payload: { defaultDate, defaultDayRefresh: false } }) }, 0)
  }
}

export const setCalendarAPI = (day, dd) => async (dispatch, getState) => {
  // console.log(day, dd)
  const { defaultDate } = getState().calendar
  if (defaultDate === dd) {
    dispatch({ type: types.SET_CALENDAR_API, payload: { calendarApi: day?.getApi() } })
  }
}

export const setSwiperApi = node => async dispatch => {
  if (node && node.swiper) {
    dispatch({ type: types.SET_SWIPER_API, payload: { swiperApi: node.swiper } })
  }
}

export const setSwiperDirection = swipeDirection => async dispatch => {
  dispatch({ type: types.SET_SWIPER_DIRECTION, payload: { swipeDirection } })
}

export const switchView = currentView => async dispatch => {
  dispatch({ type: types.SWITCH_VIEW, payload: { currentView } })
}

export const getEventInfo = eventInfo => async dispatch => {
  dispatch({ type: types.GET_EVENT_INFO, payload: { eventInfo } })
}

export const deleteEventInfo = () => async dispatch => {
  dispatch({ type: types.GET_EVENT_INFO, payload: { eventInfo: '' } })
}
