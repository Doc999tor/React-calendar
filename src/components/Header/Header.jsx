import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switchView, setDefaultDay } from 'store/calendar/actions'
import HeaderMenu from './HeaderMenu/index.jsx'
import './Header.styl'

// TODO: Handle 'defaultDay'
class Header extends Component {
  componentDidMount () {
    this.updateBusinessHours(this.props.calendarApi)
  }

  updateBusinessHours = calendarApi => {
    let activeWorker = config.workers.find(worker => +worker.id === +config.activeWorkerId)
    if (activeWorker) {
      let businessHours = activeWorker.businessHours
      calendarApi.setOption('businessHours', businessHours)
    }
  }

  getCalendarDate = () => {
    let title = moment(this.props.defaultDate).format('YYYY-MM-DD')
    let calendarApi = this.props.calendarApi
    let currentDay = moment().format('YYYY-MM-DD') === moment(title).format('YYYY-MM-DD')
    let currentMonth = moment().format('MM') === moment(title).format('MM')
    let curDay = moment().format('YYYY-MM-DD')
    let start = moment(calendarApi.state.dateProfile.currentRange.start).format('YYYY-MM-DD')
    let end = moment(calendarApi.state.dateProfile.currentRange.end).format('YYYY-MM-DD')
    let isBetween = moment(curDay).isBetween(moment(start), moment(end))
    const obj = {
      daily: () => ({
        calendarDate: (
          <React.Fragment>
            {currentDay && <span className='today'>{config.translations.today}</span>}
            <span className={'current_date_field' + (currentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.daily, todayBtn: !currentDay }
      }),
      weekly: () => ({
        calendarDate: (
          <React.Fragment>
            <span className='current_date_field' style={{ 'direction': 'ltr' }}>{moment(start).format('DD') + ' - ' + moment(end).subtract(1, 'days').format('DD') + ' ' + moment(start).format('MMM')}</span>
            {isBetween && <span className='this_week'>{config.translations.thisWeek}</span>}
          </React.Fragment>
        ),
        state: { view: config.translations.weekly, todayBtn: !isBetween }
      }),
      monthly: () => ({
        calendarDate: (
          <React.Fragment>
            <span className='current_date_field'>{moment(title).format('MMMM')}</span>
            <span className='this_week'>{moment(title).format('YYYY')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.monthly, todayBtn: !currentMonth }
      }),
      agenda: () => ({
        calendarDate: (
          <React.Fragment>
            {currentDay && <span className='today'>{config.translations.today}</span>}
            <span className={'current_date_field' + (currentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.agenda, todayBtn: !currentDay }
      })
    }
    const { calendarDate, state } = obj[this.props.currentView || calendarApi?.view?.type]()
    return {
      calendarDate,
      ...state
    }
  }

  handleChangeView = () => {
    const objView = {
      monthly: 'agenda',
      weekly: 'monthly',
      daily: 'weekly',
      agenda: 'daily'
    }
    this.props.dispatch(switchView(objView[this.props.currentView]))
  }

  handleToday = () => {
    let currentDay = moment().format('YYYY-MM-DD')
    this.props.dispatch(setDefaultDay(currentDay))
  }
  
  handleNext = () => {
    let calendarApi = this.props.calendarApi
    calendarApi.next()
  }
  
  handlePrev = () => {
    let calendarApi = this.props.calendarApi
    calendarApi.prev()
  }
  
  render () {
    const { calendarDate, view, todayBtn } = this.getCalendarDate()
    return (
      <div id='header' style={{ 'direction': config.calendar.isRTL ? 'rtl' : 'ltr' }}>
        <div className={'menu_refresh ' + (config.calendar.isRTL ? 'menu_rtl' : 'menu_ltr')}>
          <HeaderMenu />
          <button id='refresh_button'>
            <img className='refresh_button_img' src={config.urls.staticImg + '/refresh.svg'} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.handlePrev} className={'prev_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='prev_button btn' src={config.urls.staticImg + '/prev.svg'} />
          </button>
          <div className='current_date'>
            {calendarDate}
          </div>
          <button onClick={this.handleNext} className={'next_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='next_button btn' src={config.urls.staticImg + '/next.svg'} />
          </button>
        </div>
        <div className={'header_right ' + (config.calendar.isRTL ? 'view_buttons_rtl' : 'view_buttons_ltr')}>
          {todayBtn && <button className='today_wrap' onClick={this.handleToday}>
            <img className='img_today' src={config.urls.staticImg + '/today.svg'} />
            {config.translations.today}
          </button>}
          <button className='daily_wrap daily_wrap_label' onClick={this.handleChangeView}>
            <img className='img_view' src={config.urls.staticImg + '/change_view.svg'} />
            {view}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDate: state.calendar.defaultDate,
  calendarApi: state.calendar.calendarApi,
  currentView: state.calendar.currentView
})
export default connect(mapStateToProps)(Header)
