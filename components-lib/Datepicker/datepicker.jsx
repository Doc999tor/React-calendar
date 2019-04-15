import './datepicker.styl'
export default class Datepicker extends React.Component {
  state = {
    birthdate: this.props.birthdate,
    day: '',
    month: '',
    year: '',
    birthyear: this.props.birthyear,
    configValue: this.props.defaultValue
    // configValue1: this.props.defaultValue1
  }
  componentDidUpdate = () => {
    let option = document.querySelectorAll('option')
    option.forEach(i => {
      if (!i.value) i.disabled = true
    })
  }
  render () {
    let stringYear = String(config.data.birthyear)
    let stringDate = String(config.data.birthdate)
    let date = this.props.newDays
    return (
      <ComboDatePicker
        order='ymd'
        months={config.translations.months}
        placeholder={config.translations.profile_birthdate}
        date={this.props.defaultBirthday ? ((config.data.birthyear ? moment(stringYear).format('YYYY') : moment().format('YYYY')) + '-'
        + (config.data.birthdate ? moment(stringDate).format('MM') : moment().format('MM')) + '-'
        + (config.data.birthdate ? moment(stringDate).format('DD') : moment().format('DD'))) : ''}
        onChange={(e, a) => {
          this.setState({
            day: moment(a).format('DD'),
            month: moment(a).format('MM'),
            year: moment(a).format('YYYY'),
            configValue: moment(a).format('YYYY-MM-DD'),
            birthdate: moment(a).isValid() ? (moment(a).format('MM') + '-' + moment(a).format('DD')) : '',
            birthyear: moment(a).isValid() && moment(a).format('YYYY')
          }, () => {
            !!this.props.getBirthdate && this.props.getBirthdate(this.state.birthdate)
            !!this.props.getBirthyear && this.props.getBirthyear(this.state.birthyear)
            !!this.props.getHandleDay && this.props.getHandleDay(this.state.day)
            !!this.props.getHandleMonth && this.props.getHandleMonth(this.state.month)
            !!this.props.getHandleYear && this.props.getHandleYear(this.state.year)
            this.props.handleDate && this.props.handleDate(this.state.birthdate, this.state.birthyear)
          })
        }}
      />

    )
  }
}
