import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import CategorySection from "@/components/Home/Category";
import SearchBar from "@/components/Home/Search";
import DiscoverPlacesSection from "@/components/Home/Discover";
import GuidesSection from "@/components/Home/Guider";
import TravelPackagesSection from "@/components/Home/TravelPackage";


const HomePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("For you");
  const [activePackageTab, setActivePackageTab] = useState("Traveler Choose");
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  const sections = [
    {
      title: 'header',
      data: [null],
      renderItem: () => <Header />
    },
    {
      title: 'categories',
      data: [null],
      renderItem: () => <CategorySection />
    },
    {
      title: 'search',
      data: [null],
      renderItem: () => <SearchBar />
    },
    {
      title: 'discover',
      data: [null],
      renderItem: () => (
        <DiscoverPlacesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentIndex={currentDestinationIndex}
          setCurrentIndex={setCurrentDestinationIndex}
        />
      )
    },
    {
      title: 'guides',
      data: [null],
      renderItem: () => <GuidesSection />
    },
    {
      title: 'packages',
      data: [null],
      renderItem: () => (
        <TravelPackagesSection
          activePackageTab={activePackageTab}
          setActivePackageTab={setActivePackageTab}
        />
      )
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-[#FAFAFA]'>
      <SectionList
        sections={sections}
        renderItem={({ section }) => section.renderItem()}
        renderSectionHeader={() => null}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
      <BottomNavigation />
    </SafeAreaView>
  );
};

// Header Component
const Header = () => {
  return (
    <View className='bg-amber-300 pb-6 pt-6 px-4 rounded-bl-[50px]'>
      <View className='flex-row justify-between items-center mb-2'>
        <Link href={"/dashboard"} asChild>
          <Pressable className='w-12 h-12 rounded-full overflow-hidden border-2 border-white'>
            <Image
              source={require("@/assets/images/profile.jpg")}
              className='w-full h-full'
            />
          </Pressable>
        </Link>

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
