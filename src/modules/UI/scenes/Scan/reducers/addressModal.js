// @flow

import type { Action } from '../../../../ReduxTypes.js'

import { ACTION } from '..'

export const initialState = {
  isVisible: false
}
export type AddressModalState = {
  isVisible: boolean
}
export const addressModal = (state: AddressModalState = initialState, action: Action) => {
  switch (action.type) {
    case ACTION.TOGGLE_ENABLE_TORCH:
      return {
        ...state,
        isVisible: !state.isVisible
      }
    default:
      return state
  }
}
