import { View, Text, StyleSheet } from 'react-native' 
 
export default function PiePagina() { 
  return ( 
    <View style={estilos.pie}> 
      <Text style={estilos.texto}> 
        KiPedia  •  Creado por [tu nombre]  •  SENA 2026 
      </Text> 
    </View> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  pie: { padding: 16, alignItems: 'center', 
    borderTopWidth: 1, borderTopColor: '#2E2E42' }, 
  texto: { fontSize: 11, color: '#555', letterSpacing: 1 }, 
}) 