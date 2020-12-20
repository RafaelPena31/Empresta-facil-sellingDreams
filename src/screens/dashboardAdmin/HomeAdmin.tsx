import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import backgroundImage from '../../Assets/img/backgroundBlueDetails.png'
import contactImage from '../../Assets/img/icons/empresta_contato.png'
import profileImage from '../../Assets/img/icons/empresta_perfil.png'
import verifyImage from '../../Assets/img/icons/empresta_verifica.png'
import logoImage from '../../Assets/img/logoFullWhite.png'
import LeftButton from '../../components/buttons/LeftButton'
import { AddressContext } from '../../context/AddressContext'
import { BankContext } from '../../context/BankContext'
import { ProductsContext } from '../../context/ProductsContext'
import { ProductsAdminContext } from '../../context/ProductsContextAdmin'
import { UserContext } from '../../context/UserContext'
import { colors } from '../../design/_colors'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary.primary,
    minHeight: height
  },
  headerContainer: {
    height: 300,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    color: colors.config.light
  },
  logo: {
    resizeMode: 'contain',
    width: 140,
    marginTop: -130
  },
  optionContainer: {
    alignItems: 'center',
    marginTop: -70,
    backgroundColor: colors.config.secondaryLight,
    paddingVertical: 70,
    borderTopStartRadius: 55,
    borderTopEndRadius: 55,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  touchableItem: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 8,
    paddingHorizontal: 17,
    marginBottom: 30,
    marginHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: colors.secondary.secondary,
    marginTop: 10
  },
  iconCard: {
    width: 45,
    height: 45
  }
})

export default function HomeAdmin() {
  const { setUserValue } = useContext(UserContext)
  const { setBankValue } = useContext(BankContext)
  const { setAddressValue } = useContext(AddressContext)
  const { setProductsValue } = useContext(ProductsContext)
  const { setProductsValueAdmin } = useContext(ProductsAdminContext)
  const navigation = useNavigation()

  const openUrl = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton
        name='exit-outline'
        size={45}
        color={colors.config.secondaryLight}
        action={() => {
          auth().signOut()
          setUserValue({})
          setBankValue({})
          setAddressValue({})
          setProductsValue([])
          setProductsValueAdmin([])
        }}
      />
      <ScrollView>
        <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.headerContainer}>
            <View style={styles.profileHeader}>
              <Text style={styles.title}>Seja bem vindo, Rafael</Text>
              <Image style={styles.logo} source={logoImage} />
            </View>
          </View>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => {
                navigation.navigate('Solicitation')
              }}>
              <Image style={styles.iconCard} source={verifyImage} />
              <Text style={styles.headerText}>SOLICITAÇÕES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => {
                openUrl(
                  'https://api.whatsapp.com/send?phone=5531994802465&text=Ol%C3%A1%2C%20gostaria%20de%20suporte%20sobre%20uma%20solicita%C3%A7%C3%A3o%20que%20foi%20aprovada%20no%20Empresta%20Live'
                )
              }}>
              <Image style={styles.iconCard} source={contactImage} />

              <Text style={styles.headerText}>ENTRE EM CONTATO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => {
                navigation.navigate('Profile')
              }}>
              <Image style={styles.iconCard} source={profileImage} />

              <Text style={styles.headerText}>PERFIL</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}
