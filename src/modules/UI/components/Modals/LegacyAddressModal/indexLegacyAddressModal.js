// @flow

import { LegacyAddressModal } from './LegacyAddressModalConnector.js'
import { LegacyAddressModalComponent } from './LegacyAddressModal.ui.js'
import { LegacyAddressModalReducer } from './LegacyAddressModalReducer.js'
import {
  DISMISS_MODAL,
  RESET,
  legacyAddressScanned,
  confirmLegacyAddress,
  dismissModal,
  reset
} from './LegacyAddressModalActions.js'

import { LEGACY_ADDRESS_SCANNED } from '../../../scenes/Scan/action.js'

export {
  LegacyAddressModal,
  LegacyAddressModalComponent,
  LegacyAddressModalReducer,
  legacyAddressScanned,
  confirmLegacyAddress,
  dismissModal,
  reset,
  DISMISS_MODAL,
  LEGACY_ADDRESS_SCANNED,
  RESET
}
