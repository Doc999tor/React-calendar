import {get, getEO} from 'project-components'
export default d => {
  const t = moment()
  let dl
  if (get(d, 'year') === get(t, 'year')) {
    if (get(d, 'month') === get(t, 'month')) { dl = get(d, 'date') - get(t, 'date') } else
    if (get(d, 'month') + 1 === get(t, 'month')) { dl = -1 * (getEO(d) - get(d, 'date') + get(t, 'date')) } else
    if (get(d, 'month') - 1 === get(t, 'month')) { dl = getEO(t) - get(t, 'date') + get(d, 'date') }
  } else
  if (get(d, 'year') - 1 === get(t, 'year') || get(d, 'year') + 1 === get(t, 'year')) {
    if (get(d, 'month') === 0 && get(t, 'month') === 11) { dl = getEO(t) - get(t, 'date') + get(d, 'date') } else
    if (get(d, 'month') === 11 && get(t, 'month') === 0) { dl = -1 * (getEO(d) - get(d, 'date') + get(t, 'date')) }
  }
  return config.translations.dates.days[dl] ? config.translations.dates.days[dl] + config.translations.at + ' ' + moment(d).format('HH:mm') : d
}
