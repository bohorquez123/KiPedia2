import { View, Text, StyleSheet } from 'react-native'

export default function Favoritos() {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.titulo}>Mis Favoritos</Text>
      <Text style={estilos.subtitulo}>
        Aqui apareceran tus personajes favoritos guardados
      </Text>
      <Text style={estilos.vacio}>Aun no tienes favoritos. Agrega personajes desde su ficha.</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#F59E0B', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#94A3B8', marginBottom: 16 },
  vacio: { fontSize: 14, color: '#334155', fontStyle: 'italic' },
})
