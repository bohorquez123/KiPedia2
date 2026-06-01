import { View, Text, StyleSheet } from 'react-native' 
 
export default function Formulario() { 
  return ( 
    <View style={estilos.seccion}> 
      <Text style={estilos.titulo}>Buscar personaje</Text> 
      <Text style={estilos.placeholder}> 
        [ Campo de busqueda — Sprint 2 ] 
      </Text> 
    </View> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  seccion: { padding: 16, margin: 12, backgroundColor: '#1C1C28', 
    borderRadius: 8, borderWidth: 1, borderColor: '#2E2E42' }, 
  titulo: { fontSize: 14, fontWeight: 'bold', color: '#FF6B00', 
    marginBottom: 8, letterSpacing: 1 }, 
  placeholder: { fontSize: 13, color: '#555', fontStyle: 'italic' }, 
})                                          