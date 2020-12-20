import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import avatarImage from '../../Assets/img/avatar/avatar1.png'
import LeftButton from '../../components/buttons/LeftButton'
import RadioButtonGroup from '../../components/buttons/RadioButtonGroup'
import { LoanContext } from '../../context/LoanContext'
import { colors } from '../../design/_colors'
import api from '../../services/api'

interface JsonCurrentQuestionTypes {
  key: string
  question: string
  options: OptionValueProps[]
  nextStep: string
  redirect?: boolean
}

const chatMock: Record<string, JsonCurrentQuestionTypes> = {
  'EMP-PERSONALIZADO': {
    key: 'EMP-PERSONALIZADO',
    question: 'Você deseja fazer um refinanciamento ?',
    options: [
      { text: 'Sim', type: 'Sim' },
      { text: 'Não', type: 'Não' }
    ],
    nextStep: 'VALOR-DIVIDA'
  },
  'VALOR-DIVIDA': {
    key: 'VALOR-DIVIDA',
    question: 'Qual o valor do seu financiamento ?',
    options: [
      { text: '1250', type: 'valor_solicitado' },
      { text: '2250', type: 'valor_solicitado' },
      { text: '3750', type: 'valor_solicitado' },
      { text: '5250', type: 'valor_solicitado' },
      { text: '6750', type: 'valor_solicitado' },
      { text: '7750', type: 'valor_solicitado' },
      { text: '8000', type: 'valor_solicitado' }
    ],
    nextStep: 'VALOR-JUROS'
  },
  'VALOR-JUROS': {
    key: 'VALOR-JUROS',
    question: 'Qual o juros ao mês ?',
    options: [
      { text: '1', type: 'juros' },
      { text: '2', type: 'juros' },
      { text: '3', type: 'juros' },
      { text: '4', type: 'juros' },
      { text: '5', type: 'juros' },
      { text: '6', type: 'juros' },
      { text: '7', type: 'juros' },
      { text: '8', type: 'juros' },
      { text: '9', type: 'juros' },
      { text: '10', type: 'juros' }
    ],
    nextStep: 'END'
  },
  'VALOR-SALARIO': {
    key: 'VALOR-SALARIO',
    question: 'Qual o valor da sua renda (em reais)?',
    options: [
      { text: '1250', type: 'renda' },
      { text: '2250', type: 'renda' },
      { text: '3750', type: 'renda' },
      { text: '5250', type: 'renda' },
      { text: '6750', type: 'renda' },
      { text: '7750', type: 'renda' },
      { text: '8000', type: 'renda' }
    ],
    nextStep: 'END'
  },
  'EMP-VIAGEM': {
    key: 'EMP-VIAGEM',
    question: 'Qual o destino da sua viagem ?',
    options: [
      { text: 'Nacional', type: 'viagem' },
      { text: 'Internacional', type: 'viagem' }
    ],
    nextStep: 'QT-DIAS'
  },
  'QT-DIAS': {
    key: 'QT-DIAS',
    question: 'Quantos dias ?',
    options: [
      { text: '1', type: 'qtd_dias_viagem' },
      { text: '2', type: 'qtd_dias_viagem' },
      { text: '3', type: 'qtd_dias_viagem' },
      { text: '4', type: 'qtd_dias_viagem' },
      { text: '5', type: 'qtd_dias_viagem' },
      { text: '6', type: 'qtd_dias_viagem' },
      { text: '7', type: 'qtd_dias_viagem' },
      { text: '10', type: 'qtd_dias_viagem' },
      { text: '14', type: 'qtd_dias_viagem' },
      { text: '20', type: 'qtd_dias_viagem' },
      { text: '30', type: 'qtd_dias_viagem' }
    ],
    nextStep: 'QT-PESSOAS'
  },
  'QT-PESSOAS': {
    key: 'QT-PESSOAS',
    question: 'Quantas pessoas ?',
    options: [
      { text: '1', type: 'qtd_pessoas_viagem' },
      { text: '2', type: 'qtd_pessoas_viagem' },
      { text: '3', type: 'qtd_pessoas_viagem' },
      { text: '4', type: 'qtd_pessoas_viagem' },
      { text: '5', type: 'qtd_pessoas_viagem' },
      { text: 'Mais de 5 pessoas', type: 'qtd_pessoas_viagem' }
    ],
    nextStep: 'END'
  }
}

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.config.secondaryLight
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
  }
})

