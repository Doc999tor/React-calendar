import {default as Modal} from '../Modal/Modal.jsx'
import {default as validatePhone} from '../validate-phone.js'
// import {clientPostService} from './node_modules/project-services'
import './modal-phone-lib.styl'

export default class PhoneModal extends React.Component {
  state = {
    inputValue: '',
    deniedPhone: false
  }

  delInfo = () => {
    this.setState({ isValidation: '', inputValue: '' })
  }

  back = () => {
    this.setState({ isValidation: '', inputValue: '' })
    if (this.props.blur) {
      this.props.deniedPhone()
      this.props.hideModal()
    } else {
      this.props.closeModal ? this.props.closeModal() : this.props.cancelSave()
    }
  }

  normalizePhones = phones => {
    if (phones && phones.length) {
      let normalizeArray = phones.map((phone, index) => ({ id: index, number: phone.number || phone }))
      return this.props.getPhone(normalizeArray)
    } else {
      return []
    }
  }

  save = () => {
    if (this.props.getPhone) {
      let arrPhones = []
      arrPhones.push(this.state.inputValue)
      this.normalizePhones(arrPhones)
      this.props.cancelSave()
    }
    else if (this.props.reminders) this.props.create(this.state.inputValue)
    else if (this.props.blur) {
      config.data[config.urls.fields.phone] = validatePhone(this.state.inputValue) ? `[${JSON.stringify(this.state.inputValue)}]` : null
      this.props.getPhoneNumber(this.state.inputValue)
      this.props.hideModal()
    } else {
      config.data[config.urls.fields.phone] = validatePhone(this.state.inputValue) ? `[${JSON.stringify(this.state.inputValue)}]` : null
      this.props.create()
    }
    this.setState({ isValidation: '', inputValue: '' })
    if (this.state.isValidation) {
      this.props.cancel && this.props.cancel()
    } else this.props.cancelSave ? this.props.cancelSave() : this.props.closeModal()
  }

  checkPhone = e => {
    this.setState({ inputValue: e, isValidation: '' })
    if (e !== '' && e.length >= 3) validatePhone(e) ? this.setState({isValidation: true}) : this.setState({isValidation: false})
  }

  skip = () => {
    if (this.props.blur) {
      this.props.hideModal()
    } else if (this.props.addClient && !this.props.blur) {
      this.save()
    } else {
      this.props.cancelSave ? this.props.cancelSave() : this.props.closeModal()
    }
    this.setState({ inputValue: '', isValidation: '' })
  }

  componentDidUpdate = () => this.props.isVisibleModalPhone && this.refs.modal_phone.focus()
  render () {
    return (
      <Modal show={this.props.visibleModal} onHide={this.back}>
        <div className='phone-modal-body'>
          <img className={'close-bnt ' + (config.isRTL ? 'rtl-phone-modal' : 'ltr-phone-modal')} onClick={this.back} src={config.urls.media + 'btn-not.svg'} />
          <div className='phone-top'>
            <div className='picture'>
              <img src={config.urls.media + 'phone-off.svg'} />
            </div>
            <div className='text-wrap'><p>{this.props.text.not_found_title}</p></div>
          </div>
          <div className='phone-bot'>
            <div className='phone-bot-text'>
              <p>{this.props.text.enter_phone_number}</p>
            </div>
            <div className='phone-input-wrap'>
              <div className='input-wrap'>
                <input
                  type='tel'
                  ref='modal_phone'
                  value={this.state.inputValue}
                  placeholder={this.props.text.phone_number}
                  onChange={e => { this.checkPhone(e.target.value) }}
                />
                {this.state.isValidation &&
                <div className='trueValidation'>
                  <img src={config.urls.media + 'trueValid.svg'} />
                </div>}
                {(this.state.inputValue && !this.state.isValidation) &&
                  <div className='del-info' onClick={this.delInfo}>
                    <img src={config.urls.media + 'btn-not.svg'} />
                  </div>}
              </div>
            </div>
          </div>
        </div>
        <div className='phone-modal-footer'>
          <button className='skip'
            onClick={this.skip}>
            <p>{this.props.text.cancel_modal}</p>
            <svg className={`img_skip ${(config.isRTL || config.data.isRTL) && 'right'}`}>
              <use xlinkHref={config.urls.media + 'sprite.svg#skip'} />
            </svg>
          </button>
          <button className={(!validatePhone(this.state.inputValue) || this.state.inputValue?.length < 3 ? 'send_disabled' : 'send_active')}
            disabled={!validatePhone(this.state.inputValue) || this.state.inputValue?.length < 3}
            onClick={this.save}>
            <p>{this.props.text.save}</p>
            <svg className={!validatePhone(this.state.inputValue) || this.state.inputValue ?.length < 3 ? 'img_save_disabled' : 'img_save_active'}>
              <use xlinkHref={config.urls.media + 'sprite.svg#save'} />
            </svg>
          </button>
        </div>
      </Modal>
    )
  }
}
