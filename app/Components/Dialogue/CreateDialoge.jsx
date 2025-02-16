import { View, Text, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuestion } from '../../States/Slice/questionsSlice'

const CreateDialoge = ({ visible, onClose, onSave }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    english: '',
    tagalog: '',
    audioEnglish: '',
    audioTagalog: '',
  })

  const handleSave = () => {
    dispatch(addQuestion(form))
    clearForm()
    onClose()
  }

  const clearForm = () => {
    setForm({ english: '', tagalog: '', audioEnglish: '', audioTagalog: '' })
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 10,
          }}
        >
          <TextInput
            placeholder="English"
            style={{ borderWidth: 1, width: 400 }}
            onChangeText={text => setForm(prev => ({ ...prev, english: text }))}
            value={form.english}
          />
          <TextInput
            placeholder="Tagalog"
            style={{ borderWidth: 1, width: 400 }}
            onChangeText={text => setForm(prev => ({ ...prev, tagalog: text }))}
            value={form.tagalog}
          />
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Text onPress={handleSave} style={{ color: 'blue', marginTop: 10 }}>
              Save
            </Text>
            <Text onPress={onClose} style={{ color: 'blue', marginTop: 10 }}>
              Close
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CreateDialoge
