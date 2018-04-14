// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { sample } from 'lodash'
import Typography from 'material-ui/Typography'

const errorNames = [
  'Easily-Overlooked Error Method',
  'Friendship With Errors Approach',
  'Error-mental Bolt Attack',
  'Heaven Thunder Error',
  'Keen Error and Bug Technique',
  'One Error, Two Bugs',
]

class ErrorBoundary extends React.Component<
  { children: React.Node},
  { error?: Object, errorInfo?: Object }
> {
  constructor(props: Object) {
    super(props)
    this.state = { error: undefined, errorInfo: undefined }
  }

  componentDidCatch(error: Object, info: Object) {
    this.setState({ error: error, errorInfo: info })
  }

  render() {
    const { error } = this.state
    if (error) {
      return <div>
        <Typography variant="title">{ sample(errorNames) }</Typography>
        <Typography>{ error && error.message }</Typography>
      </div>
    }
    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
