import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ChronicleDashboard from 'components/chronicles/index.jsx'
import ChronicleDetailsPage from 'components/chronicles/DetailsPage.jsx'
import CombatDashboard from 'components/combat/index.jsx'
import { fetchChronicle } from 'ducks/actions'
import { isChronicleLoaded } from 'selectors'
import type { Enhancer } from 'utils/flow-types'
interface ExposedProps {
  match: {
    params: {
      chronicleId: number
    }
  }
}
type Props = ExposedProps & {
  isLoaded: boolean
  fetchChronicle: $TSFixMeFunction
}

class ChronicleWrapper extends React.Component<Props> {
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
        <Route
          path="/chronicles/:chronicleId/combat"
          component={CombatDashboard}
        />
        <Route
          path="/chronicles/:chronicleId/details"
          component={ChronicleDetailsPage}
        />
        <Route path="/chronicles/:chronicleId" component={ChronicleDashboard} />
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