export interface OptionValueProps {
  text: string
  type: string
}

export default function Chatbot() {
  const navigation = useNavigation()

  const [avatarText, setAvatarText] = useState<string>('Seja bem vindo! Meu nome é Rafael. Em que posso ajudar?')
  const [endConversation, setEndConversation] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<JsonCurrentQuestionTypes>(chatMock['EMP-PERSONALIZADO'])
  const [optionValue, setOptionValue] = useState<OptionValueProps>({ text: '', type: '' })
  const [radioButtonObjectData, setRadioButtonObjectData] = useState<string[]>()
  const [flow, setFlow] = useState<boolean>(true)
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const { loanValue, setLoanValue } = useContext(LoanContext)

  useEffect(() => {
    async function loadData() {
      const jsonData = {
        text: 'Olá',
        email: 'string',
        sessionId: 'string'
      }
      const response = await api.post('/chat', jsonData)

      setRadioButtonObjectData(response.data.options)
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!flow) {
      setAvatarText(chatMock[`${currentQuestion.key}`].question)
      setRadioButtonObjectData(chatMock[`${currentQuestion.key}`].options)
      setCurrentQuestion(chatMock[`${currentQuestion.nextStep}`])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow])

  useEffect(() => {
    if (currentQuestion?.nextStep === 'END' && isClicked) {
      setIsRegister(true)
    }
  }, [currentQuestion, isClicked])

  async function clickNextButton() {
    try {
      setIsClicked(!isClicked)
      if (optionValue?.text === 'Empréstimo personalizado') {
        await setFlow(false)
      }

      if (flow && optionValue?.text !== 'Empréstimo personalizado') {
        const jsonData = {
          text: optionValue?.text,
          email: 'string',
          sessionId: 'string'
        }
        const response = await api.post('/chat', jsonData)
        setAvatarText(response.data.message[0])

        if (!endConversation) {
          setRadioButtonObjectData(response.data.options)

          setEndConversation(response.data.endConversation)
        } else {
          navigation.navigate('ChatbotOtherData')
        }
      } else {
        setAvatarText(chatMock[`${currentQuestion.key}`].question)
        setRadioButtonObjectData(chatMock[`${currentQuestion.key}`].options)
        setLoanValue({ ...loanValue, [optionValue?.type]: optionValue?.text })
        if (isRegister) {
          navigation.navigate('ChatbotOtherData')
        }
        if (currentQuestion.nextStep !== 'END') {
          setCurrentQuestion(chatMock[`${currentQuestion.nextStep}`])
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const action = (props: { text: string; type: string }) => {
    setOptionValue(props)

    if (props.type !== 'tipo_beneficio' && props.type !== 'modalidade_pessoal') {
      setLoanValue({ ...loanValue, juros: parseFloat(props.type) })
    } else {
      setLoanValue({ ...loanValue, [props.type]: props.text })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LeftButton name='arrow-back' size={45} color={colors.primary.primary} action={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.containerScreen}>
          <View style={styles.chatContainer}>
            <View style={styles.containerAvatar}>
              <Image source={avatarImage} style={styles.avatar} />
              <View style={styles.msgContainer}>
                <Text style={[styles.msgText]}>{avatarText}</Text>
              </View>
            </View>
            <View>
              <RadioButtonGroup action={action} objectValue={radioButtonObjectData} currentValue={optionValue} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.helpFooterEncapsulate}>
        <TouchableOpacity style={styles.clerkButton}>
          <Icon name='message' size={30} color={colors.primary.primary} />
          <Text style={styles.clerkTextButton}>Dúvidas? Fale com um atendente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={clickNextButton}>
          <Text style={styles.nextTextButton}>Próximo</Text>
          <Icon name='arrow-right-alt' size={30} color={colors.config.light} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
