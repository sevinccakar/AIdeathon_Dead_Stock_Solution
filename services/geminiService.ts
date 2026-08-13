import { GoogleGenAI, Type } from "@google/genai";
import { Product, AnalysisResult } from "../types";

// Initialize the Gemini API client
// Note: In a real production app, ensure process.env.API_KEY is set.
// For this demo, we handle the missing key gracefully in the UI.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeDeadstockItem = async (product: Product): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const modelName = 'gemini-2.5-flash';
  
  const prompt = `
    Sen deadstock (satılmayan envanter) tasfiye konusunda uzmanlaşmış bir e-ticaret envanter yöneticisisin.
    Aşağıdaki ürünü analiz et. Bu ürün deadstock haline gelmiş (satılmayan stok).
    
    Ürün Detayları:
    - İsim: ${product.name}
    - Kategori: ${product.category}
    - Fiyat: ₺${product.price}
    - Maliyet: ₺${product.cost}
    - Stok Miktarı: ${product.stockQuantity} adet
    - Stokta Bekleme Süresi: ${product.daysInStock} gün
    - Aylık Satış Oranı: ${product.monthlySalesRate} adet
    - Son Satış Tarihi: ${product.lastSoldDate}
    ${product.marketplace ? `- Satış Mağazası: ${product.marketplace}` : ''}

    Bu stoğu temizlemek ve sermayeyi kurtarmak için 3 farklı, uygulanabilir strateji sun.
    Kategoriyi, fiyat noktasını ve stok yaşını dikkate al.
    
    ÖNEMLİ: Tüm cevapları TÜRKÇE olarak ver. Strateji isimleri, açıklamaları ve aksiyon adımları tamamen Türkçe olmalı.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            deadstockReasoning: {
              type: Type.STRING,
              description: "Verilere dayanarak bu ürünün neden başarısız olduğuna dair kısa bir Türkçe analiz.",
            },
            strategies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  strategyName: { 
                    type: Type.STRING,
                    description: "Türkçe strateji adı"
                  },
                  description: { 
                    type: Type.STRING,
                    description: "Türkçe strateji açıklaması"
                  },
                  estimatedRecoveryPercentage: { 
                    type: Type.NUMBER,
                    description: "Kurtarılması beklenen orijinal maliyetin yüzdesi (0-100+)"
                  },
                  actionItems: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Türkçe uygulama adımları listesi"
                  },
                  difficulty: {
                    type: Type.STRING,
                    enum: ["Low", "Medium", "High"],
                    description: "Uygulama zorluğu seviyesi"
                  }
                },
                required: ["strategyName", "description", "estimatedRecoveryPercentage", "actionItems", "difficulty"]
              }
            }
          },
          required: ["deadstockReasoning", "strategies"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(text);
    
    return {
      productId: product.id,
      analysisDate: new Date().toISOString(),
      deadstockReasoning: parsed.deadstockReasoning,
      strategies: parsed.strategies
    };

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};