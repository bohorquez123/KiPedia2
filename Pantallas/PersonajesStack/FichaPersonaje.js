import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useFavoritos } from '../Contextos/FavoritosContext.js'

// Dentro del componente FichaPersonaje, despues de obtener personaje:
export default function FichaPersonaje({ route }) {
  const { personaje } = route.params
  const { esFavorito, alternarFavorito } = useFavoritos()
  const favorito = esFavorito(personaje.id)



  return (
    <ScrollView style={estilos.pantalla}>
      <View style={estilos.headerPersonaje}>
        <Image source={{ uri: personaje.image }} style={estilos.imagenGrande} resizeMode="contain" />
        <TouchableOpacity
          style={estilos.botonFavorito}
          onPress={() => alternarFavorito(personaje)}
        >
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={28}
            color={favorito ? '#EF4444' : '#94A3B8'}
          />
        </TouchableOpacity>
      </View>

      

      {/* Nombre y raza */}
      <View style={estilos.seccion}>
        <Text style={estilos.nombre}>{personaje.name}</Text>
        <Text style={estilos.raza}>{personaje.race}</Text>
        <Text style={estilos.afiliacion}>{personaje.affiliation}</Text>
      </View>

      {/* Descripcion */}
      {personaje.description ? (
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Descripción</Text>
          <Text style={estilos.descripcion}>{personaje.description}</Text>
        </View>
      ) : null}

      {/* Stats de ki */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Poder</Text>
        <View style={estilos.filaStat}>
          <Text style={estilos.labelStat}>Ki base:</Text>
          <Text style={estilos.valorStat}>{personaje.ki || 'Desconocido'}</Text>
        </View>
        <View style={estilos.filaStat}>
          <Text style={estilos.labelStat}>Ki máximo:</Text>
          <Text style={estilos.valorStat}>{personaje.maxKi || 'Desconocido'}</Text>
        </View>
        <View style={estilos.filaStat}>
          <Text style={estilos.labelStat}>Género:</Text>
          <Text style={estilos.valorStat}>{personaje.gender || 'Desconocido'}</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A' },
  headerPersonaje: {
    backgroundColor: '#1E293B', alignItems: 'center',
    paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: '#F59E0B',
  },
  imagenGrande: { width: 180, height: 180 },
  seccion: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  nombre: { fontSize: 28, fontWeight: 'bold', color: '#F59E0B', marginBottom: 4 },
  raza: { fontSize: 16, color: '#94A3B8', marginBottom: 2 },
  afiliacion: { fontSize: 14, color: '#475569' },
  tituloSeccion: {
    fontSize: 13, fontWeight: 'bold', color: '#64748B',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10,
  },
  descripcion: { fontSize: 14, color: '#CBD5E1', lineHeight: 22 },
  filaStat: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6,
    borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  labelStat: { color: '#64748B', fontSize: 14 },
  valorStat: { color: '#E2E8F0', fontSize: 14, fontWeight: '600' },
})
