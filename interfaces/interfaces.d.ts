//? Auth Related Interfaces
interface UserData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role?: string;
  image: string;
  gender?: string;
  username?: string;
}

// ? UserData1
interface UserData1 {
  name?: string;
  image?: string;
  userName?: string;
  email?: string;
  isVerified?: boolean;
  role?: string;
  phone?: string;
  createdAt?: string | Date | number;
  updatedAt?: string | Date | number;
  id?: string;
  slug?: string;
}

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
  activeIcon?: any;
  label: string;
  route: LinkProps["href"];
  isActive?: boolean;
  isOpen?: boolean;
}

interface SubmenuItem {
  label: string;
  route: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: SubmenuItem[];
  isSubmenuOpen?: boolean;
}
interface MenuItemProps extends MenuItem {
  hasSubmenu?: boolean;
  openSubmenus?: boolean;
  setOpenSubmenus?: (openSubmenus: boolean) => void;
  submenuItems?: SubmenuItem[];
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
};

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

// Travel Packages Service
type TravelServiceData = {
  _id?: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  price1: string;
  price2: string;
  category: string;
  creatorType: string;
  createdBy: mongoose.Types.ObjectId;
  imageUrl: string[];
  isPopular?: boolean;
  rating?: number;
  totalReviews?: number;
};

// ? flight service related interface
interface FlightServiceData {
  _id?: string;
  title: string;
  title1: string;
  description: string;
  description1: string;
  location: string;
  economicPrice: string;
  businessPrice: string;
  creatorCategory?: string;
  createdBy?: string | object | mongoose.Types.ObjectId;
  imageUrl: string[];
  rating?: number;
  totalReviews?: number;
}

// ? Hotel Services related interfaces
interface HotelServiceData {
  _id?: string;
  title: string;
  title1: string;
  description: string;
  description1: string;
  location: string;
  basicPrice: string;
  standardPrice: string;
  creatorCategory?: string;
  createdBy?: string | object | mongoose.Types.ObjectId;
  imageUrl: string[];
  rating?: number;
  totalReviews?: number;
}

// ? Guider Services related interfaces
interface GuiderServiceData {
  _id?: string;
  name: string;
  bio: string;
  languages: string[];
  location: string;
  experience: string;
  specialty: string;
  hourlyRate: number;
  dailyRate: number;
  isVerified: boolean;
  imageUrl: string[];
  available: boolean;
  contactInfo:
    | string
    | {
        phone?: string;
        email?: string;
        [key: string]: any;
      };
  creatorType?: string;
  createdBy?: string | object | mongoose.Types.ObjectId;
  rating?: number;
  totalReviews?: number;
}

// ? chat related interfaces

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

//? message related interfaces
interface Message {
  id?: string;
  reciverId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  messages: string;
  conversationId?: mongoose.Types.ObjectId;
  sent_at?: Date;
  is_read?: boolean;
}
