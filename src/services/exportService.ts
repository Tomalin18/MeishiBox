import * as FileSystem from 'expo-file-system';
import { Contact, ExportOptions } from '@/types';

// Export contacts to Excel format
export const exportToExcel = async (contacts: Contact[], options: ExportOptions): Promise<string> => {
  try {
    // Create CSV data (since we can't use actual Excel library in Expo)
    const csvData = await exportToCSV(contacts, options);
    
    // Save as .xlsx file (though it's actually CSV format)
    const fileName = `contacts_${new Date().toISOString().split('T')[0]}.xlsx`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, csvData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    return fileUri;
  } catch (error) {
    throw new Error('Excel export failed: ' + error);
  }
};

// Export contacts to CSV format
export const exportToCSV = async (contacts: Contact[], options: ExportOptions): Promise<string> => {
  try {
    const headers = getCSVHeaders(options.fields);
    const csvRows = [headers.join(',')];
    
    contacts.forEach(contact => {
      const row = headers.map(header => {
        const value = getContactFieldValue(contact, header);
        // Escape quotes and wrap in quotes if contains comma
        return `"${value.replace(/"/g, '""')}"`;
      });
      csvRows.push(row.join(','));
    });
    
    const csvData = csvRows.join('\n');
    
    if (options.includeImages) {
      // Note: Images would need to be handled separately in a real implementation
      console.log('Image export not implemented in CSV format');
    }
    
    return csvData;
  } catch (error) {
    throw new Error('CSV export failed: ' + error);
  }
};

// Export contacts to VCF format
export const exportToVCF = async (contacts: Contact[], options: ExportOptions): Promise<string> => {
  try {
    const vcfData = contacts.map(contact => contactToVCF(contact)).join('\n');
    
    const fileName = `contacts_${new Date().toISOString().split('T')[0]}.vcf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, vcfData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    return fileUri;
  } catch (error) {
    throw new Error('VCF export failed: ' + error);
  }
};

// Helper function to get CSV headers
const getCSVHeaders = (fields: string[]): string[] => {
  const allFields = [
    'name', 'company', 'position', 'department',
    'phone', 'email', 'address', 'website', 'notes'
  ];
  
  return fields.length > 0 ? fields : allFields;
};

// Helper function to get contact field value
const getContactFieldValue = (contact: Contact, field: string): string => {
  switch (field) {
    case 'name':
      return contact.name || '';
    case 'company':
      return contact.company || '';
    case 'position':
      return contact.position || '';
    case 'department':
      return contact.department || '';
    case 'phone':
      return contact.phones.map(p => p.number).join('; ');
    case 'email':
      return contact.emails.map(e => e.email).join('; ');
    case 'address':
      return contact.addresses.map(a => 
        `${a.street}, ${a.city}, ${a.state} ${a.postalCode}, ${a.country}`
      ).join('; ');
    case 'website':
      return contact.websites.join('; ');
    case 'notes':
      return contact.notes || '';
    default:
      return '';
  }
};

// Helper function to convert contact to VCF format
const contactToVCF = (contact: Contact): string => {
  let vcf = 'BEGIN:VCARD\n';
  vcf += 'VERSION:3.0\n';
  
  // Name
  if (contact.name) {
    vcf += `FN:${contact.name}\n`;
    const nameParts = contact.name.split(' ');
    if (nameParts.length >= 2) {
      vcf += `N:${nameParts[nameParts.length - 1]};${nameParts.slice(0, -1).join(' ')};;;\n`;
    } else {
      vcf += `N:${contact.name};;;;\n`;
    }
  }
  
  // Organization
  if (contact.company) {
    vcf += `ORG:${contact.company}`;
    if (contact.department) {
      vcf += `;${contact.department}`;
    }
    vcf += '\n';
  }
  
  // Title
  if (contact.position) {
    vcf += `TITLE:${contact.position}\n`;
  }
  
  // Phones
  contact.phones.forEach(phone => {
    const type = phone.type.toUpperCase();
    vcf += `TEL;TYPE=${type}:${phone.number}\n`;
  });
  
  // Emails
  contact.emails.forEach(email => {
    const type = email.type.toUpperCase();
    vcf += `EMAIL;TYPE=${type}:${email.email}\n`;
  });
  
  // Addresses
  contact.addresses.forEach(address => {
    vcf += `ADR:;;${address.street};${address.city};${address.state};${address.postalCode};${address.country}\n`;
  });
  
  // Websites
  contact.websites.forEach(website => {
    vcf += `URL:${website}\n`;
  });
  
  // Notes
  if (contact.notes) {
    vcf += `NOTE:${contact.notes}\n`;
  }
  
  vcf += 'END:VCARD\n';
  return vcf;
}; 