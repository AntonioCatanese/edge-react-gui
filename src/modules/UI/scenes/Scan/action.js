// @flow

import { Alert } from 'react-native'
import {Actions} from 'react-native-router-flux'

import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import * as UTILS from '../../../utils.js'
import { loginWithEdge } from '../../../../actions/EdgeLoginActions.js'
import { updateParsedURI } from '../../scenes/SendConfirmation/action.js'
import s from '../../../../locales/strings.js'

export const UPDATE_RECIPIENT_ADDRESS = 'UPDATE_RECIPIENT_ADDRESS'

export const TOGGLE_ENABLE_TORCH = 'TOGGLE_ENABLE_TORCH'
export const toggleEnableTorch = () => ({
  type: TOGGLE_ENABLE_TORCH
})

export const TOGGLE_ADDRESS_MODAL_VISIBILITY = 'TOGGLE_ADDRESS_MODAL_VISIBILITY'
export const toggleAddressModal = () => ({
  type: TOGGLE_ADDRESS_MODAL_VISIBILITY
})

export const ENABLE_SCAN = 'ENABLE_SCAN'
export const enableScan = () => {
  return {
    type: ENABLE_SCAN
  }
}

export const DISABLE_SCAN = 'DISABLE_SCAN'
export const disableScan = () => {
  return {
    type: DISABLE_SCAN
  }
}

export const qrCodeScanned = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if (!state.ui.scenes.scan.scanEnabled) return

  // EDGE LOGIN ///////////////////////////////////////////////////////////
  if (/^airbitz:\/\/edge\//.test(data)) {
    return dispatch(loginWithEdge(data))
  }

  const edgeWallet = state.core.wallets.byId[state.ui.wallets.selectedWalletId]
  try {
    const parsedURI = WALLET_API.parseURI(edgeWallet, data)

    // TOKEN ////////////////////////////////////////////////////////////////
    if (parsedURI.token) { // token URI, not pay
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
      return Alert.alert('LEGACY ADDRESS SCANNED')
    }

    // PUBLIC ADDRESS ///////////////////////////////////////////////////////
    dispatch(updateParsedURI(parsedURI))
    return Actions.sendConfirmation('fromScan')
  } catch (error) {
    // INVALID QRCODE ///////////////////////////////////////////////////////
    dispatch(disableScan())
    Alert.alert(s.strings.fragment_send_send_bitcoin_unscannable, error.toString(), [
      { text: s.strings.string_ok, onPress: () => dispatch(enableScan()) }
    ])
  }
}
