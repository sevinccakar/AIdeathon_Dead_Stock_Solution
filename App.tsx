import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { DeadstockTable } from './components/DeadstockTable';
import { RecommendationPanel } from './components/RecommendationPanel';
import { SettingsModal } from './components/SettingsModal';
import { Charts } from './components/Charts';
import { MOCK_INVENTORY, DEADSTOCK_THRESHOLD_DAYS } from './constants';
import { Product } from './types';
import { AlertTriangle, DollarSign, Package, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Derived Metrics
  const deadstockItems = MOCK_INVENTORY.filter(i => i.daysInStock > DEADSTOCK_THRESHOLD_DAYS);
  const totalDeadstockValue = deadstockItems.reduce((acc, curr) => acc + (curr.cost * curr.stockQuantity), 0);
  const totalPotentialRecovery = totalDeadstockValue * 0.6; // Assuming 60% recovery average
  const itemsAtRisk = MOCK_INVENTORY.filter(i => i.daysInStock > DEADSTOCK_THRESHOLD_DAYS / 2 && i.daysInStock <= DEADSTOCK_THRESHOLD_DAYS).length;

  const handleAnalyze = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePanel = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 ml-64 p-8 max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Hoşgeldiniz, Yönetici</h2>
            <p className="text-slate-500">İşte bugünün envanter durumu ve aksiyon planları.</p>
          </div>
          <div className="text-sm text-right text-slate-400">
            Son güncelleme: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Toplam Deadstock Değeri" 
            value={`₺${totalDeadstockValue.toLocaleString('tr-TR')}`}
            trend="+12%"
            trendUp={false}
            icon={DollarSign}
            colorClass="bg-red-500"
          />
          <StatsCard 
            title="Riskli Ürün Sayısı" 
            value={deadstockItems.length.toString()}
            trend="+3"
            trendUp={false}
            icon={AlertTriangle}
            colorClass="bg-amber-500"
          />
          <StatsCard 
            title="Potansiyel Kurtarma" 
            value={`₺${totalPotentialRecovery.toLocaleString('tr-TR')}`}
            icon={RefreshCw}
            colorClass="bg-green-500"
          />
          <StatsCard 
            title="İzlenen Ürünler" 
            value={itemsAtRisk.toString()}
            trend="-2"
            trendUp={true}
            icon={Package}
            colorClass="bg-indigo-500"
          />
        </div>

        {/* Conditional Content based on Tab */}
        {activeTab === 'dashboard' && (
          <>
            <Charts products={MOCK_INVENTORY} />
            <DeadstockTable 
              products={MOCK_INVENTORY.sort((a, b) => b.daysInStock - a.daysInStock)} 
              onAnalyze={handleAnalyze} 
            />
          </>
        )}

        {activeTab === 'inventory' && (
          <DeadstockTable 
            products={MOCK_INVENTORY} 
            onAnalyze={handleAnalyze} 
          />
        )}

        {activeTab === 'analytics' && (
           <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
             <h3 className="text-xl font-bold text-slate-800 mb-2">Detaylı Analitik</h3>
             <p className="text-slate-500">Bu modül geliştirme aşamasındadır. Şimdilik dashboard üzerindeki grafikleri kullanabilirsiniz.</p>
             <button 
              onClick={() => setActiveTab('dashboard')}
              className="mt-4 text-indigo-600 font-medium hover:underline"
            >
              Dashboard'a Dön
             </button>
           </div>
        )}

      </main>

      {/* AI Slide-over Panel */}
      <RecommendationPanel 
        product={selectedProduct} 
        onClose={handleClosePanel} 
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default App;