import { useRef, React } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import TeamCard from '../cards/TeamCard'
import IconLinkAbout from '../buttons/IconLinkAbout'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TeamSection = ({ teamCardData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>MEET THE TEAM</Text>
    <Text style={styles.subtitle}>S.E.R.V's Development Team</Text>
    <FlatList
      data={teamCardData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <TeamCard {...item} />}
      contentContainerStyle={styles.list}
    />
    <IconLinkAbout
      icon={() => <FontAwesome name="angle-right" size={24} color="black" />}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A4161A',
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B090A',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TeamSection
