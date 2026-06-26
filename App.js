// App.js — configuracion de navegacion de KiPedia
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// Importar todas las pantallas
import Personajes from './pantallas/PersonajesStack/Personajes.js'
import FichaPersonaje from './pantallas/PersonajesStack/FichaPersonaje.js'
import Sagas from './pantallas/SagasStack/Sagas.js'
import DetalleSaga from './Pantallas/SagasStack/DetalleSaga.js'
import Tecnicas from './pantallas/TecnicasStack/Tecnicas.js'
import DetalleTecnica from './pantallas/TecnicasStack/DetallesTecnicas.js'
import Favoritos from './pantallas/Favoritos.js'
import Busqueda from './pantallas/Busqueda.js'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Opciones de header compartidas por todos los stacks
const opcionesHeader = {
  headerStyle: { backgroundColor: '#1E293B' },
  headerTintColor: '#F59E0B',
  headerTitleStyle: { fontWeight: 'bold' },
}

// Stack de la pestaña Personajes
function PersonajesStack() {
  return (
    <Stack.Navigator screenOptions={opcionesHeader}>
      <Stack.Screen name="ListaPersonajes" component={Personajes}
        options={{ title: 'Personajes' }} />
      <Stack.Screen name="FichaPersonaje" component={FichaPersonaje}
        options={({ route }) => ({ title: route.params?.personaje?.name || 'Personaje' })} />
    </Stack.Navigator>
  )
}

// Stack de la pestaña Sagas
function SagasStack() {
  return (
    <Stack.Navigator screenOptions={opcionesHeader}>
      <Stack.Screen name="ListaSagas" component={Sagas}
        options={{ title: 'Sagas' }} />
      <Stack.Screen name="DetalleSaga" component={DetalleSaga}
        options={({ route }) => ({ title: route.params?.saga?.nombre || 'Saga' })} />
    </Stack.Navigator>
  )
}

// Stack de la pestaña Tecnicas
function TecnicasStack() {
  return (
    <Stack.Navigator screenOptions={opcionesHeader}>
      <Stack.Screen name="ListaTecnicas" component={Tecnicas}
        options={{ title: 'Técnicas' }} />
      <Stack.Screen name="DetalleTecnica" component={DetalleTecnica}
        options={({ route }) => ({ title: route.params?.tecnica?.name || 'Técnica' })} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E293B',
            borderTopColor: '#334155',
          },
          tabBarActiveTintColor: '#F59E0B',
          tabBarInactiveTintColor: '#64748B',
          tabBarIcon: ({ focused, color, size }) => {
            const iconos = {
              Personajes: focused ? 'people' : 'people-outline',
              Sagas: focused ? 'book' : 'book-outline',
              Tecnicas: focused ? 'flash' : 'flash-outline',
              Favoritos: focused ? 'heart' : 'heart-outline',
              Busqueda: focused ? 'search' : 'search-outline',
            }
            return <Ionicons name={iconos[route.name]} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen name="Personajes" component={PersonajesStack} />
        <Tab.Screen name="Sagas" component={SagasStack} />
        <Tab.Screen name="Tecnicas" component={TecnicasStack} />
        <Tab.Screen name="Favoritos" component={Favoritos}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#F59E0B',
            headerTitle: 'Mis Favoritos'
          }} />
        <Tab.Screen name="Busqueda" component={Busqueda}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#F59E0B',
            headerTitle: 'Buscar'
          }} />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  )
}
