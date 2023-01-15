// @flow
import * as React from 'react'
import Typography from '@mui/material/Typography'

import { sample } from 'utils'

const errorNames = [
  'Easily-Overlooked Error Method',
  'Friendship With Errors Approach',
  'Heaven Thunder Error',
  'Keen Error and Bug Technique',
  'One Error, Two Bugs',
  'Error-mental Bolt Attack',
  'Wind-Carried Bugs',
  'Hybrid Error Transformation',
  'Crimson Bug Mantle',
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
          <Typography variant="h6">{sample(errorNames)}</Typography>
          <Typography>Something went wrong.</Typography>
          <Typography>{error && error.message}</Typography>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
