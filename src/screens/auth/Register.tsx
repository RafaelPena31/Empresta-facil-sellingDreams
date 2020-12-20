import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import logo from '../../Assets/img/logo.png'
import Button from '../../components/buttons/Button'
import LeftButton from '../../components/buttons/LeftButton'
import InputText from '../../components/form/InputText'
import { AddressContext } from '../../context/AddressContext'
import { BankContext } from '../../context/BankContext'
import { LoanContext } from '../../context/LoanContext'
import { ProductsAdminContext } from '../../context/ProductsContextAdmin'
import { UserContext } from '../../context/UserContext'
import { colors } from '../../design/_colors'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerScreen: {
    position: 'relative',
    alignItems: 'center',
    minHeight: height
  },
  backgroundImage: {
    minHeight: height,
    justifyContent: 'center',
    backgroundColor: colors.primary.primary
  },
  topIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20
  },

  topImage: {
    width: '90%',
    resizeMode: 'contain'
  },

  bottomContainer: {
    flex: 1
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.config.light,
    paddingVertical: 70,
    borderTopStartRadius: 55,
    borderTopEndRadius: 55,
    width: '100%'
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'left',
    color: colors.secondary.secondary
  },
  subTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    textAlign: 'left',
    color: colors.text.subTitle_color,
    marginBottom: 100
  },
  inputBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10
  },
  lastInputBlock: {
    marginBottom: 50
  },
  containerInput: {
    width: '100%',
    marginBottom: -35,
    alignItems: 'center'
  }
})

const Register = (): JSX.Element => {
  const navigation = useNavigation()
  const { loanValue } = useContext(LoanContext)
  const { addressValue } = useContext(AddressContext)
  const { userValue, setUserValue } = useContext(UserContext)
  const { bankValue } = useContext(BankContext)
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined)
  const { productsValueAdmin } = useContext(ProductsAdminContext)

  const fetchingFirestore = useCallback(async () => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid || currentUser)
        .set(
          {
            profile: {
              civil_state: userValue.estadoCivil,
              cpf: userValue.cpf,
              dt_birth: userValue.dtAniversario,
              dtp_doc_emission: userValue.dtEmissaoRG,
              emission_org: userValue.orgaoRG,
              genre: userValue.sexo,
              mothers_name: userValue.nomeMae,
              name: userValue.nome,
              rg_number: userValue.numeroRG,
              uf_emission: userValue.ufEmissaoRG
            },
            address: {
              cep: addressValue.cep,
              city: addressValue.cidade,
              complement: addressValue.complemento,
              neighborhood: addressValue.bairro,
              number: addressValue.numero,
              street: addressValue.logradouro,
              uf: addressValue.uf
            },
            bank: {
              account: bankValue.conta,
              agency: bankValue.agencia,
              bank: bankValue.banco
            },
            business: {
              income: loanValue.renda,
              personal_model: loanValue.modalidade_pessoal
            }
          },
          { merge: true }
        )

      await firestore()
        .collection('products')
        .doc(auth().currentUser?.uid || currentUser)
        .set(
          {
            products: [
              {
                activity: false,
                status: 'Checking',
                margin: loanValue.margem,
                parcel: loanValue.nParcelas,
                parcel_value: loanValue.valorParcela,
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
                margin: loanValue.margem,
                parcel: loanValue.nParcelas,
                parcel_value: loanValue.valorParcela,
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
    } catch (error) {}
  }, [
    addressValue.bairro,
    addressValue.cep,
    addressValue.cidade,
    addressValue.complemento,
    addressValue.logradouro,
    addressValue.numero,
    addressValue.uf,
    bankValue.agencia,
    bankValue.banco,
    bankValue.conta,
    currentUser,
    loanValue.margem,
    loanValue.modalidade_pessoal,
    loanValue.nParcelas,
    loanValue.renda,
    loanValue.tipo_beneficio,
    loanValue.valorParcela,
    loanValue.valorSolicitado,
    productsValueAdmin,
    userValue.cpf,
    userValue.dtAniversario,
    userValue.dtEmissaoRG,
    userValue.estadoCivil,
    userValue.id,
    userValue.nome,
    userValue.nomeMae,
    userValue.numeroRG,
    userValue.orgaoRG,
    userValue.sexo,
    userValue.ufEmissaoRG
  ])

  useEffect(() => {
    if (currentUser !== undefined) {
      fetchingFirestore()
    }
  }, [currentUser, fetchingFirestore, setUserValue, userValue])

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.config.secondaryLight} action={() => navigation.goBack()} />
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          <View style={styles.containerScreen}>
            <Image style={styles.topImage} source={logo} />
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={async value => {
                setUserValue({ ...userValue, nome: value.name })
                if (value.name !== '' && value.email !== '' && value.password !== '') {
                  await auth()
                    .createUserWithEmailAndPassword(value.email, value.password)
                    .then(() => {
                      const user = auth().currentUser
                      setCurrentUser(auth().currentUser?.uid)
                      if (user !== null) {
                        user.updateProfile({
                          displayName: value.name
                        })
                      } else {
                        Alert.alert('Invalid e-mail or password')
                      }
                    })
                    .catch(() => {
                      Alert.alert('Invalid e-mail or password')
                    })
                }
              }}>
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.form}>
                  <Text style={styles.title}>Crie na sua conta</Text>
                  <Text style={styles.subTitle}>Faça parte da inovação do crédito</Text>
                  <View style={styles.containerInput}>
                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={10}
                        maxLenght={200}
                        label='Email'
                        secureTextEntry={false}
                        keyboardType='email-address'
                        width={320}
                        onChangeText={handleChange('email')}
                        value={values.email}
                      />
                    </View>
                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={10}
                        maxLenght={200}
                        label='Nome'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={320}
                        onChangeText={handleChange('name')}
                        value={values.name}
                      />
                    </View>
                    <View style={[styles.inputBlock, styles.lastInputBlock]}>
                      <InputText
                        marginHorizontal={10}
                        maxLenght={32}
                        label='Password'
                        secureTextEntry={true}
                        keyboardType='default'
                        width={320}
                        onChangeText={handleChange('password')}
                        value={values.password}
                      />
                    </View>

                    <Button
                      action={handleSubmit}
                      text='Criar'
                      backgroundColor={colors.secondary.secondary}
                      textColor={colors.config.light}
                      width={330}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Register
