/**
 * Hook useGeocode
 * Abstrai o acesso à Google Geocoding API para converter um endereço (string)
 * em coordenadas latitude/longitude e endereço formatado.
 *
 * Contrato:
 * - Entrada: address: string
 * - Saída (success): { location: { lat: number, lng: number }, formattedAddress: string }
 * - Saída (falha): null
 * - Pré-requisito: variável de ambiente GOOGLE_MAPS_API_KEY configurada (via @env)
 */
import { GOOGLE_MAPS_API_KEY } from '@env';

export const useGeocode = () => {
  /**
   * Faz a chamada à API de geocodificação do Google.
   */
  const geocodeAddress = async (address) => {
    if (!address) return null;

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK' || !data.results || data.results.length === 0) {
        return null;
      }

      const result = data.results[0];
      return {
        location: result.geometry.location,
        formattedAddress: result.formatted_address,
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  return { geocodeAddress };
};