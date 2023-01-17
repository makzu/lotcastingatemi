// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import ChronicleDashboard from 'components/chronicles/index.jsx'
import ChronicleDetailsPage from 'components/chronicles/DetailsPage.jsx'
import CombatDashboard from 'components/combat/index.jsx'
import { fetchChronicle } from 'ducks/actions'
import { isChronicleLoaded } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  match: { params: { chronicleId: number } },
}
type Props = ExposedProps & {
  isLoaded: boolean,
  fetchChronicle: Function,
}

class ChronicleWrapper extends Component<Props> {
  fetchStuff = () => {
    if (!this.props.isLoaded)
      this.props.fetchChronicle(this.props.match.params.chronicleId)
  }

  componentDidMount() {
    this.fetchStuff()
  }

  componentDidUpdate() {
    this.fetchStuff()
  }

  render() {
    return (
      <Switch>
        <Route path="/chronicles/:chronicleId/combat">
          <CombatDashboard />
        </Route>
        <Route path="/chronicles/:chronicleId/details">
          <ChronicleDetailsPage />
        </Route>
        <Route path="/chronicles/:chronicleId">
          <ChronicleDashboard />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  isLoaded: isChronicleLoaded(state, props.match.params.chronicleId),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  fetchChronicle,
})

export default enhance(ChronicleWrapper)
