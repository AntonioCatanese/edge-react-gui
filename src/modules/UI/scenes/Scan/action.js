// @flow

import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import * as UTILS from '../../../utils.js'
import { loginWithEdge } from '../../../../actions/EdgeLoginActions.js'
import { updateParsedURI } from '../../scenes/SendConfirmation/action.js'
import s from '../../../../locales/strings.js'

export const PREFIX = 'SCAN/'

// SCENE
export const SCENE_ENTERED = PREFIX + 'SCENE_ENTERED'
export const sceneEntered = () => ({
  type: SCENE_ENTERED
})

export const SCENE_EXITED = PREFIX + 'SCENE_EXITED'
export const sceneExited = () => ({
  type: SCENE_EXITED
})

// CAMERA
export const TORCH_BUTTON_PRESSED = PREFIX + 'TORCH_BUTTON_PRESSED'
export const torchButtonPressed = () => ({
  type: TORCH_BUTTON_PRESSED
})

export const BAR_CODE_SCANNED = PREFIX + 'BAR_CODE_SCANNED'
export const barcodeScanned = (data: string) => ({
  type: BAR_CODE_SCANNED,
  data: { data }
})

// ADDRESS_MODAL
export const ADDRESS_MODAL_ACTIVATED = PREFIX + 'ADDRESS_MODAL_ACTIVATED'
export const addressModalActivated = () => ({
  type: ADDRESS_MODAL_ACTIVATED
})

export const ADDRESS_MODAL_DEACTIVATED = PREFIX + 'ADDRESS_MODAL_DEACTIVATED'
export const addressModalDeactivated = () => ({
  type: ADDRESS_MODAL_DEACTIVATED
})

export const ADDRESS_MODAL_INPUT_CHANGED = PREFIX + 'ADDRESS_MODAL_INPUT_CHANGED'
export const addressModalInputChanged = (data: string) => ({
  type: ADDRESS_MODAL_INPUT_CHANGED,
  data: { data }
})

export const ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED = PREFIX + 'ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED'
export const addressModalConfirmButtonPressed = () => ({
  type: ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED
})

export const ADDRESS_MODAL_BACKDROP_PRESSED = PREFIX + 'ADDRESS_MODAL_BACKDROP_PRESSED'
export const addressModalBackdropPressed = () => ({
  type: ADDRESS_MODAL_BACKDROP_PRESSED
})

export const ADDRESS_MODAL_CANCEL_BUTTON_PRESSED = PREFIX + 'ADDRESS_MODAL_CANCEL_BUTTON_PRESSED'
export const legacyAddressCancelButtonPressed = () => ({
  type: ADDRESS_MODAL_CANCEL_BUTTON_PRESSED
})

// EDGE_LOGIN
export const EDGE_LOGIN_REQUESTED = PREFIX + 'EDGE_LOGIN_REQUESTED'
export const edgeLoginRequested = (uri: string) => ({
  type: EDGE_LOGIN_REQUESTED,
  data: { uri }
})

// LEGACY_ADDRESS_MODAL
export const LEGACY_ADDRESS_MODAL_ACTIVATED = PREFIX + 'LEGACY_ADDRESS_MODAL_ACTIVATED'
export const legacyAddressModalActivated = () => ({
  type: LEGACY_ADDRESS_MODAL_ACTIVATED
})

export const LEGACY_ADDRESS_MODAL_DEACTIVATED = PREFIX + 'LEGACY_ADDRESS_MODAL_DEACTIVATED'
export const legacyAddressModalDeactivated = () => ({
  type: LEGACY_ADDRESS_MODAL_DEACTIVATED
})

export const LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED'
export const legacyAddressModalConfirmButtonPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED
})

export const LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED'
export const legacyAddressModalBackdropPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED
})

export const LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED'
export const legacyAddressModalCancelPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED
})

// OPERATIONS
export const PARSE_URI_SUCCEEDED = PREFIX + 'PARSE_URI_SUCCEEDED'
export const parseUriSuceeded = (parsedUri: EdgeParsedUri) => ({
  type: PARSE_URI_SUCCEEDED,
  data: { parsedUri }
})

export const PARSE_URI_FAILED = PREFIX + 'PARSE_URI_FAILED'
export const parseUriFailed = (error: Error) => ({
  type: PARSE_URI_FAILED,
  data: { error }
})




















export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})

