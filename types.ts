
export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  images?: string[];
  date: string;
}

export interface Variant {
  id: string;
  name: string;
  price?: number; // Optional override price
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
  origin: string;
  inStock?: boolean; // New: Stock status
  shortDescription?: string; // New: Short description for top section
  detailContent?: string; // New: HTML string for rich text details
  variants?: Variant[]; // New: SKU options
  reviews?: Review[]; // New: User reviews
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content?: string; // New: Full article content
  // New fields for Course/Academy details
  lecturer?: string;
  courseTime?: string;
  location?: string;
  contactPhone?: string;
  contactEmail?: string;
  relatedProductId?: string; // ID of the product to buy for registration
  tips?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: Variant; // Track selected variant in cart
}

export interface Order {
  id: string;
  date: string;
  status: 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'completed' | 'after_sales';
  statusText: string;
  total: number;
  // Fixed: Changed from Product[] to CartItem[] to include quantity and variant info required by order displays.
  items: CartItem[];
  pointsUsed?: number; // New: Points used for payment
  // Optional detailed fields for mock data
  address?: {
    name: string;
    phone: string;
    details: string;
  };
  paymentMethod?: string;
  shipping?: number;
  discount?: number;
}
