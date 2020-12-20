import React from 'react'
import { KeyboardTypeOptions, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { colors } from '../../design/_colors'

const styles = StyleSheet.create({
  TextInput: {
    width: '100%',
    backgroundColor: colors.config.light,
    height: 50
  }
})
interface TextInputTypes {
  label: string
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  width: number
  maxLenght: number
  marginHorizontal?: number
  onChangeText: ((text: string) => void) & Function
  value?: string
}

const InputText = ({
  label,
  keyboardType,
  secureTextEntry,
  width,
  maxLenght,
  marginHorizontal,
  onChangeText,
  value
}: TextInputTypes): JSX.Element => {
  return (
    <TextInput
      mode='outlined'
      label={label}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={[styles.TextInput, { maxWidth: width, marginHorizontal: marginHorizontal }]}
      maxLength={maxLenght}
      onChangeText={onChangeText}
      value={value}
    />
  )
}

//const styles = StyleSheet.create({})

export default InputText
