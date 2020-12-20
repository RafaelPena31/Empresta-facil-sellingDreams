import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import configImage from '../../Assets/img/icons/empresta_config.png'
import addresssImage from '../../Assets/img/icons/empresta_endereco.png'
import profileImage from '../../Assets/img/icons/empresta_perfil.png'
import securityImage from '../../Assets/img/icons/empresta_seguranca.png'
import logo from '../../Assets/img/logo.png'
import LeftButton from '../../components/buttons/LeftButton'
import InputText from '../../components/form/InputText'
import { colors } from '../../design/_colors'

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  profileContainer: {
    paddingHorizontal: 30,
    backgroundColor: colors.config.secondaryLight
  },
  iconCard: {
    width: 45,
    height: 45
  },
  profileHeader: {
    position: 'relative',
    backgroundColor: colors.primary.primary,
    alignItems: 'center',
    height: 250,
    padding: 30
  },
  textHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#ffffff'
  },
  titleContent: {
    position: 'absolute',
    left: 0,
    marginTop: 135,
    marginLeft: 30
  },
  textLabelHeader: {
    color: colors.config.secondaryLight,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20
  },
  textTitleHeader: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16
  },
  valueContent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginHorizontal: 30,
    marginVertical: 20
  },
  textValueLabelHeader: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    textAlign: 'right'
  },
  textValueHeader: {
    color: '#ffffff',
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'right'
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 10
  },
  logoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#ffffff',
    marginLeft: 20
  },
  buttonContentTransaction: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonTransaction: {
    backgroundColor: colors.config.light,
    width: 157,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  buttonTransaction2: {
    backgroundColor: colors.config.light,
    width: 334,
    height: 115,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  buttonTransaction3: {
    borderColor: colors.primary.primary,
    borderWidth: 4,
    width: 334,
    height: 115,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20
  },
  buttonTransactionText: {
    color: colors.primary.primary,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: 155
  },
  buttonTransactionText2: {
    color: colors.primary.primary,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: 155
  },
  infoContent: {
    marginTop: 30
  },
  infoUnit: {
    marginVertical: 10,
    flexDirection: 'row',

    alignItems: 'center'
  },
  infoLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.primary.primary,
    marginRight: 10
  },
  infoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    maxWidth: 255
  },
  dividerContainer: {
    width: 330,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dividerText: {
    color: colors.primary.primary_80,
    fontFamily: 'Montserrat-Light'
  },
  topImage: {
    width: '90%',
    resizeMode: 'contain',
    marginTop: -90
  },
  lastIcon: {
    margin: 15
  },
  inputBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  lastInputBlock: {
    marginBottom: 50
  },
  lastViewBlock: {
    marginBottom: 20
  }
})

const BuyModalStyle = StyleSheet.create({
  config: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  container: {
    backgroundColor: '#ffffff',
    width: 350,
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
  titleModal: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 19,
    color: colors.primary.primary
  },
  formModal: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.primary.primary,
    borderRadius: 25,
    marginBottom: 15
  },
  picker: {
    width: 280
  },
  txtModal: {
    borderWidth: 1,
    borderColor: colors.primary.primary,
    borderRadius: 25,
    paddingLeft: 10,
    width: 280
  },
  buttonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  buttonModal: {
    width: 290,
    backgroundColor: colors.primary.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    marginVertical: 5,
    borderRadius: 25
  },
  buttonModalText: {
    color: '#ffffff',
    fontFamily: 'Roboto-Bold',
    fontSize: 16
  }
})

