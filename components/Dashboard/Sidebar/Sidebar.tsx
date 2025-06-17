import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { images } from "@/constants/images";
import MenuItem from "@/components/Dashboard/Sidebar/Menu/MenuItem";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const isPermitted =
    user?.role?.toLowerCase() === "admin" ||
    user?.role?.toLowerCase() === "agency";

  const menuItems: MenuItemProps[] = [
    {
      icon: <MaterialIcons name='dashboard' size={24} color='black' />,
      activeIcon: <MaterialIcons name='dashboard' size={24} color='#FF1A5A' />,
      label: "Dashboard",
      route: "/dashboard",
    },
    ...(isPermitted
      ? [
          {
            icon: (
              <MaterialIcons
                name='miscellaneous-services'
                size={24}
                color='black'
              />
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
                label: "Travel Services",
                route: "/dashboard/services/travel-services",
                isActive: pathname.startsWith(
                  "/dashboard/services/travel-services"
                ),
                hasSubmenu: true,
                submenuItems: [
                  {
                    label: isAdmin
                      ? "All Travel Service"
                      : "Your Travel Services",
                    route: "/dashboard/services/travel-services",
                    isActive:
                      pathname === "/dashboard/services/travel-services",
                  },
                  {
                    label: "Create New Travel Service",
                    route: "/dashboard/services/travel-services/create-new",
                    isActive:
                      pathname ===
                      "/dashboard/services/travel-services/create-new",
                  },
                ],
              },
              {
                label: "Flight Services",
                route: "/dashboard/services/flight-services",
                isActive: pathname.startsWith(
                  "/dashboard/services/flight-services"
                ),
                hasSubmenu: true,
                submenuItems: [
                  {
                    label: isAdmin
                      ? "All Flight Service"
                      : "Your Flight Services",
                    route: "/dashboard/services/flight-services",
                    isActive:
                      pathname === "/dashboard/services/flight-services",
                  },
                  {
                    label: "Create New Flight Service",
                    route: "/dashboard/services/flight-services/create-new",
                    isActive:
                      pathname ===
                      "/dashboard/services/flight-services/create-new",
                  },
                ],
              },
              {
                label: "Hotel Services",
                route: "/dashboard/services/hotel-services",
                isActive: pathname.startsWith(
                  "/dashboard/services/hotel-services"
                ),
                hasSubmenu: true,
                submenuItems: [
                  {
                    label: isAdmin
                      ? "All Hotel Service"
                      : "Your Hotel Services",
                    route: "/dashboard/services/hotel-services",
                    isActive: pathname === "/dashboard/services/hotel-services",
                  },
                  {
                    label: "Create New Hotel Service",
                    route: "/dashboard/services/hotel-services/create-new",
                    isActive:
                      pathname ===
                      "/dashboard/services/hotel-services/create-new",
                  },
                ],
              },
              {
                label: "Guider Services",
                route: "/dashboard/services/guider-services",
                isActive: pathname.startsWith(
                  "/dashboard/services/guider-services"
                ),
                hasSubmenu: true,
                submenuItems: [
                  {
                    label: isAdmin
                      ? "All Guider Service"
                      : "Your Guider Services",
                    route: "/dashboard/services/guider-services",
                    isActive: pathname === "/dashboard/services/guider-services",
                  },
                  {
                    label: "Create New Guider Service",
                    route: "/dashboard/services/guider-services/create-new",
                    isActive:
                      pathname ===
                      "/dashboard/services/guider-services/create-new",
                  },
                ],
              },
            ],
          },
        ]
      : []),
    {
      icon: <MaterialIcons name='shopping-cart' size={24} color='black' />,
      activeIcon: (
        <MaterialIcons name='shopping-cart' size={24} color='#FF1A5A' />
      ),
      label: isAdmin ? "Orders" : "Your Orders",
      route: "/dashboard/orders",
    },
    ...(isAdmin
      ? [
          {
            icon: <MaterialIcons name='inventory' size={24} color='black' />,
            activeIcon: (
              <MaterialIcons name='inventory' size={24} color='#FF1A5A' />
            ),
            label: "Products",
            route: "/dashboard/products",
          },
          {
            icon: <FontAwesome5 name='users' size={24} color='black' />,
            activeIcon: <FontAwesome5 name='users' size={24} color='#FF1A5A' />,
            label: "Customers",
            route: "/dashboard/customers",
          },
        ]
      : []),
  ];

  const settingsItems: MenuItem[] = [
    {
      icon: <FontAwesome name='user' size={24} color='black' />,
      activeIcon: <FontAwesome name='user' size={24} color='#FF1A5A' />,
      label: "Profile",
      route: "/dashboard/user-profile",
    },
    {
      icon: <Ionicons name='settings' size={24} color='black' />,
      activeIcon: <Ionicons name='settings' size={24} color='#FF1A5A' />,
      label: "Preferences",
      route: "/dashboard/preferences",
    },
  ];

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const updateSubmenuOpenState = (items: SubmenuItem[]): SubmenuItem[] => {
    return items.map((item) => ({
      ...item,
      isSubmenuOpen: openSubmenus.includes(item.label),
      submenuItems: item.submenuItems
        ? updateSubmenuOpenState(item.submenuItems)
        : undefined,
    }));
  };

  const menuItemsWithState = menuItems.map((item) => ({
    ...item,
    isSubmenuOpen: openSubmenus.includes(item.label),
    submenuItems: item.submenuItems
      ? updateSubmenuOpenState(item.submenuItems)
      : undefined,
  }));

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
        <Text className='text-gray-500 mt-1 text-right'>
          {user?.role
            ? user.role.charAt(0).toUpperCase() +
              user.role.slice(1).toLowerCase()
            : ""}{" "}
          Dashboard
        </Text>
      </View>

      {isOpen && <Text className='text-gray-400 text-xs mb-4'>MENU</Text>}
      <ScrollView className='flex-1'>
        {menuItemsWithState.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isSubmenuOpen={item.isSubmenuOpen}
            onSubmenuToggle={handleSubmenuToggle}
          />
        ))}
      </ScrollView>

      <View>
        {isOpen && <Text className='text-gray-400 text-xs my-4'>SETTINGS</Text>}
        {settingsItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isSubmenuOpen={openSubmenus.includes(item.label)}
            onSubmenuToggle={handleSubmenuToggle}
          />
        ))}
        <TouchableOpacity
          className='flex flex-row items-center gap-2 ml-4 my-2'
          onPress={() => logout()}>
          <MaterialIcons name='logout' size={24} color='black' />
          <Text className='text-base font-semibold'>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
