// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz.js'

export default StyleSheet.create({
  container: {
    top: 62,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: THEME.COLORS.PRIMARY,
    position: 'absolute',
    zIndex: 99999
  }
})