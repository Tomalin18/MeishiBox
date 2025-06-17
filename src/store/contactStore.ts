import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact, ContactStore, ExportOptions } from '@/types';
import { generateId } from '@/utils/helpers';
import { exportToExcel, exportToCSV, exportToVCF } from '@/services/exportService';

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      contacts: [],
      selectedContact: null,
      searchQuery: '',
      filteredContacts: [],

      addContact: (contactData) => {
        const newContact: Contact = {
          ...contactData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => {
          const updatedContacts = [...state.contacts, newContact];
          return {
            contacts: updatedContacts,
            filteredContacts: filterContacts(updatedContacts, state.searchQuery),
          };
        });
      },

      updateContact: (id, updates) => {
        set((state) => {
          const updatedContacts = state.contacts.map((contact) =>
            contact.id === id
              ? { ...contact, ...updates, updatedAt: new Date() }
              : contact
          );

          return {
            contacts: updatedContacts,
            filteredContacts: filterContacts(updatedContacts, state.searchQuery),
            selectedContact:
              state.selectedContact?.id === id
                ? { ...state.selectedContact, ...updates, updatedAt: new Date() }
                : state.selectedContact,
          };
        });
      },

      deleteContact: (id) => {
        set((state) => {
          const updatedContacts = state.contacts.filter(
            (contact) => contact.id !== id
          );

          return {
            contacts: updatedContacts,
            filteredContacts: filterContacts(updatedContacts, state.searchQuery),
            selectedContact:
              state.selectedContact?.id === id
                ? null
                : state.selectedContact,
          };
        });
      },

      selectContact: (contact) => {
        set({ selectedContact: contact });
      },

      setSearchQuery: (query) => {
        set((state) => ({
          searchQuery: query,
          filteredContacts: filterContacts(state.contacts, query),
        }));
      },

      exportContacts: async (options: ExportOptions) => {
        const { contacts } = get();
        
        switch (options.format) {
          case 'excel':
            return await exportToExcel(contacts, options);
          case 'csv':
            return await exportToCSV(contacts, options);
          case 'vcf':
            return await exportToVCF(contacts, options);
          default:
            throw new Error('Unsupported export format');
        }
      },
    }),
    {
      name: 'contact-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        contacts: state.contacts,
      }),
    }
  )
);

// Helper function to filter contacts
const filterContacts = (contacts: Contact[], query: string): Contact[] => {
  if (!query.trim()) {
    return contacts;
  }

  const lowercaseQuery = query.toLowerCase();
  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.company.toLowerCase().includes(lowercaseQuery) ||
      contact.position?.toLowerCase().includes(lowercaseQuery) ||
      contact.department?.toLowerCase().includes(lowercaseQuery) ||
      contact.phones.some((phone) =>
        phone.number.toLowerCase().includes(lowercaseQuery)
      ) ||
      contact.emails.some((email) =>
        email.email.toLowerCase().includes(lowercaseQuery)
      ) ||
      contact.notes.toLowerCase().includes(lowercaseQuery) ||
      contact.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Selectors
export const useContacts = () => useContactStore((state) => state.contacts);
export const useFilteredContacts = () => useContactStore((state) => state.filteredContacts);
export const useSelectedContact = () => useContactStore((state) => state.selectedContact);
export const useSearchQuery = () => useContactStore((state) => state.searchQuery);

// Actions
export const useContactActions = () => {
  const store = useContactStore();
  return {
    addContact: store.addContact,
    updateContact: store.updateContact,
    deleteContact: store.deleteContact,
    selectContact: store.selectContact,
    setSearchQuery: store.setSearchQuery,
    exportContacts: store.exportContacts,
  };
}; 