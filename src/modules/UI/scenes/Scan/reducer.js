// @flow

import { combineReducers } from 'redux'

import {
  addressModalVisible,
  recipientAddress,
  scanEnabled,
  scanToWalletListModalVisibility,
  selectedWalletListModalVisibility,
  torchEnabled
} from './reducers'

export const scan = combineReducers({
  torch,
  addressModal,
  recipientAddress,
  scanEnabled,
  selectedWalletListModalVisibility,
  scanToWalletListModalVisibility,
  uri,
  legacyAddressModal
})

export default scan
