import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../design/_colors'
import { OptionValueProps } from '../../screens/chatbot/Chatbot'

type ButtonReturnProp = {
  action: (props: { text: string; type: string }) => void
  objectValue: string[] | undefined
  currentValue: OptionValueProps | null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15
  },
  button: {
    padding: 20,
    borderRadius: 12,
    margin: 7
  },
  textButton: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20
  }
})

export default function RadioButtonGroup({ action, objectValue, currentValue }: ButtonReturnProp) {
  return (
    <View style={styles.container}>
      {objectValue?.map(item => (
        <TouchableOpacity
          onPress={() => action(item)}
          key={item.text}
          style={[
            currentValue === item ? { backgroundColor: colors.secondary.secondary } : { backgroundColor: colors.config.light },
            styles.button
          ]}>
          <Text style={[styles.textButton, currentValue === item ? { color: colors.config.light } : { color: colors.secondary.secondary }]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
