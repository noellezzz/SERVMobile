import { useRef, React } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IconLinkTryNow from '../../components/buttons/IconLinkTryNow'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// Corrected image imports
const mobileui = require('../../../../../assets/mobile-ui.png')
const qr = require('../../../../../assets/QR.png')

const HeroSection = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to S.E.R.V</Text>
        <Text style={styles.description}>
          SERV is a smart web app that evaluates senior citizens' behavior in
          service lines. By combining behavioral tests, feedback, and AI
          analysis, it optimizes queue management, reduces wait times, and
          enhances satisfaction.
        </Text>
        <IconLinkTryNow
          icon={() => (
            <FontAwesome name="angle-right" size={24} color="black" />
          )}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={mobileui} style={styles.mobileImage} />
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>SERV Mobile</Text>
          <Image source={qr} style={styles.qrImage} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  mobileImage: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  qrContainer: {
    position: 'absolute',
    top: 20,
    left: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
})

export default HeroSection
