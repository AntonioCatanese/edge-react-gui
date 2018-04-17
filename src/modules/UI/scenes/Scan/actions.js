// @flow

import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import * as UTILS from '../../../utils.js'
import { loginWithEdge } from '../../../../actions/EdgeLoginActions.js'
import { updateParsedURI } from '../../scenes/SendConfirmation/action.js'

export const PREFIX = 'SCAN/'

// SCENE ////////////////////////////////////////////////////////////////
export const SCENE_ENTERED = PREFIX + 'SCENE_ENTERED'
export const sceneEntered = () => ({
  type: SCENE_ENTERED
})

export const SCENE_EXITED = PREFIX + 'SCENE_EXITED'
export const sceneExited = () => ({
  type: SCENE_EXITED
})

export const SCENE_ADDRESS_BUTTON_PRESSED = PREFIX + 'SCENE_ADDRESS_BUTTON_PRESSED'
export const sceneAddressButtonPressed = () => ({
  type: SCENE_ADDRESS_BUTTON_PRESSED
})

export const SCENE_TORCH_BUTTON_PRESSED = PREFIX + 'SCENE_TORCH_BUTTON_PRESSED'
export const sceneTorchButtonPressed = () => ({
  type: SCENE_TORCH_BUTTON_PRESSED
})

// ADDRESS_MODAL ////////////////////////////////////////////////////////////////
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

export const ADDRESS_MODAL_BACK_BUTTON_PRESSED = PREFIX + 'ADDRESS_MODAL_BACK_BUTTON_PRESSED'
export const addressModalBackButtonPressed = () => ({
  type: ADDRESS_MODAL_BACK_BUTTON_PRESSED
})

export const ADDRESS_MODAL_CANCEL_BUTTON_PRESSED = PREFIX + 'ADDRESS_MODAL_CANCEL_BUTTON_PRESSED'
export const legacyAddressCancelButtonPressed = () => ({
  type: ADDRESS_MODAL_CANCEL_BUTTON_PRESSED
})

export const ADDRESS_MODAL_HIDDEN = PREFIX + 'ADDRESS_MODAL_HIDDEN'
export const addressModalHidden = () => ({
  type: ADDRESS_MODAL_HIDDEN
})

// LEGACY_ADDRESS_MODAL ////////////////////////////////////////////////////////////////
export const LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED'
export const legacyAddressModalConfirmButtonPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_CONFIRM_BUTTON_PRESSED
})

export const LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED'
export const legacyAddressModalBackdropPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_BACKDROP_PRESSED
})

export const LEGACY_ADDRESS_MODAL_BACK_BUTTON_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_BACK_BUTTON_PRESSED'
export const legacyAddressModalBackButtonPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_BACK_BUTTON_PRESSED
})

export const LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED = PREFIX + 'LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED'
export const legacyAddressModalCancelPressed = () => ({
  type: LEGACY_ADDRESS_MODAL_CANCEL_BUTTON_PRESSED
})

export const LEGACY_ADDRESS_MODAL_HIDDEN = PREFIX + 'LEGACY_ADDRESS_MODAL_HIDDEN'
export const legacyAddressModalHidden = () => ({
  type: LEGACY_ADDRESS_MODAL_HIDDEN
})

// INVALID_URI_MODAL /////////////////////////////////////////////////////////
export const INVALID_URI_MODAL_BACKDROP_PRESSED = PREFIX + 'INVALID_URI_MODAL_BACKDROP_PRESSED'
export const invalidUriModalBackdropPressed = () => ({
  type: INVALID_URI_MODAL_BACKDROP_PRESSED
})

export const INVALID_URI_MODAL_BACK_BUTTON_PRESSED = PREFIX + 'INVALID_URI_MODAL_BACK_BUTTON_PRESSED'
export const invalidUriModalBackButtonPressed = () => ({
  type: INVALID_URI_MODAL_BACK_BUTTON_PRESSED
})

