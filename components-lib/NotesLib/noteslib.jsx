import { default as formatDate } from '../format-date.js'
import { default as reminder } from '../reminder.js'
import AddNote from './components/add-note/add-note.jsx'
import './noteslib.styl'

const INITIAL_STATE = {
  selectedValueLable: config.translations.notes_list[0].label,
  selectedLabel: config.data.reminders_default_date_period,
  selectedValue: config.translations.notes_list[0].value,
  timeStart: config.data.reminders_default_period_amount,
  isReminderEdit: false,
  reminderDate: '',
  startReminder: '',
  description: '',
  switch: false,
  note_id: 0,
  time: 0,
  key: 0
}

export default class Notes extends React.Component {
  state = {
    ...INITIAL_STATE,
    show: false,
  }
  static propTypes = {
    createNewNote: PropTypes.func.isRequired,
    activateNone: PropTypes.bool.isRequired,
    hiddenNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    notesData: PropTypes.array.isRequired,
    editNote: PropTypes.func.isRequired,
    rights: PropTypes.object.isRequired
  }
  componentDidMount = () => { if (!Array.isArray(config.data.notes)) config.data.notes = [] }

  backButton = () => {
    this.setState({
      ...INITIAL_STATE
    }, () => {
      this.props.cancelActions()
      this.props.hiddenNotes()
    })
  }
  handleIncrementTime = () => {
    this.setState(prevState => ({
      time: +prevState.time + 1
    }), () => this.setState({reminderDate: reminder(this.state.time, this.state.selectedValue)})
    )
  }
  handleDecrementTime = () => {
    if (+this.state.time > 0) {
      this.setState(prevState => ({
        time: +prevState.time - 1
      }), () => this.setState({reminderDate: reminder(this.state.time, this.state.selectedValue)}))
    }
  }
  save = () => {
    let id = Math.floor(Math.random() * 100) + 1
    let rem = this.state.switch ? reminder(this.state.time, this.state.selectedValue) : ''
    this.props.saveNote(rem, this.state.description, id && id)
  }
  update = () => {
    let rem = this.state.switch
      ? this.state.reminderDate ? moment(this.state.reminderDate).format('YYYY-MM-DD HH:mm:ss') : reminder(this.state.time, this.state.selectedValue)
      : false
    let startReminder = this.state.startReminder ? this.state.startReminder : false
    this.props.editNote(rem, this.state.key, this.state.description, startReminder)
  }
  // checkLength (desc) {
  //   let str = ''
  //   if (desc.length > 70) {
  //     str = desc.substr(0, 70) + '...'
  //   } else {
  //     str = desc
  //   }
  //   return str
  // }
  openAddForm = () => {
    if (this.props.isEditNotes && !this.props.newEditNotes && this.props.noteReplace) {
      this.backButton()
    } else {
      this.setState({...INITIAL_STATE})
      this.props.allowActions()
      this.props.hiddenNotes()
    }
  }
  deleteNote = () => {
    this.props.deleteNote(this.state.note_id, this.state.reminderDate)
  }
  replace = (i, key) => {
    if (this.props.isEditNotes && this.props.newEditNotes && this.props.noteReplace) {
      this.backButton()
    } else {
      this.props.editAction(i.id)
      this.setState({
        selectedValue: config.translations.notes_list[0].value,
        selectedValueLable: config.translations.notes_list[0].label,
        description: i.text,
        time: '0',
        reminderDate: i.reminder_date,
        startReminder: i.reminder_date,
        isReminderEdit: i.reminder_date && true,
        note_id: i.id,
        switch: i.reminder_date && true,
        add_client_id: i.id,
        key
      })
    }
  }

  setSelectValues = (value, label) => {
    this.setState({
      selectedValue: value,
      selectedValueLable: label
    }, () => this.setState({
      reminderDate: reminder(this.state.time, this.state.selectedValue)
    })
    )
  }
  setDurationValues = (time, selectedValue) => {
    let obj = config.translations.notes_list.find(i => i.value === selectedValue)
    this.setState({time, selectedValue: obj.value, selectedValueLable: obj.label})
  }
  setDescription = value => this.setState({description: value})
  cancelSearch = () => this.setState({description: ''})
  activateSwitch = () => this.setState({switch: !this.state.switch, isReminderEdit: !this.state.isReminderEdit})

