import { View, Text, StyleSheet } from 'react-native'

export default function Busqueda() {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.titulo}>Buscar</Text>
      <Text style={estilos.subtitulo}>
        Aqui podras buscar personajes, tecnicas y sagas
      </Text>
      <View style={estilos.barraBusqueda}>
        <Text style={estilos.placeholderTexto}>Buscar en KiPedia...</Text>
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#F59E0B', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#94A3B8', marginBottom: 16 },
  barraBusqueda: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  placeholderTexto: { color: '#475569', fontSize: 14 },
})
