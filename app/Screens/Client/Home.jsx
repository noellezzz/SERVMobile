import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Image,
} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import HeroSection from './Sections/HeroSection'
import Octicons from '@expo/vector-icons/Octicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import IconTile from '@/Components/Card/IconTile'
import LineChartGrad from '@/Components/Charts/LineChartGrad'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import ContainerTile from '@/Components/Card/ContainerTile'
import user from '@/../assets/images/user.jpg'
import SplitLayoutImage from '@/Components/Layouts/SplitLayoutImage'
import Check from '@/../assets/svg/check.svg'
import Ai from '@/../assets/svg/ai.svg'
import Voice from '@/../assets/svg/voice.svg'

const Home = () => {
  const { width, height } = useWindowDimensions()

  const lineData = [
    { value: 0 },
    { value: 20 },
    { value: 18 },
    { value: 40 },
    { value: 10 },
    { value: 60 },
    { value: 54 },
    { value: 30 },
  ]

  return (
    <ScrollView style={{ height: '100%', flex: 1 }}>
      <StatusBar style="light" />
      <View
        style={{ position: 'absolute', top: 0, height: 700, width: '100%' }}
      >
        <HeroSection style={{ position: 'absolute', zIndex: 1 }} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 700,
          width: '100%',
          marginTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 800,
              fontSize: 26,
            }}
          >
            Welcome to SERV!
          </Text>
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Octicons name="gear" size={24} color="#fefefe" />
          </View>
        </View>

        <Text style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>
          Live Sentiments Stats
        </Text>
        <View
          style={{
            marginTop: 20,
            width: '100%',
            height: height * 0.22,
            borderRadius: 24,
            backgroundColor: 'rgba(0,0,0,0.15)',
            paddingTop: 20,
            paddingLeft: 10,
          }}
        >
          <LineChartGrad data={lineData} />
        </View>

        <View
          style={{
            height: height * 0.13,
            marginTop: 20,
            flexDirection: 'row',
            gap: 15,
          }}
        >
          <IconTile
            icon={
              <FontAwesome6 name="face-smile-beam" size={30} color="#fefefe" />
            }
            percentage="86%"
            label="Engagement"
          />
          <IconTile
            icon={<FontAwesome6 name="users" size={30} color="#fefefe" />}
            percentage="5.6k"
            label="Users"
          />
          <IconTile
            icon={<Octicons name="star" size={30} color="#fefefe" />}
            percentage="4.6"
            label="Ratings"
          />
        </View>
      </View>
      <View
        style={{
          position: 'relative',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          width: '100%',
          marginTop: height * 0.58,
          zIndex: 100,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}
      >
        <View style={{ textAlign: 'center', marginTop: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>
            Start Evaluating Now
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>
            Tap the button below to start answering our evaluation form.
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginVertical: 10,
            borderColor: 'gray',
          }}
        ></View>
        <TouchableWithoutFeedback>
          <View
            style={{
              elevation: 10,
              backgroundColor: 'white',
              borderRadius: 32,
              padding: 10,
              paddingVertical: 15,
              textAlign: 'center',
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 3,
            }}
          >
            <Entypo name="controller-play" size={28} color="#bf3028" />
            <Text style={{ fontSize: 20, fontWeight: 500, color: '#bf3028' }}>
              Begin Evaluation
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              textAlign: 'start',
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            How It Works
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <ContainerTile>
              <Voice height={50} width={50} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'gray',
                }}
              >
                Listens to Vocal Inputs
              </Text>
            </ContainerTile>
            <ContainerTile>
              <Ai height={50} width={50} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'gray',
                }}
              >
                Initialize Sentiment Analysis
              </Text>
            </ContainerTile>
            <ContainerTile>
              <Check height={50} width={50} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'gray',
                }}
              >
                Output Results
              </Text>
            </ContainerTile>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              textAlign: 'start',
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Developers
          </Text>
          <Text style={{ color: 'gray', fontSize: 12, fontWeight: 300 }}>
            Meet the team that made SERV possible
          </Text>
          <SplitLayoutImage
            image={user}
            text="John Doe"
            subtext="UI/UX Developer"
          />
          <SplitLayoutImage
            image={user}
            text="Jane Doe"
            subtext="Backend Developer"
          />
          <SplitLayoutImage
            image={user}
            text="James Doe"
            subtext="Researcher"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Home
