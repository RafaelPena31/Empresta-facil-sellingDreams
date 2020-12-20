import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type ButtonReturnProp = {
  action: () => void
  name: string
  color: string
  size: number
}

const styles = StyleSheet.create({
  containerBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 22,
    marginLeft: 15,
    zIndex: 1
  }
})

export default function LeftButton({ action, name, color, size }: ButtonReturnProp) {
  return (
    <TouchableOpacity onPress={action} style={styles.containerBtn}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
