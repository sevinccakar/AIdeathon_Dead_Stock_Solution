import React, { useState, useEffect } from 'react';
import { X, Store, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { MarketplaceConnection } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MARKETPLACE_TEMPLATES = [
  { 
    id: 'trendyol', 
    name: 'Trendyol', 
    logo: 'https://images.seeklogo.com/logo-png/34/2/trendyol-logo-png_seeklogo-346740.png' 
  },
  { 
    id: 'n11', 
    name: 'N11', 
    logo: 'https://n11scdn.akamaized.net/custom/upload/71/66/4965340334011337307.svg' 
  },
  { 
    id: 'pazarama', 
    name: 'Pazarama', 
    logo: 'https://play-lh.googleusercontent.com/TcQGTxnlxSTlS9qW8NVCFBKX5zUPJJY1Ckkjf7UKHxRiO6Pi785fqhZDhGxLUsVQMg' 
  },
  { 
    id: 'pttavm', 
    name: 'PTTAVM', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5bp7DjCg5TG6yHJqW5GfLj-h0ZZcmxnwVag&s' 
  },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [connections, setConnections] = useState<MarketplaceConnection[]>([]);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load saved connections from localStorage
      const savedConnections = localStorage.getItem('marketplace_connections');
      if (savedConnections) {
        setConnections(JSON.parse(savedConnections));
      }
    }
  }, [isOpen]);

  const saveConnections = (newConnections: MarketplaceConnection[]) => {
    localStorage.setItem('marketplace_connections', JSON.stringify(newConnections));
    setConnections(newConnections);
  };

  const handleAddConnection = () => {
    if (!selectedMarketplace || !apiKey || !secretKey) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    const marketplace = MARKETPLACE_TEMPLATES.find(m => m.id === selectedMarketplace);
    if (!marketplace) return;

    const newConnection: MarketplaceConnection = {
      id: `${selectedMarketplace}-${Date.now()}`,
      name: marketplace.name,
      apiKey,
      secretKey,
      isConnected: true,
    };

    const updatedConnections = [...connections, newConnection];
    saveConnections(updatedConnections);

    // Reset form
    setSelectedMarketplace('');
    setApiKey('');
    setSecretKey('');
    setShowAddForm(false);
  };

  const handleRemoveConnection = (id: string) => {
    const updatedConnections = connections.filter(conn => conn.id !== id);
    saveConnections(updatedConnections);
  };

  const handleTestConnection = async (id: string) => {
    // Simulated connection test
    const updatedConnections = connections.map(conn => {
      if (conn.id === id) {
        return { ...conn, isConnected: true };
      }
      return conn;
    });
    saveConnections(updatedConnections);
    alert('Bağlantı başarılı! ✓');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Ayarlar</h2>
              <p className="text-indigo-100 text-sm mt-1">E-ticaret mağazalarınızı bağlayın</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Connected Marketplaces */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Store size={20} className="mr-2 text-indigo-600" />
              Bağlı Mağazalar
            </h3>

            {connections.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                <Store size={48} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Henüz bağlı mağaza yok</p>
                <p className="text-sm text-slate-400 mt-1">Aşağıdan yeni mağaza ekleyerek başlayın</p>
              </div>
            ) : (
              <div className="space-y-3">
                {connections.map((conn) => {
                  const template = MARKETPLACE_TEMPLATES.find(t => conn.name === t.name);
                  return (
                    <div
                      key={conn.id}
                      className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                          {template?.logo && (
                            <img 
                              src={template.logo} 
                              alt={conn.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{conn.name}</h4>
                          <p className="text-sm text-slate-500">API Key: {conn.apiKey.substring(0, 20)}...</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conn.isConnected ? (
                          <span className="flex items-center text-green-600 text-sm font-medium">
                            <CheckCircle size={16} className="mr-1" />
                            Bağlı
                          </span>
                        ) : (
                          <button
                            onClick={() => handleTestConnection(conn.id)}
                            className="text-amber-600 text-sm font-medium hover:underline"
                          >
                            Test Et
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveConnection(conn.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add New Marketplace */}
          <div className="border-t border-slate-200 pt-6">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Yeni Mağaza Ekle
              </button>
            ) : (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4">Yeni Mağaza Bağlantısı</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Mağaza Seçin
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {MARKETPLACE_TEMPLATES.map((marketplace) => (
                        <button
                          key={marketplace.id}
                          type="button"
                          onClick={() => setSelectedMarketplace(marketplace.id)}
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                            selectedMarketplace === marketplace.id
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-16 h-16 flex items-center justify-center">
                              <img 
                                src={marketplace.logo} 
                                alt={marketplace.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              selectedMarketplace === marketplace.id
                                ? 'text-indigo-700'
                                : 'text-slate-700'
                            }`}>
                              {marketplace.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      API Key / Müşteri ID
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="API anahtarınızı girin"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Secret Key / Müşteri Şifresi
                    </label>
                    <input
                      type="password"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="Gizli anahtarınızı girin"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
                    <AlertCircle size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      API bilgilerinizi mağaza panelinizden alabilirsiniz. Bilgileriniz güvenli bir şekilde saklanır.
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleAddConnection}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Bağlan
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setSelectedMarketplace('');
                        setApiKey('');
                        setSecretKey('');
                      }}
                      className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <p className="text-xs text-slate-500 text-center">
            Bağlı mağazalarınız üzerinden otomatik envanter senkronizasyonu yapılacaktır.
          </p>
        </div>
      </div>
    </div>
  );
};

