import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Product, Category } from '../types';

interface ChartsProps {
  products: Product[];
}

export const Charts: React.FC<ChartsProps> = ({ products }) => {
  
  // Data preparation for Category Pie Chart
  const categoryData = Object.values(Category).map(cat => {
    const count = products.filter(p => p.category === cat).length;
    const value = products.filter(p => p.category === cat).reduce((acc, curr) => acc + (curr.cost * curr.stockQuantity), 0);
    return { name: cat, count, value };
  }).filter(d => d.value > 0);

  // Data for Age of Inventory Bar Chart
  const ageRanges = [
    { name: '0-30 Gün', range: [0, 30] },
    { name: '31-60 Gün', range: [31, 60] },
    { name: '61-90 Gün', range: [61, 90] },
    { name: '90+ Gün', range: [91, 9999] },
  ];

  const ageData = ageRanges.map(range => {
    const value = products
      .filter(p => p.daysInStock >= range.range[0] && p.daysInStock <= range.range[1])
      .reduce((acc, curr) => acc + (curr.cost * curr.stockQuantity), 0);
    return { name: range.name, value };
  });

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">Kategori Bazlı Deadstock Değeri</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `₺${value.toLocaleString('tr-TR')}`}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">Stok Yaşı Dağılımı (₺ Tutar)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `₺${val/1000}k`} />
              <Tooltip 
                formatter={(value: number) => [`₺${value.toLocaleString('tr-TR')}`, 'Tutar']}
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};