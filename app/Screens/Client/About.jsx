import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import serv from '../../../assets/SERV_Logo.png'

const About = () => {
  return (
    <ScrollView>
      <View
        style={{ flex: 1, width: '100%', padding: 20 }}
        className="p-2 pt-5"
      >
        <View style={{ width: '100%' }}>
          <View
            style={{
              elevation: 5,
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 18, color: '#691414' }}>
              Taguig City Center for the Elderly
            </Text>
            <Text>
              The five-storey wellness hub for Taguigeño senior citizens was
              opened last April and features a therapy pool, a massage room, two
              saunas, a yoga room, a gym, and a cinema for relaxation purposes.
              It also comes with a dialysis center to accommodate 14 patients at
              a time and a multi-purpose hall for city programs and recreational
              activities.
            </Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 18, fontWeight: 700 }}
            >
              Associations
            </Text>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                gap: 10,
                height: 150,
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 18, fontWeight: 700 }}
            >
              Meet the Team
            </Text>
          </View>
          <View style={{ width: '100%' }}>
            <View
              style={{
                width: '100%',
                height: 300,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 24,
                padding: 20,
              }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    elevation: 5,
                    backgroundColor: '#960303',
                    borderRadius: 12,
                    padding: 10,
                    paddingHorizontal: 150,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Thesis Advisor
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Development Team
            </Text>
          </View>
          <View style={{ width: '100%', marginVertical: 10 }}>
            <View
              style={{
                width: '100%',
                height: 300,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 24,
                padding: 20,
              }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    elevation: 5,
                    backgroundColor: '#960303',
                    borderRadius: 12,
                    padding: 10,
                    paddingHorizontal: 150,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Thesis Advisor
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: '100%', marginVertical: 10 }}>
            <View
              style={{
                width: '100%',
                height: 300,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 24,
                padding: 20,
              }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    elevation: 5,
                    backgroundColor: '#960303',
                    borderRadius: 12,
                    padding: 10,
                    paddingHorizontal: 150,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Thesis Advisor
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: '100%', marginVertical: 10 }}>
            <View
              style={{
                width: '100%',
                height: 300,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 24,
                padding: 20,
              }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={serv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    elevation: 5,
                    backgroundColor: '#960303',
                    borderRadius: 12,
                    padding: 10,
                    paddingHorizontal: 150,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Thesis Advisor
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default About
