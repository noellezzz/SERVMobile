import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tabs = createBottomTabNavigator()
import HomeScreen from './Home'
import AboutScreen from './About'
import ContactScreen from './Contact'
import EvaluationScreen from './Evaluation'
import SettingsScreen from './Services'
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from '@expo/vector-icons'
import { Pressable, TouchableWithoutFeedback, View } from 'react-native'

export default function Layout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#960303',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Services',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Evaluation"
        component={EvaluationScreen}
        options={{
          title: '',
          tabBarButton: props => (
            <Pressable
              {...props}
              android_ripple={{ color: 'transparent' }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: '#bd3131',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -20,
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  elevation: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="handshake-outline"
                  size={40}
                  color="white"
                />
              </View>
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
