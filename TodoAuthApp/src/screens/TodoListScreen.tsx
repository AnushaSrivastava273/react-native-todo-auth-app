import React, { useContext } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../models/Task';


export default function TodoListScreen({ navigation }: any) {
  const { tasks, toggleComplete, deleteTask } = useContext(TaskContext);
  const { logout, user } = useContext(AuthContext);

  
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={item.completed ? styles.checkWrap : styles.circleEmpty}
          onPress={() => toggleComplete(item.id)}
          activeOpacity={0.8}
        >
          {item.completed ? <Text style={styles.check}>✓</Text> : null}
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={[styles.title, item.completed && styles.completed]}>{item.title}</Text>
          {!item.completed && item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}

          <Text style={[styles.meta, item.completed && styles.completed]}>Priority: {item.priority} • Deadline: {item.deadline}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const confirmDelete = (id: string) => {
    Alert.alert('Delete task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  };
  const sortTasks = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    // 1️⃣ incomplete first
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    // 2️⃣ higher priority first
    if (b.priority !== a.priority) return b.priority - a.priority;

    // 3️⃣ earlier deadline first
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
};

  const incompleteTasks = sortTasks(tasks).filter((t) => !t.completed);
  const completedTasks = sortTasks(tasks).filter((t) => t.completed);

  return (
    <View style={styles.container}>
      <View style={styles.topAccent} />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My Tasks</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('AddTask')}>
            <Text style={styles.primaryBtnText}>+ Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryBtn, { marginLeft: 10 }]}
            onPress={() =>
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                      await logout();
                      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                    },
                  },
                ]
              )
            }
          >
            <Text style={styles.primaryBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>No tasks yet — add your first one!</Text></View>
      ) : (
        <View>
          {incompleteTasks.length > 0 ? (
            <FlatList
              data={incompleteTasks}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 8 }}
            />
          ) : (
            <View style={styles.empty}><Text style={styles.emptyText}>No active tasks</Text></View>
          )}

          {completedTasks.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={[styles.headerTitle, styles.completedHeaderTitle]}>Completed</Text>
              <FlatList
                data={completedTasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
  color: '#4B5563',
  marginTop: 4,
  fontSize: 14,
},
  container: { flex: 1, padding: 16, backgroundColor: '#E8F9F0' },
  topAccent: { position: 'absolute', top: -80, left: -80, width: 220, height: 220, borderRadius: 110, backgroundColor: '#D1F7E1', opacity: 0.9, transform: [{ rotate: '-10deg' }] },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  /* mascot removed */
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#064E3B' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#0B6B47',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#0B6B47' },
  meta: { color: '#2F855A', marginTop: 6, fontSize: 13 },
  completed: { textDecorationLine: 'line-through', color: '#94A3B8' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#2F855A' },
  primaryBtn: { backgroundColor: '#46D68A', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, alignItems: 'center' },
  primaryBtnText: { color: '#064E3B', fontWeight: '800' },
  ghostBtn: { backgroundColor: 'transparent', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 },
  ghostBtnText: { color: '#0B6B47', fontWeight: '700' },
  deleteBtn: { backgroundColor: '#FFF5F5', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: '#FECACA' },
  deleteText: { color: '#DC2626', fontWeight: '600' },
  checkWrap: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  check: { color: '#fff', fontWeight: '800' },
  placeholder: { width: 28, height: 28, marginRight: 12 },
  circleEmpty: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#94A3B8', alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: 'transparent' },
  completedSection: { marginTop: 24, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(11,107,71,0.06)' },
  completedHeaderTitle: { marginBottom: 12 },
});
