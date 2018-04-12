// @flow

import { connect } from 'react-redux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { confirmLegacyAddress, dismissModal, reset } from './indexLegacyAddressModal.js'
import LegacyAddressModalComponent from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  ...state.ui.legacyAddressModal
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onConfirm: (parsedUri: EdgeParsedUri) => {
    dispatch(confirmLegacyAddress(parsedUri))
  },
  onCancel: () => {
    dispatch(dismissModal())
  },
  reset: () => {
    dispatch(reset())
  }
})

export const LegacyAddressModal = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModalComponent)
