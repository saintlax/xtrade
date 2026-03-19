export const ITEMS = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    description: 'Slightly used iPhone 13 Pro, 256GB, Graphite. No scratches.',
    price: 850,
    sellerId: 'vendor1',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500'],
    status: 'available',
    pickupAddress: '123 Tech Avenue, Silicon Valley',
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Brand new MacBook Air M2, 16GB RAM, 512GB SSD.',
    price: 1200,
    sellerId: 'temp_seller1',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    status: 'available',
    pickupAddress: '456 Apple Street, Cupertino',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    description: 'Noise cancelling headphones, black. Excellent condition.',
    price: 250,
    sellerId: 'vendor2',
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    status: 'available',
    pickupAddress: '789 Sound Road, Austin',
  }
];

export const VENDORS = [
  {
    id: 'vendor1',
    businessName: 'Tech Hub',
    username: 'techhub_admin',
    email: 'admin@techhub.com',
    type: 'registered',
    isVerified: true,
    kycStatus: 'approved',
    joinDate: '2025-01-15',
  },
  {
    id: 'vendor2',
    businessName: 'Gadget World',
    username: 'gadgetworld',
    email: 'sales@gadgetworld.com',
    type: 'registered',
    isVerified: true,
    kycStatus: 'approved',
    joinDate: '2025-02-10',
  },
  {
    id: 'vendor3',
    businessName: 'New Star Tech',
    username: 'newstar',
    email: 'contact@newstar.com',
    type: 'registered',
    isVerified: false,
    kycStatus: 'pending',
    joinDate: '2026-03-18',
  }
];

export const ADMINS = [
  {
    id: 'admin1',
    name: 'Super Admin',
    username: 'admin',
    email: 'admin@xtrade.com',
    role: 'admin',
  }
];

export const ESCROW_TRANSACTIONS = [
  {
    id: 'tx1',
    itemId: '1',
    buyerId: 'buyer1',
    vendorId: 'vendor1',
    amount: 850,
    deliveryFee: 25.5,
    status: 'held', // held, released, refunded
    timestamp: '2026-03-19T10:00:00Z',
  }
];

export const BUYERS = [
  {
    id: 'buyer1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    subscriptionStatus: 'ACTIVE',
    subscriptionType: 'Monthly',
  }
];

export const BUYER_INTENTS = [
  {
    id: 'intent1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'iPhone 13 Pro',
    category: 'Electronics',
    timestamp: '2026-03-18T14:20:00Z',
    status: 'active',
  },
  {
    id: 'intent2',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'Mechanical Keyboard',
    category: 'Electronics',
    timestamp: '2026-03-19T09:15:00Z',
    status: 'active',
  }
];

export const MEETINGS = [
  {
    id: 'm1',
    itemId: '1',
    sellerId: 'vendor1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'iPhone 13 Pro',
    status: 'scheduled',
    time: '2026-03-20T10:00:00Z',
    zoomLink: '/meeting/m1',
    duration: 30,
  },
  {
    id: 'm2',
    itemId: '2',
    sellerId: 'temp_seller1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'MacBook Air M2',
    status: 'pending',
    time: '2026-03-21T15:00:00Z',
    zoomLink: '/meeting/m2',
    duration: 30,
  }
];

export const SUBSCRIPTION_PACKAGES = [
  { id: 'daily', name: 'Daily', price: 1, duration: '1 day' },
  { id: 'weekly', name: 'Weekly', price: 5, duration: '7 days' },
  { id: 'monthly', name: 'Monthly', price: 15, duration: '30 days' },
];
