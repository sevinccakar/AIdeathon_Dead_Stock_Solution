import { Category, Product } from './types';

export const MOCK_INVENTORY: Product[] = [
  {
    id: '1',
    name: 'Vintage Denim Ceket',
    sku: 'FASH-DJ-001',
    category: Category.Fashion,
    price: 899.99,
    cost: 350.00,
    stockQuantity: 142,
    daysInStock: 180,
    monthlySalesRate: 2,
    lastSoldDate: '2023-10-15',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    marketplace: 'Trendyol'
  },
  {
    id: '2',
    name: 'Bluetooth Hoparlör X1',
    sku: 'ELEC-SPK-X1',
    category: Category.Electronics,
    price: 599.99,
    cost: 250.00,
    stockQuantity: 85,
    daysInStock: 120,
    monthlySalesRate: 5,
    lastSoldDate: '2023-11-01',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    marketplace: 'N11'
  },
  {
    id: '3',
    name: 'Seramik Vazo Seti',
    sku: 'HOME-VS-009',
    category: Category.Home,
    price: 450.00,
    cost: 150.00,
    stockQuantity: 200,
    daysInStock: 365,
    monthlySalesRate: 0,
    lastSoldDate: '2023-05-20',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    marketplace: 'Pazarama'
  },
  {
    id: '4',
    name: 'Neon Koşu Ayakkabısı',
    sku: 'FOOT-RUN-NEO',
    category: Category.Footwear,
    price: 1200.00,
    cost: 600.00,
    stockQuantity: 24,
    daysInStock: 45,
    monthlySalesRate: 15,
    lastSoldDate: '2023-11-28',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    marketplace: 'PTTAVM'
  },
  {
    id: '5',
    name: 'Akıllı Telefon Kılıfı (iPhone 12)',
    sku: 'ACC-CASE-12',
    category: Category.Accessories,
    price: 199.99,
    cost: 25.00,
    stockQuantity: 500,
    daysInStock: 400,
    monthlySalesRate: 1,
    lastSoldDate: '2023-08-10',
    imageUrl: 'https://picsum.photos/200/200?random=5',
    marketplace: 'Trendyol'
  },
  {
    id: '6',
    name: 'Mekanik Klavye',
    sku: 'ELEC-KB-MECH',
    category: Category.Electronics,
    price: 1499.99,
    cost: 800.00,
    stockQuantity: 15,
    daysInStock: 60,
    monthlySalesRate: 8,
    lastSoldDate: '2023-11-25',
    imageUrl: 'https://picsum.photos/200/200?random=6',
    marketplace: 'N11'
  }
];

export const DEADSTOCK_THRESHOLD_DAYS = 90;