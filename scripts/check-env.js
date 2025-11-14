/**
 * Script utilitário para checar se a variável GOOGLE_MAPS_API_KEY
 * está configurada antes de iniciar o Expo.
 */
require('dotenv').config();

if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error('[ERRO] GOOGLE_MAPS_API_KEY ausente. Configure no arquivo .env antes de iniciar.');
  process.exit(1);
}
console.log('[OK] GOOGLE_MAPS_API_KEY carregada.');
