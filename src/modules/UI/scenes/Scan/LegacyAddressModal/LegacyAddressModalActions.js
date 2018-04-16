// @flow

export const PREFIX = 'LEGACY_ADDRESS_MODAL/'

export const DISPLAY = PREFIX + 'DISPLAY'
export const display = (currencyName: string) => ({
  type: DISPLAY,
  data: { currencyName }
})

export const CONFIRM = PREFIX + 'CONFIRM'
export const confirm = () => ({
  type: CONFIRM
})

export const DISMISS = PREFIX + 'DISMISS'
export const dismiss = () => ({
  type: DISMISS
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})
