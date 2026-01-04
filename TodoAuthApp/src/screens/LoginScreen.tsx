import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigation.replace('Todos');
  }, [user]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      // onAuthStateChanged will redirect via effect
    } catch (e: any) {
      Alert.alert('Login failed', e.message || 'Invalid credentials');
    }
  };

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
      top: -80,
      right: -80,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: '#D1F7E1',
      opacity: 0.9,
      transform: [{ rotate: '25deg' }],
    },
    floatingCard: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 24,
      marginHorizontal: 8,
      shadowColor: '#0B6B47',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 6,
      alignItems: 'stretch',
    },
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    title: { fontSize: 26, fontWeight: '800', color: '#064E3B' },
    subtitle: { color: '#2F855A', marginBottom: 16, marginTop: 2 },
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
    linkBtn: {
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 999,
    },
    linkBtnText: { color: '#0B6B47', fontWeight: '700' },
    subtleInfo: { textAlign: 'center', color: '#2F855A', marginTop: 12 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topAccent} />
      <View style={styles.floatingCard}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Let's get you back to your tasks!</Text>
          </View>
        </View>

        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor="#3A7A5A" />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholderTextColor="#3A7A5A" />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkBtnText}>Create an account</Text>
        </TouchableOpacity>

        <Text style={styles.subtleInfo}>Fast, friendly, and a little playful ✨</Text>
      </View>
    </View>
  );
}
