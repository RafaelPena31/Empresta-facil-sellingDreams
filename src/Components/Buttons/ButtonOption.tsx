import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  buttonNormal: {
    borderRadius: 35,
    marginVertical: 9,
    padding: 17
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})

interface BtnFeaturedProps {
  text: string
  action: () => void
  backgroundColor: string
  textColor: string
}

export default function Button({ text, action, backgroundColor, textColor }: BtnFeaturedProps) {
  return (
    <TouchableOpacity onPress={action} style={[styles.buttonNormal, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}
