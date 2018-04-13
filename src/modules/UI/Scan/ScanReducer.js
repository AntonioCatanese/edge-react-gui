// @flow

import type { EdgeParsedUri } from 'edge-core-js'

import type { Action } from '../../ReduxTypes.js'

export type ScanState = {
  data: string | null,
  parsedUri: EdgeParsedUri | null,
  error: null
}
const initialState: ScanState = {
  data: null,
  parsedUri: null,
  error: null
}

export const scanReducer = (state: ScanState = initialState, action: Action): ScanState => {
  switch (action.type) {
    case QR_CODE_SCANNED:
      return {
        ...state
      }
    default:
      return state
  }
}
