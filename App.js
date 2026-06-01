 
// App.js — componente principal que reune KiPedia 
import { StatusBar } from 'expo-status-bar' 
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native' 
import Encabezado from './componentes/Encabezado' 
import Formulario from './componentes/Formulario' 
import Lista from './componentes/Lista' 
import Item from './componentes/Item' 
import PiePagina from './componentes/PiePagina' 
 
export default function App() { 
  return ( 
    <SafeAreaView style={estilos.app}> 
      <ScrollView> 
        <Encabezado /> 
        <Formulario /> 
        <Lista /> 
        <Item /> 
        <PiePagina /> 
      </ScrollView> 
      <StatusBar style='light' /> 
    </SafeAreaView> 
  ) 
} 
 
const estilos = StyleSheet.create({ 
  app: { flex: 1, backgroundColor: '#0A0A0F' }, 
}) 
a