# 🏆 AIdeathon – Dead Stock Solution

> **AI-powered solution for identifying, analyzing, and managing deadstock in e-commerce.**

## 📌 About the Project

**Dead Stock Solution** is an AI-powered e-commerce inventory management application developed for the **AIdeathon competition**.

The project aims to help e-commerce businesses identify products that remain unsold for long periods, analyze the financial impact of deadstock, and generate actionable strategies to recover tied-up capital.

Instead of treating deadstock only as an inventory problem, the solution combines **inventory analytics and artificial intelligence** to support data-driven decision making.

## 🎯 Problem

Unsold inventory creates several problems for e-commerce businesses:

* 📦 Capital remains tied up in inactive products.
* 🏭 Storage costs increase over time.
* 📉 Products may lose their market value.
* 🤔 Businesses may struggle to decide how to liquidate or reposition these products.
* ⏱️ Manual analysis of large inventories can be time-consuming.

## 💡 Solution

The application provides a centralized dashboard where users can:

* 📦 Monitor inventory and identify potential deadstock.
* ⚠️ Detect products at risk based on inventory age.
* 💰 Calculate the financial value of deadstock.
* 📊 Visualize inventory data through interactive charts.
* 🤖 Analyze individual deadstock products using Google Gemini.
* 💡 Generate **three actionable recovery strategies** for each product.
* 📈 Estimate potential recovery percentages.
* 🛒 Consider marketplace information when analyzing products.

## 🤖 AI-Powered Analysis

The application uses **Google Gemini** to analyze individual deadstock products.

The AI considers information such as:

* Product name
* Category
* Selling price
* Product cost
* Stock quantity
* Days in stock
* Monthly sales rate
* Last sale date
* Marketplace

Based on these parameters, the AI generates:

1. **Deadstock reasoning** – Why the product may be underperforming.
2. **Three recovery strategies** – Different approaches to liquidate or reposition the inventory.
3. **Estimated recovery percentage**
4. **Action items** for implementing each strategy.
5. **Difficulty level** for each strategy.

## 🖥️ Main Features

### Dashboard

Provides an overview of:

* Total deadstock value
* Number of risky products
* Potential recovery value
* Products being monitored

### Inventory Management

Displays products and their inventory information, allowing users to identify products with prolonged inventory periods.

### Analytics

Provides visual representations of inventory-related data using interactive charts.

### AI Recommendation Panel

Users can select a product and receive AI-generated strategies for recovering value from deadstock.

### Settings

The application includes a settings interface for configuring application-related options.

## 🛠️ Technologies

* **React 19**
* **TypeScript**
* **Vite**
* **Google Gemini API**
* **Recharts**
* **Lucide React**
* **Tailwind CSS**

## 📁 Project Structure

```text
AIdeathon_Dead_Stock_Solution/
│
├── components/
├── services/
│   └── geminiService.ts
│
├── App.tsx
├── constants.ts
├── types.ts
├── index.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sevinccakar/AIdeathon_Dead_Stock_Solution.git
cd AIdeathon_Dead_Stock_Solution
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API

Create a `.env` file based on `.env.example` and add your Gemini API key.

```env
API_KEY=your_gemini_api_key
```

> ⚠️ **Never commit your real API key to GitHub.** Keep `.env` private and use `.env.example` as a template.

### 4. Run the application

```bash
npm run dev
```

## 🏆 Competition

This project was developed as part of the **AIdeathon 2026 competition**, focusing on the use of artificial intelligence to create practical solutions for e-commerce and inventory management.

## 👥 Team

This project was developed collaboratively by:

* **Sevinç Çakar**
* **Taibenur Yavuz**
* **Samet Alkış**
* **Mahmut Can Döğer**

## 🌱 Vision

The long-term vision of the project is to transform deadstock management from a reactive process into a proactive, AI-supported decision-making system.

By combining **e-commerce data, inventory analytics, and generative AI**, businesses can identify risks earlier and make smarter decisions about pricing, promotion, and inventory recovery.
