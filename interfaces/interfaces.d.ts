// ? payment related interfaces
interface PaymentMethod {
  id?: string;
  name?: string;
  logo?: ImageSourcePropType | undefined;
}

// ? sidebar related interfaces
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

// for menu
interface MenuItem {
  icon: any;
  label: string;
  route: LinkProps["href"];
  isActive?: boolean;
  isOpen?: boolean;
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
  toggleSidebar?: () => void;
}


//? service related interfaces

interface Service {
  id: string;
  title: string;
  category: string;
  basicPrice: number;
  standardPrice: number;
  premiumPrice: number;
}
