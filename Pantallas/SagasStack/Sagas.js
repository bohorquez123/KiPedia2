// pantallas/Sagas.js
// Historia de usuario: explorar las sagas del universo Dragon Ball
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

// Datos locales de las 7 sagas principales del universo Dragon Ball
const SAGAS = [
  {
    id: 1,
    nombre: 'Saga del Origen (Dragon Ball)',
    anime: 'Dragon Ball',
    anios: '1986 - 1989',
    episodios: 153,
    emoji: '🐉',
    color: '#1E3A5F',
    descripcion: 'El inicio de la aventura. Goku busca las 7 esferas del dragon junto a Bulma. Entrena con el Maestro Roshi y participa en su primer torneo de artes marciales.',
    personajesClave: ['Goku', 'Bulma', 'Krilin', 'Yamcha', 'Maestro Roshi'],
    villanosPrincipales: ['Pilaf', 'Red Ribbon', 'Piccolo Daimao'],
  },
  {
    id: 2,
    nombre: 'Saga Saiyan',
    anime: 'Dragon Ball Z',
    anios: '1989 - 1990',
    episodios: 35,
    emoji: '👊',
    color: '#3B1A5F',
    descripcion: 'Raditz, el hermano de Goku, llega a la Tierra. Goku descubre que es un Saiyan. Se sacrifica junto a Piccolo para derrotarlo. Vegeta y Nappa invaden la Tierra.',
    personajesClave: ['Goku', 'Vegeta', 'Piccolo', 'Gohan', 'Krilin'],
    villanosPrincipales: ['Raditz', 'Nappa', 'Vegeta'],
  },
  {
    id: 3,
    nombre: 'Saga de Namek',
    anime: 'Dragon Ball Z',
    anios: '1990 - 1991',
    episodios: 67,
    emoji: '⚡',
    color: '#1A4A3B',
    descripcion: 'Viajan al planeta Namek para revivir a sus amigos. Goku se transforma en Super Saiyan por primera vez enfrentando a Freezer.',
    personajesClave: ['Goku', 'Vegeta', 'Piccolo', 'Gohan', 'Krilin'],
    villanosPrincipales: ['Freezer', 'Ginyu', 'Dodoria', 'Zarbon'],
  },
  {
    id: 4,
    nombre: 'Saga de los Androides y Celula',
    anime: 'Dragon Ball Z',
    anios: '1991 - 1993',
    episodios: 98,
    emoji: '🧬',
    color: '#4A3B1A',
    descripcion: 'Celula absorbe a los Androides para alcanzar su forma perfecta. Gohan supera a su padre convirtiéndose en Super Saiyan 2.',
    personajesClave: ['Gohan', 'Goku', 'Vegeta', 'Trunks', 'Piccolo'],
    villanosPrincipales: ['Celula', 'Androide 17', 'Androide 18', 'Dr. Gero'],
  },
  {
    id: 5,
    nombre: 'Saga de Majin Buu',
    anime: 'Dragon Ball Z',
    anios: '1993 - 1996',
    episodios: 97,
    emoji: '🍬',
    color: '#5F1A1A',
    descripcion: 'Babidi resucita a Majin Buu. Goku alcanza el Super Saiyan 3. Las fusiones crean a Vegetto y Gogeta.',
    personajesClave: ['Goku', 'Vegeta', 'Gohan', 'Gotenks', 'Vegetto'],
    villanosPrincipales: ['Majin Buu', 'Babidi', 'Dabura'],
  },
  {
    id: 6,
    nombre: 'Saga de la Batalla de los Dioses',
    anime: 'Dragon Ball Super',
    anios: '2015 - 2015',
    episodios: 14,
    emoji: '🐱',
    color: '#1A2E5F',
    descripcion: 'Bills, el Dios de la Destruccion, busca al Super Saiyan Dios. Primer arco de Dragon Ball Super.',
    personajesClave: ['Goku', 'Vegeta', 'Bills', 'Whis'],
    villanosPrincipales: ['Bills'],
  },
  {
    id: 7,
    nombre: 'Saga del Torneo del Poder',
    anime: 'Dragon Ball Super',
    anios: '2017 - 2018',
    episodios: 55,
    emoji: '🏆',
    color: '#2E1A5F',
    descripcion: 'Zeno-sama organiza un torneo entre los 12 universos. El perdedor sera borrado. Goku alcanza el Ultra Instinto.',
    personajesClave: ['Goku', 'Vegeta', 'Gohan', 'Androide 17', 'Freezer'],
    villanosPrincipales: ['Jiren', 'Kefla', 'Toppo'],
  },
]

export default function Sagas({ navigation }) {

  // Componente para cada tarjeta de saga
  function TarjetaSaga({ item }) {
    return (
      <TouchableOpacity
        style={[estilos.tarjeta, { borderLeftColor: item.color, borderLeftWidth: 4 }]}
        onPress={() => navigation.navigate('DetalleSaga', { saga: item })}
      >
        <View style={estilos.encabezadoTarjeta}>
          <Text style={estilos.emoji}>{item.emoji}</Text>
          <View style={estilos.infoTarjeta}>
            <Text style={estilos.nombreSaga}>{item.nombre}</Text>
            <Text style={estilos.animeSaga}>{item.anime} · {item.anios}</Text>
          </View>
        </View>
        <Text style={estilos.episodiosSaga}>{item.episodios} episodios</Text>
        <Text style={estilos.descripcionCorta} numberOfLines={2}>
          {item.descripcion}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.contador}>
        {SAGAS.length} sagas del universo Dragon Ball
      </Text>
      <FlatList
        data={SAGAS}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TarjetaSaga item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  contador: { color: '#475569', fontSize: 13, marginBottom: 12 },
  tarjeta: {
    backgroundColor: '#1E293B', borderRadius: 10, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: '#334155',
  },
  encabezadoTarjeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  emoji: { fontSize: 28, marginRight: 12 },
  infoTarjeta: { flex: 1 },
  nombreSaga: { color: '#F1F5F9', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  animeSaga: { color: '#F59E0B', fontSize: 12 },
  episodiosSaga: { color: '#64748B', fontSize: 12, marginBottom: 6 },
  descripcionCorta: { color: '#94A3B8', fontSize: 13, lineHeight: 19 },
})
