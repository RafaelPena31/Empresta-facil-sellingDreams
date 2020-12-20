import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import logo from '../../Assets/img/logo.png'
import Button from '../../components/buttons/Button'
import LeftButton from '../../components/buttons/LeftButton'
import InputText from '../../components/form/InputText'
import { colors } from '../../design/_colors'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerScreen: {
    alignItems: 'center',
    minHeight: height,
    justifyContent: 'space-between'
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
    marginBottom: 55
  },
  containerInput: {
    width: '100%',
    marginBottom: -35,
    alignItems: 'center'
  }
})

const Login = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.config.secondaryLight} action={() => navigation.goBack()} />
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.bottomContainer} behavior='padding' keyboardVerticalOffset={10}>
            <View style={styles.containerScreen}>
              <Image style={styles.topImage} source={logo} />
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async value => {
                  if (value.email !== '' && value.password !== '') {
                    await auth()
                      .signInWithEmailAndPassword(value.email, value.password)
                      .catch(() => {
                        Alert.alert('Invalid e-mail or password')
                      })
                  } else {
                    Alert.alert('Invalid e-mail or password')
                  }
                }}>
                {({ handleChange, handleSubmit, values }) => (
                  <View style={styles.form}>
                    <Text style={styles.title}>Entre na sua conta</Text>
                    <Text style={styles.subTitle}>Faça parte da inovação do crédito</Text>
                    <View style={styles.containerInput}>
                      <View style={styles.inputBlock}>
                        <InputText
                          marginHorizontal={10}
                          maxLenght={200}
                          label='Email'
                          secureTextEntry={false}
                          keyboardType='email-address'
                          width={330}
                          onChangeText={handleChange('email')}
                          value={values.email}
                        />
                      </View>

                      <View style={[styles.inputBlock, styles.lastInputBlock]}>
                        <InputText
                          marginHorizontal={10}
                          maxLenght={32}
                          label='Password'
                          secureTextEntry={true}
                          keyboardType='default'
                          width={330}
                          onChangeText={handleChange('password')}
                          value={values.password}
                        />
                      </View>

                      <Button
                        action={handleSubmit}
                        text='Entrar'
                        backgroundColor={colors.secondary.secondary}
                        textColor={colors.config.light}
                        width={330}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Login
