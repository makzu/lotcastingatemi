import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import ChronicleDetailsPage from '@lca/components/chronicles/DetailsPage.tsx'
import ChronicleDashboard from '@lca/components/chronicles/index.tsx'
import CombatDashboard from '@lca/components/combat/index.tsx'
import { fetchChronicle } from '@lca/ducks/actions'
import {
  fetchChronicleBattlegroups,
  fetchChronicleCharacters,
  fetchChronicleQcs,
} from '@lca/ducks/entities/chronicle'
import { isChronicleLoaded } from '@lca/selectors'

type ExposedProps = {
  match: { params: { chronicleId: number } }
}
type Props = ExposedProps & {
  isLoaded: boolean
  fetchChronicle: Function
}

class ChronicleWrapper extends React.Component<Props> {
  fetchStuff = () => {
    if (!this.props.isLoaded) {
      this.props.fetchChronicle(this.props.match.params.chronicleId)
      this.props.fetchChronicleCharacters(this.props.match.params.chronicleId)
      this.props.fetchChronicleQcs(this.props.match.params.chronicleId)
      this.props.fetchChronicleBattlegroups(this.props.match.params.chronicleId)
    }
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

export default connect(mapStateToProps, {
  fetchChronicle,
  fetchChronicleCharacters,
  fetchChronicleQcs,
  fetchChronicleBattlegroups,
})(ChronicleWrapper)
