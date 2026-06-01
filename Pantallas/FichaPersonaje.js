import { View, Text, StyleSheet } from 'react-native'

export default function FichaPersonaje() {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.nombre}>Goku</Text>
      <Text style={estilos.raza}>Raza: Saiyan</Text>
      <Text style={estilos.seccion}>Stats</Text>
      <Text style={estilos.dato}>Ki: 9000+ · Fuerza: Maxima · Velocidad: Ultra rapido</Text>
      <Text style={estilos.seccion}>Transformaciones</Text>
      <Text style={estilos.dato}>Base · SSJ · SSJ2 · SSJ3 · SSJ Dios · SSJ Blue · Ultra Instinto</Text>
      <Text style={estilos.seccion}>Tecnicas</Text>
      <Text style={estilos.dato}>Kamehameha · Genki-Dama · Kaioken · Instant Transmission</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  nombre: { fontSize: 28, fontWeight: 'bold', color: '#F59E0B', marginBottom: 4 },
  raza: { fontSize: 14, color: '#94A3B8', marginBottom: 16 },
  seccion: { fontSize: 16, fontWeight: 'bold', color: '#CBD5E1', marginTop: 12, marginBottom: 4 },
  dato: { fontSize: 13, color: '#475569' },
})