export const INVALID_URI_MODAL_EXPIRED = PREFIX + 'INVALID_URI_MODAL_EXPIRED'
export const invalidUriModalExpired = () => ({
  type: INVALID_URI_MODAL_EXPIRED
})

export const INVALID_URI_MODAL_HIDDEN = PREFIX + 'INVALID_URI_MODAL_HIDDEN'
export const invalidUriModalHidden = () => ({
  type: INVALID_URI_MODAL_HIDDEN
})

// CAMERA ////////////////////////////////////////////////////////////////
export const CAMERA_QR_CODE_SCANNED = PREFIX + 'CAMERA_QR_CODE_SCANNED'
export const cameraQrCodeScanned = (data: string) => ({
  type: CAMERA_QR_CODE_SCANNED,
  data: { data }
})

// PARSE ////////////////////////////////////////////////////////////////
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

// LEGACY_ADDRESS ////////////////////////////////////////////////////////////////
export const LEGACY_ADDRESS_DETECTED = PREFIX + 'LEGACY_ADDRESS_DETECTED'
export const legacyAddressDetected = (parsedUri: EdgeParsedUri) => ({
  type: LEGACY_ADDRESS_DETECTED,
  data: { parsedUri }
})

// EDGE_LOGIN ////////////////////////////////////////////////////////////////
export const EDGE_LOGIN_DETECTED = PREFIX + 'EDGE_LOGIN_DETECTED'
export const edgeLoginDetected = (uri: string) => ({
  type: EDGE_LOGIN_DETECTED,
  data: { uri }
})

// TOKEN ////////////////////////////////////////////////////////////////
export const TOKEN_DETECTED = PREFIX + 'TOKEN_DETECTED'
export const tokenDetected = (parameters: {}) => ({
  type: TOKEN_DETECTED,
  data: { parameters }
})

// PUBLIC_ADDRESS ////////////////////////////////////////////////////////////////
export const PUBLIC_ADDRESS_DETECTED = PREFIX + 'PUBLIC_ADDRESS_DETECTED'
export const publicAddressDetected = (parsedUri: EdgeParsedUri) => ({
  type: PUBLIC_ADDRESS_DETECTED,
  data: { parsedUri }
})

// OPERATIONS ////////////////////////////////////////////////////////////////
export const qrcodeScanned = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if (!state.ui.scenes.scan.scanEnabled) return

  dispatch(cameraQrCodeScanned(data))

  // EDGE LOGIN ///////////////////////////////////////////////////////////
  if (UTILS.isEdgeLogin(data)) {
    dispatch(edgeLoginDetected(data))
    return dispatch(loginWithEdge(data))
  }

  const edgeWallet = state.core.wallets.byId[state.ui.wallets.selectedWalletId]
  let parsedUri
  try {
    parsedUri = WALLET_API.parseURI(edgeWallet, data)
  } catch (error) {
    // INVALID QRCODE ///////////////////////////////////////////////////////
    return dispatch(parseUriFailed(error))
  }
  // TOKEN ////////////////////////////////////////////////////////////////
  if (parsedUri.token) {
    // token URI, not pay
    const { contractAddress, currencyName, multiplier } = parsedUri.token
    const currencyCode = parsedUri.token.currencyCode.toUpperCase()
    const walletId = state.ui.wallets.selectedWalletId
    const wallet = state.ui.wallets.byId[walletId]
    let decimalPlaces = 18
    if (parsedUri.token && parsedUri.token.multiplier) {
      decimalPlaces = UTILS.denominationToDecimalPlaces(parsedUri.token.multiplier)
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

    dispatch(tokenDetected(parameters))
    return Actions.addToken(parameters)
  }

  // LEGACY ADDRESS ///////////////////////////////////////////////////////
  if (parsedUri.legacyAddress) {
    return dispatch(legacyAddressDetected(parsedUri))
  }

  // PUBLIC ADDRESS ///////////////////////////////////////////////////////
  dispatch(publicAddressDetected(parsedUri))
  dispatch(updateParsedURI(parsedUri))
  return Actions.sendConfirmation('fromScan')
}
