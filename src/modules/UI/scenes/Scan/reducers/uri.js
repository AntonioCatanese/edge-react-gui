// @flow

import type { EdgeParsedUri } from 'edge-core-js'

import type { Action } from '../../../../ReduxTypes.js'

export const initialState = {
  data: null,
  parsedUri: null,
  error: null
}
export type ParsedUriReducerState = {
  data: string | null,
  parsedUri: EdgeParsedUri | null,
  error: null
}
export const uri = (state: ParsedUriReducerState = initialState, action: Action) => {
  switch (action.type) {
    case QR_CODE_SCANNED:
      return {
        ...state,
        data: action.data.data
      }
    case URI_PARSED_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case URI_PARSED_ERROR:
      return {
        ...state,
        data: action.data.data
      }
    default:
      return state
  }
}
