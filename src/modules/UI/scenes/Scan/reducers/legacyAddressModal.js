// @flow

import type { Action } from '../../../../ReduxTypes.js'

const initialState = {
  isActive: false,
  currencyName: null
}

type ActiveState = {
  isActive: true,
  currencyName: string
}
type InactiveState = {
  isActive: false,
  currencyName: null
}
type State = ActiveState | InactiveState
export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATED: {
      return {
        ...state,
        isActive: true,
        // $FlowFixMe
        currencyName: action.data.currencyName
      }
    }
    case DEACTIVATED: {
      return {
        ...state,
        isActive: false
      }
    }
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}

export const mapActions = (reducer) => (state, action) => {
  if (action.type === 'LEGACY_ADDRESS_DETECTED') {
    return reducer(state, activated())
  }
}
