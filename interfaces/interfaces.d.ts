interface PaymentMethod {
  id?: string;
  name?: string;
  logo?: ImageSourcePropType | undefined;
}

interface MenuItem {
  icon: any;
  label: string;
  route: LinkProps["href"];
  isActive?: boolean;
  isOpen?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  date: string;
}

interface MenuItemProps extends MenuItem {
  hasSubmenu?: boolean;
  activeIcon?: any;
  submenuItems?: Array<{
    label: string;
    route: string;
    isActive?: boolean;
  }>;
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: (label: string) => void;
}
