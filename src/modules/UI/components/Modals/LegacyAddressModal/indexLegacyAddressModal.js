// @flow

import { LegacyAddressModal } from './LegacyAddressModalConnector.js'
import { LegacyAddressModalComponent } from './LegacyAddressModal.ui.js'
import { LegacyAddressModalReducer } from './LegacyAddressModalReducer.js'
import {
  DISMISS_MODAL,
  RESET,
  legacyAddressScanned,
  dismissModal,
  reset
} from './LegacyAddressModalActions.js'

import { LEGACY_ADDRESS_SCANNED } from '../../../scenes/Scan/action.js'

export {
  LegacyAddressModal,
  LegacyAddressModalComponent,
  LegacyAddressModalReducer,
  legacyAddressScanned,
  dismissModal,
  reset,
  DISMISS_MODAL,
  RESET,
  LEGACY_ADDRESS_SCANNED
}
