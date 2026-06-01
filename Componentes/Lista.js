export default function Lista() { 
  return ( 
    <View style={estilos.seccion}> 
      <Text style={estilos.titulo}>Personajes</Text> 
      <Text style={estilos.placeholder}> 
        [ Lista de personajes — Sprint 2 ] 
      </Text> 
    </View> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  seccion: { padding: 16, margin: 12, backgroundColor: '#12121A', 
    borderRadius: 8 }, 
  titulo: { fontSize: 14, fontWeight: 'bold', color: '#FFD700', 
    marginBottom: 8 }, 
  placeholder: { fontSize: 13, color: '#555', fontStyle: 'italic' }, 
})