import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { PDFDocument, PDFPDFPage } from 'react-native-pdf-lib';

function Footer() {
    const [selected, setSelected] = React.useState(0);
    const navigation = useNavigation();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: 'Logout', icon: 'exit-to-app' },
        { name: 'Settings', icon: 'settings' },
    ];

    const handlePress = (index) => {
        setSelected(index);
        if (index === 2) {
            Linking.openSettings();
        } else if (index === 1) {
            navigation.navigate('Login');
        } else if (index === 0) {
            navigation.navigate('Dashboard');
        }
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

    // const downloadPDF = async () => {
    //     try {
    //         const pdfPath = 'path/to/save/pdf/document.pdf';

    //         // Create a new PDF document
    //         const pdfDoc = await PDFDocument.create();

    //         // Add a new PDFPage to the document
    //         const PDFPage = pdfDoc.addPage();

    //         // Draw text on the PDFPage (example text)
    //         const { width, height } = PDFPage.getSize();
    //         PDFPage.drawText('Hello, PDF!', {
    //             x: 50,
    //             y: height - 200,
    //             color: '#000000',
    //         });

    //         // Save the document to a file
    //         const pdfBytes = await pdfDoc.save();
    //         // Save the generated PDF to a file
    //         await RNFS.writeFile(pdfPath, pdfBytes, 'base64');

    //         Alert.alert('Success', `PDF downloaded at: ${pdfPath}`);
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //     }
    // };


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

                        <TouchableOpacity onPress={() => toggleDetails(index)}>
                            <Text style={styles.viewMore}>
                                {expandedReport === index ? 'View Less' : 'View More'}
                            </Text>
                        </TouchableOpacity>

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




                                </View>
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
        marginBottom: 50,
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
