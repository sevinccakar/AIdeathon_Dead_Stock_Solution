import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Product, AnalysisResult, AiStrategy } from '../types';
import { analyzeDeadstockItem } from '../services/geminiService';

interface RecommendationPanelProps {
  product: Product | null;
  onClose: () => void;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (product) {
      setAnalysis(null);
      setError(null);
    }
  }, [product]);

  const handleAnalyze = async () => {
    if (!product) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeDeadstockItem(product);
      setAnalysis(result);
    } catch (err) {
      setError("Analiz gerçekleştirilemedi. API anahtarınızı kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto border-l border-slate-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">AI Stok Danışmanı</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Product Summary */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
          <div className="flex gap-4">
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="font-medium text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-500">{product.sku}</p>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{product.daysInStock} gün stokta</span>
                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{product.stockQuantity} adet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Initial State */}
        {!analysis && !loading && !error && (
          <div className="text-center py-12">
            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Yapay Zeka Analizi</h3>
            <p className="text-slate-500 text-sm mb-6 px-8">
              Deadstock.AI bu ürünün satış verilerini, maliyetini ve pazar durumunu analiz ederek size en iyi kurtarma stratejilerini sunacak.
            </p>
            <button
              onClick={handleAnalyze}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md shadow-indigo-200 flex items-center gap-2 mx-auto"
            >
              <Sparkles size={18} />
              Analizi Başlat
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 animate-pulse">Veriler analiz ediliyor ve stratejiler oluşturuluyor...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 flex items-start gap-3">
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium text-sm">Hata Oluştu</p>
              <p className="text-xs mt-1">{error}</p>
              <button onClick={handleAnalyze} className="text-xs underline mt-2 font-medium hover:text-red-800">Tekrar Dene</button>
            </div>
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border-l-4 border-indigo-500 pl-4 py-2">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Teşhis</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{analysis.deadstockReasoning}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Önerilen Stratejiler</h4>
              {analysis.strategies.map((strategy, idx) => (
                <StrategyCard key={idx} strategy={strategy} idx={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StrategyCard: React.FC<{ strategy: AiStrategy, idx: number }> = ({ strategy, idx }) => {
  const difficultyColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {idx + 1}
          </div>
          <h5 className="font-bold text-slate-900">{strategy.strategyName}</h5>
        </div>
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${difficultyColor[strategy.difficulty]}`}>
          {strategy.difficulty} Efor
        </span>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">{strategy.description}</p>
      
      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500">Tahmini Kurtarma:</span>
          <span className="font-bold text-indigo-600">{strategy.estimatedRecoveryPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div 
            className="bg-indigo-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(strategy.estimatedRecoveryPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Uygulama Adımları</p>
        <ul className="space-y-2">
          {strategy.actionItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <button className="w-full mt-4 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
        Bu Stratejiyi Uygula <ArrowRight size={14} />
      </button>
    </div>
  );
};