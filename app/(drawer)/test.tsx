import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const dummyData = [
  { id: '1', name: 'Alice', lastMessage: 'Is the sofa still available?' },
  { id: '2', name: 'Bob', lastMessage: 'I can pick up the bookshelf tomorrow.' },
  { id: '3', name: 'Charlie', lastMessage: 'Thanks for the dining table!' },
];

export default function Messages() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      //   onPress={() => navigation.navigate('ChatScreen', { userId: item.id, userName: item.name })}
    >
      <View style={styles.avatarContainer}>{/* <UserIcon color="#4CAF50" size={24} /> */}</View>
      <View style={styles.messageContent}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#757575',
  },
});
