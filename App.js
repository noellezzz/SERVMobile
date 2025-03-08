import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ClientStack from './app/Navigators/ClientNavigator'
import AdminDrawer from './app/Navigators/AdminNavigation'
import Welcome from './app/Screens/Welcome'
import Form from './app/Screens/Client/Evaluation/Form'

import './app/styles/global.css'
import { store, persistor } from './app/States/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="ClientStack" component={ClientStack} />
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Form" component={Form} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
