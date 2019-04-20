import { workers } from 'project-services'
import * as types from './actionTypes'

export const getEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_STANDART_EVENTS })
    // const test = getState()
    // debugger
    const res = await workers()
    dispatch({ type: types.GET_STANDART_EVENTS_SUCCESS, payload: { events: res.events } })
  } catch (err) {
    dispatch({ type: types.GET_STANDART_EVENTS_ERROR })
  }
}

export const checkingView = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_STANDART_EVENTS })
    // const test = getState()
    // debugger
    const res = await workers()
    dispatch({ type: types.GET_STANDART_EVENTS_SUCCESS, payload: { events: res.events } })
  } catch (err) {
    dispatch({ type: types.GET_STANDART_EVENTS_ERROR })
  }
}
