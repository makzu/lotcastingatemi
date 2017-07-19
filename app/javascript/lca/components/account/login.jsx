import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { loginAndFetch } from '../../ducks/actions.js'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = { open: false, credentials: { email: '', password: '' }}
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  onChange(e) {
    const credentials = this.state.credentials
    credentials[e.target.name] = e.target.value
    return this.setState({ credentials: credentials })
  }

  onSubmit() {
    this.props.login(this.state.credentials)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authenticated && nextProps.authenticated)
      this.setState({ open: false })
  }

  render() {
    const { handleOpen, handleClose, onChange, onSubmit } = this
    const { error } = this.props

    const actions = [
      <FlatButton
        key="login"
        label="Log In"
        onTouchTap={ onSubmit }
      />,
      <FlatButton
        key="close"
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]
    return <span>
      <FlatButton label="Log in" style={{ color: 'white' }} onClick={ handleOpen } />
      <Dialog
        title="Log in"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        { error &&
          <div>Error logging in</div>
        }
        <TextField name="email" floatingLabelText="e-mail" onChange={ onChange }
        />
        <br />
        <TextField name="password" type="password" floatingLabelText="password"
          onChange={ onChange }
        />
      </Dialog>
    </span>
  }
}
LoginForm.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  login: PropTypes.func
}

function mapStateToProps(state) {
  const { authenticated, fetching, error } = state.session

  return {
    authenticated, fetching, error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (credentials) => {
      dispatch(loginAndFetch(credentials))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
