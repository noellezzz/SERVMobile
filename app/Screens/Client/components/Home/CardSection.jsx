import { useRef, React } from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import InformationCard from "../../components/cards/InformationCard";

const CardSection = ({ cardData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOW IT WORKS</Text>
      <FlatList
        data={cardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <InformationCard {...item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f1f1f1",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#A4161A",
    marginVertical: 20,
    textAlign: "center",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardSection;
