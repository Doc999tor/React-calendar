import './debtslib.styl'

export default class Debts extends React.Component {
  state = {
    flag: false,
    flag_debt: true,
    description: '',
    total_debt: 0,
    debt: 0,
    debt_step: 10
  }

  save = () => this.props.saveDebt()

  upd = () => {
    this.setState({ debtEdit: false, debtReplace: false, debt_id: '' })
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
    if (this.props.debtEdit && this.props.newEditDebt && this.props.debtReplace) {
      this.backButton()
    } else {
      this.props.editAction(i.id)
      this.setState({
        description: i.desc,
        debt: i.sum,
        debt_id: i.id,
        add_client_id: i.id,
        key
      }, () => this.handleWidth())
    }
  }

  addDebt = () => {
    if (this.props.debtEdit && !this.props.newEditDebt && this.props.debtReplace) {
      this.backButton()
    } else {
      this.setState({
        debt: '0',
        description: ''
      }, () => {
        this.props.allowActions()
        this.props.hiddenEmptyDepts && this.props.hiddenEmptyDepts()
      })
    }
  }

  backButton = () => {
    this.setState({
      desc: '',
      debt: '0'
    }, () => {
      this.props.cancelActions()
      this.props.hiddenEmptyDepts && this.props.hiddenEmptyDepts()
    })
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
    this.handleWidth()
  }

  handleDecrementTime = () => {
    if (+this.state.debt > 0) {
      this.setState(prevState => ({
        debt: +prevState.debt - this.state.debt_step
      }), () => this.props.getDebt(this.state.debt))
    }
    this.handleWidth()
  }

  price = () => {
    let arrDebts = this.props.debtsData.map(i => +i.sum)
    let totalDebt = (arrDebts.length !== 0) && arrDebts.reduce((sum, item) => {
      return sum + item
    })
    return totalDebt
  }

  handleWidth = () => {
    let width = document.getElementById('count-input').scrollWidth
    document.getElementById('count-input').setAttribute('style', 'width:' + width + 'px')
  }

  changeInput = e => {
    this.setState({ debt: +e.target.value }, () => this.props.getDebt(this.state.debt))
    this.handleWidth()
  }
  changeDescription = e => this.setState({ description: e.target.value }, () => this.props.getDesc(this.state.description))

  showFullDebt = (i, id) => {
    let a = document.getElementById(id)
    a.classList.toggle('full-debt')
  }

