// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'
import { sprintf } from 'sprintf-js'

import { Icon } from '../../Icon/Icon.ui.js'
import { InteractiveModal, PrimaryButton, SecondaryButton } from '..'

import s from '../../../../../locales/strings.js'

type Props = {
  isVisible: boolean,
  currencyCode: string,
  currencyName: string,
  onConfirm: () => void,
  onCancel: () => void
}
export class LegacyAddressModalComponent extends Component<Props> {
  static defaultProps = {
    isVisible: false,
    currencyName: 'Currency Name',
    onConfirm: () => {},
    onCancel: () => {}
  }

  render () {
    const { isVisible, currencyName } = this.props
    const warning = sprintf(s.strings.legacy_address_warning, currencyName)

    return (
      <InteractiveModal isVisible={isVisible} onBackdropPress={this.onCancel} onBackButtonPress={this.onCancel} onModalHide={this.onModalHide}>
        <InteractiveModal.Icon>
          <Icon style={{}} type={'material'} name='alert-circle-outline' size={30} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{'Legacy Address Detected'}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Description>{warning}</InteractiveModal.Description>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          <InteractiveModal.Item>
            <PrimaryButton onPress={this.onConfirm}>
              <PrimaryButton.Text>{'Confirm'}</PrimaryButton.Text>
            </PrimaryButton>
          </InteractiveModal.Item>

          <InteractiveModal.Item>
            <SecondaryButton onPress={this.onCancel}>
              <SecondaryButton.Text>{'Cancel'}</SecondaryButton.Text>
            </SecondaryButton>
          </InteractiveModal.Item>
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }

  onConfirm = () => {
    this.props.onConfirm()
  }

  onCancel = () => {
    this.props.onCancel()
  }
}

export default LegacyAddressModalComponent
