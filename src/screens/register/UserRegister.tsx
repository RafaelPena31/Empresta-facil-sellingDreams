import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import logo from '../../Assets/img/logo.png'
import Button from '../../components/buttons/Button'
import LeftButton from '../../components/buttons/LeftButton'
import { CustomDropdown } from '../../components/form/CustomDropdown'
import DatePicker from '../../components/form/DateTimePicker'
import InputText from '../../components/form/InputText'
import { UserContext, UserContextProps } from '../../context/UserContext'
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

const UserRegister = (): JSX.Element => {
  const navigation = useNavigation()
  const { setUserValue } = useContext(UserContext)

  const genre = [
    {
      label: 'Masculino',
      value: 'Masculino'
    },
    {
      label: 'Feminino',
      value: 'Feminino'
    },
    {
      label: 'Outro',
      value: 'Outro'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.config.secondaryLight} action={() => navigation.goBack()} />
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          <View style={styles.containerScreen}>
            <Image style={styles.topImage} source={logo} />
            <Formik
              initialValues={{
                date_of_birth: '',
                cpf: '',
                gender: '',
                marital_status: '',
                mothers_name: '',
                rg_number: '',
                rg_uf_emission: '',
                rg_emission_date: '',
                rg_organization_emitter: ''
              }}
              onSubmit={value => {
                const data: UserContextProps = {
                  dtAniversario: value.date_of_birth,
                  cpf: value.cpf,
                  sexo: value.gender,
                  estadoCivil: value.marital_status,
                  nomeMae: value.mothers_name,
                  numeroRG: value.rg_number,
                  ufEmissaoRG: value.rg_uf_emission,
                  dtEmissaoRG: value.rg_emission_date,
                  orgaoRG: value.rg_organization_emitter
                }
                setUserValue(data)
                navigation.navigate('AddressRegister')
              }}>
              {({ handleChange, handleSubmit, setFieldValue, values }) => (
                <View style={styles.form}>
                  <Text style={styles.title}>Finalize o cadastro da sua conta</Text>
                  <Text style={styles.subTitle}>Faça parte da inovação do crédito Empresta</Text>
                  <View style={styles.containerInput}>
                    <View style={styles.viewBlock}>
                      <DatePicker
                        onDataSet={setFieldValue}
                        width={320}
                        initialText='SELECIONE SUA DATA DE ANIVERSÁRIO'
                        field='dtAniversario'
                      />
                    </View>
                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={25}
                        label='CPF'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={190}
                        value={values.cpf}
                        onChangeText={handleChange('cpf')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='ESTADO CIVIL'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={120}
                        value={values.marital_status}
                        onChangeText={handleChange('marital_status')}
                      />
                    </View>

                    <View style={styles.inputBlock}>
                      <CustomDropdown
                        dropDownData={genre}
                        placeHolder='Gênero'
                        label='sexo'
                        setSelectedItem={setFieldValue}
                        initialValue=''
                      />
                    </View>

                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={200}
                        label='NOME DA MÃE'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={320}
                        value={values.mothers_name}
                        onChangeText={handleChange('mothers_name')}
                      />
                    </View>

                    <View style={styles.inputBlock}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={13}
                        label='NÚMERO RG'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={190}
                        value={values.rg_number}
                        onChangeText={handleChange('rg_number')}
                      />

                      <InputText
                        marginHorizontal={5}
                        maxLenght={2}
                        label='UF EMISSÃO RG'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={120}
                        value={values.rg_uf_emission}
                        onChangeText={handleChange('rg_uf_emission')}
                      />
                    </View>

                    <View style={styles.inputBlock}>
                      <DatePicker field='dtEmissaoRG' onDataSet={handleChange} width={320} initialText='DATA DE EMISSÃO DO RG' />
                    </View>

                    <View style={[styles.inputBlock, styles.lastViewBlock]}>
                      <InputText
                        marginHorizontal={5}
                        maxLenght={170}
                        label='ORGÃO EMISSOR RG'
                        secureTextEntry={false}
                        keyboardType='default'
                        width={320}
                        value={values.rg_organization_emitter}
                        onChangeText={handleChange('rg_organization_emitter')}
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

export default UserRegister
