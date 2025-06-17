# MeishiBox - AI OCR 名片掃描應用程式

**MeishiBox** 是一個專業的 AI OCR 名片掃描應用程式，使用 React Native + TypeScript + Expo 開發，提供高質量的用戶界面和用戶體驗。

## 🎯 應用程式功能

### 核心功能
- **AI OCR 名片掃描** - 使用先進的 OCR 技術自動識別名片信息
- **智能解析** - 自動提取姓名、公司、職位、聯絡方式等信息
- **聯絡人管理** - 完整的 CRUD 操作和搜索功能
- **多格式導出** - 支持 Excel、CSV、VCF 格式導出
- **訂閱管理** - 完整的應用內購買和訂閱系統

### 用戶界面特色
- **現代化設計** - 採用橙色 (#FF6B35) 品牌色調的專業界面
- **響應式動畫** - 流暢的轉場動畫和微交互
- **深色模式支持** - 自適應明亮/深色主題
- **日語本地化** - 完整的日語界面支持
- **無障礙設計** - 符合 WCAG 2.1 AA 標準

## 🏗️ 技術架構

### 技術棧
- **Framework**: React Native + Expo SDK 53.0.0+
- **語言**: TypeScript（嚴格模式）
- **狀態管理**: Zustand with persist middleware
- **導航**: React Navigation 6 (Native Stack + Bottom Tabs)
- **動畫**: React Native Reanimated 3
- **相機**: Expo Camera + OCR 集成
- **儲存**: AsyncStorage with encryption
- **支付**: React Native IAP
- **圖標**: React Native Vector Icons + Expo Vector Icons

### 項目結構
```
src/
├── components/           # 可重用組件
│   ├── common/          # Button, SearchInput, CameraFAB
│   ├── contact/         # ContactCard, ContactForm
│   └── subscription/    # PricingCard, FeatureList
├── screens/             # 所有屏幕組件
│   ├── LoadingScreen.tsx
│   ├── SubscriptionScreen.tsx
│   ├── ContactListScreen.tsx
│   ├── CameraScanScreen.tsx
│   ├── ContactDetailScreen.tsx
│   ├── ContactEditScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/          # 導航配置
├── store/              # Zustand stores
│   ├── contactStore.ts
│   ├── subscriptionStore.ts
│   └── appStore.ts
├── services/           # OCR, Subscription, Export services
├── utils/              # 輔助函數和工具
├── constants/          # 主題、間距、字體定義
├── types/              # TypeScript 類型定義
└── assets/             # 圖片和圖標資源
```

## 📱 屏幕介紹

### 1. 載入屏幕 (LoadingScreen)
- MeishiBox 品牌展示
- 應用程式初始化
- 動畫 logo 和載入指示器

### 2. 訂閱屏幕 (SubscriptionScreen)
- Pro 版本功能展示
- 年度/月度訂閱選項
- 17% 年度折扣徽章
- 功能列表和定價信息

### 3. 名片列表 (ContactListScreen)
- 搜索和篩選功能
- 名片卡片顯示
- 相機 FAB 按鈕
- 空狀態處理

### 4. 相機掃描 (CameraScanScreen)
- 實時相機預覽
- 名片掃描引導框
- 橫向/縱向切換
- 閃光燈控制
- OCR 處理動畫

### 5. 名片詳情 (ContactDetailScreen)
- 完整聯絡人信息顯示
- 聯絡方式快速操作
- 公司信息展示
- 備註和標籤

### 6. 名片編輯 (ContactEditScreen)
- 多語言支持 (日語/英語/中文)
- 動態表單字段
- 圖片裁剪和旋轉
- 實時驗證

### 7. 設定屏幕 (SettingsScreen)
- 會員狀態顯示
- 掃描次數追蹤
- 導出功能
- 支持和評價選項

## 🎨 設計系統

### 顏色系統
```typescript
const colors = {
  primary: '#FF6B35',      // 橙色主色調
  primaryLight: '#FF8A5C', // 淺橙色
  primaryDark: '#E55A2B',  // 深橙色
  // ... 完整的顏色定義
}
```

### 字體系統
- 字體大小: xs(12) - xxxl(32)
- 字體重量: light(300) - bold(700)
- 行高: tight(1.2) - relaxed(1.75)

### 間距系統
- xs(4px) - xxxl(64px) 的一致間距
- 基於 8px 網格系統

## 🔧 核心組件

### Button 組件
- 多種變體: primary, secondary, outline, ghost
- 多種尺寸: small, medium, large
- 載入狀態和禁用狀態支持

### SearchInput 組件
- 實時搜索功能
- 清除按鈕
- 主題適配

### ContactCard 組件
- 頭像顯示
- 聯絡人信息預覽
- 快速操作按鈕

### CameraFAB 組件
- 動畫點擊效果
- 自適應位置
- 主題顏色適配

## 🗃️ 狀態管理

### Contact Store
- 聯絡人 CRUD 操作
- 搜索和篩選
- 導出功能
- 本地持久化

### Subscription Store
- 訂閱狀態管理
- 購買流程
- 功能權限控制
- 掃描次數追蹤

### App Store
- 應用程式設定
- 主題偏好
- 首次啟動狀態

## 🚀 開始使用

### 安裝依賴
```bash
npm install
# 或
yarn install
```

### 運行應用程式
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### 構建應用程式
```bash
npm run build
```

## 📦 主要依賴

- `expo`: ~53.0.0
- `react-native`: 0.74.0
- `typescript`: ^5.3.0
- `zustand`: ^4.5.0
- `@react-navigation/native`: ^6.1.0
- `react-native-reanimated`: ~3.8.0
- `@expo/vector-icons`: ^14.0.0

## 🎯 功能特色

### OCR 技術集成
- 支持日語名片識別
- 智能字段解析
- 高準確率文字識別

### 訂閱系統
- 免費版: 50 次掃描
- Pro 版: 1000 次/月掃描
- 無廣告體驗
- Excel 導出功能

### 性能優化
- FlatList 虛擬化
- 圖片懶加載
- 記憶化組件
- 60fps 流暢動畫

### 無障礙支持
- VoiceOver 支持
- 色彩對比度優化
- 觸摸目標大小
- 鍵盤導航

## 📝 版本信息

**當前版本**: 1.0.04  
**製作地點**: Made in Keelung ❤️

## 🤝 貢獻

歡迎提交 Pull Request 和 Issue 來改進這個應用程式。

## 📄 許可證

本項目採用 MIT 許可證。

---

**MeishiBox** - 讓名片管理變得簡單而專業 📇✨ 