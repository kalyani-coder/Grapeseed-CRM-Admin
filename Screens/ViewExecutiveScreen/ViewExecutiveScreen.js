// ViewExecutiveScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

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
            {executiveData.map((executive) => (
                <View key={executive.id} style={styles.executiveDetails}>
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
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
        padding: 20,
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
});

export default ViewExecutiveScreen;
