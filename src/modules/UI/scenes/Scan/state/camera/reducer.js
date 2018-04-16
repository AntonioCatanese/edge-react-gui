// @flow

export type Action = {
  type: 'TORCH_ENABLED'
} | {
  type: 'TORCH_DISABLED'
} | {
  type: 'SCAN_ENABLED'
} | {
  type: 'SCAN_DISABLED'
} | any

export type State = {
  isEnabled: boolean,
  torch: {
    isEnabled: boolean
  }
}
export const initialState = {
  isEnabled: false,
  torch: {
    isEnabled: false
  }
}
export const reducer = (state: State = initialState, action: Action) => {

}
