// @flow

export const PREFIX = 'LEGACY_ADDRESS_MODAL/'

export const LEGACY_ADDRESS_SCANNED = PREFIX + 'LEGACY_ADDRESS_SCANNED'
export const legacyAddressScanned = (currencyName: string) => ({
  type: LEGACY_ADDRESS_SCANNED,
  data: { currencyName }
})

export const DISMISS_MODAL = PREFIX + 'DISMISS_MODAL'
export const dismissModal = () => ({
  type: DISMISS_MODAL
})

export const CONFIRM_LEGACY_ADDRESS = PREFIX + 'CONFIRM_LEGACY_ADDRESS'
export const confirmLegacyAddress = () => ({
  type: CONFIRM_LEGACY_ADDRESS
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})
