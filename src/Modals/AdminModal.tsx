import React, { useContext } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { UserContext } from '../context/UserContext'
import { AddressContext } from '../context/AddressContext'
import { colors } from '../design/_colors'

interface AproveCreditModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const DetailsClientModal = ({ visible, setVisible }: AproveCreditModalProps) => {
  const { userValue } = useContext(UserContext)
  const { addressValue } = useContext(AddressContext)

  return (
    <Modal animationType='fade' transparent visible={visible} statusBarTranslucent style={ModalStyle.config}>
      <SafeAreaView style={ModalStyle.centeredView}>
        <View style={ModalStyle.container}>
          <View>
            <Text>Dados da solicitação</Text>
          </View>
          <View style={ModalStyle.data}>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Nome</Text>: {}
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Telefone:</Text> 990028922
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Endereço</Text>:{' '}
              {`${addressValue.cidade} ${addressValue.logradouro} ${addressValue.logradouro}`}{' '}
              <Text style={ModalStyle.textHeader}> CEP</Text>:{addressValue.cep}
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Data Nasc</Text>: {userValue.dtAniversario}
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>CPF:</Text> {userValue.cpf}
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Estado Civil:</Text> {userValue.estadoCivil}
            </Text>
            <Text style={ModalStyle.description}>
              <Text style={ModalStyle.textHeader}>Número RG:</Text> {userValue.numeroRG}
            </Text>
          </View>

          <TouchableOpacity
            style={ModalStyle.openButton}
            onPress={() => {
              setVisible(!visible)
            }}>
            <Text style={ModalStyle.textStyle}>Fechar aviso</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const ModalStyle = StyleSheet.create({
  config: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  data: {
    marginTop: 20
  },
  openButton: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 25,
    backgroundColor: colors.secondary.secondary
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginTop: 10
  },
  container: {
    backgroundColor: '#ffffff',
    minHeight: 400,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    textAlign: 'center'
  },
  textHeader: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: 'black',
    textAlign: 'center'
  }
})

export default DetailsClientModal
