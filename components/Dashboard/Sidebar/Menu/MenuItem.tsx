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
            {submenuItems.map((item, index) => {
              const isItemPathActive = pathname === item.route || item.isActive;
              return (
                <Link
                  key={index}
                  href={item.route as LinkProps["href"]}
                  asChild>
                  <TouchableOpacity
                    className={`flex-row items-center p-3 rounded-lg mb-1 ${
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
            })}
          </View>
        )}
      </View>
    );
  }

  return (
    <Link href={route} asChild>
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
