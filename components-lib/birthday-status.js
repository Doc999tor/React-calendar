import { getD as get, getEndOf as getEO } from './get-dates.js'
export default d => {
  const t = moment()
  let dl
  if (get(d, 'month') === get(t, 'month')) { dl = get(d, 'date') - get(t, 'date') } else
  if (get(d, 'month') + 1 === get(t, 'month')) { dl = -1 * (getEO(d) - get(d, 'date') + get(t, 'date')) } else
  if (get(d, 'month') - 1 === get(t, 'month')) { dl = getEO(t) - get(t, 'date') + get(d, 'date') }
  if (config.translations.dates.days[dl]) { return config.translations.dates.days[dl] } else
  if (dl < 31 && dl > 1) { return config.translations.birthdate_info.birthdate_in_days.replace('{count}', dl) } else
  if (dl > -8 && dl < -1) { return config.translations.birthdate_info.birthdate_was_ago.replace('{count}', -1 * dl) }
}
