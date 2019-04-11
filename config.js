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
    }, {
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
    // businessHours: [
    //   {
    //     daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    //     startTime: '12:00',
    //     end: '16:00'
    //   }
    // ],
    events: [
      // {
      //   address: "אילת, מלון עציון, 62",
      //   birthdate: "01-01",
      //   client_id: null,
      //   end: "2018-01-01 13:45",
      //   id: 61,
      //   durationEditable: true,
      //   is_new_client: true,
      //   has_debt: true,
      //   name: "",
      //   note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      //   off_time: '',
      //   phone: "05-86490187",
      //   profile_picture: "120.jpg",
      //   services: [
      //     {id: 21, name: "ZYneaZI", color: "", service_count: 1},
      //     {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      //     {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      //   ],
      //   start: "2018-01-01 12:30",
      //   total_price: 400
      // },
      // {
      //   address: "22 ,xorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK",
      //   birthdate: "01-01",
      //   client_id: 12,
      //   end: "2018-01-01 12:30",
      //   id: 613,
      //   // durationEditable: true,
      //   is_new_client: true,
      //   has_debt: true,
      //   name: "QwrUlf",
      //   note: "eEAT Zpyvh eYAVxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      //   off_time: '',
      //   phone: "05-86490187",
      //   profile_picture: "120.jpg",
      //   services: [
      //     {id: 211, name: "ZYneazi", color: "", service_count: 1},
      //     {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      //     {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      //   ],
      //   start: "2018-01-01 11:30",
      //   total_price: 900
      // },
      // {
      //   address: "222 ,asdasdasd rsaZ MHudyVsrpK",
      //   birthdate: "01-01",
      //   client_id: 121,
      //   end: "2018-01-01 11:30",
      //   id: 6132,
      //   // durationEditable: true,
      //   is_new_client: true,
      //   has_debt: true,
      //   name: "QwrUlf",
      //   note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      //   off_time: '',
      //   phone: "05-86490187",
      //   profile_picture: "120.jpg",
      //   services: [
      //     {id: 211, name: "ZYneaZI", color: "", service_count: 1},
      //     {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      //     {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      //   ],
      //   start: "2018-01-01 09:30",
      //   total_price: 900
      // },
      // {
      //   address: "333 ,asdasdasd rsaZ MHudyVsrpK",
      //   birthdate: "01-01",
      //   client_id: 1211,
      //   end: "2018-01-01 12:30",
      //   id: 61321,
      //   // durationEditable: true,
      //   is_new_client: true,
      //   has_debt: true,
      //   name: "asdaRE",
      //   note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      //   off_time: 'meeting',
      //   phone: "05-86490187",
      //   profile_picture: "120.jpg",
      //   services: [
      //     {id: 211, name: "ZYneaZI", color: "#7FFF00", service_count: 1},
      //     {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      //     {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      //   ],
      //   start: "2018-01-01 09:30",
      //   total_price: 900
      // },
      // {
      //   address: "333 ,asdasdasd rsaZ MHudyVsrpK",
      //   birthdate: "01-01",
      //   client_id: 51211,
      //   end: "2018-01-01 11:30",
      //   id: 561321,
      //   // durationEditable: true,
      //   is_new_client: true,
      //   has_debt: true,
      //   name: "asdaRE",
      //   note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      //   off_time: 'meeting',
      //   phone: "05-86490187",
      //   profile_picture: "120.jpg",
      //   services: [
      //     {id: 211, name: "ZYneaZI", color: "#8441bd", service_count: 1},
      //     {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
      //     {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      //   ],
      //   start: "2018-01-01 09:30",
      //   total_price: 900
      // },
      // {
      //   address: "בת ים, ויצמן, 18",
      //   birthdate: "01-01",
      //   client_id: 79,
      //   end: "2018-01-01 14:00",
      //   id: 800,
      //   has_debt: true,
      //   is_new_client: true,
      //   durationEditable: true,
      //   name: "kAWPCQiV bgUrc",
      //   note: "eEAT Zpyvh eYAVxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      //   off_time: 'break',
      //   phone: "06-49686277",
      //   profile_picture: "79.jpg",
      //   services: [
      //     {id: 19, name: "KY es tXCWUVvJbw", color: "#00FFFF", service_count: 3},
      //     {id: 6, name: "VgJCY Tdjypuzqcs", color: "#6fc267", service_count: 1}
      //   ],
      //   start: "2018-01-01 13:00",
      //   total_price: 300
      // },
      // {
      //   address: "בת ים, ויצמן, 18",
      //   birthdate: "01-01",
      //   client_id: 729,
      //   end: "2018-01-01 12:45",
      //   id: 8200,
      //   has_debt: true,
      //   is_new_client: true,
      //   durationEditable: true,
      //   name: "kAWPCQiV bgUrc",
      //   note: "eEAT Zpyvh eYAVxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      //   off_time: 'break',
      //   phone: "06-49686277",
      //   profile_picture: "79.jpg",
      //   services: [
      //     {id: 19, name: "KY es tXCWUVvJbw", color: "#00FFFF", service_count: 3},
      //     {id: 6, name: "VgJCY Tdjypuzqcs", color: "#6fc267", service_count: 1}
      //   ],
      //   start: "2018-01-01 12:30",
      //   total_price: 300
      // }
    ],
    eventLongPressDelay: 1000,
    selectLongPressDelay: 1000,
    defaultView: 'timeGridDay', // dayGridMonth, timeGridWeek, timeGridDay, listWeek
    defaultDate: moment(),
    // defaultDate: moment('2018-01-01'),
    // defaultDate: moment(window.location.pathname.match(new RegExp('\\d{4}\\-\\d{1,2}\\-\\d{1,2}', 'g'))[0]).isValid() ? moment(window.location.pathname.match(new RegExp('\\d{4}\\-\\d{1,2}\\-\\d{1,2}', 'g'))[0]) : moment('2018-01-01'),
    eventOverlap: false,
    slotEventOverlap: false,
    showNonCurrentDates: false,
    header: {
      left: false,
      center: 'title',
      right: false
    },
    views: {
      agendaDay: {
        displayEventEnd: false,
        displayEventTime: true
      },
      daily: {
        type: 'agenda'
      },
      agendaFourDay: {
        type: 'agenda',
        columnFormat: 'ddd D',
        duration: {
          days: 4
        },
        slotLabelFormat: 'HH:mm'
      },
      month: {
        eventLimit: 4,
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
    timeZone: '',
    isRTL: true,
    nowIndicator: true,
    firstDay: 0,
    countQueue: 3,
    slotLabelFormat: [
      'MMMM YYYY', 'HH:mm'
    ],
    slotDuration: '00:15:00', // The frequency for displaying time slots
    slotLabelInterval: '00:15', // The frequency that the time slots should be labelled with text
    minTime: '08:00',
    maxTime: '20:15',
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
