var _config = {
  routing: [
    {
      path: '/home',
      urlQuery: ['date', 'start']
    }
  ],

  translations: {
    global: {
      caution: 'Caution!',
      delete: 'Delete',
      cancel: 'Cancel',
      hryvnia: 'hryvnia',
      minutes: 'min',
      duration: 'Duration',
      procedure_catalog: 'procedure catalog'
    },
    topnav: {
      procedure_creation: 'procedure creation'
    },
    CategoriesProcedures: {
      really_want_delete: 'Do you really want to delete?',
      delete_asked_again: 'this category list is in your diary! are you shure?'
    },
    addNewProcedures: {
      procedure_name: 'Name of procedure',
      select_category: 'Select category',
      durationValue: 30,
      viewDurationValue: '30m',
      enter_procedure_name: 'Enter procedure name...',
      price: 'Price',
      select_color: 'Select color',
      create_procedure_next: 'Create procedure',
      color_procedures: [
        '#00ffff',
        '#808080',
        '#000000',
        '#fff',
        '#00ff00',
        '#ff0000',
        '#00bfff',
        '#ff00ff',
        '#0000ff',
        '#ffff00',
        '#ffa500',
        '#e6e6fa'
      ]
    }
  },
  urls: {
    base: 'https://api.bewebmaster.co.il',
    creating_appointment: 'creating-appointment',
    appointments: 'appointments',
    procedures_category: 'catalog/services/category',
    profile_image_path: '/image',
    add_category: 'catalog/services/categories',
    baseImg: 'http://api.bewebmaster.co.il/image/',
    adress: 'https://maps.googleapis.com/maps/api/geocode/json',
    timeoutLoading: 1000,
    defaulftDebounceTime: 300,
    unloadingBegins: 10,
    groups: './media/groups/',
    schedule: './media/clients/',
    clients: './media/clients/',
    static: './media/',
    procedures: 'catalog/services',
    category_id: 'category_id='
  },
  user: {
    permission_level: ['admin', 'senior', 'junior', 'readonly', 'untrusted']
  },
  plugins_list: [
    'custom_groups', 'base', 'multiple_workers', 'colors', 'medical_records'
  ],
  procedures: [
    {
        "id": 104,
        "name": "מתעסחחגצ רע",
        "duration": 30,
        "price": 100,
        "color": "#a44bc2",
        "category": {
            "id": 1,
            "name": "עיצוב שיער"
        }
    },
    {
        "id": 22,
        "name": "שבלתאא סרברהד יקשרסא",
        "duration": 15,
        "price": 200,
        "color": "#99abf",
        "category": {
            "id": 2,
            "name": "קוסמטיקה"
        }
    },
    {
        "id": 149,
        "name": "טגזהט גהקאררדז",
        "duration": 60,
        "price": 450,
        "color": "#41d582",
        "category": {
            "id": 2,
            "name": "קוסמטיקה"
        }
    },
    {
        "id": 43,
        "name": "דעההס טיבעצסקז לצגבפאססה דתבעהא",
        "duration": 30,
        "price": 100,
        "color": "#c7e36",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 68,
        "name": "טמרצ ימכתר",
        "duration": 15,
        "price": 300,
        "color": "#4f765",
        "category": {
            "id": 4,
            "name": "טיפולי גוף"
        }
    },
    {
        "id": 122,
        "name": "חכסז",
        "duration": 225,
        "price": 4100,
        "color": "#863647",
        "category": {
            "id": 2,
            "name": "קוסמטיקה"
        }
    },
    {
        "id": 127,
        "name": "גכשצמלשצ ננגת  פדכרדזק",
        "duration": 495,
        "price": 450,
        "color": "#40e70d",
        "category": {
            "id": 4,
            "name": "טיפולי גוף"
        }
    },
    {
        "id": 114,
        "name": "גדתבפאררחת חאמ המ שר קתמשזפנ",
        "duration": 30,
        "price": 300,
        "color": "#8f31b8",
        "category": {
            "id": 5,
            "name": "מניקור פדיקור"
        }
    },
    {
        "id": 9,
        "name": "ושגפטאוצ כלקג בתכחגרצעאס",
        "duration": 15,
        "price": 150,
        "color": "#535b19",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 134,
        "name": "מקפצ וענזעקיבו הש זשבלוכ סרפ תבסבזטתנקש",
        "duration": 15,
        "price": 450,
        "color": "#6ac2a1",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 97,
        "name": "בבדוטטנ   תמצר רתגסשצת",
        "duration": 60,
        "price": 3050,
        "color": "#6a03e9",
        "category": {
            "id": 1,
            "name": "עיצוב שיער"
        }
    },
    {
        "id": 127,
        "name": "חזקעדתטוא ידפנע גלבתו  רדיאוההצ",
        "duration": 30,
        "price": 200,
        "color": "#9ab152",
        "category": {
            "id": 5,
            "name": "מניקור פדיקור"
        }
    },
    {
        "id": 84,
        "name": "לסהסצפגננ  יסשדפנוק",
        "duration": 15,
        "price": 2200,
        "color": "#249224",
        "category": {
            "id": 5,
            "name": "מניקור פדיקור"
        }
    },
    {
        "id": 118,
        "name": "כליסבעטחרג באטעכבש תהנלרק טבשגנשפעפ",
        "duration": 450,
        "price": 350,
        "color": "#a7397c",
        "category": {
            "id": 1,
            "name": "עיצוב שיער"
        }
    },
    {
        "id": 27,
        "name": "אכאצחבצנ כש",
        "duration": 60,
        "price": 150,
        "color": "#6a3a4f",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 137,
        "name": "טצשפק",
        "duration": 45,
        "price": 500,
        "color": "#69786f",
        "category": {
            "id": 5,
            "name": "מניקור פדיקור"
        }
    },
    {
        "id": 84,
        "name": "גוכוסחדסשנ  קססיחסשספד",
        "duration": 30,
        "price": 300,
        "color": "#f51aca",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 30,
        "name": "תנלמ צלצצכרומ",
        "duration": 45,
        "price": 100,
        "color": "#d28c2e",
        "category": {
            "id": 4,
            "name": "טיפולי גוף"
        }
    },
    {
        "id": 78,
        "name": "",
        "duration": 15,
        "price": 400,
        "color": "#fb8a54",
        "category": {
            "id": 3,
            "name": "טיפולי פנים"
        }
    },
    {
        "id": 135,
        "name": "פבויעוגעסצ לגצ",
        "duration": 15,
        "price": 850,
        "color": "#286bcf",
        "category": {
            "id": 1,
            "name": "עיצוב שיער"
        }
    }
  ],
  data: {
    boolean: {
      isRTL: false
    },
    numerical: {
      listLimit: 20,
      max_proc_shown_without_cat: 5,
      howLongSecPressCategory: 500,
      minSwipeLength: 150
    }
  }
}
