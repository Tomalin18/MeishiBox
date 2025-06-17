import { Contact } from '@/types';

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Japanese phone numbers
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  // Format mobile numbers
  if (cleaned.length === 11 && cleaned.startsWith('090')) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  // Format work numbers
  if (cleaned.length === 10 && cleaned.startsWith('03')) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  return phone;
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\-\+\(\)\s]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (typeof obj === 'object') {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

// Sort contacts by name
export const sortContactsByName = (contacts: Contact[]): Contact[] => {
  return [...contacts].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
};

// Sort contacts by company
export const sortContactsByCompany = (contacts: Contact[]): Contact[] => {
  return [...contacts].sort((a, b) => a.company.localeCompare(b.company, 'ja'));
};

// Sort contacts by date
export const sortContactsByDate = (contacts: Contact[], ascending: boolean = false): Contact[] => {
  return [...contacts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Check if contact has complete information
export const isContactComplete = (contact: Contact): boolean => {
  return !!(
    contact.name &&
    contact.company &&
    (contact.phones.length > 0 || contact.emails.length > 0)
  );
};

// Get contact display name
export const getContactDisplayName = (contact: Contact): string => {
  if (contact.name) return contact.name;
  if (contact.company) return contact.company;
  if (contact.emails.length > 0) return contact.emails[0].email;
  if (contact.phones.length > 0) return contact.phones[0].number;
  return '無題の連絡先';
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Remove special characters from string
export const sanitizeString = (str: string): string => {
  return str.replace(/[^\w\s]/gi, '');
};

// Check if string is empty or whitespace
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

// Generate random color
export const generateRandomColor = (): string => {
  const colors = [
    '#FF6B35', '#FF8E53', '#FF6B9D', '#9B59B6',
    '#3498DB', '#2ECC71', '#F39C12', '#E74C3C',
    '#1ABC9C', '#34495E', '#E67E22', '#95A5A6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 