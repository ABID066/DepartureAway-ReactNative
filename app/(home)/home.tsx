import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Import components
import CategorySection from "@/app/(home)/category";
import SearchBar from "@/app/(home)/search";
import DiscoverPlacesSection from "@/app/(home)/discover";
import GuidesSection from "@/app/(home)/guider";
import TravelPackagesSection from "@/app/(home)/travelPackage";

const HomePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("For you");
  const [activePackageTab, setActivePackageTab] = useState("Traveler Choose");
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  return (
    <SafeAreaView className='flex-1 bg-[#FAFAFA]'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Header />

        {/* Categories Section */}
        <CategorySection />

        {/* Search Bar */}
        <SearchBar />

        {/* Discover Places Section */}
        <DiscoverPlacesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentIndex={currentDestinationIndex}
          setCurrentIndex={setCurrentDestinationIndex}
        />

        {/* Top Rated Guides Section */}
        <GuidesSection />

        {/* Travel Packages Section */}
        <TravelPackagesSection
          activePackageTab={activePackageTab}
          setActivePackageTab={setActivePackageTab}
        />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavigation />
    </SafeAreaView>
  );
};

// Header Component
const Header = () => {
  return (
    <View className='bg-amber-300 pb-6 pt-6 px-4 rounded-bl-[50px]'>
      <View className='flex-row justify-between items-center mb-2'>
        <View className='w-12 h-12 rounded-full overflow-hidden border-2 border-white'>
          <Image
            source={require("@/assets/images/profile.jpg")}
            className='w-full h-full'
          />
        </View>

        <View className='flex-row items-center'>
          <View className='mr-1'>
            <Image
              source={require("@/assets/images/logo.png")}
              className='w-44 h-20'
              resizeMode='contain'
            />
          </View>
        </View>

        <TouchableOpacity className='w-12 h-12 rounded-full bg-rose-500 justify-center items-center'>
          <Ionicons name='notifications-outline' size={24} color='white' />
        </TouchableOpacity>
      </View>

      <WelcomeText />
    </View>
  );
};

// Welcome Text Component
const WelcomeText = () => {
  return (
    <View className='mb-6'>
      <Text className='text-lg italic text-gray-700 text-center'>
        Hola! Salim
      </Text>
      <Text className='text-2xl font-bold text-gray-800 text-center mt-0.5'>
        Explore the Beautiful World!
      </Text>
    </View>
  );
};

// Bottom Navigation Component
const BottomNavigation = () => {
  const router = useRouter();
  return (
    <View className='absolute bottom-0 left-0 right-0 h-16 bg-white flex-row justify-around items-center border-t border-gray-200'>
      <TouchableOpacity className='items-center'>
        <View className='items-center'>
          <Ionicons name='home' size={24} color='#F13F5F' />
          <Text className='text-xs text-rose-500 mt-0.5'>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className='items-center'>
        <Ionicons name='search' size={24} color='#ccc' />
        <Text className='text-xs text-gray-500 mt-0.5'>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity className='items-center'>
        <Ionicons name='heart' size={24} color='#ccc' />
        <Text className='text-xs text-gray-500 mt-0.5'>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/liveChat")}
        className='items-center'>
        <Ionicons name='chatbubble-ellipses' size={24} color='#ccc' />
        <Text className='text-xs text-gray-500 mt-0.5'>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity className='items-center'>
        <Ionicons name='person' size={24} color='#ccc' />
        <Text className='text-xs text-gray-500 mt-0.5'>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
