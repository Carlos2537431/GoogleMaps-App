/**
 * Tela principal do Mapa.
 * Responsável por:
 * - Renderizar o MapView dentro de uma área segura.
 * - Fornecer um campo de busca que usa a Geocoding API para centralizar o mapa.
 * - Exibir um marcador no local encontrado.
 *
 * Observações:
 * - A barra de busca é posicionada abaixo da status bar usando useSafeAreaInsets.
 * - O mapa é controlado via estado `region` e animado ao buscar um endereço.
 */
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native';
// Import dinâmico protegido: evita crash no Web tentando carregar módulos nativos.
let MapView = null;
let Marker = null;
if (Platform.OS !== 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mapsLib = require('react-native-maps');
    MapView = mapsLib.default;
    Marker = mapsLib.Marker;
  } catch (e) {
    // Se por algum motivo falhar em ambiente nativo, mantém fallback.
    console.warn('Falha ao carregar react-native-maps:', e);
  }
}
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGeocode } from '../hooks/UseGeocoding';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  // Região controlada do mapa (inicial: São Paulo)
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  const { geocodeAddress, loading } = useGeocode();

  /**
   * Realiza a busca do texto digitado usando Geocoding API e
   * centraliza o mapa na coordenada retornada.
   */
  const handleSearch = async () => {
    if (!search.trim()) {
      Alert.alert('Busca vazia', 'Por favor, digite um local.');
      return;
    }

    const result = await geocodeAddress(search);

    if (!result) {
      Alert.alert('Local não encontrado', 'Não foi possível encontrar o endereço. Tente novamente.');
      return;
    }

    const { location, formattedAddress } = result;
    const newRegion = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setRegion(newRegion);
    setMarker({
      coordinate: { latitude: location.lat, longitude: location.lng },
      title: formattedAddress,
    });
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  // Fallback para Web: react-native-maps não suporta web plenamente (erro em imports nativos).
  const isWeb = Platform.OS === 'web';
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchContainer, { top: insets.top + 24 }]}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar local..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading || isWeb}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isWeb ? 'Indisponível' : 'Buscar'}</Text>
          )}
        </TouchableOpacity>
      </View>

      {isWeb ? (
        <View style={styles.webFallback}>
          <Text style={styles.webFallbackTitle}>Mapa indisponível no Web</Text>
          <Text style={styles.webFallbackText}>
            O componente react-native-maps não é suportado nesta plataforma. Considere usar Google Maps
            JavaScript API ou biblioteca específica para web.
          </Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {marker && <Marker coordinate={marker.coordinate} title={marker.title} />}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 10,
    // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Elevação Android
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  webFallback: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  webFallbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  webFallbackText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
  },
});
