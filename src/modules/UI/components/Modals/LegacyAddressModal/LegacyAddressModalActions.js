// @flow

import { Actions } from 'react-native-router-flux'

import type { Dispatch, GetState } from '../../../../ReduxTypes.js'

export const PREFIX = 'LEGACY_ADDRESS_MODAL/'

export const LEGACY_ADDRESS_SCANNED = PREFIX + 'LEGACY_ADDRESS_SCANNED'
export const legacyAddressScanned = () => ({
  type: LEGACY_ADDRESS_SCANNED
})

export const DISMISS_MODAL = PREFIX + 'DISMISS_MODAL'
export const dismissModal = () => ({
  type: DISMISS_MODAL
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})

export const confirmLegacyAddress = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const parsedUri = state.ui.scenes.scan.parsedUri
  Actions.sendConfirmation({ parsedUri })
}
