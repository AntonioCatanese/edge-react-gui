import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { acceptDisclaimer } from './Disclaimer.action'

import { Platform, View, Text, StyleSheet, WebView, Image } from 'react-native'
import abcctx from '../../lib/abcContext'
import { Button } from 'native-base'
import t from '../../lib/LocaleStrings'
class Disclaimer extends Component {
  accept = () => {
    abcctx(ctx => {
      global.localStorage.setItem('disclaimerAccepted', true)
      this.props.dispatch(acceptDisclaimer())
    })
  }
  render () {
    return (
      <View style={style.disclaimerContainer} >
        <View style={style.disclaimerOuterView}>
          <View style={style.logoContainer}>
            <Image source={require('../../img/logo.png')} style={style.logoImage} />
          </View>
          <View style={style.disclaimerInnerView}>
            <WebView
              ref='webview'
              automaticallyAdjustContentInsets={false}
              style={style.webview}
              source={{ uri:  (Platform.OS === 'ios') ? './html/disclaimer.html' : 'file:///android_asset/disclaimer.html' }}
              javaScriptEnabled={false}
              domStorageEnabled={false}
              decelerationRate='normal'
              scalesPageToFit
              scrollEnabled
          />
          </View>
        </View>
        <View style={style.buttonContainer}>
          <Button style={style.button} onPress={this.accept}><Text style={style.buttonText}>{t('string_agree')}</Text></Button>
        </View>
      </View>
    )
  }

}

const style = StyleSheet.create({

  disclaimerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginVertical: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0

  },
  disclaimerOuterView: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },

  disclaimerInnerView: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  webview: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row'
  },

  button: {
    backgroundColor: '#80C342',
    height: 60,
    flex: 1
  },
  logoContainer: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  logoImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 25
  }
})

export default connect(state => ({

  disclaimerAccepted: state.disclaimerAccepted

}))(Disclaimer)