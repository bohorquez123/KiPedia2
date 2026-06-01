import { View, Text, StyleSheet } from 'react-native' 
 
export default function Item() { 
  return ( 
    <View style={estilos.item}> 
      <Text style={estilos.nombre}>Goku</Text> 
      <Text style={estilos.raza}>Saiyan  •  Z-Fighter</Text> 
    </View> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  item: { padding: 14, marginHorizontal: 12, marginVertical: 4, 
    backgroundColor: '#1E1E2E', borderWidth: 1, 
    borderColor: '#2E2E42', borderRadius: 8 }, 
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#F0EFF5' }, 
  raza: { fontSize: 12, color: '#7A7A99', marginTop: 2 }, 
}) 