// @flow

import type { EdgeParsedUri } from 'edge-core-js'

import type { Action } from '../../../../ReduxTypes.js'

import { LEGACY_ADDRESS_SCANNED, DISMISS_MODAL, RESET } from './indexLegacyAddressModal.js'

const initialState = {
  isVisible: false,
  parsedUri: null
}

type State = {
  isVisible: boolean,
  parsedUri: EdgeParsedUri | null
}
export const LegacyAddressModalReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LEGACY_ADDRESS_SCANNED: {
      return {
        ...state,
        isVisible: true,
        // $FlowFixMe
        parsedUri: action.data.parsedUri
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
