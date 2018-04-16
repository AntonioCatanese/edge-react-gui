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
} from './State'

export const scan = combineReducers({
  addressModalVisible: addressModalVisible.reducer,
  legacyAddressModal: legacyAddressModal.reducer,
  scanEnabled: scanEnabled.reducer,
  scanToWalletListModalVisibility: scanToWalletListModalVisibility.reducer,
  selectedWalletListModalVisibility: selectedWalletListModalVisibility.reducer,
  torchEnabled: torchEnabled.reducer,
  uri: uri.reducer
})

export default scan
