// @flow
import * as React from 'react'
import Typography from '@material-ui/core/Typography'

const errorNames = [
  'Easily-Overlooked Error Method',
  'Friendship With Errors Approach',
  'Error-mental Bolt Attack',
  'Heaven Thunder Error',
  'Keen Error and Bug Technique',
  'One Error, Two Bugs',
]
type Props = { children: React.Node }
type State = { error?: Object, errorInfo?: Object }
class ErrorBoundary extends React.Component<Props, State> {
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
      return (
        <div>
          <Typography variant="title">
            {errorNames[Math.floor(Math.random() * errorNames.length)]}
          </Typography>
          <Typography>Something went wrong.</Typography>
          <Typography>{error && error.message}</Typography>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
