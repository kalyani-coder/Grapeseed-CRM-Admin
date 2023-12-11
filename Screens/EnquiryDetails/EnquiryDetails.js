import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import Navbar from './../Navbar/Navbar';
// import Footer from '../Footer/Footer';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';


// function Footer() {
//     const [selected, setSelected] = React.useState(0);
//     // Get the navigation prop



//     const items = [
//         { name: 'Home', icon: 'home' },
//         { name: 'Profile', icon: 'person' },
//         { name: 'Settings', icon: 'settings' },
//         // Add more items as needed
//     ];

//     return (
//         <HStack bg="black" alignItems="center" shadow={6}>
//             {items.map((item, index) => (
//                 <Pressable
//                     key={index}
//                     cursor="pointer"
//                     opacity={selected === index ? 1 : 0.5}
//                     py="2"
//                     flex={1}
//                     onPress={() => setSelected(index)}
//                 >
//                     <Center>
//                         <Icon mb="1" as={<MaterialIcons name={item.icon} />} size="sm" />
//                         <Text color="white" fontSize="12" style={styles.footerText}>
//                             {item.name}
//                         </Text>
//                     </Center>
//                 </Pressable>
//             ))}
//         </HStack>
//     );
// }

// Dummy enquiry data
const dummyEnquiryData = [
    {
        customerName: 'John Doe',
        enquiryDate: '2023-12-15',
        executiveName: 'Jane Smith',
        Pan_Card: 'ABCDE1234F',
        Adhar_Card: '1234 5678 9012',
        Cancelled_cheque: 'XYZ Bank, Account No: 1234567890',
        // Add more fields based on your schema
    },
    {
        customerName: 'Alice Johnson',
        enquiryDate: '2023-12-16',
        executiveName: 'Bob Brown',
        Pan_Card: 'FGHIJ5678K',
        Adhar_Card: '9876 5432 1098',
        Cancelled_cheque: 'ABC Bank, Account No: 0987654321',
        // Add more fields based on your schema
    },
    {
        customerName: 'Charlie Smith',
        enquiryDate: '2023-12-17',
        executiveName: 'David Wilson',
        Pan_Card: 'LMNOP6789Q',
        Adhar_Card: '5678 1234 5678',
        Cancelled_cheque: 'PQR Bank, Account No: 5678901234',
        // Add more fields based on your schema
    },
];

const EnquiryDetails = () => {
    const [expandedEnquiry, setExpandedEnquiry] = useState(null);

    const toggleDetails = (index) => {
        setExpandedEnquiry((prev) => (prev === index ? null : index));
    };

    return (
        <ScrollView style={styles.container}>
            {/* <View><Navbar /></View> */}
            {/* Image and Title Section */}
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/gapeseed-logo.png')}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Enquiry Details</Text>
            </View>

            {/* Enquiry Entry Section */}
            {dummyEnquiryData.map((enquiry, index) => (
                <View key={index} style={styles.enquiryEntry}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Customer Name:</Text>
                        <Text style={styles.value}>{enquiry.customerName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Enquiry Date:</Text>
                        <Text style={styles.value}>{enquiry.enquiryDate}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Executive Name:</Text>
                        <Text style={styles.value}>{enquiry.executiveName}</Text>
                    </View>

                    {/* View More Button */}
                    <TouchableOpacity onPress={() => toggleDetails(index)}>
                        <Text style={styles.viewMore}>
                            {expandedEnquiry === index ? 'View Less' : 'View More'}
                        </Text>
                    </TouchableOpacity>

                    {/* Enquiry Details Section */}
                    {expandedEnquiry === index && (
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

                            {/* Add more details here based on your schema */}
                        </View>
                    )}
                </View>
            ))}
            {/* <View><Footer /></View> */}
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
    enquiryEntry: {
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1, // Add border style here
        borderColor: 'black', // Set border color
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10 // Hide overflow to prevent inner borders from showing
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
});

export default EnquiryDetails;
