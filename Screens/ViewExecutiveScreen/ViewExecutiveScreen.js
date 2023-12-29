// ViewExecutiveScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';// Make sure to install axios

import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';



function Footer() {
    const [selected, setSelected] = React.useState(0);
    // Get the navigation prop
    const navigation = useNavigation();
  
  
    const items = [
      { name: 'Home', icon: 'home' },
      { name: 'Logout', icon: 'exit-to-app' }, // Add logout item
      { name: 'Settings', icon: 'settings' },
      // Add more items as needed
    ];
    const handlePress = (index) => {
      setSelected(index);
      if (index === 2) {
        // Open phone settings
        Linking.openSettings();
      } else if (index === 1) {
        // Handle logout
        // You can add any logout logic here, and navigate to the login screen
        navigation.navigate('Login'); // Assuming 'Login' is the name of your login screen
      }
      else if (index === 0) {
        // Handle logout
        // You can add any logout logic here, and navigate to the login screen
        navigation.navigate('Dashboard'); 
      }
      // Handle other items as needed
    };
    return (
      <HStack bg="black" alignItems="center" shadow={6}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            cursor="pointer"
            opacity={selected === index ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => handlePress(index)}
          >
            <Center>
              <Icon mb="1" as={<MaterialIcons name={item.icon} />} size="sm" />
              <Text color="white" fontSize="12" style={styles.footerText}>
                {item.name}
              </Text>
            </Center>
          </Pressable>
        ))}
      </HStack>
    );
  }

const ViewExecutiveScreen = () => {
    const [executiveData, setExecutiveData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedExecutive, setSelectedExecutive] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const toggleDetails = (executive) => {
        setShowDetails(!showDetails);
        setSelectedExecutive(executive);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://executive-grapeseed.onrender.com/api/clients');
                const data = await response.json();
                setExecutiveData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                {/* Image and Title Section */}
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/gapeseed-logo.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>View Executive</Text>
                </View>

                {/* Executive Details Section */}
                {executiveData.map((executive, index) => (
                    <View
                        key={executive.id}
                        style={[
                            styles.executiveDetails,
                            index === executiveData.length - 1 ? styles.lastItemMargin : null,
                        ]}
                    >
                        <View style={styles.row}>
                            <Text style={styles.label}>Full Name:</Text>
                            <Text style={styles.value}>{executive.clientName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Contact:</Text>
                            <Text style={styles.value}>{executive.clientPhone}</Text>
                        </View>

                        {showDetails && selectedExecutive === executive && (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Address:</Text>
                                    <Text style={styles.value}>{executive.clientAddress}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Pan Card:</Text>
                                    <Text style={styles.value}>{executive.clientPanCard}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Email:</Text>
                                    <Text style={styles.value}>{executive.clientEmail}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Password:</Text>
                                    {passwordVisible ? (
                                        <Text style={styles.value}>{executive.clientpassword}</Text>
                                    ) : (
                                        <TextInput
                                            style={styles.passwordInput}
                                            value={(executive.clientpassword || '').replace(/./g, '*')}
                                            editable={false}
                                        />
                                    )}
                                    <TouchableOpacity onPress={togglePasswordVisibility}>
                                        <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '🔒'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {/* View More Button */}
                        <TouchableOpacity onPress={() => toggleDetails(executive)}>
                            <Text style={styles.viewMore}>{showDetails ? 'View Less' : 'View More'}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Footer />
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
        padding: 20,
    },
    footerText: {
        color: 'white',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 180,
        height: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black',
    },
    executiveDetails: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: 'black',
        flex: 2,
    },
    viewMore: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    passwordInput: {
        flex: 2,
        fontSize: 16,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 3,
        marginRight: 5,
    },
    eyeIcon: {
        fontSize: 20,
        color: 'black',
        marginLeft: 5,
        marginTop: 2,
    },
    lastItemMargin: {
        marginBottom: 50, // Add the desired bottom margin for the last item
    },
});

export default ViewExecutiveScreen;
