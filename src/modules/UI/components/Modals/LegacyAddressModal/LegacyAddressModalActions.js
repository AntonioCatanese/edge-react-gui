// @flow

import type { EdgeParsedUri } from 'edge-core-js'
import { Actions } from 'react-native-router-flux'

import type { Dispatch, GetState } from '../../../../ReduxTypes.js'

export const PREFIX = 'LEGACY_ADDRESS_MODAL/'

export const LEGACY_ADDRESS_SCANNED = PREFIX + 'LEGACY_ADDRESS_SCANNED'
export const legacyAddressScanned = (parsedUri: EdgeParsedUri, currencyName: string) => ({
  type: LEGACY_ADDRESS_SCANNED,
  data: {
    parsedUri,
    currencyName
  }
})

export const DISMISS_MODAL = PREFIX + 'DISMISS_MODAL'
export const dismissModal = () => ({
  type: DISMISS_MODAL
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})

export const confirmLegacyAddress = (parsedUri: EdgeParsedUri) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(dismissModal())
  const state = getState()
  // const parsedUri = state.
  Actions.sendConfirmation({ parsedUri })
}
