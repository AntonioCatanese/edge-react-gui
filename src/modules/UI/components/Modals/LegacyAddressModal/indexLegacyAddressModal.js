// @flow

import { LegacyAddressModalComponent } from './LegacyAddressModal.ui.js'
import { LegacyAddressModalReducer } from './LegacyAddressModalReducer.js'
import {
  LEGACY_ADDRESS_SCANNED,
  DISMISS_MODAL,
  RESET,
  legacyAddressScanned,
  confirmLegacyAddress,
  dismissModal,
  reset
} from './LegacyAddressModalActions.js'

export {
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
