import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { images } from "@/constants/images";
import MenuItem from "@/components/Dashboard/Sidebar/Menu/MenuItem";
import { usePathname, useRouter } from "expo-router";

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuItems: MenuItemProps[] = [
    {
      icon: <MaterialIcons name='dashboard' size={24} color='black' />,
      activeIcon: <MaterialIcons name='dashboard' size={24} color='#FF1A5A' />,
      label: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: (
        <MaterialIcons name='miscellaneous-services' size={24} color='black' />
      ),
      activeIcon: (
        <MaterialIcons
          name='miscellaneous-services'
          size={24}
          color='#FF1A5A'
        />
      ),
      label: "Services",
      route: "/dashboard/services",
      hasSubmenu: true,
      isActive: pathname.startsWith("/dashboard/services"),
      submenuItems: [
        {
          label: "All Services",
          route: "/dashboard/services",
          isActive: pathname === "/dashboard/services",
        },
        {
          label: "Add New Service",
          route: "/dashboard/services/add-new-service",
          isActive: pathname === "/services/add-new-service",
        },
      ],
    },
    {
      icon: <MaterialIcons name='shopping-cart' size={24} color='black' />,
      activeIcon: (
        <MaterialIcons name='shopping-cart' size={24} color='#FF1A5A' />
      ),
      label: "Orders",
      route: "/dashboard/orders",
    },
    {
      icon: <MaterialIcons name='inventory' size={24} color='black' />,
      activeIcon: <MaterialIcons name='inventory' size={24} color='#FF1A5A' />,
      label: "Products",
      route: "/dashboard/products",
    },
    {
      icon: <FontAwesome5 name='users' size={24} color='black' />,
      activeIcon: <FontAwesome5 name='users' size={24} color='#FF1A5A' />,
      label: "Customers",
      route: "/dashboard/customers",
    },
  ];

  const settingsItems: MenuItemProps[] = [
    {
      icon: <FontAwesome name='user' size={24} color='black' />,
      activeIcon: <FontAwesome name='user' size={24} color='#FF1A5A' />,
      label: "Profile",
      route: "/dashboard/profile",
    },
    {
      icon: <Ionicons name='settings' size={24} color='black' />,
      activeIcon: <Ionicons name='settings' size={24} color='#FF1A5A' />,
      label: "Preferences",
      route: "/dashboard/preferences",
    },
  ];

  return (
    <View
      className={`bg-white h-full border-r border-gray-200 ${
        isOpen ? "w-full p-4" : "w-0 hidden"
      }`}>
      <View className='flex-row items-center absolute right-0 top-4'>
        <TouchableOpacity
          onPress={toggleSidebar}
          className='w-10 h-10 justify-center items-center bg-white rounded-lg mr-4 z-20'>
          <Entypo name='menu' size={24} color='black' />
        </TouchableOpacity>
      </View>
      <View className='mb-8 w-full p-4 pt-6'>
        <Pressable onPress={() => router.push("/home")}>
          <Image
            source={images?.logo}
            className='max-w-[162px] h-[46px] mt-3'
            accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
            resizeMode='contain'
          />
        </Pressable>
        <Text className='text-gray-500 mt-1 text-right'>Admin Dashboard</Text>
      </View>

      <View className='flex-1'>
        {isOpen && <Text className='text-gray-400 text-xs mb-4'>MENU</Text>}
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isSubmenuOpen={openSubmenu === item.label}
            onSubmenuToggle={handleSubmenuToggle}
          />
        ))}
      </View>

      <View>
        {isOpen && <Text className='text-gray-400 text-xs mb-4'>SETTINGS</Text>}
        {settingsItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isOpen={isOpen}
            isSubmenuOpen={openSubmenu === item.label}
            onSubmenuToggle={handleSubmenuToggle}
          />
        ))}
      </View>
    </View>
  );
};

export default Sidebar;
