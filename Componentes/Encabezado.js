import { View, Text, StyleSheet } from 'react-native' 
 
export default function Encabezado() { 
  return ( 
    <View style={estilos.encabezado}> 
      <Text style={estilos.titulo}>KiPedia</Text> 
      <Text style={estilos.subtitulo}>Wiki del Universo Dragon Ball</Text> 
    </View> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  encabezado: { padding: 20, backgroundColor: '#0A0A0F', 
    borderBottomWidth: 1, borderBottomColor: '#FF6B0044' }, 
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', 
    letterSpacing: 4 }, 
  subtitulo: { fontSize: 12, color: '#888', marginTop: 4, letterSpacing: 2 }, 
}) 