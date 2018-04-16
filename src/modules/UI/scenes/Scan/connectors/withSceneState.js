// @flow

import type { EdgeCurrencyWallet } from 'edge-core-js'
import { connect } from 'react-redux'

import { getCameraPermission } from '../../../../reducers/permissions/selectors'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { toggleScanToWalletListModal } from '../../components/WalletListModal/action'
import * as UI_SELECTORS from '../../selectors.js'
import { updateLabel } from '../SendConfirmation/action.js'
import { toggleWalletListModal } from '../WalletTransferList/action'
import { toggleAddressModal, toggleEnableTorch, qrCodeScanned } from './action'
import type { GuiWallet } from '../../../../types'

const mapStateToProps = (state: State) => {
  const walletId: string = UI_SELECTORS.getSelectedWalletId(state)
  const edgeWallet: EdgeCurrencyWallet = CORE_SELECTORS.getWallet(state, walletId)
  const guiWallet: GuiWallet = UI_SELECTORS.getWallet(state, walletId)

  return {
    cameraPermission: getCameraPermission(state),
    edgeWallet,
    guiWallet,
    torchEnabled: state.ui.scenes.scan.torchEnabled,
    scanEnabled: state.ui.scenes.scan.scanEnabled,
    walletListModalVisible: state.ui.scenes.walletTransferList.walletListModalVisible,
    scanToWalletListModalVisibility: state.ui.scenes.scan.scanToWalletListModalVisibility,
    showToWalletModal: state.ui.scenes.scan.scanToWalletListModalVisibility
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleEnableTorch: () => dispatch(toggleEnableTorch()),
  toggleAddressModal: () => dispatch(toggleAddressModal()),
  toggleWalletListModal: () => dispatch(toggleWalletListModal()),
  updateWalletTransfer: wallet => dispatch(updateLabel(wallet)),
  toggleScanToWalletListModal: () => dispatch(toggleScanToWalletListModal()),
  qrCodeScanned: (data: string) => dispatch(qrCodeScanned(data))
})

export default connect(mapStateToProps, mapDispatchToProps)
