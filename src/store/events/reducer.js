// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  eventsFetching: false,
  events: [
    {
      address: 'הוד השרון, ש רמת הדר, 6253',
      birthdate: '01-01',
      client_id: 1,
      end: '2019-12-06 12:30',
      id: 1,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: 'null',
      note: 'xiRxJYI tcBZdu uJ',
      off_time: 'break',
      phone: '05-86490187',
      profile_picture: 'banner (1600x800).jpg',
      start: '2019-12-06 10:50'
    },
    {
      address: 'אילת, מלון עציון, 62',
      birthdate: '12-06',
      client_id: 7654,
      end: '2019-12-06 10:15',
      id: 765,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: 'Ivan',
      note: 'VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx',
      off_time: '',
      phone: '05-86490187',
      profile_picture: '120.jpg',
      services: [
        { id: 21, name: 'ZYneaZI', color: '', service_count: 1 },
        { id: 26, name: 'zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm', color: '#8441bd', service_count: 3 },
        { id: 2, name: 'dVFEWsV mCfHfTqj kjHt TWjyFqVsmg', color: '#fa11f0', service_count: 2 }
      ],
      start: '2019-12-06 09:00',
      total_price: 400
    },
    {
      address: 'אילת, מלון עציון\\ =&#34 +!##|@\'"/&, 6253',
      birthdate: '01-01',
      client_id: 4,
      end: '2019-12-06 14:50',
      id: 4,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: 'null',
      note: '##aa#bb|cc||\'\"&!=+a %20/`\\`; &#34',
      off_time: 'meeting',
      phone: '05-86490187',
      profile_picture: 'banner (1600x800).jpg',
      start: '2019-12-06 13:30'
    },
    {
      address: 'אילת, מלון עציון\\ =&#34 +!##|@\'"/&, 6253',
      birthdate: '01-01',
      client_id: 5,
      end: '2019-12-06 09:00',
      id: 5,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: 'null',
      note: '##aa#bb|cc||\'\"&!=+a %20/`\\`; &#34',
      off_time: 'meeting',
      phone: '05-86490187',
      profile_picture: 'banner (1600x800).jpg',
      start: '2019-12-06 08:00'
    }
  ]
}
//
// for (let i = 0; i < 6; i++) {
//   initialState.events.push({
//     address: "אילת, מלון עציון, 62",
//     birthdate: "01-01",
//     client_id: null,
//     end: moment('2019-04-15 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     id: 61 + i,
//     durationEditable: true,
//     is_new_client: true,
//     has_debt: true,
//     name: "",
//     note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
//     off_time: '',
//     phone: "05-86490187",
//     profile_picture: "120.jpg",
//     services: [
//       {id: 21, name: "ZYneaZI", color: "", service_count: 1},
//       {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
//       {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
//     ],
//     start: moment('2019-04-15 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     total_price: 400
//   })
// }
// for (let i = 0; i < 6; i++) {
//   initialState.events.push({
//     address: "אילת, מלון עציון, 62",
//     birthdate: "01-01",
//     client_id: null,
//     end: moment('2019-04-20 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     id: 61 + i,
//     durationEditable: true,
//     is_new_client: true,
//     has_debt: true,
//     name: "",
//     note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
//     off_time: '',
//     phone: "05-86490187",
//     profile_picture: "120.jpg",
//     services: [
//       {id: 21, name: "ZYneaZI", color: "", service_count: 1},
//       {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
//       {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
//     ],
//     start: moment('2019-04-20 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     total_price: 400
//   })
// }
// for (let i = 0; i < 6; i++) {
//   initialState.events.push({
//     address: "אילת, מלון עציון, 62",
//     birthdate: "01-01",
//     client_id: null,
//     end: moment('2019-04-25 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     id: 61 + i,
//     durationEditable: true,
//     is_new_client: true,
//     has_debt: true,
//     name: "",
//     note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
//     off_time: '',
//     phone: "05-86490187",
//     profile_picture: "120.jpg",
//     services: [
//       {id: 21, name: "ZYneaZI", color: "", service_count: 1},
//       {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
//       {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
//     ],
//     start: moment('2019-04-25 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     total_price: 400
//   })
// }
// for (let i = 0; i < 6; i++) {
//   initialState.events.push({
//     address: "אילת, מלון עציון, 62",
//     birthdate: "01-01",
//     client_id: null,
//     end: moment('2019-04-30 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     id: 61 + i,
//     durationEditable: true,
//     is_new_client: true,
//     has_debt: true,
//     name: "",
//     note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
//     off_time: '',
//     phone: "05-86490187",
//     profile_picture: "120.jpg",
//     services: [
//       {id: 21, name: "ZYneaZI", color: "", service_count: 1},
//       {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
//       {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
//     ],
//     start: moment('2019-04-30 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     total_price: 400
//   })
// }
// for (let i = 0; i < 6; i++) {
//   initialState.events.push({
//     address: "אילת, מלון עציון, 62",
//     birthdate: "01-01",
//     client_id: null,
//     end: moment('2019-05-01 09:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     id: 61 + i,
//     durationEditable: true,
//     is_new_client: true,
//     has_debt: true,
//     name: "",
//     note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
//     off_time: '',
//     phone: "05-86490187",
//     profile_picture: "120.jpg",
//     services: [
//       {id: 21, name: "ZYneaZI", color: "", service_count: 1},
//       {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
//       {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
//     ],
//     start: moment('2019-05-01 08:00').add(i, 'days').add(i, 'hours').format('YYYY-MM-DD hh:mm'),
//     total_price: 400
//   })
// }

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_STANDART_EVENTS]: () => {
      // return { ...state, eventsFetching: true }
    },
    [types.GET_STANDART_EVENTS_SUCCESS]: () => {
      // return {
      //   events: state.events.concat(action.payload.events),
      //   eventsFetching: false
      // }
    },
    [types.SET_EVENT_DATE]: () => {
      return {
        ...state,
        events: state.events.map(event => {
          if (event.client_id === action.payload.client_id) {
            event.start = action.payload.date.start.getFullYear() + '-' + action.payload.date.start.getMonth() + '-' + action.payload.date.start.getDate() + ' ' + action.payload.date.start.getHours() + ':' + action.payload.date.start.getMinutes()
            event.end = action.payload.date.end.getFullYear() + '-' + action.payload.date.end.getMonth() + '-' + action.payload.date.end.getDate() + ' ' + action.payload.date.end.getHours() + ':' + action.payload.date.end.getMinutes()
          }
          return event
        })
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
