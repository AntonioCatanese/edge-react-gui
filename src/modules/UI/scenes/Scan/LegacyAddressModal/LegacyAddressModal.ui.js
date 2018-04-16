// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'
import { sprintf } from 'sprintf-js'

import { Icon } from '../../../components/Icon/Icon.ui.js'
import { InteractiveModal, PrimaryButton, SecondaryButton } from '../../../components/Modals/'

import s from '../../../../../locales/strings.js'

type Props = {
  isActive: boolean,
  currencyName: string,
  onConfirm: () => void,
  onCancel: () => void,
  reset: () => void
}
export class LegacyAddressModalComponent extends Component<Props> {
  static defaultProps = {
    isActive: false,
    currencyName: 'Currency Name',
    onConfirm: () => {},
    onCancel: () => {}
  }

  render () {
    const { isActive, currencyName } = this.props
    const WARNING = sprintf(s.strings.legacy_address_warning, currencyName)
    const TITLE = s.strings.legacy_address_title
    const CONFIRM = s.strings.legacy_address_confirm
    const CANCEL = s.strings.legacy_address_cancel

    return (
      <InteractiveModal isActive={isActive} onBackdropPress={this.onCancel} onBackButtonPress={this.onCancel} onModalHide={this.onModalHide}>
        <InteractiveModal.Icon>
          <Icon style={{}} type={'ionIcons'} name={'ios-alert-outline'} size={30} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{TITLE}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Description>{WARNING}</InteractiveModal.Description>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          <InteractiveModal.Item>
            <PrimaryButton onPress={this.onConfirm}>
              <PrimaryButton.Text>{CONFIRM}</PrimaryButton.Text>
            </PrimaryButton>
          </InteractiveModal.Item>

          <InteractiveModal.Item>
            <SecondaryButton onPress={this.onCancel}>
              <SecondaryButton.Text>{CANCEL}</SecondaryButton.Text>
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

  onModalHide = () => {
    this.props.reset()
  }
}

export default LegacyAddressModalComponent
