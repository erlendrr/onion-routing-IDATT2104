# onion-routing-IDATT2104

## Setup

### Installasjon

```
npm install
```

### Kjøring

Server

```
npm run server
```

Noder

```
npm run network
```

Klient

```
npm run client <node_count?>
```

### Testing

```
npm run test
```

## Introduksjon

Denne applikasjonen demonsterer onion-routing med hjelp av typescript. Serveren og nodene kan kjøres
lokalt, eller på nettet.

## Implementert funksjonalitet

- AES 128-bit kryptering
- Diffie-Hellman nøkkelutveksling
- Rekursive innpakkings- og utpakkingsmetoder
- Enkel server
- Nodenettverk

Klienten kan sende get- og post-requester til en server gjennom et nettverk av noder.

## Fremtidig arbeid

### Forbedringspotensial

- Gjøre block-størrelse lik i alle transaksjoner. Nå vil de første nodene få en større datamengde.
- Sikre korrekt overføring med verifiseringsalgoritmer i form av hashing-algoritmer.
- Flere kommandolinjevariabler

### Eksterne avhengigheter

- Express: Gjør det enkelt å ta i mot spørringer
- Axios: Gjør det lett å sende spørringer
