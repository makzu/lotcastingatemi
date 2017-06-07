import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { signup } from '../../ducks/actions.js'

// TODO: Proper error handling
class SignupPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        email: '',
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
    return <div>
      <h1>sign up page</h1>
      <div>
        <TextField name="email" type="email"
          floatingLabelText="E-Mail Address"
          value={ this.state.credentials.email }
          onChange={ this.onChange }
        />
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
      </div>
      <RaisedButton label="Create Account" onClick={ this.onSubmit } />
    </div>
  }
}
SignupPage.propTypes = {
  signup: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (credentials) => {
      dispatch(signup(credentials))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignupPage)