  render () {
    let totalPrice = this.price()
    const sortDebts = this.props.debtsData.sort((a, b) => moment(b.date) - moment(a.date))
    return (
      <div id='debts'>
        {(this.props.debtEdit || this.props.debtsData.length > 0) && <div className='debt-header'>
          <div className='header-text'>
            {config.translations.debts.title}
            {totalPrice && <div className='total-debts-wrap'><span>{config.data.currency}</span>{totalPrice}</div>}
          </div>
          {this.props.debtEdit &&
          <div className='btn-header' onClick={this.backButton}>
            <div className='btn-header-wrap'><img src={config.urls.media + 'arrow-left.svg'} /></div>
            <p>{config.translations.debts.back_label_btn}</p>
          </div>}
        </div>}
        {this.props.newEditDebt && this.props.debtEdit &&
          <div className='debt-active'>
            <div className='edit'>
              <div className='edit-debt-head'>
                <label>{config.translations.notes.edit_sum_title}</label>
                <div className='count'>
                  <div className='ink' onClick={this.handleDecrementTime}>
                    <img src={config.urls.media + 'minus.svg'} />
                  </div>
                  <div className='currency-debt'>{config.data.currency}</div>
                  <input className='count-input'
                    id='count-input'
                    type='number'
                    value={this.state.debt}
                    onChange={this.changeInput}
                    onFocus={e => { if (e.target.value == '0') e.target.value = '' }}
                    onBlur={e => { if (e.target.value == '') e.target.value = 0 }} />
                  <div className='ink' onClick={this.handleIncrementDebt}>
                    <img src={config.urls.media + 'plus.svg'} />
                  </div>
                </div>
              </div>
              <label>{config.translations.debts.subtitle}</label>
              <div className='description'>
                <input className='description-input' autoFocus type='text' id='input' value={this.state.description}
                  onChange={this.changeDescription}
                  placeholder={config.translations.debts.placeholder}
                />
                <div className='btn-desc-del' onClick={this.delDesc}>
                  <img src={config.urls.media + 'butn-not.svg'} />
                </div>
              </div>
              <div className='actions'>
                <div className='button-apply' onClick={this.save}>
                  <div className={'img-wrap' + (!this.props.loader ? '' : ' spin')}>{!this.props.loader
                    ? <svg className='img_apply'>
                      <use xlinkHref={config.urls.media + 'sprite.svg#apply'} />
                    </svg>
                    : <svg className='img_refresh'>
                      <use xlinkHref={config.urls.media + 'sprite.svg#refresh'} />
                    </svg>}
                  </div>
                  <p>{config.translations.debts.success_btn}</p>
                </div>
              </div>
            </div>
          </div>}
        <div className='debt-body'>
          {sortDebts.map((i, k) => (
            this.props.editDebtId === i.id
              ? <div className={this.props.debtEdit ? 'debt-active' : 'hidden'}>
                <div className='edit'>
                  <div className='edit-debt-head'>
                    <label>{config.translations.notes.edit_sum_title}</label>
                    <div className='count'>
                      <div className='ink' onClick={this.handleDecrementTime}>
                        <img src={config.urls.media + 'minus.svg'} />
                      </div>
                      <div className='currency-debt'>{config.data.currency}</div>
                      <input className='count-input'
                        type='number'
                        id='count-input'
                        value={this.state.debt}
                        onChange={this.changeInput}
                        onFocus={e => { if (e.target.value == '0') e.target.value = '' }}
                        onBlur={e => { if (e.target.value == '') e.target.value = 0 }} />
                      <div className='ink' onClick={this.handleIncrementDebt}>
                        <img src={config.urls.media + 'plus.svg'} />
                      </div>
                    </div>
                  </div>
                  <label>{config.translations.debts.subtitle}</label>
                  <div className='description'>
                    <input className='description-input' autoFocus type='text' id='input' value={this.state.description}
                      onChange={this.changeDescription}
                      placeholder={config.translations.debts.placeholder}
                    />
                    <div className='btn-desc-del' onClick={this.delDesc}>
                      <img src={config.urls.media + 'butn-not.svg'} />
                    </div>
                  </div>
                  <div className='actions'>
                    {this.props.debtReplace && <div className='del-debts' onClick={this.del} >
                      <div className='button-apply' onClick={this.upd}>
                        <div className={'img-wrap' + (!this.props.loaderDel ? '' : ' spin')}>{!this.props.loaderDel
                          ? <img src={config.urls.media + 'trash-debts.svg'} />
                          : <svg className='img_delete'>
                            <use xlinkHref={config.urls.media + 'sprite.svg#refresh'} />
                          </svg>}
                        </div>
                      </div>
                      <p>{config.translations.debts.del_btn}</p>
                    </div>}
                    <div className='button-apply' onClick={this.upd}>
                      <div className={'img-wrap' + (!this.props.loader ? '' : ' spin')}>{!this.props.loader
                        ? <svg className='img_apply'>
                          <use xlinkHref={config.urls.media + 'sprite.svg#apply'} />
                        </svg>
                        : <svg className='img_refresh'>
                          <use xlinkHref={config.urls.media + 'sprite.svg#refresh'} />
                        </svg>}
                      </div>
                      <p>{config.translations.debts.success_btn}</p>
                    </div>
                  </div>
                </div>
              </div>
              : <div key={k} className={this.props.debtReplace ? 'debt-list' : 'debt-list'}>
                <div className='left-side'>
                  <span className={'debt-list-date ' + ((config.isRTL || config.data.isRTL) ? 'rtl-side' : '')}>{i.date}</span>
                  <div className='debt-list-name'>
                    <label className='currency'>{i.sum}{config.data.currency}</label>
                    {i.desc && <div className='debt-list-desc'>
                      <span onClick={() => this.showFullDebt(i, i.id)} id={i.id}>{i.desc}</span>
                    </div>}
                  </div>
                </div>
                <div className='right-side'>
                  <img src={config.urls.media + 'ic_edit_stroke.svg'}
                    onClick={() => this.replace(i, k)}
                  />
                </div>
              </div>
          ))}
        </div>
        {!this.props.newEditDebt && <div onClick={this.addDebt} className={'debt-footer ' + ((this.props.debtEdit || this.props.debtsData.length > 0) && 'bot-border')}>
          <span className='span-edit'>{config.translations.debts.add_debt_label}</span>
          <img src={config.urls.media + 'c_add_stroke.svg'} />
        </div>}
      </div>
    )
  }
}
