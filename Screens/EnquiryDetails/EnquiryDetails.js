import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, HStack, Pressable, Icon, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

// Footer component for navigation

function Footer() {
    const [selected, setSelected] = React.useState(0);
    const navigation = useNavigation();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: '', icon: '' },
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

// Main component for EnquiryDetails
const EnquiryDetails = () => {
    const [expandedEnquiry, setExpandedEnquiry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [enquiryData, setEnquiryData] = useState([]);

    // Toggle details visibility
    const toggleDetails = (index) => {
        setExpandedEnquiry((prev) => (prev === index ? null : index));
    };

    // Filter enquiries based on search query
    const filterEnquiries = () => {
        return enquiryData.filter((enquiry) => {
            const customerName = (enquiry.name || '').toLowerCase();
            const executiveName = (enquiry.executiveName || '').toLowerCase();

            return customerName.includes(searchQuery.toLowerCase()) || executiveName.includes(searchQuery.toLowerCase());
        });
    };

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('https://executive-grapeseed.onrender.com/api/enquiry');
            const data = await response.json();
            setEnquiryData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Use effect to fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Get the last index of filtered enquiries
    const lastIndex = filterEnquiries().length - 1;
    // Render the component
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

                {/* Search Bar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by Customer or Executive Name"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />

                {/* Enquiry Entry Section */}
                {filterEnquiries().map((enquiry, index) => (
                    <View
                        key={index}
                        style={[
                            styles.enquiryEntry,
                            index === lastIndex && { marginBottom: 50 }, // Add marginBottom for the last item
                        ]}
                    >
                        <View style={styles.row}>
                            <Text style={styles.label}>Customer Name:</Text>
                            <Text style={styles.value}>{enquiry.name}</Text>
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
                        )}
                    </View>
                ))}
            </ScrollView>
            <Footer />
        </NativeBaseProvider>
    );
};

// Styles
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
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
});

// Export the component
export default EnquiryDetails;
