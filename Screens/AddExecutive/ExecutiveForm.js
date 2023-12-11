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
} from 'react-native';
import axios from 'axios'; // Make sure to install axios

const ExecutiveForm = () => {
    const [clientName, setclientName] = useState('');
    const [clientPhone, setclientPhone] = useState('');
    const [clientAddress, setclientAddress] = useState('');
    const [clientPanCard, setclientPanCard] = useState('');
    const [clientEmail, setclientEmail] = useState('');
    const [clientpassword, setclientpassword] = useState('');

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

            // For simplicity, log success and clear form fields
            console.log('Executive added successfully:', executiveData);
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
                    placeholder="clientPhone"
                    onChangeText={setclientPhone}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="clientAddress"
                    onChangeText={setclientAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PAN Card"
                    onChangeText={setclientPanCard}
                />
                <TextInput
                    style={styles.input}
                    placeholder="clientEmail"
                    onChangeText={setclientEmail}
                    keyboardType="clientEmail-clientAddress"
                />
                <TextInput
                    style={styles.input}
                    placeholder="clientpassword"
                    onChangeText={setclientpassword}
                    secureTextEntry
                />
                <Button title="Add Executive" onPress={addExecutive} color="#000000" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
        padding: 20,
        justifyContent: 'center',
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
