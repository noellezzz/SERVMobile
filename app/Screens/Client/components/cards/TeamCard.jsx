import { useRef, React } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'

const TeamCard = ({ image, name, position }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#A4161A',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
    width: 200,
    height: 300,
    marginVertical: 20,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
  },
  position: {
    fontSize: 16,
    color: '#0B090A',
    textAlign: 'center',
  },
})

export default TeamCard
