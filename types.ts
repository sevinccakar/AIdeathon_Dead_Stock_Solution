export enum Category {
  Electronics = 'Elektronik',
  Fashion = 'Moda',
  Home = 'Ev & Yaşam',
  Accessories = 'Aksesuar',
  Footwear = 'Ayakkabı'
}

export enum StockStatus {
  Healthy = 'Sağlıklı',
  AtRisk = 'Risk Altında',
  Deadstock = 'Deadstock'
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  price: number;
  cost: number;
  stockQuantity: number;
  daysInStock: number; // How long it's been sitting
  monthlySalesRate: number; // Average units sold per month recently
  lastSoldDate: string;
  imageUrl: string;
  marketplace?: string; // E-ticaret mağazası
}

export interface AiStrategy {
  strategyName: string;
  description: string;
  estimatedRecoveryPercentage: number;
  actionItems: string[];
  difficulty: 'Low' | 'Medium' | 'High';
}

export interface AnalysisResult {
  productId: string;
  analysisDate: string;
  deadstockReasoning: string;
  strategies: AiStrategy[];
}

export interface MarketplaceConnection {
  id: string;
  name: string;
  apiKey: string;
  secretKey: string;
  isConnected: boolean;
}

export enum MarketplacePlatform {
  Trendyol = 'trendyol',
  N11 = 'n11',
  Pazarama = 'pazarama',
  PTTAVM = 'pttavm'
}