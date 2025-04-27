import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; 

const WelcomeScreen = () => {
  const router = useRouter();

  // Automatically navigate to Walkthrough after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push('/walkThrough/walkthrough1');
    }, 2000); // 2-second delay
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Circular Images Collage */}
        <View className="w-full aspect-square relative mb-20">
          {/* Large center image (parasailing) */}
          <View className="absolute inset-1 flex items-center justify-center">
            <Image 
              source={require('@/assets/images/middle.png')} 
              className=" rounded-full" 
            />
          </View>
          
          
          <View className="absolute right-12 -top-4 w-24 h-24">
            <Image 
              source={require('@/assets/images/Ellipse.png')} 
              className=" rounded-full" 
            />
          </View>
          
          
          <View className="absolute left-10 -top-8 w-20 h-20">
            <Image 
              source={require('@/assets/images/snow-mountain.png')} 
              className=" rounded-full" 
            />
          </View>
          
          {/* Bottom left image (m) */}
          <View className="absolute -left-8 bottom-16 w-16 h-16">
            <Image 
              source={require('@/assets/images/mp.png')} 
              className=" rounded-full" 
            />
          </View>

          {/* Bottom right image (top of f view) */}
          <View className="absolute right-0 top-40">
            <Image 
              source={require('@/assets/images/sc.png')} 
              className=" rounded-full" 
            />
          </View>
          
          {/* Bottom right image (f view) */}
          <View className="absolute right-10 bottom-8 w-20 h-20">
            <Image 
              source={require('@/assets/images/brImg.png')} 
              className=" rounded-full" 
            />
          </View>
          
          {/* Small mountain view */}
          <View className="absolute left-1/4 bottom-4 w-12 h-12">
            <Image 
              source={require('@/assets/images/small.png')} 
              className=" rounded-full" 
            />
          </View>
          
          {/* Small city view */}
          <View className="absolute -left-8 top-1/3 w-12 h-12">
            <Image 
              source={require('@/assets/images/city.png')} 
              className="rounded-full" 
            />
          </View>
        </View>

        {/* Welcome Message */}
        <Text className="text-5xl font-bold text-blue-950 mb-6 text-center">
          Welcome to Departure Away👋
        </Text>

        {/* Description */}
        <Text className="text-lg font-bold text-black-800 text-center">
          Your Pocket Companion for Unforgettable 
        </Text>
        <Text className="text-lg font-bold text-black-800 text-center">
          Journeys, Tailoring Dream Itineraries Worldwide.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;