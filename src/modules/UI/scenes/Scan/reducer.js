// @flow

import { combineReducers } from 'redux'

import {
  addressModalVisible,
  legacyAddressModal,
  scanEnabled,
  scanToWalletListModalVisibility,
  selectedWalletListModalVisibility,
  torchEnabled,
  uri
} from './reducers'

export const scan = combineReducers({
  addressModalVisible,
  legacyAddressModal,
  scanEnabled,
  scanToWalletListModalVisibility,
  selectedWalletListModalVisibility,
  torchEnabled,
  uri
})

export default scan