// ADDRESS_MODAL
export const TOGGLE_ADDRESS_MODAL_VISIBILITY = PREFIX + 'TOGGLE_ADDRESS_MODAL_VISIBILITY'
export const toggleAddressModal = () => ({
  type: TOGGLE_ADDRESS_MODAL_VISIBILITY
})

// CAMERA
export const ENABLE_SCAN = PREFIX + 'ENABLE_SCAN'
export const enableScan = () => {
  return {
    type: ENABLE_SCAN
  }
}
export const DISABLE_SCAN = PREFIX + 'DISABLE_SCAN'
export const disableScan = () => {
  return {
    type: DISABLE_SCAN
  }
}
export const TOGGLE_ENABLE_TORCH = PREFIX + 'TOGGLE_ENABLE_TORCH'
export const toggleEnableTorch = () => ({
  type: TOGGLE_ENABLE_TORCH
})

// LEGACY_ADDRESS_MODAL
export const LEGACY_ADDRESS_MODAL_PREFIX = 'LEGACY_ADDRESS_MODAL/'
export const LEGACY_ADDRESS_MODAL_DISPLAY = LEGACY_ADDRESS_MODAL_PREFIX + 'DISPLAY'
export const legacyAddressModalDisplay = (currencyName: string) => ({
  type: LEGACY_ADDRESS_MODAL_DISPLAY,
  data: { currencyName }
})
export const LEGACY_ADDRESS_MODAL_CONFIRM = LEGACY_ADDRESS_MODAL_PREFIX + 'CONFIRM'
export const legacyAddressModalConfirm = () => ({
  type: LEGACY_ADDRESS_MODAL_CONFIRM
})
export const LEGACY_ADDRESS_MODAL_DISMISS = LEGACY_ADDRESS_MODAL_PREFIX + 'DISMISS'
export const legacyAddressModalDismiss = () => ({
  type: LEGACY_ADDRESS_MODAL_DISMISS
})
export const LEGACY_ADDRESS_MODAL_RESET = LEGACY_ADDRESS_MODAL_PREFIX + 'RESET'
export const legacyAddressModalReset = () => ({
  type: LEGACY_ADDRESS_MODAL_RESET
})

// OPERATIONS
export const qrCodeScanned = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if (!state.ui.scenes.scan.scanEnabled) return

  dispatch(disableScan())
  // dispatch(qrCodeScanned(data))

  // EDGE LOGIN ///////////////////////////////////////////////////////////
  if (UTILS.isEdgeLogin(data)) {
    return dispatch(loginWithEdge(data))
  }

  const edgeWallet = state.core.wallets.byId[state.ui.wallets.selectedWalletId]
  let parsedURI
  try {
    parsedURI = WALLET_API.parseURI(edgeWallet, data) // eslint-disable-line no-var
  } catch (error) {
    // INVALID QRCODE ///////////////////////////////////////////////////////
    return Alert.alert(s.strings.fragment_send_send_bitcoin_unscannable, error.toString(), [
      { text: s.strings.string_ok, onPress: () => dispatch(enableScan()) }
    ])
  }
  // TOKEN ////////////////////////////////////////////////////////////////
  if (parsedURI.token) {
    // token URI, not pay
    const { contractAddress, currencyName, multiplier } = parsedURI.token
    const currencyCode = parsedURI.token.currencyCode.toUpperCase()
    const walletId = state.ui.wallets.selectedWalletId
    const wallet = state.ui.wallets.byId[walletId]
    let decimalPlaces = 18
    if (parsedURI.token && parsedURI.token.multiplier) {
      decimalPlaces = UTILS.denominationToDecimalPlaces(parsedURI.token.multiplier)
    }
    const parameters = {
      contractAddress,
      currencyCode,
      currencyName,
      multiplier,
      decimalPlaces,
      walletId,
      wallet,
      onAddToken: UTILS.noOp
    }

    return Actions.addToken(parameters)
  }

  // LEGACY ADDRESS ///////////////////////////////////////////////////////
  if (parsedURI.legacyAddress) {
    const currencyName = state.ui.settings[state.ui.wallets.selectedCurrencyCode].currencyCode
    return dispatch(legacyAddressScanned(parsedURI, currencyName))
  }

  // PUBLIC ADDRESS ///////////////////////////////////////////////////////
  dispatch(updateParsedURI(parsedURI))
  return Actions.sendConfirmation('fromScan')
}
