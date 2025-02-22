import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../Components/Buttons/CustomButton'
import AccordionItem from '../../Components/Interactables/AccordionItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 8,
  },
  accordionItem: {
    marginBottom: 10,
  },
  box: {
    height: 120,
    width: '100%',
    backgroundColor: '#dedede',
    borderRadius: 10,
    marginVertical: 10,
  },
})

const accordionData = [
  {
    id: '1',
    title: 'Service 1',
    content: (
      <View style={styles.box}>
        <Text>*Content Here*</Text>
      </View>
    ),
  },
  {
    id: '2',
    title: 'Service 2',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
  {
    id: '3',
    title: 'Service 3',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
  {
    id: '4',
    title: 'Service 4',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
  {
    id: '5',
    title: 'Service 5',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
  {
    id: '6',
    title: 'Service 6',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
]

const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>Settings</Text>
      <Text style={{ fontSize: 12 }}>Here are the services that we offer.</Text>
      <View
        style={{
          borderColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 5,
          marginBottom: 15,
        }}
      ></View>
      <View>
        {accordionData.map((item, index) => (
          <View key={item.id} style={styles.accordionItem}>
            <CustomButton
              mode="outlined"
              title={item.title}
              onPress={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            />
            <AccordionItem isExpanded={activeIndex === index}>
              {item.content}
            </AccordionItem>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Settings
