import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  buttonNormal: {
    width: '98%',
    borderRadius: 35,
    marginVertical: 9,
    padding: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  buttonText: {
    fontSize: 22,
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
  width: number
}

export default function Button({ text, action, backgroundColor, textColor, width }: BtnFeaturedProps) {
  return (
    <TouchableOpacity onPress={action} style={[styles.buttonNormal, { backgroundColor: backgroundColor, maxWidth: width }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}
