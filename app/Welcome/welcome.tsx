import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router'; 

const WelcomeScreen = () => {

    const router = useRouter();

  // Automatically navigate to Walkthrough after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push('/WalkThrough/walkthrough1'); // Navigate to the first walkthrough screen
    }, 2000); // 2-second delay
  }, [router]);

  return (
    <View className='flex-1 justify-center items-center bg-white'>

     


    
      {/* Welcome Message */}
      <Text className='text-5xl font-bold text-blue-950 mb-6 space-y-16 text-center'>
        Welcome to Departure Away👋
      </Text>

      {/* Description */}
      <Text className='text-xl text-black-800 text-center '>
        Your Pocket Companion for Unforgettable 
      </Text>
      <Text className='text-xl text-black-800 text-center mb-6'>
       Journeys, Tailoring Dream Itineraries Worldwide.
      </Text>

      
    </View>
  );
};

export default WelcomeScreen;
