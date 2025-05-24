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
  subValue?: string;
  date?: string;
  bgColor?: string;
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

type ServiceData = {
  id?: string | number;
  provider_id: string;
  title: string;
  description: string;
  category: "flight" | "hotel" | "tour" | "guider" | "lost-bag" | "others";
  price_basic: string;
  price_standard: string;
  price_premium: string;
  location: string;
  duration_days: string;
  media_urls: string;
}

interface ServiceForm {
  title: string;
  description: string;
  category: string;
  location: string;
  basicPrice: string;
  standardPrice: string;
  premiumPrice: string;
  duration: string;
  mediaUrls: string;
  images: string[];
}


interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  basicPrice?: string;
  standardPrice?: string;
  premiumPrice?: string;
  duration?: string;
}


interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  isOnline: boolean;
  lastActive?: string;
}


interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: string;
}