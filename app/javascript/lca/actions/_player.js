import fetch from 'isomorphic-fetch'
import * as c from '../utils/actionNames'

function requestHeaders() {
  return new Headers({
    'Content-Type': 'application/json',
    'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
  })
}

function requestPlayer() {
  return {
    type: c.REQUEST_PLAYER,
  }
}

function receivePlayer(json) {
  return {
    type: c.RECEIVE_PLAYER,
    player: json
  }
}

// TODO clean this up and do error handling
export function fetchPlayer() {
  return function (dispatch) {
    dispatch(requestPlayer())

    return fetch('/api/v1/players', {
      method: 'GET',
      headers: requestHeaders()
    })
      .then(response => response.json())
      .then(json =>
        dispatch(receivePlayer(json))
      )
  }
}
