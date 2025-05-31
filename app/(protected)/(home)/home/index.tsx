import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CategorySection from "@/components/Home/Category";
import SearchBar from "@/components/Home/Search";
import DiscoverPlacesSection from "@/components/Home/Discover";
import GuidesSection from "@/components/Home/Guider";
import TravelPackagesSection from "@/components/Home/TravelPackage";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedGuider } from "@/services/authServices";

// Import components
const HomePage = () => {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState("For you");
  const [activePackageTab, setActivePackageTab] = useState("Traveler Choose");
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["guides", "guider", "top-rated"],
    queryFn: async () => getTopRatedGuider(),
  });

  const topRatedGuiders = data?.data || [];

  const sections = [
    {
      title: "header",
      data: [null],
      renderItem: () => <Header />,
    },
    {
      title: "categories",
      data: [null],
      renderItem: () => <CategorySection />,
    },
    {
      title: "search",
      data: [null],
      renderItem: () => <SearchBar />,
    },
    {
      title: "discover",
      data: [null],
      renderItem: () => (
        <DiscoverPlacesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentIndex={currentDestinationIndex}
          setCurrentIndex={setCurrentDestinationIndex}
        />
      ),
    },
    {
      title: "guides",
      data: [null],
      renderItem: () => <GuidesSection guiders={topRatedGuiders} />,
    },
    {
      title: "packages",
      data: [null],
      renderItem: () => (
        <TravelPackagesSection
          activePackageTab={activePackageTab}
          setActivePackageTab={setActivePackageTab}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <View className='min-h-screen justify-center items-center'>
        <ActivityIndicator size='large' color='#F13F5F' />
      </View>
    );
  }

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
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDashboard = () => {
    setIsModalVisible(false);
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    setIsModalVisible(false);
    await logout();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View className='bg-amber-300 pb-6 pt-6 px-4 rounded-bl-[50px]'>
      <View className='flex-row justify-between items-center mb-2'>
        {user && (
          <Pressable
            onPress={toggleModal}
            className='w-12 h-12 rounded-full overflow-hidden border-2 border-white'>
            <Image
              source={
                user
                  ? { uri: user?.image }
                  : require("@/assets/images/profile.jpg")
              }
              className='w-full h-full'
            />
          </Pressable>
        )}
        {isModalVisible && user && (
          <View className='absolute top-14 left-2 bg-white rounded-lg shadow-lg p-2 w-40 z-20'>
            <Pressable
              className='p-2 flex-row items-center'
              onPress={handleDashboard}>
              <Ionicons name='grid-outline' size={20} color='#000' />
              <Text className='ml-2'>Dashboard</Text>
            </Pressable>
            <Pressable
              className='p-2 flex-row items-center'
              onPress={handleLogout}>
              <Ionicons name='log-out-outline' size={20} color='#000' />
              <Text className='ml-2'>Logout</Text>
            </Pressable>
          </View>
        )}
        <View className='flex-row items-center'>
          <View className='mr-1'>
            <Image
              source={require("@/assets/images/logo.png")}
              className='w-44 h-20'
              resizeMode='contain'
            />
          </View>
        </View>

        <TouchableOpacity className='w-12 h-12 rounded-full bg-[#F13F5F] justify-center items-center'>
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
          <Text className='text-xs text-[#F13F5F] mt-0.5'>Home</Text>
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
