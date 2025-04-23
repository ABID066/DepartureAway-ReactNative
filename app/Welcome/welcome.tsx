import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; 

const WelcomeScreen = () => {
  const router = useRouter();

  // Automatically navigate to Walkthrough after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push('/WalkThrough/walkthrough1');
    }, 20000); // 2-second delay
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Circular Images Collage */}
        <View className="w-full aspect-square relative mb-20">
          {/* Large center image (parasailing) */}
          <View className="absolute left-1/4 right-1/4 top-1/3 bottom-1/6">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Top right image (city skyline) */}
          <View className="absolute right-6 top-4 w-24 h-24">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Top left image (snow/mountain) */}
          <View className="absolute left-6 top-12 w-20 h-20">
            <Image 
              source={require('@/assets/images/snow-mountain.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Bottom left image (forest) */}
          <View className="absolute left-10 bottom-16 w-16 h-16">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Bottom right image (mountain view) */}
          <View className="absolute right-12 bottom-8 w-20 h-20">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Small mountain view */}
          <View className="absolute left-1/4 bottom-4 w-12 h-12">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
          
          {/* Small city view */}
          <View className="absolute left-8 top-1/3 w-12 h-12">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className="w-full h-full rounded-full" 
            />
          </View>
        </View>

        {/* Welcome Message */}
        <Text className="text-5xl font-bold text-blue-950 mb-2 text-center">
          Welcome to Departure Away👋
        </Text>

        {/* Description */}
        <Text className="text-xl text-black-800 text-center">
          Your Pocket Companion for Unforgettable Journeys,
        </Text>
        <Text className="text-xl text-black-800 text-center">
          Tailoring Dream Itineraries Worldwide.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;