import { useRef, React } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IconLinkAbout = ({ icon: Icon }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")}> 
      <Text style={styles.text}>About</Text>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconLinkAbout;
