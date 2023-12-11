import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        contactNumber: '',
        address: '',
        panCard: '',
        email: '',
    });

    useEffect(() => {
        // Fetch profile data from your API endpoint
        const apiUrl = 'YOUR_API_ENDPOINT';

        // Dummy data for testing
        const dummyData = {
            fullName: 'John Doe',
            contactNumber: '123-456-7890',
            address: '123 Main St, Cityville',
            panCard: 'ABCDE1234F',
            email: 'john.doe@example.com',
        };

        // Set the dummy data to the state
        setProfileData(dummyData);

        // If you want to fetch real data, uncomment the following lines and replace with your fetch logic
        // fetch(apiUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setProfileData(data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching profile data:', error);
        //     });
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    const handleSaveProfile = () => {
        // Implement your logic to update the profile data
        // This could involve making a PATCH or PUT request to your API
        // For simplicity, I'm just logging the data here
        console.log('Profile Updated:', profileData);
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            {/* <Image source={require('./path/to/your/logo.png')} style={styles.logo} /> */}

            <Text style={styles.title}>Profile Page</Text>

            <TextInput
                label="Full Name"
                value={profileData.fullName}
                onChangeText={(text) => setProfileData({ ...profileData, fullName: text })}
                style={styles.input}
            />

            <TextInput
                label="Contact Number"
                value={profileData.contactNumber}
                onChangeText={(text) => setProfileData({ ...profileData, contactNumber: text })}
                style={styles.input}
            />

            <TextInput
                label="Address"
                value={profileData.address}
                onChangeText={(text) => setProfileData({ ...profileData, address: text })}
                style={styles.input}
            />

            <TextInput
                label="Pan Card"
                value={profileData.panCard}
                onChangeText={(text) => setProfileData({ ...profileData, panCard: text })}
                style={styles.input}
            />

            <TextInput
                label="Email"
                value={profileData.email}
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db', // Change the background color as needed
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff', // Text color
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff', // Input background color
    },
    saveButton: {
        backgroundColor: '#2ecc71', // Button background color
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfilePage;
