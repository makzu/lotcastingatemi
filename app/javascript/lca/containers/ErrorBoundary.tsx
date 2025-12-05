import React from 'react'
import Typography from '@material-ui/core/Typography'

import { sample } from 'utils'

const errorNames = [
  'Bug-Body Technique',
  'Easily-Overlooked Error Method',
  'Friendship With Errors Approach',
  'Heaven Thunder Error',
  'Keen Error and Bug Technique',
  'One Error, Two Bugs',
  'Error-mental Bolt Attack',
  'Wind-Carried Bugs',
  'Hybrid Error Transformation',
  'Crimson Bug Mantle',
  'Shun the Smiling Error',
  'Pattern Error Touch',
  'Piston-Driven Megaton Error',
  'Devil-Bug Apotheosis',
  'By Bugs Recast',
]

type Props = { children: React.ReactNode }
type State = { error?: Error; errorInfo?: React.ErrorInfo }
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: undefined, errorInfo: undefined }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
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
