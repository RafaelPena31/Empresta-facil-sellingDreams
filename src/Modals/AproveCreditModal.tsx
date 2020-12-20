import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import partyIcon from '../Assets/img/party.png'
import { colors } from '../design/_colors'

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  modalView: {
    marginTop: 10,
    paddingHorizontal: 55,
    paddingTop: 55,
    paddingBottom: 35,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20
  },
  openButton: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 25,
    backgroundColor: colors.secondary.secondary
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    paddingHorizontal: 15
  },
  psText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginTop: 10
  },

  modalBold: {
    fontFamily: 'Roboto-Bold'
  },
  modalBody: {
    fontSize: 25,
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
    marginTop: 15
  },
  icon: {
    width: 45,
    height: 45
  },
  boxSuccess: {
    alignItems: 'flex-end'
  },
  boxSuccessContainerText: {
    zIndex: 1
  },
  shadow: {
    backgroundColor: '#00000060',
    width: 230,
    height: 50,
    marginTop: -55,
    marginRight: -7
  }
})

interface AproveCreditModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const AproveCreditModal = ({ visible, setVisible }: AproveCreditModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <LinearGradient colors={['#FFD600', '#FFB800']} style={styles.modalView}>
          <View style={styles.container}>
            <Image source={partyIcon} style={styles.icon} />
            <View style={styles.boxSuccess}>
              <View style={styles.boxSuccessContainerText}>
                <Text style={styles.modalText}>Solicitação aprovada</Text>
              </View>
              <View style={styles.shadow} />
            </View>
            <Image source={partyIcon} style={styles.icon} />
          </View>
          <Text style={styles.modalBody}>A solicitação do seu credito foi aceita</Text>
          <Text style={styles.psText}>PS. Não esqueça de entrar em contato com nossa equipe de venda</Text>

          <TouchableOpacity
            style={styles.openButton}
            onPress={() => {
              setVisible(!visible)
            }}>
            <Text style={styles.textStyle}>Fechar aviso</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </View>
  )
}
export default AproveCreditModal
