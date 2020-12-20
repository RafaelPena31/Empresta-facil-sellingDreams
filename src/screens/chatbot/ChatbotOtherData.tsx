import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import avatarImage from '../../Assets/img/avatar/avatar1.png'
import LeftButton from '../../components/buttons/LeftButton'
import InputText from '../../components/form/InputText'
import { AddressContext } from '../../context/AddressContext'
import { BankContext } from '../../context/BankContext'
import { LoanContext } from '../../context/LoanContext'
import { ProductsContext } from '../../context/ProductsContext'
import { ProductsAdminContext } from '../../context/ProductsContextAdmin'
import { UserContext } from '../../context/UserContext'
import { colors } from '../../design/_colors'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.config.secondaryLight
  },
  flex: {
    flex: 1
  },
  containerScreen: {
    minHeight: height - 90,
    justifyContent: 'space-between'
  },
  chatContainer: {
    marginTop: 120,
    paddingHorizontal: 19
  },
  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -80
  },
  avatar: {
    width: 90,
    resizeMode: 'contain',
    marginLeft: -5
  },
  msgContainer: {
    marginTop: 20,
    backgroundColor: colors.config.light,
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  msgText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: colors.primary.primary,
    textAlign: 'left',
    maxWidth: 220
  },
  clerkButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clerkTextButton: {
    maxWidth: 200,
    color: colors.primary.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    marginLeft: 7
  },
  nextButton: {
    backgroundColor: colors.primary.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextTextButton: {
    color: '#ffffff',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    marginRight: 7
  },
  helpFooterEncapsulate: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBlock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function ChatbotOtherData() {
  const navigation = useNavigation()

  const avatarText = 'Vamos precisar de mais algumas informações...'
  const { loanValue, setLoanValue } = useContext(LoanContext)
  const { userValue } = useContext(UserContext)
  const { addressValue } = useContext(AddressContext)
  const { productsValue } = useContext(ProductsContext)
  const { bankValue } = useContext(BankContext)
  const { productsValueAdmin } = useContext(ProductsAdminContext)

  const handleContext = () => {
    let valorParcelaStr = (loanValue?.valorSolicitado / loanValue?.nParcelas).toFixed(2)
    let valorParcela = parseFloat(valorParcelaStr)
    let margem = loanValue?.renda * 0.3

    setLoanValue({
      ...loanValue,
      ...{
        margem,
        valorParcela
      }
    })

    console.log(loanValue)

    if (userValue.id) {
      firestore()
        .collection('products')
        .doc(userValue.id)
        .set(
          {
            products: [
              ...productsValue,
              {
                activity: false,
                status: 'Checking',
                margin: margem,
                parcel: loanValue.nParcelas,
                parcel_value: valorParcela,
                type: loanValue.tipo_beneficio,
                value: loanValue.valorSolicitado
              }
            ]
          },
          { merge: true }
        )

      firestore()
        .collection('general_products')
        .doc(userValue.id)
        .set(
          {
            products: [
              ...productsValueAdmin,
              {
                /* loan */
                activity: false,
                status: 'Checking',
                margin: margem,
                parcel: loanValue.nParcelas,
                parcel_value: valorParcela,
                type: loanValue.tipo_beneficio,
                value: loanValue.valorSolicitado,
                /* profile */
                dtAniversario: userValue.dtAniversario,
                nome: userValue.nome,
                cpf: userValue.cpf,
                sexo: userValue.sexo,
                estadoCivil: userValue.estadoCivil,
                nomeMae: userValue.nomeMae,
                numeroRG: userValue.numeroRG,
                orgaoRG: userValue.orgaoRG,
                ufEmissaoRG: userValue.ufEmissaoRG,
                dtEmissaoRG: userValue.dtEmissaoRG,
                id: userValue.id,
                /* address */
                cep: addressValue.cep,
                uf: addressValue.uf,
                cidade: addressValue.cidade,
                bairro: addressValue.bairro,
                logradouro: addressValue.logradouro,
                numero: addressValue.numero,
                complemento: addressValue.complemento,
                /* bank */
                banco: bankValue.banco,
                agencia: bankValue.agencia,
                conta: bankValue.conta
              }
            ]
          },
          { merge: true }
        )
      navigation.navigate('Solicitation')
    } else {
      navigation.navigate('UserRegister')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.primary.primary} action={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.containerScreen}>
          <View style={styles.chatContainer}>
            <KeyboardAvoidingView behavior='padding' style={styles.flex}>
              <View style={styles.containerAvatar}>
                <Image source={avatarImage} style={styles.avatar} />
                <View style={styles.msgContainer}>
                  <Text style={[styles.msgText]}>{avatarText}</Text>
                </View>
              </View>
              <View style={styles.inputBlock}>
                <InputText
                  keyboardType='number-pad'
                  label='Qual sua renda mensal?'
                  maxLenght={16}
                  width={350}
                  onChangeText={value => {
                    setLoanValue({ ...loanValue, renda: parseFloat(value) })
                  }}
                />
                <InputText
                  keyboardType='number-pad'
                  label='De quanto precisa ?'
                  maxLenght={16}
                  width={350}
                  onChangeText={value => {
                    setLoanValue({ ...loanValue, valorSolicitado: parseFloat(value) })
                  }}
                />
                <InputText
                  keyboardType='number-pad'
                  label='Quantas parcelas deseja pagar ?'
                  maxLenght={3}
                  width={350}
                  onChangeText={value => {
                    setLoanValue({ ...loanValue, nParcelas: parseFloat(value) })
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.helpFooterEncapsulate}>
        <TouchableOpacity style={styles.clerkButton}>
          <Icon name='message' size={30} color={colors.primary.primary} />
          <Text style={styles.clerkTextButton}>Dúvidas? Fale com um atendente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => handleContext()}>
          <Text style={styles.nextTextButton}>Próximo</Text>
          <Icon name='arrow-right-alt' size={30} color={colors.config.light} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
