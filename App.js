 
// App.js — KiPedia: primer componente React Native 
import { StatusBar } from 'expo-status-bar' 
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
 
export default function App() { 
  const nombreApp = 'KiPedia' 
  const subtitulo = 'Wiki del Universo Dragon Ball' 
 
  return ( 
    <SafeAreaView style={estilos.contenedor}> 
      <Text style={estilos.titulo}>{nombreApp}</Text> 
      <Text style={estilos.subtitulo}>{subtitulo}</Text> 
      <Text style={estilos.parrafo}> 
        Si ves este texto en tu celular, 
        React Native esta funcionando! 
      </Text> 
      <StatusBar style='auto' /> 
    </SafeAreaView> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  contenedor: { flex: 1, backgroundColor: '#0A0A0F', 
    alignItems: 'center', justifyContent: 'center', padding: 20 }, 
  titulo: { fontSize: 36, fontWeight: 'bold', color: '#FFD700', 
    marginBottom: 8, textAlign: 'center', letterSpacing: 4 }, 
  subtitulo: { fontSize: 14, color: '#888', marginBottom: 24, 
    textAlign: 'center', letterSpacing: 2 }, 
  parrafo: { fontSize: 16, textAlign: 'center', color: '#ccc' }, 
})  