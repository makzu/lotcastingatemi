import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { signup } from '../../ducks/actions.js'

function UsernameErrorBlock(props) {
  const errors = props.error.map((e) => {
    switch (e.error) {
    case 'invalid':
      return <span>Username is invalid.</span>
    default:
      return <span>Generic error</span>
    }
  })
  return <div>{ errors }</div>
}
UsernameErrorBlock.propTypes = {
  error: PropTypes.arrayOf(PropTypes.object)
}

function PasswordErrorBlock() {
  // TODO: detect this client-side before sending request to server
  return <div>Password and password confirmation do not match</div>
}

// TODO: Proper error handling
class SignupPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: '',
        password_confirmation: '',
      },
      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    const credentials = this.state.credentials
    credentials[e.target.name] = e.target.value
    return this.setState({ credentials: credentials })
  }

  onSubmit() {
    let errors = []
    if (this.state.password !== this.state.password_confirmation) {
      errors.push('Password and Password confirmation have to match.')
      return
    }
    this.props.signup(this.state.credentials)
  }

  render() {
    const { authenticated, error } = this.props

    if (authenticated) {
      return <Redirect to={{ pathname: '/' }}/>
    }

    return <div className="page">
      <h1>sign up page</h1>
      <div>
        <TextField name="username"
          floatingLabelText="User Name"
          value={ this.state.credentials.username }
          onChange={ this.onChange }
        />
        { error && error.email && <UsernameErrorBlock error={ error.email } /> }
      </div>
      <div>
        <TextField name="password" type="password"
          floatingLabelText="Password"
          value={ this.state.credentials.password }
          onChange={ this.onChange }
        />
      </div>
      <div>
        <TextField name="password_confirmation" type="password"
          floatingLabelText="Confirm Password"
          value={ this.state.credentials.password_confirmation }
          onChange={ this.onChange }
        />
        { error && error.password_confirmation && <PasswordErrorBlock error={ error.password_confirmation } />

        }
      </div>
      <RaisedButton label="Create Account" onClick={ this.onSubmit } />
    </div>
  }
}
SignupPage.propTypes = {
  authenticated: PropTypes.bool,
  error: PropTypes.object,
  fetching: PropTypes.bool,
  signup: PropTypes.func,
}

function mapStateToProps(state) {
  const { authenticated, fetching, error } = state.session

  return {
    authenticated,
    fetching,
    error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (credentials) => {
      dispatch(signup(credentials))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
