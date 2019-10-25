import { default as Modal } from 'project-components/Modal/Modal.jsx'
// import './incorrectMail.styl'

const IncorrectPhone = ({phone, onHide, show}) => (
  <Modal show={show} onHide={onHide}>
    <div className='modal-incorrect-phone'>
      <img className='modal-icon' src={config.urls.media + 'alert-octagon.svg'} />
      <label>{config.translations.personal_info_editing.title_incorrect_phone.replace('{phone_number}', phone)}</label>
    </div>
    <div className='modal-incorrect-phone-footer'>
      <button onClick={onHide} className='no-btn'>{config.translations.personal_info_editing.agree}</button>
    </div>
  </Modal>
)
export default IncorrectPhone