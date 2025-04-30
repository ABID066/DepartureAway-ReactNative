import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Package categories data
const packageCategories = ['Traveler Choose', 'Hajj', 'Honeymoon', 'Alpine'];

// Interface for package data
interface PackageItem {
  id: number;
  name: string;
  location: string;
  price: string;
  duration: string;
  image: any;
}

// Travel packages data for "Traveler Choose" tab
const travelerChoosePackages: PackageItem[] = [
  {
    id: 1,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 2,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 3,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 4,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 5,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 6,
    name: 'Seajack valley package',
    location: 'AV Damero 770, Holles Q.A, Mexico',
    price: 'BDT 6000/ Person',
    duration: '2 Day, 2 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
];

// Travel packages data for "Hajj" tab
const hajjPackages: PackageItem[] = [
  {
    id: 1,
    name: 'Economy Hajj Package',
    location: 'Mecca & Medina, Saudi Arabia',
    price: 'BDT 350,000/ Person',
    duration: '30 Days',
    image: require('@/assets/images/Hajj.jpg')
  },
  {
    id: 2,
    name: 'Standard Hajj Package',
    location: 'Mecca & Medina, Saudi Arabia',
    price: 'BDT 450,000/ Person',
    duration: '35 Days',
    image: require('@/assets/images/Hajj.jpg')
  },
  {
    id: 3,
    name: 'Premium Hajj Package',
    location: 'Mecca & Medina, Saudi Arabia',
    price: 'BDT 550,000/ Person',
    duration: '40 Days',
    image: require('@/assets/images/Hajj.jpg')
  },
  {
    id: 4,
    name: 'VIP Hajj Package',
    location: 'Mecca & Medina, Saudi Arabia',
    price: 'BDT 650,000/ Person',
    duration: '40 Days',
    image: require('@/assets/images/Hajj.jpg')
  },
];

// Travel packages data for "Honeymoon" tab
const honeymoonPackages: PackageItem[] = [
  {
    id: 1,
    name: 'Maldives Honeymoon',
    location: 'Damero 770, Male, Maldives',
    price: 'BDT 180,000/ Couple',
    duration: '5 Day, 4 Night',
    image: require('@/assets/images/hhh.jpg')
  },
  {
    id: 2,
    name: 'Bali Romance Package',
    location: 'Damero 770, Kuta, Bali, Indonesia',
    price: 'BDT 150,000/ Couple',
    duration: '6 Day, 5 Night',
    image: require('@/assets/images/hhh.jpg')
  },
  {
    id: 3,
    name: 'Santorini Getaway',
    location: 'Damero 770, Oia, Santorini, Greece',
    price: 'BDT 220,000/ Couple',
    duration: '7 Day, 6 Night',
    image: require('@/assets/images/hhh.jpg')
  },
  {
    id: 4,
    name: 'Paris Romance',
    location: 'Damero 770, Paris, France',
    price: 'BDT 200,000/ Couple',
    duration: '6 Day, 5 Night',
    image: require('@/assets/images/hhh.jpg')
  },
];

// Travel packages data for "Alpine" tab
const alpinePackages: PackageItem[] = [
  {
    id: 1,
    name: 'Swiss Alps Adventure',
    location: 'Damero 770, Zermatt, Switzerland',
    price: 'BDT 250,000/ Person',
    duration: '7 Day, 6 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 2,
    name: 'French Alps Ski Tour',
    location: 'Damero 770, Chamonix, France',
    price: 'BDT 220,000/ Person',
    duration: '6 Day, 5 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 3,
    name: 'Austrian Alps Retreat',
    location: 'Damero 770, Innsbruck, Austria',
    price: 'BDT 230,000/ Person',
    duration: '8 Day, 7 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
  {
    id: 4,
    name: 'Italian Alps Explorer',
    location: 'Damero 770, Dolomites, Italy',
    price: 'BDT 210,000/ Person',
    duration: '5 Day, 4 Night',
    image: require('@/assets/images/HomePic1.jpg')
  },
];

// Travel Packages Section Component
const TravelPackagesSection = ({ 
  activePackageTab, 
  setActivePackageTab 
}: { 
  activePackageTab: string;
  setActivePackageTab: (tab: string) => void;
}) => {
  // Calculate screen width to set card width dynamically
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 32 - 8) / 2; // Accounting for padding and gap
  
  // Get the appropriate data based on active tab
  const getPackagesData = (): PackageItem[] => {
    switch (activePackageTab) {
      case 'Traveler Choose':
        return travelerChoosePackages;
      case 'Hajj':
        return hajjPackages;
      case 'Honeymoon':
        return honeymoonPackages;
      case 'Alpine':
        return alpinePackages;
      default:
        return travelerChoosePackages;
    }
  };
  
  // Get the current packages data
  const packagesData = getPackagesData();
  
  // Render individual package card
  const renderPackageCard = ({ item }: { item: PackageItem }) => (
    <TouchableOpacity 
      className="rounded-xl overflow-hidden mb-4 mx-1"
      activeOpacity={0.8}
      style={{ width: cardWidth }}
    >
      {/* Image */}
      <Image 
        source={item.image} 
        className="w-full h-60"
        resizeMode="cover"
      />
      
      {/* Duration Tag */}
      <View className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 rounded-lg">
        <Text className="text-xs font-bold text-gray-800">{item.duration}</Text>
      </View>
      
      {/* Dark overlay for text visibility */}
      <View className="absolute bottom-0 left-0 right-0 h-24 bg-black opacity-50" />
      
      {/* Content */}
      <View className="absolute bottom-0 left-0 right-0 p-2">
        <Text className="text-sm font-bold text-amber-400">{item.price}</Text>
        <Text className="text-sm font-bold text-white mt-0.5">{item.name}</Text>
        <View className="flex-row items-center mt-0.5">
          <Ionicons name="location-outline" size={14} color="#fff" />
          <Text className="text-sm text-white mx-1" numberOfLines={2}>
            {item.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-5 px-4 mb-20">
      <Text className="text-xl font-bold text-gray-800">Travel package</Text>
      
      <View className="flex-row my-4">
        {packageCategories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`mr-4 py-1 ${activePackageTab === category ? 'bg-rose-500 px-4 rounded-full' : ''}`}
            onPress={() => setActivePackageTab(category)}
          >
            <Text 
              className={`text-base ${activePackageTab === category ? 'text-white font-semibold' : 'text-gray-500'}`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Use FlatList instead of flex-wrap for more reliable grid layout */}
      <FlatList
        data={packagesData}
        renderItem={renderPackageCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable scrolling as parent ScrollView handles it
      />
    </View>
  );
};

export default TravelPackagesSection;