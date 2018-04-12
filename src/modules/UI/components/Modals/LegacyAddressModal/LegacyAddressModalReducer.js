// @flow

import type { EdgeParsedUri } from 'edge-core-js'

import type { Action } from '../../../../ReduxTypes.js'

import { LEGACY_ADDRESS_SCANNED, DISMISS_MODAL, RESET } from './indexLegacyAddressModal.js'

const initialState = {
  isVisible: false,
  parsedUri: null,
  currencyName: null
}

type ActiveState = {
  isVisible: true,
  parsedUri: EdgeParsedUri,
  currencyName: string
}
type InactiveState = {
  isVisible: false,
  parsedUri: null,
  currencyName: null
}
type State = ActiveState | InactiveState
export const LegacyAddressModalReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LEGACY_ADDRESS_SCANNED: {
      return {
        ...state,
        isVisible: true,
        // $FlowFixMe
        parsedUri: action.data.parsedUri,
        // $FlowFixMe
        currencyName: action.data.currencyName
      }
    }
    case DISMISS_MODAL: {
      return {
        ...state,
        isVisible: false
      }
    }
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}
