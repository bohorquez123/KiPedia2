// pantallas/Favoritos.js
// Historia de usuario: guardar y gestionar personajes favoritos
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFavoritos } from '../contextos/FavoritosContext'

export default function Favoritos({ navigation }) {
  const { favoritos, cargando, alternarFavorito } = useFavoritos()

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <Text style={estilos.textoCarga}>Cargando favoritos...</Text>
      </View>
    )
  }

  if (favoritos.length === 0) {
    return (
      <View style={estilos.centrado}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>💔</Text>
        <Text style={estilos.tituloVacio}>Aún no tienes favoritos</Text>
        <Text style={estilos.textoVacio}>
          Ve a la pestaña Personajes y toca el corazón en la ficha de tu personaje preferido
        </Text>
      </View>
    )
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.contador}>
        {favoritos.length} personaje{favoritos.length !== 1 ? 's' : ''} guardado{favoritos.length !== 1 ? 's' : ''}
      </Text>
      <FlatList
        data={favoritos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.tarjeta}>
            <TouchableOpacity
              style={estilos.infoTarjeta}
              onPress={() => navigation.navigate('Personajes', {
                screen: 'FichaPersonaje',
                params: { personaje: item },
              })}
            >
              <Image source={{ uri: item.image }} style={estilos.imagen} resizeMode="contain" />
              <View style={estilos.textos}>
                <Text style={estilos.nombre}>{item.name}</Text>
                <Text style={estilos.raza}>{item.race}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.botonQuitar}
              onPress={() => alternarFavorito(item)}
            >
              <Ionicons name="heart" size={24} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  centrado: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0F172A', padding: 32,
  },
  textoCarga: { color: '#94A3B8', fontSize: 16 },
  tituloVacio: { color: '#F1F5F9', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  textoVacio: { color: '#64748B', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  contador: { color: '#475569', fontSize: 13, marginBottom: 12 },
  tarjeta: {
    flexDirection: 'row', backgroundColor: '#1E293B',
    borderRadius: 10, marginBottom: 10, alignItems: 'center',
    borderWidth: 1, borderColor: '#334155',
  },
  infoTarjeta: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12 },
  imagen: { width: 60, height: 60, marginRight: 12 },
  textos: { flex: 1 },
  nombre: { color: '#F1F5F9', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  raza: { color: '#F59E0B', fontSize: 13 },
  botonQuitar: { padding: 16 },
})

