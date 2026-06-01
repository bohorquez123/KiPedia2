// Personajes.js — listado de personajes del universo Dragon Ball
import { View, Text, StyleSheet } from 'react-native'

export default function Personajes() {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.titulo}>Personajes</Text>
      <Text style={estilos.subtitulo}>
        Aqui aparecera el listado de personajes de Dragon Ball
      </Text>
      <Text style={estilos.info}>Goku · Vegeta · Piccolo · Gohan · Freezer...</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F172A',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: '#475569',
  },
})
