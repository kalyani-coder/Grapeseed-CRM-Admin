import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
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

const ReportDetails = () => {
    const [enquiryData, setEnquiryData] = useState([]);
    const [expandedReport, setExpandedReport] = useState(null);

    useEffect(() => {
        fetchEnquiryData();
    }, []);

    const fetchEnquiryData = async () => {
        try {
            const apiUrl = 'https://executive-grapeseed.onrender.com/api/enquiry';
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setEnquiryData(data);
        } catch (error) {
            console.error('Error fetching enquiry data:', error);
            Alert.alert('Error', 'Failed to fetch enquiry data. Please try again.');
        }
    };

    const toggleDetails = (index) => {
        setExpandedReport((prev) => (prev === index ? null : index));
    };

    const downloadPDF = async () => {
        try {
            if (!RNHTMLtoPDF) {
                throw new Error('RNHTMLtoPDF is not available.');
            }

            const htmlContent = generateHTMLContent();
            const options = {
                html: htmlContent,
                fileName: 'EnquiryDetails',
                directory: 'Documents',
            };
            const pdf = await RNHTMLtoPDF.convert(options);
            const filePath = pdf.filePath;
            Alert.alert('Success', `PDF downloaded at: ${filePath}`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const generateHTMLContent = () => {
        const tableRows = enquiryData.map((enquiry, index) => `
            <tr>
                <td>${enquiry.customerName}</td>
                <td>${enquiry.enquiryDate}</td>
                <td>${enquiry.executiveName}</td>
                <td>${enquiry.Pan_Card}</td>
                <td>${enquiry.Adhar_Card}</td>
                <td>${enquiry.Cancelled_cheque}</td>
                <!-- Add more fields based on your schema -->
            </tr>
        `);

        return `
            <html>
                <head>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Enquiry Date</th>
                                <th>Executive Name</th>
                                <th>Pan Card</th>
                                <th>Adhar Card</th>
                                <th>Cancelled Cheque</th>
                                <!-- Add more headers based on your schema -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;
    };

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
                    <Text style={styles.title}>Enquiry Details</Text>
                </View>

                {/* <TouchableOpacity onPress={downloadPDF}>
                    <Text style={styles.downloadButton}>Download PDF</Text>
                </TouchableOpacity> */}

                {/* Enquiry Entry Section */}
                {enquiryData.map((enquiry, index) => (
                    <View key={index} style={[styles.enquiryEntry, index === enquiryData.length - 1 && styles.lastEnquiry]}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Customer Name:</Text>
                            <Text style={styles.value}>{enquiry.name}</Text>
                        </View>

                        {/* <View style={styles.row}>
                        <Text style={styles.label}>Enquiry Date:</Text>
                        <Text style={styles.value}>{enquiry.enquiryDate}</Text>
                    </View> */}

                        {/* <View style={styles.row}>
                        <Text style={styles.label}>Executive Name:</Text>
                        <Text style={styles.value}>{enquiry.executiveName}</Text>
                    </View> */}

                        {/* View More Button */}
                        <TouchableOpacity onPress={() => toggleDetails(index)}>
                            <Text style={styles.viewMore}>
                                {expandedReport === index ? 'View Less' : 'View More'}
                            </Text>
                        </TouchableOpacity>

                        {/* Enquiry Details Section */}
                        {expandedReport === index && (
                            <View style={styles.enquiryDetails}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Pan Card:</Text>
                                    <Text style={styles.value}>{enquiry.Pan_Card}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Adhar Card:</Text>
                                    <Text style={styles.value}>{enquiry.Adhar_Card}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Cancelled Cheque:</Text>
                                    <Text style={styles.value}>{enquiry.Cancelled_cheque}</Text>
                                </View>


                                <View style={styles.row}>
                                    <Text style={styles.label}>Image:</Text>
                                    <Text style={styles.value}>{enquiry.uploaded_image}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Contact:</Text>
                                    <Text style={styles.value}>{enquiry.mobile_nu}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Alternative Mobile:</Text>
                                    <Text style={styles.value}>{enquiry.Alternative_Mobile}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Mother Name:</Text>
                                    <Text style={styles.value}>{enquiry.Mother_Name}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Email:</Text>
                                    <Text style={styles.value}>{enquiry.Email}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Last Education:</Text>
                                    <Text style={styles.value}>{enquiry.Last_Education}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Married Status:</Text>
                                    <Text style={styles.value}>{enquiry.Married_Status}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Nominee Name:</Text>
                                    <Text style={styles.value}>{enquiry.Nominee_Name}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Nominee DOB:</Text>
                                    <Text style={styles.value}>{enquiry.Nominee_DOB}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Nominee Ralationship:</Text>
                                    <Text style={styles.value}>{enquiry.Nominee_Ralationship}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Company Name:</Text>
                                    <Text style={styles.value}>{enquiry.Company_Name}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Annual Income:</Text>
                                    <Text style={styles.value}>{enquiry.Annual_Income}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Industry Name:</Text>
                                    <Text style={styles.value}>{enquiry.Industry_Name}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Height:</Text>
                                    <Text style={styles.value}>{enquiry.Height}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>Weight:</Text>
                                    <Text style={styles.value}>{enquiry.Weight}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Life Cover:</Text>
                                    <Text style={styles.value}>{enquiry.Life_Cover}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>medical History:</Text>
                                    <Text style={styles.value}>{enquiry.medical_History}</Text>
                                </View>



                                {/* Add more details here based on your schema */}
                            </View>
                        )}
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
    enquiryEntry: {
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    lastEnquiry: {
        marginBottom: 50, // Add your desired bottom margin for the last enquiry
    },
    enquiryDetails: {
        marginTop: 20,
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
    downloadButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default ReportDetails;
