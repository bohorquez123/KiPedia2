import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Encabezado from './Componentes/Encabezado.js'
import Personajes from './Pantallas/Personajes.js'
import FichaPersonaje from './Pantallas/FichaPersonaje.js'
import Sagas from './Pantallas/Sagas.js'
import Favoritos from './Pantallas/Favoritos.js'
import Busqueda from './Pantallas/Busqueda.js'

export default function App() {
  return (
    <SafeAreaView style={estilos.app}>
      <Encabezado titulo="Inicio" />
      <ScrollView>
        <Personajes />
        <FichaPersonaje />
        <Sagas />
        <Favoritos />
        <Busqueda />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
})
