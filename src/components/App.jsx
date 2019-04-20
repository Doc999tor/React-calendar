import React, { Component } from 'react'
import Calendar from './Calendar/index.jsx'
import Agenda from './Agenda/index.jsx'
import Weekly from './Weekly/index.jsx'
import Monthly from './Monthly/index.jsx'
import Header from './Header/Header.jsx'
import Workers from './Workers/Workers.jsx'
import './App.styl'

class App extends Component {
  calendarComponentRef = React.createRef()
  state = {
    active: false,
    calendarDate: '',
    view: '',
    viewType: config.calendar.defaultView,
    todayBtn: true
  }
  componentDidMount () {
    // TODO: Save to redux store calendar API method
    // let calendarApi = this.calendarComponentRef.current.getApi()
    // let activeWorker = config.workers.find(worker => worker.id == config.activeWorkerId)
    // let businessHours = activeWorker.businessHours
    // calendarApi.setOption('businessHours', businessHours)

    // this.getCalendarDate()
  }

  renderTime = title => {
    let calendarApi = this.calendarComponentRef.current.getApi()
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
    let calendarApi = this.calendarComponentRef.current.getApi()
    let date = moment(calendarApi.getDate()).format('YYYY-MM-DD')
    this.setState({
      calendarDate: this.renderTime(date),
      notFormattedDate: date
    })
  }

  handleChangeView = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    if (calendarApi.view.type === 'daily') {
      this.setState({ viewType: 'weekly' })
    } else if (calendarApi.view.type === 'weekly') {
      this.setState({ viewType: 'monthly' })
    } else if (calendarApi.view.type === 'monthly') {
      this.setState({ viewType: 'agenda' })
    } else if (calendarApi.view.type === 'agenda') {
      this.setState({ viewType: 'daily' })
    }
    this.getCalendarDate()
  }
  handleToday = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.today()
    this.getCalendarDate()
  }
  handleNext = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.next()
    this.getCalendarDate()
  }
  handlePrev = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.prev()
    this.getCalendarDate()
  }
  handleChangeWorker = id => {
    config.activeWorkerId = id
    let chosenWorker = config.workers.find(worker => worker.id == id)
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.setOption('businessHours', chosenWorker.businessHours)
    this.setState({ active: true })
    this.getCalendarDate()
  }

  render () {
    const objView = {
      agenda: Agenda,
      daily: Calendar,
      weekly: Weekly,
      monthly: Monthly
    }
    const Calendars = objView[this.state.viewType]
    // console.log(this.state.info && this.state.info.event)
    return (
      <div className='app'>
        {/* <Header
          todayBtn={this.state.todayBtn}
          changeView={this.handleChangeView}
          title={this.state.calendarDate}
          today={this.handleToday}
          view={this.state.view}
          next={this.handleNext}
          prev={this.handlePrev} /> */}
        <Workers changeWorker={this.handleChangeWorker} />
        <Calendars view={this.state.viewType} calendarComponentRef={this.calendarComponentRef} />
      </div>
    )
  }
}

export default App
