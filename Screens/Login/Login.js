// Import necessary modules and components
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated, Easing, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Create the Login component
const Login = () => {
    const navigation = useNavigation();

    // State variables for email, password, and animation
    const [clientEmail, setclientEmail] = useState('');
    const [clientpassword, setclientpassword] = useState('');
    const [isAnimating, setAnimating] = useState(false);

    // Animated value for rotation animation
    const rotateValue = useRef(new Animated.Value(0)).current;

    // Function to handle the login process
    const handleLogin = async () => {
        try {
            setAnimating(true);

            // Replace this with your static user credentials
            const staticUserData = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Check if the entered credentials match the static user data
            if (clientEmail === staticUserData.email && clientpassword === staticUserData.password) {
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }).start(() => {
                    setAnimating(false);
                    rotateValue.setValue(0);

                    // Navigate to the 'Dashboard' screen upon successful login
                    Alert.alert('Login successful!', 'Welcome to the Dashboard', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Dashboard');
                            },
                        },
                    ]);
                });
            } else {
                // If the entered credentials are incorrect, show an error message
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
                setAnimating(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setAnimating(false);
        }
    };

    // Animated value for rotation animation
    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Render the UI components
    return (
        <ImageBackground style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/gapeseed-logo.png')}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.loginHeading}>Login</Text>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => setclientEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setclientpassword(text)}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isAnimating}>
                    {isAnimating ? (
                        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
                            <Icon name="check" size={30} color="white" />
                        </Animated.View>
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#daa520',
    },
    loginHeading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#3498db',
        color: 'black',
    },
    icon: {
        marginRight: 10,
    },
    logo: {
        width: 250,
        height: 200,
    },
    logocontainer: {
        alignSelf: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
        paddingLeft: 8,
        borderWidth: 0,
        color: 'black',
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

// Export the Login component
export default Login;