  showFullNote = (i, id) => {
    let a = document.getElementById(id)
    a.classList.toggle('full-note')
  }
  letsScroll = () => setTimeout(() => { this.noteRef.scrollTop += 200 }, 0)
  render () {
    return (
      <div id='notes'>
        {(this.props.isEditNotes || this.props.notesData.length > 0) && <div className='note-header'>
          <span className='head-span'>{config.translations.notes.title}</span>
          {this.props.isEditNotes && <button className='back' onClick={this.backButton}>
            <img src={config.urls.media + 'arrow-left.svg'} />
            {config.translations.notes.back_label_btn}
          </button>}
        </div>}
        <div className='note-body' ref={noteBody => (this.noteRef = noteBody)} style={{'max-height': (config.notes_height_limit * 56)}}>
          {this.props.notesData.map(i => (
            this.props.editNoteId === i.id
              ? <AddNote
                customers={this.props.customers}
                loaderDel={this.props.loaderDel}
                setDescription={this.setDescription}
                letsScroll={this.letsScroll}
                description={this.state.description}
                handleIncrementTime={this.handleIncrementTime}
                handleDecrementTime={this.handleDecrementTime}
                cancelSearch={this.cancelSearch}
                loader={this.props.loader}
                selectedValue={this.state.selectedValue}
                setDurationValues={this.setDurationValues}
                selectedValueLable={this.state.selectedValueLable}
                switch={this.state.switch}
                reminderDate={this.state.reminderDate}
                time={this.state.time}
                setSelectValues={this.setSelectValues}
                isReminderEdit={this.state.isReminderEdit}
                activateSwitch={this.activateSwitch}
                noteReplace={this.props.noteReplace}
                delete
                deleteNote={this.deleteNote}
                submit={this.update}
              />
              : <div key={i.id} className='note-list '>
                <div className='left-side'>
                  <div className='date'>
                    <span className='notes-list-date'>{i.reminder_date ? formatDate(i.reminder_date) : formatDate(i.date)}</span>
                    {i.reminder_date && <div className='notes-list-reminder'>
                      <img src={config.urls.media + 'ic_notifications_active.svg'} />
                    </div>}
                  </div>
                  <p className={'notes-list-desc ' + (i.reminder_date ? 'rem_true' : 'rem_false')}
                    onClick={this.props.flag ? () => this.showFullNote(i, i.id) : () => {}}
                    id={i.id}>
                    {i.text}
                  </p>
                </div>
                <div className='right-side'>
                  <img src={config.urls.media + 'ic_edit_stroke.svg'}
                    onClick={this.props.flag ? () => this.replace(i, i.id) : () => {}}
                  />
                </div>
              </div>
          ))}
        </div>
        {this.props.newEditNotes && this.props.isEditNotes && 
        <AddNote
          customers={this.props.customers}
          loader={this.props.loader}
          setDescription={this.setDescription}
          description={this.state.description}
          handleIncrementTime={this.handleIncrementTime}
          handleDecrementTime={this.handleDecrementTime}
          cancelSearch={this.cancelSearch}
          selectedValue={this.state.selectedValue}
          selectedValueLable={this.state.selectedValueLable}
          switch={this.state.switch}
          time={this.state.time}
          setSelectValues={this.setSelectValues}
          isReminderEdit={this.state.isReminderEdit}
          activateSwitch={this.activateSwitch}
          noteReplace={this.props.noteReplace}
          note_id={this.state.note_id}
          submit={this.save}
        />}
        {!this.props.newEditNotes && <div className={'note-footer ' + ((this.props.isEditNotes || this.props.noteReplace || this.props.notesData.length > 0) ? 'bot-border' : 'top-border')} onClick={this.openAddForm}>
          <label>{config.translations.notes.add_note_label}</label>
          <img src={config.urls.media + 'c_add_stroke.svg'} />
        </div>}
      </div>
    )
  }
}
