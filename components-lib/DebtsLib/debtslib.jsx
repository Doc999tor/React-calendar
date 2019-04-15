import './debtslib.styl'

export default class Debts extends React.Component {
  state = {
    flag: false,
    debtReplace: false,
    description: '',
    debtEdit: this.props.customersDebts ? this.props.activateDebt : false,
    total_debt: 0,
    debt: 0,
    debt_step: 10
  }
  save = () => {
    let id = Math.floor(Math.random() * 100) + 1
    this.setState({ debtEdit: false, debtReplace: false, add_client_id: id }, () =>
      this.props.saveDebt(this.state.debt, this.state.description, this.state.add_client_id && this.state.add_client_id))
  }
  upd = () => {
    this.setState({ debtEdit: false, debtReplace: false })
    if (this.props.customersDebts) {
      this.props.updateDebt(this.state.debt, this.state.description, this.state.debt_id)
    } else {
      this.props.updateDebt(this.state.debt, this.state.description, this.state.add_client_id)
    }
  }
  del = () => {
    this.setState({ debtEdit: false, debtReplace: false })
    this.props.deleteDebt(this.props.customersDebts ? this.state.debt_id : this.state.add_client_id)
  }
  replace = (i, key) => {
    this.setState({
      debtReplace: true,
      debtEdit: true,
      description: i.desc,
      debt: i.sum,
      debt_id: i.id,
      add_client_id: i.id,
      key
    })
  }
  addDebt = () => {
    this.setState({
      debtEdit: !this.state.debtEdit,
      debt: '0',
      description: ''
    }, () => this.props.editDebt(this.state.debtEdit))
  }
  backButton = () => {
    this.setState({
      sum: this.state.debt,
      desc: this.state.description,
      debtEdit: false,
      debtReplace: false
    }, () => this.props.hiddenEmptyDepts ? this.props.hiddenEmptyDepts() : this.props.editDebt(this.state.debtEdit))
  }
  delDesc = () => {
    this.setState({
      description: ''
    })
  }
  handleIncrementDebt = () => {
    this.setState(prevState => ({
      debt: +prevState.debt + this.state.debt_step
    }), () => this.props.getDebt(this.state.debt))
  }
  handleDecrementTime = () => {
    if (+this.state.debt > 0) {
      this.setState(prevState => ({
        debt: +prevState.debt - this.state.debt_step
      }), () => this.props.getDebt(this.state.debt))
    }
  }
  price = () => {
    let arrDebts = this.props.debtsData.map(i => i.sum)
    let totalDebt = (arrDebts.length !== 0) && arrDebts.reduce((sum, item) => {
      return sum + item
    })
    return totalDebt
  }
  render () {
    let totalPrice = this.price()
    const sortDebts = this.props.debtsData.sort((a, b) => moment(b.date) - moment(a.date))
    return (
      <div id='debts'>
        {(this.state.debtEdit || this.props.debtsData.length > 0) && <div className='debt-header'>
          <div className='header-text'>{config.translations.debts}
            <div className='total-debts-wrap'>{totalPrice && `${config.data.currency} ${totalPrice}`}</div>
          </div>
          {this.state.debtEdit &&
          <div className='btn-header' onClick={this.backButton}>
            <div className='btn-header-wrap'><img src={config.urls.media + 'arrow-left.svg'} /></div>
            <p>{config.translations.back}</p>
          </div>}
        </div>}
        <div className={this.state.debtEdit ? 'debt-active' : 'hidden'}>
          <div className='edit'>
            <div className='edit-debt-head'>
              <label>{config.translations.add_new_debt}</label>
              <div className='count'>
                <div className='ink' onClick={this.handleDecrementTime}>
                  <img src={config.urls.media + 'minus.svg'} />
                </div>
                <div className='currency-debt'>{config.data.currency}</div>
                <input className='count-input'
                  type='number'
                  value={this.state.debt} 
                  onChange={e => this.setState({ debt: +e.target.value }, () => this.props.getDebt(this.state.debt))}
                  onFocus={e => { if (toString(e.target.value) === '0') e.target.value = '' }}
                  onBlur={e => { if (toString(e.target.value) === '') e.target.value = '0' }} />
                <div className='ink' onClick={this.handleIncrementDebt}>
                  <img src={config.urls.media + 'plus.svg'} />
                </div>
              </div>
            </div>
            <label>{config.translations.description_debts}</label>
            <div className='description'>
              <input className='description-input' type='text' value={this.state.description}
                onChange={e => this.setState({ description: e.target.value }, () => this.props.getDesc(this.state.description))} 
                placeholder={config.translations.description_debt} 
                autoFocus />
              <div className='btn-desc-del' onClick={this.delDesc}>
                <img src={config.urls.media + 'butn-not.svg'} />
              </div>
            </div>
            <div className='actions'>
              {/* <button onClick={this.state.debtReplace ? this.update : this.submit}>{config.translations.save}</button> */}
              <div className='del-debts' onClick={() => this.del()} >
                <img src={config.urls.media + 'trash-debts.svg'} />
                <p>{config.translations.delete}</p>
              </div>
              <div className='button-apply' onClick={this.state.debtReplace ? this.upd : this.save}>
                <img src={config.urls.media + 'apply.svg'} />
                <p>{config.translations.success}</p>
              </div>
              {/* {this.props.rights.debts.delete &&
              <img className='debt-list-delete' src={config.urls.media + 'add.svg'} onClick={() => this.delete(i.id, k)} />} */}
            </div>
          </div>
        </div>
        <div className='debt-body'>
          {sortDebts.map((i, k) => (
            <div key={k} className={this.state.debtReplace ? 'debt-list' : 'debt-list'}>
              <div className='left-side'>
                <span className='debt-list-date'>{i.date}</span>
                <div className='debt-list-name'>
                  <label className='currency'>{i.sum} {config.data.currency}</label>
                  {i.desc && <div className='debt-list-desc'>{i.desc}</div>}
                </div>
              </div>
              <div className='right-side'>
                <img src={config.urls.media + 'ic_edit_stroke.svg'}
                  onClick={!this.state.flag ? () => this.replace(i, k) : () => { }}
                />
              </div>
            </div>
          ))}
        </div>
        <div onClick={this.addDebt} className={this.state.debtEdit ? 'debt-footer' : 'debt-footer'}>
          <span className='span-edit'>{config.translations.add_debt}</span>
          <img src={config.urls.media + 'c_add_stroke.svg'} />
        </div>
        {/* <Line /> */}
      </div>
    )
  }
}