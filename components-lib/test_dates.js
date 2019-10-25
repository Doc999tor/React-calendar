export default date => {
  moment.locale(config.locale)
  const defaultDate = moment()
  const newDate = moment(date)
  const diff = newDate.diff(defaultDate, 'days')
  // let ctx = ''
  const a = (diff >= 1)
  // console.log(a);
  // console.log('defaultDate', defaultDate);
  // console.log('newDate', newDate);
  // console.log('diff', diff);




  let result
  // const dates = [
  //   {start: 0, end: 0, label: 'today', format: 'HH:mm'},
  //   {start: 0, end: 1, label: 'tomorrow', format: 'HH:mm'},
  //   {start: 0, end: 6, label: 'до недели в бущуем', format: 'dddd HH:mm'},
  //   {start: 0, end: 13, label: 'до двух недель в бущуем', format: config.translations.last_appointment_day_future.replace('{date_string}', Math.abs(diff)) },
  //   {start: 14, end: 30, label: 'до месяца в будущем', format: config.translations.last_appointment_week_future.replace('{date_string}', Math.floor(Math.abs(diff) / 7)) },
  //   {start: 31, end: 364, label: 'до года в будущем', format: config.translations.last_appointment_month_future.replace('{date_string}', Math.floor(Math.abs(diff) / 31))},
  //   {start: -1, end: 0, label: 'yesterday', format: 'HH:mm'},
  //   {start: -6, end: 0, label: 'до недели в прошлом', format: 'dddd HH:mm'},
  //   {start: -13, end: 0, label: 'до двух недель в прошлом', format: `${Math.abs(diff)} дней назад`},
  //   {start: -30, end: -14, label: 'до меняца в прошлом', format: `${Math.floor(Math.abs(diff) / 7)} недель назад`},
  //   {start: -364, end: -31, label: 'до года в прошлом', format: `${Math.floor(Math.abs(diff) / 31)} месяц назад`},
  //   // {start: 365, end: 99999999, label: 'year'},
  //   // {start: -1, end: 0, label: 'was day ago'},
  //   // {start: -7, end: 0, label: 'was week ago'},
  //   // {start: -31, end: 0, label: 'was a month ago'},
  //   // {start: -365, end: 99999999, label: 'was year ago'}
  // ]
  // // console.log(dates)
  // dates.forEach(({ start, end, format }) => {
  //   if (diff >= start && diff <= end && !result) {
  //     result = moment(date).format(format)
  //     // console.log(result)
  //     return result
  //   }
  // })
  // // console.log(result)
  // return result





  // switch (diff) {
  // case 0: ctx = 'today'; break
  // case 1: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -1: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -2: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -3: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -4: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -5: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case -6: ctx = config.translations.last_appointment_last.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case 2: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case 3: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case 4: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case 5: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // case 6: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // // case 5: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // // case 5: ctx = config.translations.last_appointment_future.replace('{date_string}', moment(date).format('dddd HH:mm')); break
  // }
  // return ctx
  if (date) {
    if (diff <= -14 && diff >= -30 ) {
      return config.translations.last_appointment_week_future.replace('{date_string}', Math.abs(newDate.diff(defaultDate, 'weeks'))) + diff
    } else if (diff === -1 && diff < 0) {
      return 'yesterday'
    } else if (diff >= -7 && diff < -1) {
      return config.translations.was_ago + moment(date).format('dddd HH:mm')
    } else if (diff >= -14 && diff < 0) {
      return config.translations.last_appointment_last_days.replace('{date_string}', Math.abs(newDate.diff(defaultDate, 'days'))) + diff
    } else if (diff < -30 && diff >= -365) {
      return config.translations.last_appointment_month_future.replace('{date_string}', Math.abs(newDate.diff(defaultDate, 'month'))) + diff
    } else if (diff <= -365) {
      return config.translations.last_appointment_year_future.replace('{date_string}', Math.abs(newDate.diff(defaultDate, 'years'))) + diff
    }
  } else {
    return false
  }
}
