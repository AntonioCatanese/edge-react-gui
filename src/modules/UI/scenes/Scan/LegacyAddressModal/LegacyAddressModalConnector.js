// @flow

import { connect } from 'react-redux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { confirm, dismiss, reset } from './indexLegacyAddressModal.js'
import LegacyAddressModalComponent from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  ...state.ui.legacyAddressModal
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: { confirm: () => void }) => ({
  confirm: (parsedUri: EdgeParsedUri) => {
    dispatch(confirm())
    dispatch(ownProps.confirm())
  },
  onCancel: () => {
    dispatch(dismiss())
  },
  reset: () => {
    dispatch(reset())
  }
})

export const LegacyAddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModalComponent)
