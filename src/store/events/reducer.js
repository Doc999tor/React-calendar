// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  eventsFetching: false,
  events: []
}

for (let i = 0; i < 6; i++) {
  initialState.events.push({
    address: "אילת, מלון עציון, 62",
    birthdate: "01-01",
    client_id: null,
    end: moment('2019-04-15 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    id: 61 + i,
    durationEditable: true,
    is_new_client: true,
    has_debt: true,
    name: "",
    note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
    off_time: '',
    phone: "05-86490187",
    profile_picture: "120.jpg",
    services: [
      {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
    ],
    start: moment('2019-04-15 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    total_price: 400
  })
}
for (let i = 0; i < 6; i++) {
  initialState.events.push({
    address: "אילת, מלון עציון, 62",
    birthdate: "01-01",
    client_id: null,
    end: moment('2019-04-20 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    id: 61 + i,
    durationEditable: true,
    is_new_client: true,
    has_debt: true,
    name: "",
    note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
    off_time: '',
    phone: "05-86490187",
    profile_picture: "120.jpg",
    services: [
      {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
    ],
    start: moment('2019-04-20 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    total_price: 400
  })
}
for (let i = 0; i < 6; i++) {
  initialState.events.push({
    address: "אילת, מלון עציון, 62",
    birthdate: "01-01",
    client_id: null,
    end: moment('2019-04-25 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    id: 61 + i,
    durationEditable: true,
    is_new_client: true,
    has_debt: true,
    name: "",
    note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
    off_time: '',
    phone: "05-86490187",
    profile_picture: "120.jpg",
    services: [
      {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
    ],
    start: moment('2019-04-25 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    total_price: 400
  })
}
for (let i = 0; i < 6; i++) {
  initialState.events.push({
    address: "אילת, מלון עציון, 62",
    birthdate: "01-01",
    client_id: null,
    end: moment('2019-04-30 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    id: 61 + i,
    durationEditable: true,
    is_new_client: true,
    has_debt: true,
    name: "",
    note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
    off_time: '',
    phone: "05-86490187",
    profile_picture: "120.jpg",
    services: [
      {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
    ],
    start: moment('2019-04-30 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    total_price: 400
  })
}
for (let i = 0; i < 6; i++) {
  initialState.events.push({
    address: "אילת, מלון עציון, 62",
    birthdate: "01-01",
    client_id: null,
    end: moment('2019-05-01 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    id: 61 + i,
    durationEditable: true,
    is_new_client: true,
    has_debt: true,
    name: "",
    note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
    off_time: '',
    phone: "05-86490187",
    profile_picture: "120.jpg",
    services: [
      {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
    ],
    start: moment('2019-05-01 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
    total_price: 400
  })
}

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_STANDART_EVENTS]: () => {
      return { ...state, eventsFetching: true }
    },
    [types.GET_STANDART_EVENTS_SUCCESS]: () => {
      return {
        ...state,
        events: action.payload.events,
        eventsFetching: false
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
