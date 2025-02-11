import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import LoadingScreen from './components/toast/LoadingScreen'
import HeroSection from './components/Home/HeroSection'
import CardSection from './components/Home/CardSection'
import AboutSection from './components/Home/AboutSection'
import TeamSection from './components/Home/TeamSection'

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const cardData = [
    {
      image: require('../../../assets/trynow.png'),
      title: 'Try Now',
      description:
        'Click the "Try Now" button, and you will be redirected to the Evaluation Page. On this page, you will be required to enter the last four digits of your Senior Citizen ID. After providing the digits, the system will perform facial recognition scanning to verify your identity.',
    },
    {
      image: require('../../../assets/afterverification.png'),
      title: 'After Verification',
      description:
        'Once your identity has been verified, you can proceed with the evaluation. The first step is selecting your preferred language—either English or Tagalog. After choosing your language, you can move forward with the evaluation process.',
    },
    {
      image: require('../../../assets/evaluationprocess.png'),
      title: 'Evaluation Process',
      description:
        "The evaluation leverages text-to-speech to read questions aloud and speech-to-text to capture your spoken responses, minimizing the need for typing. The system prompts ‘Waiting’ while it’s talking and ‘Listening’ when it's ready for your answers. It's intuitive, requiring only a bit of patience as it processes each step.",
    },
  ]

  const teamCardData = [
    {
      image: require('../../../assets/trynow.png'),
      name: 'Pops V. Madriaga',
      position: 'Project Adviser',
    },
    {
      image: require('../../../assets/afterverification.png'),
      name: 'Derick James M. Espinosa',
      position: 'Backend Developer',
    },
    {
      image: require('../../../assets/SERV_Dacumos.png'),
      name: 'Angelo Miguel S. Dacumos',
      position: 'Frontend Developer',
    },
    {
      image: require('../../../assets/evaluationprocess.png'),
      name: 'Jazlyn Yvonne S. Baluarte',
      position: 'UI/UX Designer',
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <LoadingScreen loading={loading} />
      {!loading && (
        <ScrollView>
          <HeroSection />
          <CardSection cardData={cardData} />
          <AboutSection />
          <TeamSection teamCardData={teamCardData} />
        </ScrollView>
      )}
    </View>
  )
}

export default Home
