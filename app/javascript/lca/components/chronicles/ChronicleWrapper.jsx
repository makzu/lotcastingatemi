// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import ChronicleDashboard from 'components/chronicles/index.jsx'
import ChronicleDetailsPage from 'components/chronicles/DetailsPage.jsx'
import CombatDashboard from 'components/combat/index.jsx'
import withRouter from 'containers/withRouter'
import { fetchChronicle } from 'ducks/actions'
import { isChronicleLoaded } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  params: { id: number },
}
type Props = ExposedProps & {
  isLoaded: boolean,
  fetchChronicle: Function,
}

class ChronicleWrapper extends Component<Props> {
  fetchStuff = () => {
    if (!this.props.isLoaded) this.props.fetchChronicle(this.props.params.id)
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
        <Route path="/chronicles/:id/combat">
          <CombatDashboard />
        </Route>
        <Route path="/chronicles/:id/details">
          <ChronicleDetailsPage />
        </Route>
        <Route path="/chronicles/:id">
          <ChronicleDashboard />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  isLoaded: isChronicleLoaded(state, props.params.id),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  fetchChronicle,
})

export default withRouter(enhance(ChronicleWrapper))
