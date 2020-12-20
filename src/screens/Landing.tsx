import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import avatarImage from '../Assets/img/avatar/avatar3.png'
import backgroundImage from '../Assets/img/backgroundWhite.png'
import logoImage from '../Assets/img/logoWhite.png'
import Button from '../components/buttons/Button'
import { colors } from '../design/_colors'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    backgroundColor: colors.config.secondaryLight
  },
  containerScreen: {
    marginTop: -20,
    minHeight: height,
    alignItems: 'center',
    width: '100%'
  },
  backgroundImage: {
    minHeight: height,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.config.secondaryLight
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: -40
  },
  avatar: {
    width: 90,
    marginLeft: -5,
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: colors.primary.primary,
    textAlign: 'left',
    maxWidth: 220
  },
  containerAvatar: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -80
  },
  btnContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: 28,
    textAlign: 'left',
    color: colors.primary.primary,
    marginBottom: 30,
    marginLeft: 10
  },
  chatContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
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
  }
})

export default function Landing() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground resizeMode='cover' source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.containerScreen}>
            <Image source={logoImage} style={[styles.image]} />
            <View style={styles.containerAvatar}>
              <Image source={avatarImage} style={[styles.avatar]} />
              <View style={styles.chatContainer}>
                <Text style={[styles.title]}>Seja bem vindo! Meu nome é Lucas.</Text>
                <Text style={[styles.title]}>Em que posso ajudar?</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.subTitle}>Participe dessa revolução do crédito com a gente</Text>
              <Button
                text='Solicitar um produto'
                action={() => navigation.navigate('Chatbot')}
                backgroundColor={colors.primary.primary}
                textColor='#ffffff'
                width={425}
              />
              <Button
                text='Já possuo conta'
                action={() => navigation.navigate('Login')}
                backgroundColor='#ffffff'
                textColor={colors.primary.primary}
                width={425}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
