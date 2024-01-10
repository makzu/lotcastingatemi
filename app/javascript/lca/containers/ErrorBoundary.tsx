import * as React from 'react'
import Typography from '@material-ui/core/Typography'
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
interface Props {
  children: React.ReactNode
}
interface State {
  error?: Record<string, $TSFixMe>
  errorInfo?: Record<string, $TSFixMe>
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: undefined,
      errorInfo: undefined,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div>
          <Typography variant="h6">{sample(errorNames)}</Typography>
          <Typography>Something went wrong.</Typography>
          <Typography>{error?.message}</Typography>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
