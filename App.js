import { View, Text, StyleSheet } from 'react-native'

export default function Encabezado({ titulo }) {
  return (
    <View style={estilos.encabezado}>
      <Text style={estilos.logo}>KiPedia 🐉</Text>
      <Text style={estilos.pantallaTitulo}>{titulo}</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  encabezado: {
    padding: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { fontSize: 18, fontWeight: 'bold', color: '#F59E0B' },
  pantallaTitulo: { fontSize: 14, color: '#94A3B8' },
})
