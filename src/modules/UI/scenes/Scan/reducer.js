// @flow

import { combineReducers } from 'redux'

import {
  addressModalVisible,
  legacyAddressModal,
  recipientAddress,
  scanEnabled,
  scanToWalletListModalVisibility,
  selectedWalletListModalVisibility,
  torchEnabled,
  uri
} from './reducers'

import { reducer as legacyAddressModal } from './LegacyAddressModal/indexLegacyAddressModal.js'

export const scan = combineReducers({
  addressModalVisible,
  legacyAddressModal,
  recipientAddress,
  scanEnabled,
  scanToWalletListModalVisibility,
  selectedWalletListModalVisibility,
  torchEnabled,
  uri
})

export default scan
