import { useRef, React } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import IconLinkAbout from '../../components/buttons/IconLinkAbout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Corrected image import
const serv = require('../../../../../assets/SERV_Logo.png');

const AboutSection = () => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={serv} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>About S.E.R.V</Text>
      <Text style={styles.description}>
        SERV is an intelligent web application designed to enhance queue
        management by analyzing senior citizens' behavior in service lines.
        Using a combination of behavioral tests, real-time feedback, and
        AI-driven insights, SERV streamlines the waiting experience, reduces
        congestion, and improves service satisfaction.
      </Text>
      <IconLinkAbout icon={() => <FontAwesome name="angle-right" size={24} color="black" />} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A4161A',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
});

export default AboutSection;
