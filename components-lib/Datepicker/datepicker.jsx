import './datepicker.styl'
export default class Datepicker extends React.Component {
  state = {
    min: '1930',
    max: moment().format('YYYY')
  }

  renderOptionsYear = () => {
    const arr = []
    for (let i = this.state.min; i <= this.state.max; i++) {
      arr.push(i)
    }
    return (
      arr.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))
    )
  }

  renderOptionsMonth = () => {
    moment.locale(config.locale)
    const arr = []
    for (let index = 0; index < 12; index++) {
      let months = moment().set('month', index).format('MMMM')
      arr.push(months.charAt(0).toUpperCase() + months.slice(1))
    }
    const res = arr.map((opt, index) => {
      let indexStr = (index + 1) + ''
      if (indexStr.length < 2) indexStr = 0 + indexStr
      return (
        <option key={opt} value={indexStr}>
          {opt}
        </option>
      )
    }
    )
    return res
  }

  renderOptionsDay = () => {
    const arr = []
    const month = this.props.month && !isNaN(+this.props.month) ? this.props.month : '01'
    for (let i = 0; i < moment(month, 'MM').daysInMonth(); i++) {
      let day = (i + 1) + ''
      if (day.length < 2) day = 0 + day
      arr.push(day)
    }
    const res = arr.map((opt, index) => {
      let indexStr = (index + 1) + ''
      if (indexStr.length < 2) indexStr = 0 + indexStr
      return (
        <option key={opt} value={indexStr}>
          {opt}
        </option>
      )
    }
    )
    return res
  }

  render () {
    return (
      <div className='picker-wrap'>
        <select className='year' value={this.props.year} onChange={this.props.handleChangeYear}>
          <option value={config.translations.datepicker.placeholder.year} disabled>{config.translations.datepicker.placeholder.year}</option>
          {
            this.renderOptionsYear()
          }
        </select>

        <select className='month' value={this.props.month} onChange={this.props.handleChangeMonth}>
          <option value={config.translations.datepicker.placeholder.month} disabled>{config.translations.datepicker.placeholder.month}</option>
          {
            this.renderOptionsMonth()
          }
        </select>
        <select className='day' value={this.props.day} onChange={this.props.handleChangeDay}>
          <option value={config.translations.datepicker.placeholder.day} disabled>{config.translations.datepicker.placeholder.day}</option>
          {
            this.renderOptionsDay()
          }
        </select>
      </div>
    )
  }
}
