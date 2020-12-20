import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import logo from '../../Assets/img/logo.png'
import Button from '../../components/buttons/Button'
import LeftButton from '../../components/buttons/LeftButton'
import InputText from '../../components/form/InputText'
import { BankContext, BankContextProps } from '../../context/BankContext'
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
    textAlign: 'center',
    color: colors.secondary.secondary
  },
  subTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    textAlign: 'center',
    color: colors.text.subTitle_color,
    marginBottom: 100
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
  containerInput: {
    width: '100%',
    marginBottom: -35,
    alignItems: 'center',
    justifyContent: 'center'
  },

  viewBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastViewBlock: {
    marginBottom: 20
  }
})

const DocumentRegister = (): JSX.Element => {
  const navigation = useNavigation()
  const { setBankValue } = useContext(BankContext)

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.config.secondaryLight} action={() => navigation.goBack()} />
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          <View style={styles.containerScreen}>
            <Image style={styles.topImage} source={logo} />
            <Formik
              initialValues={{ account: '', agency: '', bank: '' }}
              onSubmit={value => {
                const data: BankContextProps = {
                  banco: value.bank,
                  agencia: parseInt(value.agency, 10),
                  conta: value.account
                }
                setBankValue(data)
                navigation.navigate('Register')
              }}>
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.form}>
                  <Text style={styles.title}>Finalize o cadastro da sua conta</Text>
                  <Text style={styles.subTitle}>Faça parte da inovação do crédito Empresta</Text>
                  <View style={styles.containerInput}>
                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={15}
                        label='CONTA'
                        secureTextEntry={false}
                        keyboardType='phone-pad'
                        width={190}
                        value={values.account}
                        onChangeText={handleChange('account')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={7}
                        label='AGÊNCIA'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={120}
                        value={values.agency}
                        onChangeText={handleChange('agency')}
                      />
                    </View>

                    <View style={[styles.inputBlock, styles.lastViewBlock]}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='BANCO'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={320}
                        value={values.bank}
                        onChangeText={handleChange('bank')}
                      />
                    </View>

                    <Button
                      action={handleSubmit}
                      text='Continuar'
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

export default DocumentRegister
