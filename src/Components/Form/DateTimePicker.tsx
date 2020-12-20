import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const styles = StyleSheet.create({
  containerDTP: {
    position: 'relative',
    height: 50,
    opacity: 0.9,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginVertical: 9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
  },
  lineTxtBox: {
    position: 'absolute',
    bottom: 0,
    height: 1.5,
    width: '100%',
    backgroundColor: '#36334A',
    opacity: 0.5
  },
  txtDTP: {
    width: '100%',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#000'
  },
  icon: {
    position: 'absolute',
    right: 0,
    paddingRight: 10,
    marginTop: 24
  }
})

interface DatePickerProps {
  onDataSet: (field: string, value: any) => void
  width: number
  initialText: string
  field: string
}

export default function DatePicker({ onDataSet, width, initialText, field }: DatePickerProps) {
  const [date, setDate] = useState<Date>(new Date())
  const mode: 'date' | 'time' | 'datetime' | 'countdown' = 'date'
  const [show, setShow] = useState(false)

  const ChangeDate = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    onDataSet(field, currentDate.toLocaleDateString())
  }

  const showMode = () => {
    setShow(true)
  }

  return (
    <View>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#f7f7f7' : '#ffffff',
              width: width
            },
            styles.containerDTP
          ]}
          onPress={showMode}>
          <Text style={styles.txtDTP}>
            {date.toLocaleDateString().toUpperCase() !== new Date().toLocaleDateString().toUpperCase()
              ? date.toLocaleDateString().toUpperCase()
              : initialText}
          </Text>
        </Pressable>
      </View>
      {show && <DateTimePicker testID='dateTimePicker' value={date} mode={mode} display='spinner' onChange={ChangeDate} />}
      <Icon name='chevron-down' size={20} color='#b9b9b9' style={styles.icon} />
    </View>
  )
}
