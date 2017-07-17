import { merge } from 'lodash'
import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'

import * as schemas from './_schemas.js'
import { callApi } from '../../utils/api.js'

export const CHN_FETCH =         'lca/chronicle/FETCH'
export const CHN_FETCH_SUCCESS = 'lca/chronicle/FETCH_SUCCESS'
export const CHN_FETCH_FAILURE = 'lca/chronicle/FETCH_FAILURE'

export default function reducer(state, action) {
  const _entities = action.payload != undefined ? action.payload.entities : undefined

  switch(action.type) {
  case CHN_FETCH_SUCCESS:
    return {
      ...state,
      players:      merge({ ...state.players      }, _entities.players      ),
      characters:   merge({ ...state.characters   }, _entities.characters   ),
      merits:       merge({ ...state.merits       }, _entities.merits       ),
      weapons:      merge({ ...state.weapons      }, _entities.weapons      ),
      charms:       merge({ ...state.charms       }, _entities.charms       ),
      spells:       merge({ ...state.spells       }, _entities.spells       ),
      qcs:          merge({ ...state.qcs          }, _entities.qcs          ),
      qc_merits:    merge({ ...state.qc_merits    }, _entities.qcMerits     ),
      qc_charms:    merge({ ...state.qc_charms    }, _entities.qcCharms     ),
      qc_attacks:   merge({ ...state.qc_attacks   }, _entities.qcAttacks    ),
      battlegroups: merge({ ...state.battlegroups }, _entities.battlegroups ),
      chronicles:   merge({ ...state.chronicles   }, _entities.chronicles   ),
    }
  default:
    return state
  }
}

export function fetchChronicle(id) {
  return callApi({
    endpoint: `/api/v1/chronicles/${id}`,
    method: 'GET',
    types: [
      CHN_FETCH,
      {
        type: CHN_FETCH_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => normalize(json, schemas.chronicle))
        }
      },
      CHN_FETCH_FAILURE
    ]
  })
}
