import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// Dummy report data
const dummyReportData = [
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
    // Additional entry
    {
        customerName: 'Eve Johnson',
        enquiryDate: '2023-12-18',
        executiveName: 'John Davis',
        Pan_Card: 'UVWXY5678Z',
        Adhar_Card: '4321 8765 4321',
        Cancelled_cheque: 'LMN Bank, Account No: 9876543210',
        // Add more fields based on your schema
    },
];

const ReportDetails = () => {
    const [expandedReport, setExpandedReport] = useState(null);

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
                fileName: 'ReportDetails',
                directory: 'Documents',
            };
            const pdf = await RNHTMLtoPDF.convert(options);
            const filePath = pdf.filePath;
            alert(`PDF downloaded at: ${filePath}`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const generateHTMLContent = () => {
        // Convert the data to HTML table format
        const tableRows = dummyReportData.map((report, index) => `
            <tr>
                <td>${report.customerName}</td>
                <td>${report.enquiryDate}</td>
                <td>${report.executiveName}</td>
                <td>${report.Pan_Card}</td>
                <td>${report.Adhar_Card}</td>
                <td>${report.Cancelled_cheque}</td>
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
        <ScrollView style={styles.container}>
            {/* Image and Title Section */}
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/gapeseed-logo.png')}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Report Details</Text>
            </View>

            <TouchableOpacity onPress={downloadPDF}>
                <Text style={styles.downloadButton}>Download PDF</Text>
            </TouchableOpacity>

            {/* Report Entry Section */}
            {dummyReportData.map((report, index) => (
                <View key={index} style={styles.reportEntry}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Customer Name:</Text>
                        <Text style={styles.value}>{report.customerName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Enquiry Date:</Text>
                        <Text style={styles.value}>{report.enquiryDate}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Executive Name:</Text>
                        <Text style={styles.value}>{report.executiveName}</Text>
                    </View>

                    {/* View More Button */}
                    <TouchableOpacity onPress={() => toggleDetails(index)}>
                        <Text style={styles.viewMore}>
                            {expandedReport === index ? 'View Less' : 'View More'}
                        </Text>
                    </TouchableOpacity>

                    {/* Report Details Section */}
                    {expandedReport === index && (
                        <View style={styles.reportDetails}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Pan Card:</Text>
                                <Text style={styles.value}>{report.Pan_Card}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Adhar Card:</Text>
                                <Text style={styles.value}>{report.Adhar_Card}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Cancelled Cheque:</Text>
                                <Text style={styles.value}>{report.Cancelled_cheque}</Text>
                            </View>

                            {/* Add more details here based on your schema */}
                        </View>
                    )}
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
    reportEntry: {
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    reportDetails: {
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
