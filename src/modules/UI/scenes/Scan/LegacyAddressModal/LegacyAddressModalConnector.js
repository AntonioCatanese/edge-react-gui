// @flow

import { connect } from 'react-redux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import { onConfirm, dismissModal, reset } from './indexLegacyAddressModal.js'
import LegacyAddressModalComponent from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  ...state.ui.legacyAddressModal
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: { onConfirm: () => void }) => ({
  onConfirm: (parsedUri: EdgeParsedUri) => {
    dispatch(onConfirm())
    dispatch(ownProps.onConfirm())
  },
  onCancel: () => {
    dispatch(dismissModal())
  },
  reset: () => {
    dispatch(reset())
  }
})

export const LegacyAddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModalComponent)
