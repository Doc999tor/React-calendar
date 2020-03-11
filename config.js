const baseUrl = 'https://api.bewebmaster.co.il'

const config = {
  rangeOfDays: 20,
  activeWorkerId: 11,
  currency: '$',
  dateRangeForMonthSwipe: 35,
  defaultWorkerPhoto: 'default_worker.jpg',
  defaultClientPhoto: 'default_client.jpg',
  occasionalClientPhoto: 'anyone.svg',
  workers: [
    {
      id: '20',
      name: 'Jennifer',
      photo: 'jennifer.jpg',
      businessHours: [
        {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          startTime: '12:00',
          endTime: '16:00'
        }
      ],
      active: false
    },
    {
      id: '11',
      name: 'Dwayne',
      photo: 'dwayne.jpg',
      businessHours: [
        {
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '13:00',
          endTime: '17:00'
        }
        // {
        //   daysOfWeek: [5],
        //   startTime: '10:00',
        //   endTime: '16:00'
        // }
      ],
      active: true
    }, {
      id: '24',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [2],
          startTime: '00:00',
          endTime: '20:00'
        }
      ],
      active: false
    }, {
      id: '3',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [
            0, 1, 2, 3, 4
          ],
          startTime: '00:00',
          endTime: '20:00'
        }
      ],
      active: false
    }, {
      id: '4',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [
            0, 1, 3, 4
          ],
          startTime: '00:00',
          endTime: '20:00'
        }, {
          daysOfWeek: [5],
          startTime: '10:00',
          endTime: '16:00'
        }
      ],
      active: false
    }, {
      id: '5',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [
            0, 1, 2, 3, 4
          ],
          startTime: '00:00',
          endTime: '20:00'
        }, {
          daysOfWeek: [5],
          startTime: '10:00',
          endTime: '16:00'
        }
      ],
      active: false
    }, {
      id: '6',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [0, 1, 2, 3, 4],
          startTime: '00:00',
          endTime: '20:00'
        }, {
          daysOfWeek: [5],
          startTime: '10:00',
          endTime: '16:00'
        }
      ],
      active: false
    }, {
      id: '7',
      name: 'Jennifer',
      photo: '',
      businessHours: [
        {
          daysOfWeek: [
            0, 1, 2, 3, 4
          ],
          startTime: '00:00',
          endTime: '20:00'
        }, {
          daysOfWeek: [5],
          startTime: '10:00',
          endTime: '16:00'
        }
      ],
      active: ''
    }
  ],
  swiper: {
    longSwipesRatio: 0.15, // Ratio to trigger swipe to next/previous slide during long swipes
    longSwipesMs: 110 // Minimal duration (in ms) to trigger swipe to next/previous slide during long swipes
  },
  calendar: {
    events: [
    ],
    eventLongPressDelay: 1000,
    selectLongPressDelay: 1000,
    defaultView: 'agenda', // agenda, daily, weekly, monthly
    defaultDate: moment().format('YYYY-MM-DD'),
    // defaultDate: moment(window.location.pathname.match(new RegExp('\\d{4}\\-\\d{1,2}\\-\\d{1,2}', 'g'))[0]).isValid() ? moment(window.location.pathname.match(new RegExp('\\d{4}\\-\\d{1,2}\\-\\d{1,2}', 'g'))[0]) : moment('2018-01-01'),
    eventOverlap: true,
    slotEventOverlap: false,
    showNonCurrentDates: false,
    header: {
      left: false,
      center: false,
      right: false
    },
    views: {
      agenda: {
        type: 'dayGrid'
      },
      daily: {
        type: 'timeGrid'
      },
      weekly: {
        type: 'timeGrid',
        duration: {
          days: 4
        }
      },
      monthly: {
        type: 'dayGridMonth',
        fixedWeekCount: false,
        eventLimit: 3,
        eventLimitText: 'more',
        editable: false,
        eventLimitClick: false,
        showNonCurrentDates: true
      }
    },
    height: 'parent',
    contentHeight: 'auto',
    droppable: true,
    dragScroll: true,
    allDaySlot: false,
    timeZone: 'local',
    // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dir: 'ltr',
    nowIndicator: true,
    firstDay: 0,
    slotDuration: '00:15:00', // The frequency for displaying time slots
    slotLabelInterval: '00:15', // The frequency that the time slots should be labelled with text
    minTime: '06:15',
    maxTime: '23:15',
    editable: true,
    longPressDelay: 1000,
    weekends: true
  },
  menu: [
    {text: 'calendar', link: '/en/calendar', icon: 'calendar.jpg'},
    {text: 'clients_list', link: '/en/clients_list', icon: 'clients_list.jpg'},
    {text: 'reminders', link: '/en/reminders', icon: 'reminders.jpg'},
    {text: 'groups', link: '/en/groups', icon: 'groups.jpg'},
    {text: 'services', link: '/en/services', icon: 'services.jpg'},
    {text: 'support', link: '/en/support', icon: 'support.jpg'},
    {text: 'suggest_feature', link: '/en/suggest_feature', icon: 'suggest_feature.jpg'},
    {text: 'rate_us', link: '/en/rate_us', icon: 'rate_us.jpg'},
    {text: 'logout', link: '/e n/logout', icon: 'logout.jpg'}
  ],
  user: {
    business_logo: 'public/business_data/1/logo.jpg',
    business_name: 'Beauty and cosmetics salons',
    business_address: '11301 West Olympic Boulevard, Apt.100'
  },
  urls: {
    creatingAppointmentLink: `${baseUrl}/creating-appointment`,
    google_maps: 'https://www.google.com/maps/place/{address}',
    imgForWorkers: '/dist/workers/images/{worker_id}',
    get_holidays: 'https://api.bewebmaster.co.il/appointments/settings/holidays?year={YYYY}',
    imgForClients: 'https://api.bewebmaster.co.il/public/business_data/1/clients/{client_id}/',
    // imgForClients: 'public/clients/{client_id}/',
    imgForOccasionalClients: '/dist/media/images/',
    defaultPathToWorkerImg: '/dist/media/images/',
    defaultPathToClientImg: '/dist/media/images/',
    appointmentsUrl: `${baseUrl}/appointments`,
    waze: 'https://waze.com/ul?q={address}',
    menu_icons: 'dist/menu/',
    startUrl: '/en/calendar',
    staticImg: 'dist/media',
    clientPage: '/clients',
    sendSmS: '/send-sms',
    login: '/login'
  },
  translations: {
    vacation: 'Vacation',
    no_queues: 'No queues yet',
    empty_agenda: 'There are no queues on this day. Click the button to add a queue',
    order_queue: 'Order a queue',
    noEvents: 'No events to display',
    business_lunch: 'Business lunch',
    meeting: 'Meeting with business partner',
    occasional: 'occasional client',
    debt: 'Debt',
    vip: 'Vip',
    birthday: 'Birthday',
    client: 'client',
    approved: 'approved',
    paid: 'paid',
    services: 'Services',
    address: 'Address',
    notes: 'Notes',
    edit: 'Edit',
    service_count: '⨯ {count}',
    send_sms: 'Send sms',
    delete: 'Delete',
    today: 'Today',
    thisWeek: 'This week',
    monthly: 'Monthly',
    weekly: 'Weekly',
    agenda: 'Agenda',
    daily: 'Daily',
    menu: {
      calendar: 'Calendar',
      clients_list: 'Clients list',
      reminders: 'Reminders',
      groups: 'Groups',
      services: 'Services',
      support: 'Support',
      suggest_feature: 'Suggest a feature',
      rate_us: 'Rate us',
      logout: 'Log out'
    },
    duration: {
      hour: 'hour',
      hours: 'hours',
      abbreviated_hours: 'h',
      description: 'Free time',
      minute: 'minute',
      minutes: 'minutes',
      abbreviated_minutes: 'm'
    },
    dates: {
      days: {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
      },
      daysFull: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      },
      fullMonths: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }
    }
  }
}
