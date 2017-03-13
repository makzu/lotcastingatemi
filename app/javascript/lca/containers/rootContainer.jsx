import React from 'react'
import { Provider } from 'react-redux'

import CharacterSheet from '../components/characterSheet.jsx'
import LcaHeader from '../components/header.jsx'
import LcaFooter from '../components/footer.jsx'

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = this.props.store

    return (
      <Provider store={ store }>
        <div>
          <LcaHeader />
          <CharacterSheet id={1} />
          <LcaFooter />
        </div>
      </Provider>
    )
  }
}

export default RootContainer
