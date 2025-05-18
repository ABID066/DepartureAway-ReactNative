import { MaterialIcons } from "@expo/vector-icons";
import { Link, type LinkProps } from "expo-router";
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
}: MenuItemProps): JSX.Element => {
  if (hasSubmenu) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onSubmenuToggle?.(label)}
          className={`flex-row items-center p-3 rounded-lg mb-1 ${
            isActive ? "bg-gray-100" : ""
          }`}>
          {isOpen && (
            <>
              <View className='size-auto mr-3 items-center justify-center'>
                {activeIcon && isActive ? activeIcon : icon}
              </View>
              <Text className={`flex-1 ${isActive ? "font-bold" : ""}`}>
                {label}
              </Text>
              <MaterialIcons
                name={
                  isSubmenuOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={24}
                color='black'
              />
            </>
          )}
        </TouchableOpacity>
        {isSubmenuOpen && isOpen && (
          <View className='ml-8'>
            {submenuItems.map((item, index) => (
              <Link key={index} href={item.route as LinkProps["href"]} asChild>
                <TouchableOpacity
                  className={`flex-row items-center p-3 rounded-lg mb-1 ${
                    item.isActive ? "bg-gray-100" : ""
                  }`}>
                  <Text className={`${item.isActive ? "font-bold" : ""}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <Link href={route} asChild>
      <TouchableOpacity
        className={`flex-row items-center p-3 rounded-lg mb-1 ${
          isActive ? "bg-gray-100" : ""
        }`}>
        {isOpen && (
          <>
            <View className='size-auto mr-3 items-center justify-center'>
              {activeIcon && isActive ? activeIcon : icon}
            </View>
            <Text className={`${isActive ? "font-bold text-[#FF1A5A]" : ""}`}>
              {label}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default MenuItem;