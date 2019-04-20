import React, { Component } from 'react'
import { Menu } from 'project-components'
import './Header.styl'

export default class Header extends Component {
  state = {
    isActive: false,
    active: false,
    calendarDate: '',
    view: '',
    viewType: config.calendar.defaultView,
    todayBtn: true
  }
  
  componentDidMount () {
    this.updateBusinessHours(this.props.calendarApi)
  }

  updateBusinessHours = calendarApi => {
    let activeWorker = config.workers.find(worker => worker.id == config.activeWorkerId)
    let businessHours = activeWorker.businessHours
    calendarApi.setOption('businessHours', businessHours)
    // this.getCalendarDate()
  }

  renderTime = title => {
    let calendarApi = this.props.calendarApi
    let currentDay = moment().format('YYYY-MM-DD') === moment(title).format('YYYY-MM-DD')
    let currentMonth = moment().format('MM') === moment(title).format('MM')
    let curDay = moment().format('YYYY-MM-DD')
    let start = moment(calendarApi.state.dateProfile.currentRange.start).format('YYYY-MM-DD')
    let end = moment(calendarApi.state.dateProfile.currentRange.end).format('YYYY-MM-DD')
    let isBetween = moment(curDay).isBetween(moment(start), moment(end))
    if (calendarApi.view.type === 'daily') {
      this.setState({ view: config.translations.daily, todayBtn: currentDay ? false : true })
      return (
        <React.Fragment>
          {currentDay && <span className='today'>{config.translations.today}</span>}
          <span className={'current_date_field' + (currentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
        </React.Fragment>
      )
    } else if (calendarApi.view.type === 'weekly') {
      this.setState({ view: config.translations.weekly, todayBtn: isBetween ? false : true })
      return (
        <React.Fragment>
          <span className='current_date_field' style={{ 'direction': 'ltr' }}>{moment(start).format('DD') + ' - ' + moment(end).subtract(1, 'days').format('DD') + ' ' + moment(start).format('MMM')}</span>
          {isBetween && <span className='this_week'>{config.translations.thisWeek}</span>}
        </React.Fragment>
      )
    } else if (calendarApi.view.type === 'monthly') {
      this.setState({ view: config.translations.monthly, todayBtn: currentMonth ? false : true })
      return (
        <React.Fragment>
          <span className='current_date_field'>{moment(title).format('MMMM')}</span>
          <span className='this_week'>{moment(title).format('YYYY')}</span>
        </React.Fragment>
      )
    } else if (calendarApi.view.type === 'agenda') {
      this.setState({ view: config.translations.agenda, todayBtn: currentDay ? false : true })
      return (
        <React.Fragment>
          {currentDay && <span className='today'>{config.translations.today}</span>}
          <span className={'current_date_field' + (currentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
        </React.Fragment>
      )
    }
  }

  getCalendarDate = () => {
    let calendarApi = this.props.calendarApi
    let date = moment(calendarApi.getDate()).format('YYYY-MM-DD')
    this.setState({
      calendarDate: this.renderTime(date),
      notFormattedDate: date
    })
  }

  handleChangeView = () => {
    let calendarApi = this.props.calendarApi
    const objView = {
      monthly: 'agenda',
      weekly: 'monthly',
      daily: 'weekly',
      agenda: 'daily'
    }
    this.setState({ viewType: objView[calendarApi.view.type] })
    this.getCalendarDate()
  }

  handleToday = () => {
    let calendarApi = this.props.calendarApi
    calendarApi.today()
    this.getCalendarDate()
  }

  handleNext = () => {
    let calendarApi = this.props.calendarApi
    calendarApi.next()
    this.getCalendarDate()
  }

  handlePrev = () => {
    let calendarApi = this.props.calendarApi
    calendarApi.prev()
    this.getCalendarDate()
  }

  menuOnOff = () => {
    this.setState(state => ({
      isActive: !state.isActive
    }))
    document.querySelector('body').classList.toggle('no-scroll')
  }

  closeMenu = () => {
    this.setState({ isActive: false })
    document.querySelector('body').classList.remove('no-scroll')
  }
  render () {
    return (
      <div id='header' style={config.calendar.isRTL ? {'direction': 'rtl'} : {'direction': 'ltr'}}>
        <div className={'menu_refresh ' + (config.calendar.isRTL ? 'menu_rtl' : 'menu_ltr')}>
          <button onClick={this.menuOnOff} className='more_wrap'>
            <img src={config.urls.staticImg + '/ic_menu.svg'} />
          </button>
          <button id='refresh_button'>
            <img className='refresh_button_img' src={config.urls.staticImg + '/refresh.svg'} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.prev} className={'prev_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='prev_button btn' src={config.urls.staticImg + '/prev.svg'} />
          </button>
          <div className='current_date'>
            {this.state.calendarDate}
          </div>
          <button onClick={this.next} className={'next_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='next_button btn' src={config.urls.staticImg + '/next.svg'} />
          </button>
        </div>
        <div className={'header_right ' + (config.calendar.isRTL ? 'view_buttons_rtl' : 'view_buttons_ltr')}>
          {this.state.todayBtn && <button className='today_wrap' onClick={this.handleToday}>
            <img className='img_today' src={config.urls.staticImg + '/today.svg'} />
            {config.translations.today}
          </button>}
          <button className='daily_wrap daily_wrap_label' onClick={this.changeView}>
            <img className='img_view' src={config.urls.staticImg + '/change_view.svg'} />
            {this.state.view}
          </button>
        </div>
        {this.state.isActive && <Menu closeMenu={this.closeMenu} />}
      </div>
    )
  }
}
