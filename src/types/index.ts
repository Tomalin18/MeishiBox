export interface Contact {
  id: string;
  name: string;
  company: string;
  position?: string;
  department?: string;
  phones: ContactPhone[];
  emails: ContactEmail[];
  addresses: ContactAddress[];
  websites: string[];
  socialMedia: SocialMedia[];
  notes: string;
  avatar?: string;
  businessCardImage?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface ContactPhone {
  id: string;
  label: string;
  number: string;
  type: 'mobile' | 'work' | 'home' | 'fax';
}

export interface ContactEmail {
  id: string;
  label: string;
  email: string;
  type: 'work' | 'personal';
}

export interface ContactAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SocialMedia {
  id: string;
  platform: string;
  handle: string;
}

export interface SubscriptionState {
  isActive: boolean;
  tier: 'free' | 'monthly' | 'annual';
  scansRemaining: number;
  maxScans: number;
  expiryDate?: Date;
  features: SubscriptionFeature[];
}

export interface SubscriptionFeature {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface OCRResult {
  text: string;
  confidence: number;
  blocks: TextBlock[];
}

export interface TextBlock {
  text: string;
  boundingBox: BoundingBox;
  confidence: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CameraSettings {
  flashMode: 'off' | 'on' | 'auto';
  orientation: 'portrait' | 'landscape';
  quality: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'ja' | 'en' | 'zh';
  notifications: boolean;
  hapticFeedback: boolean;
  autoBackup: boolean;
}

export interface ExportOptions {
  format: 'excel' | 'csv' | 'vcf';
  fields: string[];
  includeImages: boolean;
}

export type RootStackParamList = {
  Loading: undefined;
  Subscription: undefined;
  MainTabs: undefined;
  ContactDetail: { contactId: string };
  ContactEdit: { contactId?: string };
  CameraScan: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  ContactList: undefined;
  Settings: undefined;
};

// Navigation props
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: any;
  route: { params: RootStackParamList[T] };
};

// Store interfaces
export interface ContactStore {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchQuery: string;
  filteredContacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  selectContact: (contact: Contact | null) => void;
  setSearchQuery: (query: string) => void;
  exportContacts: (options: ExportOptions) => Promise<string>;
}

export interface SubscriptionStore {
  subscription: SubscriptionState;
  purchaseSubscription: (productId: string) => Promise<void>;
  restorePurchases: () => Promise<void>;
  updateScansRemaining: (count: number) => void;
  checkSubscriptionStatus: () => Promise<void>;
}

export interface AppStore {
  settings: AppSettings;
  isFirstLaunch: boolean;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setFirstLaunch: (isFirst: boolean) => void;
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  background: {
    light: string;
    dark: string;
  };
  surface: {
    light: string;
    dark: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  border: string;
  overlay: string;
  cameraGuide: string;
  scanFrame: string;
}

export interface Theme {
  colors: ThemeColors;
  shadows: {
    small: any;
    medium: any;
    large: any;
  };
}

export interface Typography {
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeights: {
    light: string;
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
} 