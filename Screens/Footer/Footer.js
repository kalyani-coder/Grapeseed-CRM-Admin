// Footer.js

import React from 'react';
import { HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Footer({ selected, setSelected, items }) {
  const navigation = useNavigation();

  const handlePress = (index, name) => {
    setSelected(index);
    // You can customize the navigation logic based on the button name
    switch (name) {
      case 'Home':
        // Navigate to the Home screen
        navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with your actual screen name
        break;
      case 'Profile':
        // Navigate to the Profile screen
        navigation.navigate('ProfileScreen'); // Replace 'ProfileScreen' with your actual screen name
        break;
      case 'Settings':
        // Navigate to the Settings screen
        navigation.navigate('SettingsScreen'); // Replace 'SettingsScreen' with your actual screen name
        break;
      // Add more cases as needed
      default:
        break;
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
          onPress={() => handlePress(index, item.name)}
        >
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={item.icon} color="white" />} size="sm" />
            <Text color="white" fontSize="12">
              {item.name}
            </Text>
          </Center>
        </Pressable>
      ))}
    </HStack>
  );
}

export default Footer;
