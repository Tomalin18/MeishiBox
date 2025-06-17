import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export default function SimpleContactListScreen() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: '山田太郎',
      company: 'テック株式会社',
      phone: '090-1234-5678',
      email: 'yamada@tech.co.jp'
    },
    {
      id: '2', 
      name: '田中花子',
      company: 'デザイン事務所',
      phone: '080-9876-5432',
      email: 'tanaka@design.jp'
    }
  ]);

  const addNewContact = () => {
    Alert.prompt(
      '新しい連絡先',
      '名前を入力してください',
      (name) => {
        if (name) {
          const newContact: Contact = {
            id: Date.now().toString(),
            name,
            company: '',
            phone: '',
            email: ''
          };
          setContacts([...contacts, newContact]);
        }
      }
    );
  };

  const deleteContact = (id: string) => {
    Alert.alert(
      '削除確認',
      'この連絡先を削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '削除', 
          style: 'destructive',
          onPress: () => setContacts(contacts.filter(c => c.id !== id))
        }
      ]
    );
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity 
      style={styles.contactCard}
      onLongPress={() => deleteContact(item.id)}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.company ? <Text style={styles.contactCompany}>{item.company}</Text> : null}
        {item.phone ? <Text style={styles.contactDetail}>{item.phone}</Text> : null}
        {item.email ? <Text style={styles.contactDetail}>{item.email}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>📇 MeishiBox</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewContact}>
          <Text style={styles.addButtonText}>+ 追加</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.footer}>
        総数: {contacts.length}件の名刺
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contactCard: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  contactDetail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  footer: {
    textAlign: 'center',
    padding: 15,
    color: '#666',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
}); 