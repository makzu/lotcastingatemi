import { Component } from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import ChronicleDashboard from 'components/chronicles/index'
import ChronicleDetailsPage from 'components/chronicles/DetailsPage'
import CombatDashboard from 'components/combat/index'
import withRouter from 'containers/withRouter'
import { fetchChronicle } from 'ducks/actions'
import { isChronicleLoaded } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

interface ExposedProps {
  params: { id: number }
}
type Props = ExposedProps & {
  isLoaded: boolean
  fetchChronicle: $TSFixMeFunction
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
      <Routes>
        <Route path="combat" element={<CombatDashboard />} />
        <Route path="details" element={<ChronicleDetailsPage />} />
        <Route path="*" element={<ChronicleDashboard />} />
      </Routes>
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
