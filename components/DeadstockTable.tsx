import React from 'react';
import { Product, StockStatus } from '../types';
import { DEADSTOCK_THRESHOLD_DAYS } from '../constants';
import { AlertCircle, ArrowUpRight, MoreVertical, Search, Filter } from 'lucide-react';

interface DeadstockTableProps {
  products: Product[];
  onAnalyze: (product: Product) => void;
}

export const DeadstockTable: React.FC<DeadstockTableProps> = ({ products, onAnalyze }) => {
  
  const getStatus = (days: number): StockStatus => {
    if (days > DEADSTOCK_THRESHOLD_DAYS) return StockStatus.Deadstock;
    if (days > DEADSTOCK_THRESHOLD_DAYS / 2) return StockStatus.AtRisk;
    return StockStatus.Healthy;
  };

  const getStatusStyle = (status: StockStatus) => {
    switch (status) {
      case StockStatus.Deadstock:
        return 'bg-red-100 text-red-700 border-red-200';
      case StockStatus.AtRisk:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-800">Riskli Envanter Listesi</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Ara..." 
              className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Filter size={16} />
            Filtrele
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Ürün Detayı</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Mağaza</th>
              <th className="px-6 py-4">Stok / Maliyet</th>
              <th className="px-6 py-4 text-center">Bekleme Süresi</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => {
              const status = getStatus(product.daysInStock);
              const totalCostValue = product.stockQuantity * product.cost;
              
              return (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 overflow-hidden">
                         <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="inline-block px-2 py-1 rounded bg-slate-100 text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                      {product.marketplace || 'Bağlı Değil'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 font-medium">{product.stockQuantity} Adet</div>
                    <div className="text-xs text-slate-500">Toplam: ₺{totalCostValue.toLocaleString('tr-TR')}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-bold text-slate-700">{product.daysInStock} Gün</div>
                    <div className="text-xs text-slate-400">Son satış: {product.lastSoldDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center w-max gap-1 ${getStatusStyle(status)}`}>
                      {status === StockStatus.Deadstock && <AlertCircle size={12} />}
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onAnalyze(product)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1"
                    >
                      Analiz Et <ArrowUpRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};