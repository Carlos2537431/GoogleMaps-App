# Projeto Google Maps React Native

Este projeto demonstra a integração do **Google Maps** em um app **React Native (Expo)** com as seguintes metas da atividade:

1. Exibir o mapa em área segura (SafeAreaView) sem sobrepor a status bar.
2. Usar `.env` para armazenar a **API Key** de forma segura.
3. Campo de busca para centralizar o mapa em uma localização via **Google Geocoding API**.
4. Organização de código em componente dedicado (`components/MapScreen.js`).
5. Alternância opcional de tipos de mapa (standard, satellite, hybrid).

## Pré-requisitos
- Node.js LTS
- Expo CLI (`npm install -g expo-cli` se necessário)
- Chave de API do Google Maps com **APIs habilitadas**: Maps SDK for Android, Maps SDK for iOS, Geocoding API.

## Configuração da API Key
Crie o arquivo `.env` na raiz (já existe um exemplo) e substitua:
```
GOOGLE_MAPS_API_KEY=COLOQUE_SUA_CHAVE_AQUI
```
Nunca exponha essa chave em commits públicos.

### Importante (Expo + app.json)
No `app.json` há placeholders:
```json
"ios": { "config": { "googleMapsApiKey": "${GOOGLE_MAPS_API_KEY}" } }
"android": { "config": { "googleMaps": { "apiKey": "${GOOGLE_MAPS_API_KEY}" } } }
```
O Expo não expande automaticamente variáveis do `.env` dentro do `app.json` em runtime. Para builds, considere usar **expo dotenv**, **eas.json** ou scripts de substituição antes do build. Para desenvolvimento, a chave é consumida via `@env` dentro do código.

## Instalação
```bash
npm install
```
Caso as versões mudem, você pode usar:
```bash
npx expo install react-native-maps react-native-safe-area-context
```

## Executar
```bash
npm start
```
Escolha Android/iOS/Web conforme necessidade.

## Uso do Campo de Busca
- Digite o nome da cidade ou endereço (ex: `São Paulo`).
- Pressione "Buscar" ou Enter.
- O mapa centraliza e coloca um marcador na localização retornada.

## Estrutura
```
App.js                  -> Carrega a tela principal
components/MapScreen.js -> Componente com MapView e busca
.env                    -> Chave de API (não commitar real)
app.json                -> Configurações Expo
babel.config.js         -> Plugin react-native-dotenv
```

## Boas Práticas de Segurança
- Não logar a chave.
- Usar variáveis via `@env`.
- Evitar enviar `.env` ao repositório público (adicione `.env` ao `.gitignore` se ainda não estiver).

## Possíveis Extensões
- Mostrar localização atual do usuário (Expo Location).
- Salvar histórico de buscas.
- Tema claro/escuro dinâmico.

## Critérios da Atividade (Checklist)
- [x] Chave em `.env`
- [x] Mapa em área segura
- [x] Busca funcional com geocoding
- [x] Código organizado e comentado
- [x] Alternância de tipo de mapa

## Recursos
- React Native Maps: https://github.com/react-native-maps/react-native-maps
- Geocoding API: https://developers.google.com/maps/documentation/geocoding

---
Qualquer dúvida, ajuste ou melhoria: abra uma issue ou continue iterando! Bons estudos.