const Profile = (): JSX.Element => {
  const [emailVisible, setEmailVisible] = useState<boolean>(false)
  const [emailValue, setEmailValue] = useState<string>('')
  const [passVisible, setPassVisible] = useState<boolean>(false)
  const [passValue, setPassValue] = useState<string>('')
  const [nameVisible, setNameVisible] = useState<boolean>(false)
  const [nameValue, setNameValue] = useState<string>('')
  const [addressVisible, setAddressVisible] = useState<boolean>(false)
  const [bankVisible, setBankVisible] = useState<boolean>(false)

  const navigation = useNavigation()
  async function handleUploadEmail() {
    if (emailValue.length > 8) {
      await auth()
        .currentUser?.updateEmail(emailValue)
        .then(() => {
          Alert.alert('E-mail atualizado com sucesso')
        })
        .catch(() => {
          Alert.alert('Nós não conseguimos atualizar o seu e-mail agora. Tente novamente mais tarde.')
          setEmailVisible(!emailVisible)
        })
    } else {
      Alert.alert('Valor inválido')
    }
    setEmailValue('')
  }
  async function handleUploadPass() {
    if (passValue !== '' && passValue.length > 5) {
      try {
        await auth().currentUser?.updatePassword(passValue)
        Alert.alert('Senha atualizada com sucesso')
        setPassVisible(!passVisible)
      } catch (err) {
        Alert.alert('Nós não conseguimos atualizar o seu e-mail agora. Tente novamente mais tarde.')
        setPassVisible(!passVisible)
      }
    } else {
      Alert.alert('Valor inválido')
    }
    setPassValue('')
  }
  async function handleUploadName() {
    if (nameValue !== '' && nameValue.length > 2) {
      try {
        firestore().collection('users').doc(auth().currentUser?.uid).update({ name: nameValue })
        Alert.alert('Nome atualizado com sucesso')
        setNameVisible(!nameVisible)
      } catch (error) {
        Alert.alert('Nós não conseguimos atualizar o seu e-mail agora. Tente novamente mais tarde.')
        setNameVisible(!nameVisible)
      }
    }
    setNameValue('')
  }

  return (
    <SafeAreaView style={style.container}>
      {/* Modais */}

      {/* Email */}

      <Modal animationType='fade' transparent visible={emailVisible} statusBarTranslucent style={BuyModalStyle.config}>
        <SafeAreaView style={BuyModalStyle.centeredView}>
          <View style={BuyModalStyle.container}>
            <Text style={BuyModalStyle.titleModal}>Atualize o seu e-mail</Text>
            <View style={BuyModalStyle.formModal}>
              <View style={style.inputBlock}>
                <InputText
                  marginHorizontal={5}
                  maxLenght={200}
                  label='E-mail'
                  secureTextEntry={false}
                  keyboardType='default'
                  width={280}
                  value={emailValue}
                  onChangeText={e => setEmailValue(e)}
                />
              </View>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={handleUploadEmail}>
                <Text style={BuyModalStyle.buttonModalText}>Atualizar</Text>
              </TouchableHighlight>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={() => setEmailVisible(!emailVisible)}>
                <Text style={BuyModalStyle.buttonModalText}>Cancelar atualização</Text>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Email */}

      {/* Password */}

      <Modal animationType='fade' transparent visible={passVisible} statusBarTranslucent style={BuyModalStyle.config}>
        <SafeAreaView style={BuyModalStyle.centeredView}>
          <View style={BuyModalStyle.container}>
            <Text style={BuyModalStyle.titleModal}>Atualize sua senha</Text>
            <View style={BuyModalStyle.formModal}>
              <View style={style.inputBlock}>
                <InputText
                  marginHorizontal={5}
                  maxLenght={200}
                  label='Senha'
                  secureTextEntry={false}
                  keyboardType='default'
                  width={280}
                  value={passValue}
                  onChangeText={e => setPassValue(e)}
                />
              </View>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={handleUploadPass}>
                <Text style={BuyModalStyle.buttonModalText}>Atualizar</Text>
              </TouchableHighlight>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={() => setPassVisible(!passVisible)}>
                <Text style={BuyModalStyle.buttonModalText}>Cancelar Atualização</Text>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Password */}

      {/* DisplayName */}

      <Modal animationType='fade' transparent visible={nameVisible} statusBarTranslucent style={BuyModalStyle.config}>
        <SafeAreaView style={BuyModalStyle.centeredView}>
          <View style={BuyModalStyle.container}>
            <Text style={BuyModalStyle.titleModal}>Atualize seu nome</Text>
            <View style={BuyModalStyle.formModal}>
              <View style={style.inputBlock}>
                <InputText
                  marginHorizontal={5}
                  maxLenght={200}
                  label='Nome'
                  secureTextEntry={false}
                  keyboardType='default'
                  width={280}
                  value={nameValue}
                  onChangeText={e => setNameValue(e)}
                />
              </View>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={handleUploadName}>
                <Text style={BuyModalStyle.buttonModalText}>Atualizar</Text>
              </TouchableHighlight>
              <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={() => setNameVisible(!nameVisible)}>
                <Text style={BuyModalStyle.buttonModalText}>Cancelar Atualização</Text>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* DisplayName */}

      {/* Address */}

      <Modal animationType='fade' transparent visible={addressVisible} statusBarTranslucent style={BuyModalStyle.config}>
        <SafeAreaView style={BuyModalStyle.centeredView}>
          <View style={BuyModalStyle.container}>
            <Text style={BuyModalStyle.titleModal}>Atualize seu endereço</Text>
            <View style={BuyModalStyle.formModal}>
              <Formik
                initialValues={{
                  zipcode: '',
                  uf: '',
                  city: '',
                  neighborhood: '',
                  public_place: '',
                  public_place_number: '',
                  complement: ''
                }}
                onSubmit={value => {
                  try {
                    firestore().collection('users').doc(auth().currentUser?.uid).update({
                      zipcode: value.zipcode,
                      uf: value.uf,
                      city: value.city,
                      neighborhood: value.neighborhood,
                      public_place: value.public_place,
                      public_place_number: value.public_place_number,
                      complement: value.complement
                    })
                    Alert.alert('Endereço atualizado com sucesso')
                    setAddressVisible(!addressVisible)
                  } catch (error) {
                    Alert.alert('Nós não conseguimos atualizar o seu endereço agora. Tente novamente mais tarde.')
                    setAddressVisible(!addressVisible)
                  }
                }}>
                {({ handleChange, handleSubmit, values }) => (
                  <>
                    <View style={style.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={8}
                        label='CEP'
                        secureTextEntry={false}
                        keyboardType='phone-pad'
                        width={200}
                        value={values.zipcode}
                        onChangeText={handleChange('zipcode')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={2}
                        label='UF'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={70}
                        value={values.uf}
                        onChangeText={handleChange('uf')}
                      />
                    </View>

                    <View style={style.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='CIDADE'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={135}
                        value={values.city}
                        onChangeText={handleChange('city')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='BAIRRO'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={135}
                        value={values.neighborhood}
                        onChangeText={handleChange('neighborhood')}
                      />
                    </View>

                    <View style={style.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='LOGRADOURO'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={190}
                        value={values.public_place}
                        onChangeText={handleChange('public_place')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='NÚMERO'
                        secureTextEntry={false}
                        keyboardType='phone-pad'
                        width={80}
                        value={values.public_place_number}
                        onChangeText={handleChange('public_place_number')}
                      />
                    </View>

                    <View style={[style.inputBlock, style.lastViewBlock]}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='COMPLEMENTO'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={300}
                        value={values.complement}
                        onChangeText={handleChange('complement')}
                      />
                    </View>
                    <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={handleSubmit}>
                      <Text style={BuyModalStyle.buttonModalText}>Atualizar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={() => setAddressVisible(!addressVisible)}>
                      <Text style={BuyModalStyle.buttonModalText}>Cancelar Atualização</Text>
                    </TouchableHighlight>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Address */}

      {/* Bank */}

      <Modal animationType='fade' transparent visible={bankVisible} statusBarTranslucent style={BuyModalStyle.config}>
        <SafeAreaView style={BuyModalStyle.centeredView}>
          <View style={BuyModalStyle.container}>
            <Text style={BuyModalStyle.titleModal}>Atualize seu endereço</Text>
            <View style={BuyModalStyle.formModal}>
              <Formik
                initialValues={{
                  agency: '',
                  account: '',
                  bank: ''
                }}
                onSubmit={value => {
                  try {
                    firestore().collection('users').doc(auth().currentUser?.uid).update({
                      agency: value.agency,
                      account: value.account,
                      bank: value.bank
                    })
                    Alert.alert('Banco atualizado com sucesso')
                    setBankVisible(!bankVisible)
                  } catch (error) {
                    Alert.alert('Nós não conseguimos atualizar o seu banco agora. Tente novamente mais tarde.')
                    setBankVisible(!bankVisible)
                  }
                }}>
                {({ handleChange, handleSubmit, values }) => (
                  <>
                    <View style={style.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='BANCO'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={160}
                        value={values.bank}
                        onChangeText={handleChange('public_place')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='AGÊNCIA'
                        secureTextEntry={false}
                        keyboardType='phone-pad'
                        width={110}
                        value={values.agency}
                        onChangeText={handleChange('public_place_number')}
                      />
                    </View>

                    <View style={[style.inputBlock, style.lastViewBlock]}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='CONTA'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={300}
                        value={values.bank}
                        onChangeText={handleChange('complement')}
                      />
                    </View>
                    <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={handleSubmit}>
                      <Text style={BuyModalStyle.buttonModalText}>Atualizar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={BuyModalStyle.buttonModal} onPress={() => setBankVisible(!bankVisible)}>
                      <Text style={BuyModalStyle.buttonModalText}>Cancelar Atualização</Text>
                    </TouchableHighlight>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Bank */}

      {/* Modais */}

      <StatusBar hidden />
      <LeftButton name='arrow-back' size={45} color={colors.config.secondaryLight} action={() => navigation.goBack()} />
      <ScrollView>
        <LinearGradient colors={[colors.primary.primary, colors.primary.primary]} useAngle angle={290} angleCenter={{ x: 0, y: 1 }}>
          <ImageBackground resizeMode='stretch' source={backgroundImage} style={style.profileHeader}>
            <Image style={style.topImage} source={logo} />
            <View style={style.titleContent}>
              <Text style={style.textLabelHeader}>Bem vindo,</Text>
              <Text style={style.textTitleHeader}>{auth().currentUser?.displayName}</Text>
            </View>
          </ImageBackground>
        </LinearGradient>

        <View style={style.profileContainer}>
          <View style={style.infoContent}>
            <View style={style.infoUnit}>
              <Text style={style.infoLabel}>E-mail:</Text>
              <Text style={style.infoText}>{auth().currentUser?.email}</Text>
            </View>
          </View>

          <View style={style.dividerContainer}>
            <Text style={style.dividerText}> ─ Opções do perfil ────────</Text>
          </View>

          <View>
            <View style={style.buttonContentTransaction}>
              <TouchableOpacity style={style.buttonTransaction} onPress={() => setEmailVisible(!emailVisible)}>
                <Image style={style.iconCard} source={configImage} />
                <Text style={[style.buttonTransactionText]}>Altere seu e-mail</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.buttonTransaction} onPress={() => setPassVisible(!passVisible)}>
                <Image style={style.iconCard} source={securityImage} />
                <Text style={[style.buttonTransactionText]}>Altere sua senha</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.buttonTransaction2} onPress={() => setNameVisible(!nameVisible)}>
              <Image style={style.iconCard} source={profileImage} />
              <Text style={[style.buttonTransactionText]}>Altere seu nome </Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonTransaction2} onPress={() => setAddressVisible(!addressVisible)}>
              <Image style={style.iconCard} source={addresssImage} />
              <Text style={[style.buttonTransactionText]}>Altere seu endereço </Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonTransaction2} onPress={() => setBankVisible(!bankVisible)}>
              <Image style={style.iconCard} source={addresssImage} />
              <Text style={[style.buttonTransactionText]}>Altere sua conta bancária </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
