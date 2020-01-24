// import { fetchingEvents } from 'project-services'
// import React from 'react'
import * as types from './actionTypes'
import getFormattedDate from '../../helpers/getFormattedDate'
import { SET_SWIPE_SIDE } from './actionTypes'
import { SET_TODAY } from './actionTypes'
import { ON_SWIPE } from './actionTypes'
import { SET_BUSINESS_HOURS } from './actionTypes'

export const setDefaultDay = (defaultDate, defaultDayRefresh = false) => dispatch => {
  dispatch({ type: types.SET_DEFAULT_DAY, payload: { defaultDate, defaultDayRefresh } })
  if (defaultDayRefresh) {
    setTimeout(() => { dispatch({ type: types.SET_DEFAULT_DAY, payload: { defaultDate, defaultDayRefresh: false } }) }, 0)
  }
}

export const setVisibleDays = (defaultDate) => async dispatch => {
  if(defaultDate) {
    let dd = defaultDate
    dispatch({type: types.SET_VISIBLE_DAYS, payload: {visibleDays: [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]}})
  } else {
    dispatch({type: types.SET_VISIBLE_DAYS, payload: {visibleDays: []}})
  }
}

export const setCalendarAPI = (day, dd) => async (dispatch, getState) => {
  const { defaultDate } = getState().calendar
  if (defaultDate === dd) {
    const api = await day?.getApi()
    dispatch({ type: types.SET_CALENDAR_API, payload: { calendarApi: api } })
  }
}

export const setSwiperApi = node => async dispatch => {
  if (node) {
    dispatch({ type: types.SET_SWIPER_API, payload: { swiperApi: node } })
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

export const setSide = side => async dispatch => {
  dispatch({ type: SET_SWIPE_SIDE, payload: { side } })
}

export const setToday = bool => async dispatch => {
  dispatch({ type: SET_TODAY, payload: { setToday: bool } })
}

export const onSwipe = side => async dispatch => {
  dispatch({ type: ON_SWIPE, payload: { side }})

  // if (side && side !== 'none') {
  //   setTimeout(() => dispatch({ type: ON_SWIPE, payload: { side: 'none' }}), 0)
  // }
}

export const setBusinessHours = businessHours => async dispatch => {
  dispatch({ type: SET_BUSINESS_HOURS, payload: { businessHours } })
}
