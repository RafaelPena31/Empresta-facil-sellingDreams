import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

interface DropDownData {
  value: string
  label: string
}

interface OptionProps {
  label: string
  value: string | null
}
interface Props {
  dropDownData: Array<DropDownData>
  placeHolder: string
  label: string
  isLeftIcon?: boolean
  isFilter?: boolean
  initialValue?: string
  setSelectedItem?: (label: string, value: string | null) => void
}

export const CustomDropdown = ({ placeHolder, label, dropDownData, initialValue, setSelectedItem }: Props) => {
  const [dropdownValue, setDropdownValue] = useState<OptionProps>({ label: placeHolder, value: placeHolder })

  const setValueSelectedOnChange = useCallback(
    (option?: OptionProps) => {
      if (dropDownData.length === 1 && setSelectedItem) {
        setDropdownValue({ label: dropDownData[0].label, value: dropDownData[0].value })
        setSelectedItem(label, dropDownData[0].value)
      } else if (option && setSelectedItem) {
        setDropdownValue({ label: option.label, value: option.value })
        setSelectedItem(label, option.value)
      } else if (initialValue && setSelectedItem) {
        const selectedItem = dropDownData.find(item => item.value === initialValue)
        if (selectedItem) {
          setDropdownValue({ label: selectedItem.label, value: selectedItem.value })
          setSelectedItem(label, selectedItem.value)
        }
      }
    },
    [dropDownData, setSelectedItem, initialValue, label]
  )

  useEffect(() => {
    setValueSelectedOnChange()
  }, [setValueSelectedOnChange])

  return (
    <View style={styles.fieldValidBorder}>
      <ModalSelector
        data={dropDownData}
        animationType='none'
        initValue={dropdownValue.label}
        initValueTextStyle={styles.label}
        optionTextStyle={styles.label}
        selectTextStyle={styles.label}
        selectStyle={styles.fieldValid}
        optionContainerStyle={styles.optionContainerStyle}
        childrenContainerStyle={styles.fieldValid}
        cancelContainerStyle={styles.cancelContainerStyle}
        overlayStyle={styles.overlayStyle}
        optionStyle={styles.optionStyle}
        onChange={setValueSelectedOnChange}
        backdropPressToClose
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fieldValid: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    height: 50,
    maxHeight: 55,
    borderRadius: 4,
    justifyContent: 'center'
  },
  fieldValidBorder: {
    width: 320,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4
  },
  label: {
    color: '#2f3031',
    fontSize: 18,
    textAlign: 'left'
  },
  optionContainerStyle: {
    backgroundColor: '#ffffff',
    shadowColor: '#707374',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  cancelContainerStyle: {
    display: 'none'
  },
  overlayStyle: {
    backgroundColor: '#00000040',
    justifyContent: 'center',
    padding: 7
  },
  optionStyle: {
    borderBottomWidth: 0
  }
})
