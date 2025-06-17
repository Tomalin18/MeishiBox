import { OCRResult, Contact, ContactPhone, ContactEmail, ContactAddress } from '@/types';
import { generateId } from '@/utils/helpers';

// Mock OCR service - in a real app, you would use ML Kit or similar
export const processBusinessCard = async (imageUri: string): Promise<Contact> => {
  try {
    // Simulate OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock OCR result - in a real app, this would come from ML Kit
    const mockOCRResult: OCRResult = {
      text: `鴨山かほり
      統一超商東京マーケティング株式会社
      輸入国内事業部
      食品・飲料チームリーダー
      〒103-0016
      東京都中央区日本橋小網町3-11 日本橋SOYIC4階
      Tel: 03-6264-9166  Fax: 03-6264-9195
      Mobile: 070-1319-4481
      k_shigiyama88@ptm-tokyo.co.jp
      http://ptm-tokyo.co.jp`,
      confidence: 0.95,
      blocks: [],
    };
    
    // Parse the OCR result into contact data
    const contact = parseBusinessCardText(mockOCRResult.text, imageUri);
    
    return contact;
  } catch (error) {
    throw new Error('OCR processing failed: ' + error);
  }
};

// Parse business card text into contact data
export const parseBusinessCardText = (text: string, imageUri?: string): Contact => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const contact: Contact = {
    id: generateId(),
    name: '',
    company: '',
    position: '',
    department: '',
    phones: [],
    emails: [],
    addresses: [],
    websites: [],
    socialMedia: [],
    notes: '',
    businessCardImage: imageUri,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
  };
  
  // Extract information from lines
  lines.forEach((line, index) => {
    // Extract name (usually first line or contains person-like text)
    if (index === 0 || isPersonName(line)) {
      if (!contact.name) {
        contact.name = line;
      }
    }
    
    // Extract company (look for company keywords)
    if (isCompanyName(line) && !contact.company) {
      contact.company = line;
    }
    
    // Extract position/department
    if (isPosition(line)) {
      if (line.includes('部') && !contact.department) {
        contact.department = line;
      } else if (!contact.position) {
        contact.position = line;
      }
    }
    
    // Extract phone numbers
    const phoneMatch = line.match(/(?:Tel|TEL|電話|Mobile|携帯)[:：\s]*([0-9\-\+\(\)\s]+)/i);
    if (phoneMatch) {
      const phoneType = line.toLowerCase().includes('mobile') || line.toLowerCase().includes('携帯') ? 'mobile' : 'work';
      contact.phones.push({
        id: generateId(),
        label: phoneType === 'mobile' ? '携帯電話' : '勤務先電話',
        number: phoneMatch[1].trim(),
        type: phoneType,
      });
    }
    
    // Extract fax numbers
    const faxMatch = line.match(/(?:Fax|FAX)[:：\s]*([0-9\-\+\(\)\s]+)/i);
    if (faxMatch) {
      contact.phones.push({
        id: generateId(),
        label: 'FAX',
        number: faxMatch[1].trim(),
        type: 'fax',
      });
    }
    
    // Extract email addresses
    const emailMatch = line.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      contact.emails.push({
        id: generateId(),
        label: 'メール',
        email: emailMatch[1],
        type: 'work',
      });
    }
    
    // Extract websites
    const websiteMatch = line.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (websiteMatch && !contact.websites.includes(websiteMatch[1])) {
      let website = websiteMatch[1];
      if (!website.startsWith('http')) {
        website = 'http://' + website;
      }
      contact.websites.push(website);
    }
    
    // Extract address (look for postal code pattern)
    const addressMatch = line.match(/〒?\s*(\d{3}-?\d{4})/);
    if (addressMatch || line.includes('都') || line.includes('県') || line.includes('区') || line.includes('市')) {
      const postalCode = addressMatch ? addressMatch[1] : '';
      const address = line.replace(/〒\s*\d{3}-?\d{4}\s*/, '').trim();
      
      if (contact.addresses.length === 0) {
        contact.addresses.push({
          id: generateId(),
          label: '住所',
          street: address || line,
          city: '',
          state: '',
          postalCode: postalCode,
          country: '日本',
        });
      }
    }
  });
  
  // Set default values if not found
  if (!contact.name && lines.length > 0) {
    contact.name = lines[0];
  }
  
  if (!contact.company && lines.length > 1) {
    contact.company = lines[1];
  }
  
  return contact;
};

// Helper functions to identify different types of information
const isPersonName = (text: string): boolean => {
  // Simple heuristic: contains Japanese name characters or is short
  return text.length <= 10 && /[ひらがなカタカナ]/.test(text);
};

const isCompanyName = (text: string): boolean => {
  const companyKeywords = ['株式会社', '有限会社', '合同会社', '合資会社', '企業', '会社', 'Co.', 'Ltd.', 'Inc.', 'Corp.'];
  return companyKeywords.some(keyword => text.includes(keyword));
};

const isPosition = (text: string): boolean => {
  const positionKeywords = [
    '社長', '専務', '常務', '取締役', '部長', '課長', '係長', '主任', '担当',
    'マネージャー', 'リーダー', 'チーフ', 'ディレクター', '代表', '営業', '企画'
  ];
  return positionKeywords.some(keyword => text.includes(keyword));
};

// Real OCR integration (commented out - would require ML Kit setup)
/*
import TextRecognition from '@react-native-ml-kit/text-recognition';

export const processBusinessCardWithMLKit = async (imageUri: string): Promise<Contact> => {
  try {
    const result = await TextRecognition.recognize(imageUri);
    const contact = parseBusinessCardText(result.text, imageUri);
    return contact;
  } catch (error) {
    throw new Error('ML Kit OCR failed: ' + error);
  }
};
*/ 