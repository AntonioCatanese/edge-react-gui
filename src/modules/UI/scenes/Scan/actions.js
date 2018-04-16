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

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})

// CAMERA
export const TORCH_BUTTON_PRESSED = PREFIX + 'TORCH_BUTTON_PRESSED'
export const torchButtonPressed = () => ({
  type: TORCH_BUTTON_PRESSED
})

export const QR_CODE_SCANNED = PREFIX + 'QR_CODE_SCANNED'
export const qrcodeScanned = (data: string) => ({
  type: QR_CODE_SCANNED,
  data: { data }
})

// ADDRESS_MODAL
export const ADDRESS_BUTTON_PRESSED = PREFIX + 'ADDRESS_BUTTON_PRESSED'
export const addressButtonPressed = () => ({
  type: ADDRESS_BUTTON_PRESSED
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

export const ADDRESS_MODAL_HIDDEN = PREFIX + 'ADDRESS_MODAL_HIDDEN'
export const addressModalHidden = () => ({
  type: ADDRESS_MODAL_HIDDEN
})

// EDGE_LOGIN
export const EDGE_LOGIN_REQUESTED = PREFIX + 'EDGE_LOGIN_REQUESTED'
export const edgeLoginRequested = (uri: string) => ({
  type: EDGE_LOGIN_REQUESTED,
  data: { uri }
})

// LEGACY_ADDRESS_MODAL
export const LEGACY_ADDRESS_DETECTED = PREFIX + 'LEGACY_ADDRESS_DETECTED'
export const legacyAddressDetected = () => ({
  type: LEGACY_ADDRESS_DETECTED
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

export const LEGACY_ADDRESS_MODAL_HIDDEN = PREFIX + 'LEGACY_ADDRESS_MODAL_HIDDEN'
export const legacyAddressModalHidden = () => ({
  type: LEGACY_ADDRESS_MODAL_HIDDEN
})

// TOKEN
export const TOKEN_DETECTED = PREFIX + 'TOKEN_DETECTED'
export const tokenDetected = () => ({
  type: TOKEN_DETECTED
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



// OPERATIONS
export const qrcodeScanned = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if (!state.ui.scenes.scan.scanEnabled) return

  // dispatch(disableScan())
  // dispatch(qrcodeScanned(data))

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
