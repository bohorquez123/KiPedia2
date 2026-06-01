// App.js — configuracion de navegacion de KiPedia
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importar todas las pantallas
import Personajes from './Pantallas/Personajes.js'
import FichaPersonaje from './Pantallas/FichaPersonaje.js'
import Sagas from './Pantallas/Sagas.js'
import Favoritos from './Pantallas/Favoritos.js'
import Busqueda from './Pantallas/Busqueda.js'

const Stack = createNativeStackNavigator()

// Opciones de estilo comunes para todas las pantallas
const opcionesHeader = {
  headerStyle: { backgroundColor: '#1E293B' },
  headerTintColor: '#F59E0B',
  headerTitleStyle: { fontWeight: 'bold' },
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Personajes"
        screenOptions={opcionesHeader}
      >
        <Stack.Screen
          name="Personajes"
          component={Personajes}
          options={{ title: 'KiPedia — Personajes' }}
        />
        <Stack.Screen
          name="FichaPersonaje"
          component={FichaPersonaje}
          options={({ route }) => ({ title: route.params?.personaje?.name || 'Personaje' })}
        />
        <Stack.Screen
          name="Sagas"
          component={Sagas}
          options={{ title: 'Sagas' }}
        />
        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={{ title: 'Mis Favoritos' }}
        />
        <Stack.Screen
          name="Busqueda"
          component={Busqueda}
          options={{ title: 'Buscar' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  )
}
