import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    Linking,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';// Make sure to install axios

import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';



function Footer() {
    const [selected, setSelected] = React.useState(0);
    const navigation = useNavigation();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: '', icon: '' },
        { name: 'Settings', icon: 'settings' },
        // Add more items as needed
    ];

    const handlePress = (index) => {
        setSelected(index);
        if (index === 0) {
            // Navigate to the dashboard
            navigation.navigate('Dashboard');
        } else if (index === 2) {
            // Open phone settings
            Linking.openSettings();
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

const ExecutiveForm = () => {
    const [clientName, setclientName] = useState('');
    const [clientPhone, setclientPhone] = useState('');
    const [clientAddress, setclientAddress] = useState('');
    const [clientPanCard, setclientPanCard] = useState('');
    const [clientEmail, setclientEmail] = useState('');
    const [clientpassword, setclientpassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const addExecutive = async () => {
        try {
            const executiveData = {
                clientName,
                clientPhone,
                clientAddress,
                clientPanCard,
                clientEmail,
                clientpassword,
            };

            await axios.post('https://executive-grapeseed.onrender.com/api/clients', executiveData);

            // Display success message
            setSuccessMessage('Executive added successfully');
            // Clear form fields
            clearFormFields();
        } catch (error) {
            // Handle error (e.g., display an error message)
            console.error('Error adding executive:', error);
        }
    };

    const clearFormFields = () => {
        setclientName('');
        setclientPhone('');
        setclientAddress('');
        setclientPanCard('');
        setclientEmail('');
        setclientpassword('');
    };

    return (

        <NativeBaseProvider>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
            >
                <ScrollView>
                    {/* Image and Title Section */}
                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/gapeseed-logo.png')}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Add Executive</Text>
                    </View>

                    {/* Form Section */}
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        onChangeText={setclientName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        onChangeText={setclientPhone}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setclientEmail}
                        keyboardType="clientEmail-clientAddress"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setclientpassword}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="PAN Card"
                        onChangeText={setclientPanCard}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address "
                        onChangeText={setclientAddress}
                    />

                    <Button title="Add Executive" onPress={addExecutive} color="#000000" />

                    {/* Display success message */}
                    {successMessage ? (
                        <Text style={styles.successMessage}>{successMessage}</Text>
                    ) : null}
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer />
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
        padding: 20,
        justifyContent: 'center',
    },
    footerText: {
        color: 'white',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        color: 'black',
    },
    logoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 20, // Add padding top for the logo container
        paddingBottom: 10, // Add padding bottom for the logo container
    },
    logo: {
        width: 180,
        height: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black', // Change heading color to black
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ExecutiveForm;
