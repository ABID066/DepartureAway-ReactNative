import { MaterialIcons } from "@expo/vector-icons";
import { Link, usePathname, type LinkProps } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


const MenuItem = ({
  icon,
  activeIcon,
  label,
  route,
  isActive = false,
  isOpen,
  hasSubmenu = false,
  submenuItems = [],
  isSubmenuOpen = false,
  onSubmenuToggle,
  toggleSidebar,
}: MenuItemProps): JSX.Element => {
  const pathname = usePathname();
  const isActivePath = pathname === route || isActive;

  const renderSubmenuItem = (item: SubmenuItem, index: number, level: number = 0) => {
    const isItemPathActive = pathname === item.route || item.isActive;

    if (item.hasSubmenu && Array.isArray(item.submenuItems) && item.submenuItems.length > 0) {
      return (
        <View key={index} className={`ml-${level * 4}`}>
          <TouchableOpacity
            onPress={() => onSubmenuToggle?.(item.label)}
            className={`flex-row items-center p-3 rounded-lg mb-1 ${
              isItemPathActive ? "bg-gray-100" : ""
            }`}>
            <Text
              className={`flex-1 ${
                isItemPathActive ? "font-bold text-[#FF1A5A]" : ""
              }`}>
              {item.label}
            </Text>
            <MaterialIcons
              name={
                item.isSubmenuOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"
              }
              size={24}
              color={isItemPathActive ? "#FF1A5A" : "black"}
            />
          </TouchableOpacity>
          {item.isSubmenuOpen && (
            <View>
              {item.submenuItems?.map((subItem, subIndex) =>
                renderSubmenuItem(subItem, subIndex, level + 1)
              )}
            </View>
          )}
        </View>
      );
    }

    return (
      <Link key={index} href={item.route as LinkProps["href"]} asChild>
        <TouchableOpacity
          className={`flex-row items-center p-3 rounded-lg mb-1 ml-${level * 4} ${
            isItemPathActive ? "bg-gray-100" : ""
          }`}
          onPress={toggleSidebar}>
          <Text
            className={`${
              isItemPathActive ? "font-bold text-[#FF1A5A]" : ""
            }`}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };

  if (hasSubmenu || submenuItems.length > 0) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onSubmenuToggle?.(label)}
          className={`flex-row items-center p-3 rounded-lg mb-1 ${
            isActivePath ? "bg-gray-100" : ""
          }`}>
          {isOpen && (
            <>
              <View className='size-auto mr-3 items-center justify-center'>
                {activeIcon && isActivePath ? activeIcon : icon}
              </View>
              <Text
                className={`flex-1 ${
                  isActivePath ? "font-bold text-[#FF1A5A]" : ""
                }`}>
                {label}
              </Text>
              <MaterialIcons
                name={
                  isSubmenuOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={24}
                color={isActivePath ? "#FF1A5A" : "black"}
              />
            </>
          )}
        </TouchableOpacity>
        {isSubmenuOpen && isOpen && (
          <View className='ml-8'>
            {submenuItems.map((item, index) =>
              renderSubmenuItem(item, index)
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <Link href={route as LinkProps["href"]} asChild>
      <TouchableOpacity
        className={`flex-row items-center p-3 rounded-lg mb-1 ${
          isActivePath ? "bg-gray-100" : ""
        }`}
        onPress={toggleSidebar}>
        {isOpen && (
          <>
            <View className='size-auto mr-3 items-center justify-center'>
              {activeIcon && isActivePath ? activeIcon : icon}
            </View>
            <Text
              className={`${isActivePath ? "font-bold text-[#FF1A5A]" : ""}`}>
              {label}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default MenuItem;