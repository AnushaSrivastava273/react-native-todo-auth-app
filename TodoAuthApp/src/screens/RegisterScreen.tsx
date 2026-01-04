import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { register, user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigation.replace('Todos');
  }, [user]);

  const handleRegister = async () => {
    try {
      await register(name, email, password);
    } catch (e: any) {
      Alert.alert('Registration failed', e.message || 'Unable to register');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topAccent} />
      <View style={styles.floatingCard}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join and make productivity fun!</Text>
          </View>
        </View>

        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#3A7A5A" />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor="#3A7A5A" />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholderTextColor="#3A7A5A" />

        <TouchableOpacity style={styles.primaryBtn} onPress={() => register(name, email, password)} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={handleRegister}>
          <Text style={styles.linkBtnText}>Register (Alt)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F9F0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAccent: {
    position: 'absolute',
    top: -100,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#DDF7E7',
    opacity: 0.9,
    transform: [{ rotate: '-15deg' }],
  },
  floatingCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginHorizontal: 8,
    shadowColor: '#0B6B47',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#064E3B' },
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
    marginBottom: 10,
    shadowColor: '#46D68A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 4,
  },
  primaryBtnText: { color: '#064E3B', fontWeight: '800', fontSize: 16 },
  linkBtn: { alignItems: 'center', paddingVertical: 12, borderRadius: 999 },
  linkBtnText: { color: '#0B6B47', fontWeight: '700' },
});
