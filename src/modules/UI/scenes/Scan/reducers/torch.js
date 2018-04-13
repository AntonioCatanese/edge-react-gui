// @flow

import type { Action } from '../../../../ReduxTypes.js'

import { ACTION } from '..'

export const initialState = {
  isEnabled: false
}
export type TorchState = {
  isEnabled: boolean
}
export const torch = (state: TorchState = initialState, action: Action) => {
  switch (action.type) {
    case ACTION.TOGGLE_ENABLE_TORCH:
      return {
        ...state,
        isEnabled: !state.isEnabled
      }
    default:
      return state
  }
}
