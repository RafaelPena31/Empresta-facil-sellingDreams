import React from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import backgroundImage from '../Assets/img/backgroundLoad.png'
import logoImage from '../Assets/img/logo.png'
import { colors } from '../design/_colors'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.primary
  },
  image: {
    width: '100%',
    resizeMode: 'contain'
  }
})

export default function LoadScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <Image source={logoImage} style={[styles.image]} />
      </ImageBackground>
    </SafeAreaView>
  )
}
