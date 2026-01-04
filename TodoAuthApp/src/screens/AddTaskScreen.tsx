import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleSave = () => {
    if (!title || !deadline) {
      Alert.alert('Error', 'Title and deadline are required');
      return;
    }

    const taskId = Date.now().toString();

    addTask({
      id: taskId,
      title,
      description,
      deadline,
      priority: Number(priority) || 1,
      completed: false,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.topAccent} />
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>New Task</Text>
            <Text style={styles.subtitle}>Capture it quickly — make it delightful!</Text>
          </View>
        </View>

        <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#3A7A5A" />

        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} placeholderTextColor="#3A7A5A" />

        <TextInput placeholder="Deadline (YYYY-MM-DD)" value={deadline} onChangeText={setDeadline} style={styles.input} placeholderTextColor="#3A7A5A" />

        <TextInput placeholder="Priority (1-5)" value={priority} onChangeText={setPriority} keyboardType="numeric" style={styles.input} placeholderTextColor="#3A7A5A" />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSave} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F9F0' },
  topAccent: {
    position: 'absolute',
    top: -90,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E0F8E8',
    opacity: 0.9,
    transform: [{ rotate: '20deg' }],
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    shadowColor: '#0B6B47',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 4, color: '#064E3B' },
  subtitle: { color: '#2F855A', marginBottom: 12 },
  input: {
    borderWidth: 0,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#F3FFF7',
    color: '#064E3B',
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: '#46D68A',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#46D68A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 4,
  },
  primaryBtnText: { color: '#064E3B', fontWeight: '800' },
});
