export const ITEMS = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    description: 'Slightly used iPhone 13 Pro, 256GB, Graphite. No scratches.',
    price: 450000,
    sellerId: 'vendor1',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba3f9e?w=500',
      'https://images.unsplash.com/photo-1512052112357-31f744c599bb?w=500'
    ],
    status: 'available',
    pickupAddress: '123 Tech Avenue, Lagos',
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Brand new MacBook Air M2, 16GB RAM, 512GB SSD.',
    price: 1200000,
    sellerId: 'temp_seller1',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?w=500',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500'
    ],
    status: 'available',
    pickupAddress: '456 Apple Street, Abuja',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    description: 'Noise cancelling headphones, black. Excellent condition.',
    price: 250000,
    sellerId: 'vendor2',
    category: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    status: 'available',
    pickupAddress: '789 Sound Road, Port Harcourt',
  },
  {
    id: '4',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Premium flagship phone with 200MP camera and S Pen.',
    price: 850000,
    sellerId: 'vendor1',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500',
      'https://images.unsplash.com/photo-1678911820844-0390e52df665?w=500'
    ],
    status: 'available',
     pickupAddress: 'Victoria Island, Lagos',
   },
   {
     id: '5',
     name: 'Dell XPS 15',
     description: 'Powerful laptop for creators. i9, 32GB RAM, 1TB SSD, 4K Touch.',
     price: 1850000,
     sellerId: 'vendor2',
     category: 'Electronics',
     images: [
       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
       'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'
     ],
     status: 'available',
     pickupAddress: 'Garki, Abuja',
   },
   {
     id: '6',
     name: 'Canon EOS R5',
     description: 'Professional mirrorless camera. 45MP, 8K Video, Body only.',
     price: 3200000,
     sellerId: 'vendor1',
     category: 'Electronics',
     images: [
       'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
       'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500'
     ],
     status: 'available',
     pickupAddress: 'Lekki Phase 1, Lagos',
   },
   {
     id: '7',
     name: 'Gaming Chair',
     description: 'Ergonomic gaming chair, brand new in box.',
     price: 150000,
     sellerId: 'temp_seller2',
     category: 'Furniture',
     images: ['https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=500'],
     status: 'available',
     pickupAddress: 'Surulere, Lagos',
   },
   {
     id: '8',
     name: 'Bose SoundLink',
     description: 'Portable bluetooth speaker, excellent bass.',
     price: 120000,
     sellerId: 'temp_seller3',
     category: 'Audio',
     images: ['https://images.unsplash.com/photo-1608156639585-34a0a5d73751?w=500'],
     status: 'available',
     pickupAddress: 'Maitama, Abuja',
   },
   {
     id: '9',
     name: 'Kitchen Mixer',
     description: 'High power mixer for baking and cooking.',
     price: 85000,
     sellerId: 'temp_seller4',
     category: 'Home',
     images: ['https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=500'],
     status: 'available',
     pickupAddress: 'Enugu, Nigeria',
   },
   {
     id: '10',
     name: 'Electric Scooter',
     description: 'Foldable electric scooter for city commuting.',
     price: 350000,
     sellerId: 'temp_seller5',
     category: 'Transport',
     images: ['https://images.unsplash.com/photo-1597075095304-7476594f837e?w=500'],
     status: 'available',
     pickupAddress: 'Ikeja, Lagos',
   },
   {
     id: '11',
     name: 'Yoga Mat',
     description: 'Non-slip yoga mat with carrying strap.',
     price: 15000,
     sellerId: 'temp_seller6',
     category: 'Fitness',
     images: ['https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500'],
     status: 'available',
     pickupAddress: 'Asaba, Delta',
   },
   {
     id: '12',
     name: 'Smart Watch',
     description: 'Fitness tracker with heart rate monitor.',
     price: 45000,
     sellerId: 'temp_seller7',
     category: 'Electronics',
     images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500'],
     status: 'available',
     pickupAddress: 'Calabar, Cross River',
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
  },
  {
    id: 'vendor4',
    businessName: 'Global Electronics',
    username: 'global_elec',
    email: 'info@globalelec.com',
    type: 'registered',
    isVerified: true,
    kycStatus: 'approved',
    joinDate: '2025-03-05',
  },
  {
    id: 'vendor5',
    businessName: 'Mobile Mart',
    username: 'mobilemart',
    email: 'sales@mobilemart.com',
    type: 'registered',
    isVerified: true,
    kycStatus: 'approved',
    joinDate: '2025-04-12',
  },
  {
    id: 'vendor6',
    businessName: 'Digital Dreams',
    username: 'digitaldreams',
    email: 'hello@digitaldreams.com',
    type: 'registered',
    isVerified: false,
    kycStatus: 'pending',
    joinDate: '2026-03-15',
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
    watchlist: ['1', '3', '5', '7', '9'],
    orders: [
      { id: 'ORD001', itemName: 'iPhone 13 Pro', price: 450000, date: '2026-03-10', status: 'delivered' },
      { id: 'ORD002', itemName: 'Sony WH-1000XM4', price: 250000, date: '2026-03-12', status: 'shipped' },
      { id: 'ORD003', itemName: 'MacBook Air M2', price: 1200000, date: '2026-03-15', status: 'processing' },
      { id: 'ORD004', itemName: 'Gaming Chair', price: 150000, date: '2026-03-18', status: 'processing' }
    ]
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
  },
  {
    id: 'm3',
    itemId: '3',
    sellerId: 'vendor2',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'Sony WH-1000XM4',
    status: 'scheduled',
    time: '2026-03-22T09:00:00Z',
    zoomLink: '/meeting/m3',
    duration: 30,
  },
  {
    id: 'm4',
    itemId: '4',
    sellerId: 'vendor1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'Samsung Galaxy S23 Ultra',
    status: 'missed',
    time: '2026-03-18T11:00:00Z',
    zoomLink: '/meeting/m4',
    duration: 30,
  },
  {
    id: 'm5',
    itemId: '5',
    sellerId: 'vendor2',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'Dell XPS 15',
    status: 'scheduled',
    time: '2026-03-23T16:00:00Z',
    zoomLink: '/meeting/m5',
    duration: 30,
  },
  {
    id: 'm6',
    itemId: '6',
    sellerId: 'vendor1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    itemName: 'Canon EOS R5',
    status: 'scheduled',
    time: '2026-03-24T14:00:00Z',
    zoomLink: '/meeting/m6',
    duration: 30,
  }
];

export const SUBSCRIPTION_PACKAGES = [
  { id: 'daily', name: 'Daily', price: 200, duration: '1 day', ussd: '*123*1#' },
  { id: 'weekly', name: 'Weekly', price: 1000, duration: '7 days', ussd: '*123*2#' },
  { id: 'monthly', name: 'Monthly', price: 3500, duration: '30 days', ussd: '*123*3#' },
];
