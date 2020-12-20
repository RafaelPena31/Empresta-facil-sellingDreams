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
import lockedImage from '../../Assets/img/icons/empresta_seguranca.png'
import unlockedImage from '../../Assets/img/icons/empresta_segurancaAberta.png'
import listImage from '../../Assets/img/icons/list.png'
import logoImage from '../../Assets/img/logoFullWhite.png'
import Button from '../../components/buttons/Button'
import { ProductsAdminContext } from '../../context/ProductsContextAdmin'
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
    height: 250,
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
    fontSize: 27,
    color: colors.config.light,
    textAlign: 'center'
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
    paddingVertical: 20,
    borderTopStartRadius: 55,
    borderTopEndRadius: 55,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  touchableItem: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '90%',
    height: 150,
    borderRadius: 8,
    paddingHorizontal: 17,
    marginBottom: 30,
    marginHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    textAlign: 'left',
    marginTop: 7
  },
  headerSecondaryText: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginTop: 7
  },
  iconCard: {
    position: 'absolute',
    right: 0,
    width: 70,
    height: 70
  },
  Emptycontainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconEmpty: {
    width: 150,
    height: 150,
    opacity: 0.6
  },
  textEmpty: {
    maxWidth: 300,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.text.subTitle_color
  },
  buttonContainer: {
    backgroundColor: colors.config.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default function SolicitationAdmin() {
  const navigation = useNavigation()
  const { productsValueAdmin } = useContext(ProductsAdminContext)
  const arrayProd = productsValueAdmin.filter(item => item.activity === false)

  const openUrl = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.headerContainer}>
            <View style={styles.profileHeader}>
              <Text style={styles.title}>Solicitações de compra em andamento:</Text>
              <Image style={styles.logo} source={logoImage} />
            </View>
          </View>

          <View style={styles.optionContainer}>
            {arrayProd?.length !== 0 ? (
              arrayProd?.map(productItem => {
                return (
                  <TouchableOpacity
                    key={productItem.value}
                    style={styles.touchableItem}
                    onPress={() => {
                      productItem.status !== 'Checking'
                        ? openUrl(
                            'https://api.whatsapp.com/send?phone=5531994802465&text=Ol%C3%A1%2C%20gostaria%20de%20suporte%20sobre%20uma%20solicita%C3%A7%C3%A3o%20que%20foi%20aprovada%20no%20Empresta%20Live'
                          )
                        : null
                    }}>
                    <Text style={[styles.headerText, { color: colors.secondary.secondary }]}>
                      PRODUTO: {productItem.type.toUpperCase()}
                    </Text>
                    <Text style={[styles.headerSecondaryText, { color: colors.primary.primary }]}>
                      STATUS: {productItem.status.toUpperCase()}
                    </Text>
                    <Text style={[styles.headerSecondaryText, { color: colors.primary.primary }]}>
                      VALOR: R$ {productItem.value.toFixed(2)}
                    </Text>
                    <Text style={[styles.headerSecondaryText, { color: colors.primary.primary }]}>
                      Nº DE PARCELAS: {productItem.parcel.toString().toUpperCase()}x
                    </Text>
                    <Image source={productItem.status === 'Checking' ? lockedImage : unlockedImage} style={styles.iconCard} />
                  </TouchableOpacity>
                )
              })
            ) : (
              <View style={styles.Emptycontainer}>
                <Image source={listImage} style={styles.iconEmpty} />
                <Text style={styles.textEmpty}>Você não possui nenhum produto ativo registrado em seu CPF</Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text='Criar nova solicitação +'
          action={() => navigation.navigate('Chatbot')}
          backgroundColor='#ffffff'
          textColor={colors.primary.primary}
          width={350}
        />
      </View>
    </SafeAreaView>
  )
}
