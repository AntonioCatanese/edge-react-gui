// @flow

import RNPermissions from 'react-native-permissions'

import type { Dispatch, GetState } from '../../modules/ReduxTypes'
import type { Permission } from '../../modules/UI/permissions.js'
import { request } from '../../modules/UI/permissions.js'

export const PREFIX = 'PERMISSIONS/'
export const UPDATE_PERMISSIONS = PREFIX + 'UPDATE_PERMISSIONS'

export const requestPermission = (permission: Permission) => (dispatch: Dispatch, getState: GetState) => {
  return request(permission).then(status => {
    dispatch(updatePermissions({ [permission]: status }))
  })
}
// $flowFixMe
export const updatePermissions = (permissions: Object) => ({
  type: UPDATE_PERMISSIONS,
  data: permissions
})
